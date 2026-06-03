import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiExternalLink, 
  FiAward, 
  FiCode, 
  FiGithub, 
  FiZap, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiActivity, 
  FiFileText 
} from 'react-icons/fi';
import axios from 'axios';
import styles from './CodingStats.module.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function CodingStats({ isOpen, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE}/api/coding-stats`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch coding stats:', err);
        setError('Could not load coding statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const leetcode = data?.stats?.leetcode || {};
  const codechef = data?.stats?.codechef || {};
  const codeforces = data?.stats?.codeforces || {};
  const github = data?.stats?.github || {};
  const skillrack = data?.stats?.skillrack || {};
  const hackerrank = data?.stats?.hackerrank || {};

  // Aggregated totals
  const totalSolved = 
    (parseInt(leetcode?.solved?.All) || 0) + 
    (parseInt(skillrack?.programsSolved) || 0) + 
    (parseInt(codeforces?.problemsSolved) || 0) + 
    (parseInt(codechef?.fullySolved) || 0);

  const totalCommits = github?.totalCommits || 0;
  const currentStreak = Math.max(leetcode?.streak || 0, github?.longestStreak || 0);

  const platforms = [
    {
      name: 'LeetCode',
      icon: <FiCode className={styles.leetcodeIcon} />,
      username: leetcode?.username || 'Abinivesh_Mayilsamy',
      link: `https://leetcode.com/${leetcode?.username || 'Abinivesh_Mayilsamy'}`,
      themeClass: styles.leetcodeCard,
      stats: [
        { label: 'Solved', value: `${leetcode?.solved?.All || 0} Problems` },
        { label: 'Rating', value: leetcode?.rating ? Math.round(leetcode.rating) : '1356' },
        { label: 'Global Rank', value: leetcode?.globalRanking ? leetcode.globalRanking.toLocaleString() : '807,348' },
        { label: 'Contests', value: `${leetcode?.contestCount || 2} Played` }
      ],
      progress: leetcode?.solved ? [
        { label: 'Easy', count: leetcode.solved.Easy || 0, total: 800, color: '#00b8a3' },
        { label: 'Medium', count: leetcode.solved.Medium || 0, total: 1600, color: '#ffb800' },
        { label: 'Hard', count: leetcode.solved.Hard || 0, total: 700, color: '#ff2d55' }
      ] : null
    },
    {
      name: 'GitHub',
      icon: <FiGithub className={styles.githubIcon} />,
      username: github?.username || 'AbiniveshMayilsamy',
      link: `https://github.com/${github?.username || 'AbiniveshMayilsamy'}`,
      themeClass: styles.githubCard,
      stats: [
        { label: 'Commits', value: github?.totalCommits || '486' },
        { label: 'Repositories', value: github?.totalRepos || '16' },
        { label: 'Stars Earned', value: github?.stars || '39' },
        { label: 'Longest Streak', value: `${github?.longestStreak || 6} Days` }
      ]
    },
    {
      name: 'SkillRack',
      icon: <FiAward className={styles.skillrackIcon} />,
      username: 'ABINIVESH M',
      link: skillrack?.username || '#',
      themeClass: styles.skillrackCard,
      stats: [
        { label: 'Solved', value: `${skillrack?.programsSolved || 333} Progs` },
        { label: 'Rank', value: skillrack?.rank ? skillrack.rank.toLocaleString() : '89,713' },
        { label: 'Certificates', value: `${skillrack?.certificateCount || 4} Verified` },
        { label: 'Languages', value: `${skillrack?.languageCount || 14} Used` }
      ],
      customSection: skillrack?.certificates?.length > 0 ? (
        <div className={styles.certificatesList}>
          <span className={styles.certTitle}>Latest Certifications:</span>
          {skillrack.certificates.slice(0, 2).map((cert, idx) => (
            <a key={idx} href={cert.link} target="_blank" rel="noreferrer" className={styles.certLink}>
              <FiFileText /> <span>{cert.title}</span>
            </a>
          ))}
        </div>
      ) : null
    },
    {
      name: 'Codeforces',
      icon: <FiZap className={styles.codeforcesIcon} />,
      username: codeforces?.username || 'Abinivesh_M_CSE_SECE',
      link: `https://codeforces.com/profile/${codeforces?.username || 'Abinivesh_M_CSE_SECE'}`,
      themeClass: styles.codeforcesCard,
      stats: [
        { label: 'Rating', value: codeforces?.rating || '687' },
        { label: 'Max Rating', value: codeforces?.maxRating || '687' },
        { label: 'Rank', value: codeforces?.rank || 'Newbie' },
        { label: 'Solved', value: `${codeforces?.problemsSolved || 2} Problems` }
      ]
    },
    {
      name: 'CodeChef',
      icon: <FiActivity className={styles.codechefIcon} />,
      username: codechef?.username || 'abinivesh_m',
      link: `https://www.codechef.com/users/${codechef?.username || 'abinivesh_m'}`,
      themeClass: styles.codechefCard,
      stats: [
        { label: 'Rating', value: `${codechef?.rating || 625}` },
        { label: 'Division Rank', value: codechef?.stars || '1★' },
        { label: 'Global Rank', value: codechef?.globalRank ? codechef.globalRank.toLocaleString() : '213,176' },
        { label: 'Solved', value: `${codechef?.fullySolved || 8} Problems` }
      ]
    },
    {
      name: 'HackerRank',
      icon: <FiCheckCircle className={styles.hackerrankIcon} />,
      username: hackerrank?.username || 'abiniveshmayils1',
      link: `https://www.hackerrank.com/profile/${hackerrank?.username || 'abiniveshmayils1'}`,
      themeClass: styles.hackerrankCard,
      stats: [
        { label: 'Status', value: 'Verified' },
        { label: 'Key Credentials', value: 'SQL (Intermediate)' },
        { label: 'Advanced', value: 'SQL (Advanced)' },
        { label: 'Badges', value: 'Algorithms & Java' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={styles.modal}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradients */}
          <div className={styles.radialGlow1} />
          <div className={styles.radialGlow2} />

          {/* Close button */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close stats">
            <FiX />
          </button>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowBar} />
              <span>LIVE TRACKING</span>
              <span className={styles.eyebrowTag}>[CODING]</span>
            </div>
            <h2 className={styles.title}>Coding Profile &amp; <em>Statistics</em></h2>
            <p className={styles.description}>
              Live dashboard synchronized with competitive programming platforms and version control handles.
            </p>
          </div>

          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner} />
              <p>Fetching metrics from coding handles...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <span className={styles.errorIcon}>⚠️</span>
              <h3>Failed to load metrics</h3>
              <p>{error}</p>
              <button className="btn shiny-cta compact" onClick={onClose}>
                <span>Close</span>
              </button>
            </div>
          ) : (
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

              {/* Grid of platforms */}
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
                      <a href={p.link} target="_blank" rel="noreferrer" className={styles.extLink} aria-label={`View ${p.name} profile`}>
                        <FiExternalLink />
                      </a>
                    </div>

                    {/* Stats Grid */}
                    <div className={styles.cardStats}>
                      {p.stats.map((s, i) => (
                        <div key={i} className={styles.statBox}>
                          <span className={styles.statBoxLabel}>{s.label}</span>
                          <span className={styles.statBoxVal}>{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* LeetCode Solved Progress */}
                    {p.progress && (
                      <div className={styles.progressContainer}>
                        <span className={styles.progressHeader}>Difficulty Breakdown:</span>
                        {p.progress.map((prog, i) => (
                          <div key={i} className={styles.progressItem}>
                            <div className={styles.progressLabels}>
                              <span>{prog.label}</span>
                              <span>{prog.count} solved</span>
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

                    {/* SkillRack Certificates */}
                    {p.customSection}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
