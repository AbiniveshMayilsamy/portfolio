import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiAward, FiCode, FiGithub, FiZap, FiCheckCircle, FiActivity, FiFileText } from 'react-icons/fi';
import axios from 'axios';
import styles from './CodingStats.module.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

// Static data from last known fetch — always shown as baseline
const STATIC = {
  leetcode: { username: 'Abinivesh_Mayilsamy', solved: { All: 96, Easy: 48, Medium: 39, Hard: 9 }, rating: 1356, globalRanking: 807348, contestCount: 2, streak: 6 },
  github: { username: 'AbiniveshMayilsamy', totalCommits: 486, totalRepos: 16, stars: 39, longestStreak: 6 },
  skillrack: { programsSolved: 333, rank: 89713, certificateCount: 4, languageCount: 14, certificates: [
    { title: 'JAVA - 50 AVERAGE CHALLENGES', link: 'https://www.skillrack.com/cert/597355/DIC' },
    { title: 'SQL - Basics (Standard)', link: 'https://www.skillrack.com/cert/596644/SIX' },
    { title: 'JAVA - 50 EASY CHALLENGES', link: 'https://www.skillrack.com/cert/595507/DIK' },
    { title: 'JAVA - 50 VERY-EASY CHALLENGES', link: 'https://www.skillrack.com/cert/592423/ATY' },
  ]},
  codeforces: { username: 'Abinivesh_M_CSE_SECE', rating: 687, maxRating: 687, rank: 'newbie', problemsSolved: 2 },
  codechef: { username: 'abinivesh_m', rating: 625, stars: '1★', globalRank: 213176, fullySolved: 8 },
  hackerrank: { username: 'abiniveshmayils1' },
};

