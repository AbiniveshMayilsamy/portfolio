import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillGroups = [
  {
    category: 'Cloud & DevOps',
    skills: ['AWS', 'Azure', 'Cloud Computing', 'Linux', 'Git', 'GitHub']
  },
  {
    category: 'Web Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'HTML5', 'CSS3', 'Bootstrap']
  },
  {
    category: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C', 'C++', '.NET']
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'MySQL', 'REST APIs', 'Mongoose']
  },
  {
    category: 'AI / ML',
    skills: ['TensorFlow', 'OpenCV', 'RNN Models', 'Computer Vision', 'ML Pipelines']
  },
  {
    category: 'Design & Tools',
    skills: ['Blender', 'Adobe After Effects', 'Postman', 'VS Code', 'WordPress', 'Strapi']
  }
];

export default function Skills() {
  return (
    <section className={`section ${styles.skillsSection}`} id="skills">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <div className="section-header-inner">
            <span className="section-header-line" />
            <span className="section-header-text">The Tech Stack</span>
            <span className="section-header-line right" />
          </div>
        </div>

        <div className={styles.grid}>
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className={styles.category}>{group.category}</h3>
              <div className={styles.tags}>
                {group.skills.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
