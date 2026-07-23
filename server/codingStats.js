const https = require('https');
const http = require('http');

// ── Helpers ────────────────────────────────────────────────────

function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { ...options, headers: { 'User-Agent': 'Mozilla/5.0', ...(options.headers || {}) } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function postJSON(url, payload, headers = {}) {
  const body = JSON.stringify(payload);
  const urlObj = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'Mozilla/5.0',
        ...headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── LeetCode (public GraphQL) ──────────────────────────────────

async function fetchLeetCode(username) {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats { acSubmissionNum { difficulty count } }
        profile { ranking }
        userCalendar { streak }
      }
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
        globalRanking
      }
    }
  `;
  const { body } = await postJSON(
    'https://leetcode.com/graphql',
    { query, variables: { username } },
    { Referer: 'https://leetcode.com' }
  );

  const user = body?.data?.matchedUser;
  const contest = body?.data?.userContestRanking;
  if (!user) throw new Error('LeetCode user not found');

  const counts = {};
  for (const { difficulty, count } of user.submitStats.acSubmissionNum) {
    counts[difficulty] = count;
  }

  return {
    username,
    solved: { All: counts.All || 0, Easy: counts.Easy || 0, Medium: counts.Medium || 0, Hard: counts.Hard || 0 },
    rating: Math.round(contest?.rating || 0),
    globalRanking: contest?.globalRanking || user.profile?.ranking || 0,
    contestCount: contest?.attendedContestsCount || 0,
    streak: user.userCalendar?.streak || 0,
  };
}

// ── GitHub (public REST API) ───────────────────────────────────

async function fetchGitHub(username) {
  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

  const [userRes, reposRes] = await Promise.all([
    fetchJSON(`https://api.github.com/users/${username}`, { headers }),
    fetchJSON(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers }),
  ]);

  if (userRes.status !== 200) throw new Error('GitHub user not found');

  const repos = Array.isArray(reposRes.body) ? reposRes.body : [];
  const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalRepos = userRes.body.public_repos || repos.length;

  // Commit count via contributor stats on each repo (expensive) — use events as proxy
  const eventsRes = await fetchJSON(`https://api.github.com/users/${username}/events?per_page=100`, { headers });
  const events = Array.isArray(eventsRes.body) ? eventsRes.body : [];
  const recentCommits = events
    .filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);

  // Streak from push events
  const pushDays = new Set(
    events.filter(e => e.type === 'PushEvent').map(e => e.created_at?.slice(0, 10))
  );
  let longestStreak = 0, streak = 0;
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (pushDays.has(key)) { streak++; longestStreak = Math.max(longestStreak, streak); }
    else streak = 0;
  }

  // Total commits: use search API
  const searchRes = await fetchJSON(
    `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
    { headers: { ...headers, Accept: 'application/vnd.github.cloak-preview' } }
  );
  const totalCommits = searchRes.body?.total_count || recentCommits;

  return {
    username,
    totalCommits,
    totalRepos,
    stars,
    longestStreak,
  };
}

// ── Codeforces (public REST API) ───────────────────────────────

async function fetchCodeforces(username) {
  const [userRes, statusRes] = await Promise.all([
    fetchJSON(`https://codeforces.com/api/user.info?handles=${username}`),
    fetchJSON(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`),
  ]);

  if (userRes.body?.status !== 'OK') throw new Error('Codeforces user not found');

  const user = userRes.body.result[0];
  const submissions = statusRes.body?.result || [];
  const solved = new Set(
    submissions.filter(s => s.verdict === 'OK').map(s => `${s.problem.contestId}-${s.problem.index}`)
  );

  return {
    username,
    rating: user.rating || 0,
    maxRating: user.maxRating || 0,
    rank: user.rank || 'unrated',
    problemsSolved: solved.size,
  };
}

// ── CodeChef (HTML scrape) ─────────────────────────────────────

async function fetchCodeChef(username) {
  const html = await fetchHTML(`https://www.codechef.com/users/${username}`);

  const ratingMatch = html.match(/"currentRating"\s*:\s*(\d+)/);
  const starsMatch = html.match(/(\d+)\s*★/) || html.match(/rating-star[^>]*>([^<]+)</);
  const rankMatch = html.match(/"globalRank"\s*:\s*(\d+)/);
  const solvedMatch = html.match(/(\d+)\s*(?:Fully\s*Solved|fully solved)/i);

  // Fallback: look for rating in the page differently
  const ratingAlt = html.match(/class="rating"[^>]*>\s*(\d+)/);

  const rating = ratingMatch ? parseInt(ratingMatch[1]) : (ratingAlt ? parseInt(ratingAlt[1]) : 0);
  const globalRank = rankMatch ? parseInt(rankMatch[1]) : 0;
  const fullySolved = solvedMatch ? parseInt(solvedMatch[1]) : 0;

  // Stars from rating
  let stars = '1★';
  if (rating >= 2500) stars = '7★';
  else if (rating >= 2200) stars = '6★';
  else if (rating >= 2000) stars = '5★';
  else if (rating >= 1800) stars = '4★';
  else if (rating >= 1600) stars = '3★';
  else if (rating >= 1400) stars = '2★';

  return { username, rating, stars, globalRank, fullySolved };
}

// ── SkillRack (HTML scrape of public profile) ──────────────────

async function fetchSkillRack() {
  const url = 'https://www.skillrack.com/faces/resume.xhtml?id=551325&key=1d3b6f784f4ff36e1988484ee482abe469a5952c';
  const html = await fetchHTML(url);

  const solvedMatch = html.match(/(\d+)\s*(?:Programs?\s*Solved|programs?\s*solved)/i)
    || html.match(/Programs\s*Solved[^>]*>\s*(\d+)/i)
    || html.match(/>(\d+)<\/span>\s*<[^>]+>\s*Programs/i);

  const rankMatch = html.match(/Rank[^>]*>\s*#?\s*([\d,]+)/i)
    || html.match(/([\d,]+)\s*<[^>]+>\s*Rank/i);

  // Count certificate links
  const certMatches = [...html.matchAll(/skillrack\.com\/cert\/[^"'\s]+/g)];
  const certLinks = [...new Set(certMatches.map(m => 'https://www.' + m[0]))];

  // Extract cert titles near links
  const certificates = [];
  const certBlockRegex = /href="[^"]*skillrack\.com\/cert\/[^"]*"[^>]*>([^<]+)</g;
  let m;
  while ((m = certBlockRegex.exec(html)) !== null) {
    certificates.push({ title: m[1].trim(), link: certLinks[certificates.length] || '' });
  }

  // Language count from profile
  const langMatch = html.match(/(\d+)\s*(?:Languages?|languages?)/i);

  const programsSolved = solvedMatch ? parseInt(solvedMatch[1].replace(/,/g, '')) : 0;
  const rank = rankMatch ? parseInt(rankMatch[1].replace(/,/g, '')) : 0;

  return {
    programsSolved,
    rank,
    certificateCount: certLinks.length || certificates.length,
    languageCount: langMatch ? parseInt(langMatch[1]) : 0,
    certificates: certificates.slice(0, 8),
  };
}

// ── Main export ────────────────────────────────────────────────

async function fetchAllStats() {
  const LEETCODE_USER = 'Abinivesh_Mayilsamy';
  const GITHUB_USER = 'AbiniveshMayilsamy';
  const CF_USER = 'Abinivesh_M_CSE_SECE';
  const CC_USER = 'abinivesh_m';
  const HR_USER = 'abiniveshmayils1';

  const results = await Promise.allSettled([
    fetchLeetCode(LEETCODE_USER),
    fetchGitHub(GITHUB_USER),
    fetchSkillRack(),
    fetchCodeforces(CF_USER),
    fetchCodeChef(CC_USER),
  ]);

  const [lc, gh, sr, cf, cc] = results.map((r, i) => {
    if (r.status === 'rejected') {
      const names = ['leetcode', 'github', 'skillrack', 'codeforces', 'codechef'];
      console.error(`[CodingStats] ${names[i]} fetch failed:`, r.reason?.message || r.reason);
      return null;
    }
    return r.value;
  });

  return {
    leetcode: lc,
    github: gh,
    skillrack: sr,
    codeforces: cf,
    codechef: cc,
    hackerrank: { username: HR_USER },
  };
}

module.exports = { fetchAllStats };