export default function CodingStats({ isOpen, onClose }) {
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    axios.get(`${API_BASE}/api/coding-stats`, { timeout: 15000 })
      .then(res => setLiveData(res.data?.stats || null))
      .catch(() => setLiveData(null));
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Merge live data over static — static always wins as minimum
  const lc = liveData?.leetcode?.solved?.All ? liveData.leetcode : STATIC.leetcode;
  const gh = liveData?.github?.totalCommits ? liveData.github : STATIC.github;
  const sr = liveData?.skillrack?.programsSolved ? liveData.skillrack : STATIC.skillrack;
  const cf = liveData?.codeforces?.rating ? liveData.codeforces : STATIC.codeforces;
  const cc = liveData?.codechef?.rating ? liveData.codechef : STATIC.codechef;
  const hr = liveData?.hackerrank?.username ? liveData.hackerrank : STATIC.hackerrank;

  const totalSolved = (lc.solved?.All || 0) + (sr.programsSolved || 0) + (cf.problemsSolved || 0) + (cc.fullySolved || 0);
  const totalCommits = gh.totalCommits || 0;
  const currentStreak = Math.max(lc.streak || 0, gh.longestStreak || 0);

  const platforms = [
    {
      name: 'LeetCode', icon: <FiCode className={styles.leetcodeIcon} />,
      username: lc.username, link: `https://leetcode.com/${lc.username}`,
      themeClass: styles.leetcodeCard,
      stats: [
        { label: 'Solved', value: `${lc.solved?.All} Problems` },
        { label: 'Rating', value: Math.round(lc.rating) },
        { label: 'Global Rank', value: lc.globalRanking?.toLocaleString() },
        { label: 'Contests', value: `${lc.contestCount} Played` },
      ],
      progress: [
        { label: 'Easy', count: lc.solved?.Easy || 0, total: 800, color: '#00b8a3' },
        { label: 'Medium', count: lc.solved?.Medium || 0, total: 1600, color: '#ffb800' },
        { label: 'Hard', count: lc.solved?.Hard || 0, total: 700, color: '#ff2d55' },
      ],
    },
    {
      name: 'GitHub', icon: <FiGithub className={styles.githubIcon} />,
      username: gh.username, link: `https://github.com/${gh.username}`,
      themeClass: styles.githubCard,
      stats: [
        { label: 'Commits', value: gh.totalCommits },
        { label: 'Repositories', value: gh.totalRepos },
        { label: 'Stars Earned', value: gh.stars },
        { label: 'Longest Streak', value: `${gh.longestStreak} Days` },
      ],
    },
    {
      name: 'SkillRack', icon: <FiAward className={styles.skillrackIcon} />,
      username: 'ABINIVESH M', link: 'https://www.skillrack.com/faces/resume.xhtml?id=551325&key=1d3b6f784f4ff36e1988484ee482abe469a5952c',
      themeClass: styles.skillrackCard,
      stats: [
        { label: 'Solved', value: `${sr.programsSolved} Progs` },
        { label: 'Rank', value: sr.rank?.toLocaleString() },
        { label: 'Certificates', value: `${sr.certificateCount} Verified` },
        { label: 'Languages', value: `${sr.languageCount} Used` },
      ],
      customSection: sr.certificates?.length > 0 ? (
        <div className={styles.certificatesList}>
          <span className={styles.certTitle}>Certifications:</span>
          {sr.certificates.slice(0, 4).map((cert, idx) => (
            <a key={idx} href={cert.link} target="_blank" rel="noreferrer" className={styles.certLink}>
              <FiFileText /><span>{cert.title}</span>
            </a>
          ))}
        </div>
      ) : null,
    },
    {
      name: 'Codeforces', icon: <FiZap className={styles.codeforcesIcon} />,
      username: cf.username, link: `https://codeforces.com/profile/${cf.username}`,
      themeClass: styles.codeforcesCard,
      stats: [
        { label: 'Rating', value: cf.rating },
        { label: 'Max Rating', value: cf.maxRating },
        { label: 'Rank', value: cf.rank },
        { label: 'Solved', value: `${cf.problemsSolved} Problems` },
      ],
    },
    {
      name: 'CodeChef', icon: <FiActivity className={styles.codechefIcon} />,
      username: cc.username, link: `https://www.codechef.com/users/${cc.username}`,
      themeClass: styles.codechefCard,
      stats: [
        { label: 'Rating', value: cc.rating },
        { label: 'Stars', value: cc.stars },
        { label: 'Global Rank', value: cc.globalRank?.toLocaleString() },
        { label: 'Solved', value: `${cc.fullySolved} Problems` },
      ],
    },
    {
      name: 'HackerRank', icon: <FiCheckCircle className={styles.hackerrankIcon} />,
      username: hr.username, link: `https://www.hackerrank.com/profile/${hr.username}`,
      themeClass: styles.hackerrankCard,
      stats: [
        { label: 'Status', value: 'Verified' },
        { label: 'SQL', value: 'Intermediate' },
        { label: 'SQL Advanced', value: 'Certified' },
        { label: 'Badges', value: 'Algorithms & Java' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className={styles.modal}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.radialGlow1} />
          <div className={styles.radialGlow2} />

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close stats"><FiX /></button>

          <div className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowBar} />
              <span>LIVE TRACKING</span>
              <span className={styles.eyebrowTag}>[CODING]</span>
            </div>
            <h2 className={styles.title}>Coding Profile &amp; <em>Statistics</em></h2>
            <p className={styles.description}>Live dashboard synchronized with competitive programming platforms.</p>
          </div>

          <div className={styles.contentScroll}>
            {/* Aggregated Banner */}
            <div className={styles.aggregatedRow}>
              <div className={styles.aggregateCard}>
                <div className={styles.aggIconWrap}><FiCode /></div>
                <div className={styles.aggInfo}>
                  <span className={styles.aggNum}>{totalSolved}</span>
                  <span className={styles.aggLabel}>Total Problems Solved</span>
                </div>
              </div>
              <div className={styles.aggregateCard}>
                <div className={styles.aggIconWrap}><FiGithub /></div>
                <div className={styles.aggInfo}>
                  <span className={styles.aggNum}>{totalCommits}</span>
                  <span className={styles.aggLabel}>GitHub Commits</span>
                </div>
              </div>
              <div className={styles.aggregateCard}>
                <div className={styles.aggIconWrap}><FiZap /></div>
                <div className={styles.aggInfo}>
                  <span className={styles.aggNum}>{currentStreak}d</span>
                  <span className={styles.aggLabel}>Max Active Streak</span>
                </div>
              </div>
            </div>

            <div className={styles.grid}>
              {platforms.map((p, idx) => (
                <motion.div
                  key={p.name}
                  className={`${styles.card} ${p.themeClass}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.platformMeta}>
                      <div className={styles.platformIconWrap}>{p.icon}</div>
                      <div>
                        <h3 className={styles.platformName}>{p.name}</h3>
                        <span className={styles.platformUsername}>@{p.username}</span>
                      </div>
                    </div>
                    <a href={p.link} target="_blank" rel="noreferrer" className={styles.extLink}><FiExternalLink /></a>
                  </div>

                  <div className={styles.cardStats}>
                    {p.stats.map((s, i) => (
                      <div key={i} className={styles.statBox}>
                        <span className={styles.statBoxLabel}>{s.label}</span>
                        <span className={styles.statBoxVal}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {p.progress && (
                    <div className={styles.progressContainer}>
                      <span className={styles.progressHeader}>Difficulty Breakdown:</span>
                      {p.progress.map((prog, i) => (
                        <div key={i} className={styles.progressItem}>
                          <div className={styles.progressLabels}>
                            <span>{prog.label}</span><span>{prog.count} solved</span>
                          </div>
                          <div className={styles.progressBarBg}>
                            <motion.div
                              className={styles.progressBarFill}
                              style={{ backgroundColor: prog.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((prog.count / prog.total) * 100, 100)}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {p.customSection}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
