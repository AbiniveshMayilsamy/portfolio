import { useState, useEffect } from 'react';
import api, { cmsApi } from '../cmsApi';
import { FiSave, FiUpload, FiEdit2, FiCheck } from 'react-icons/fi';
import styles from './Admin.module.css';

const CATEGORIES = [
  { id: 'hero', label: '🎯 Hero Section' },
  { id: 'about', label: '👤 About Section' },
  { id: 'skills', label: '💻 Skills Section' },
  { id: 'projects', label: '📁 Projects' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'gallery', label: '🖼️ Gallery' },
  { id: 'faq', label: '❓ FAQs' },
  { id: 'contact', label: '✉️ Contact' },
  { id: 'footer', label: '🔻 Footer' },
  { id: 'general', label: '⚙️ General' },
  { id: 'files', label: '📄 Files (Resume)' },
];

export default function CMSTab({ token, onRefresh }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [activeCat, setActiveCat] = useState('hero');
  const [resumeFile, setResumeFile] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await api.get('/api/admin/content', { headers });
      setContent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (id, value) => {
    setContent(content.map(c => c.id === id ? { ...c, value } : c));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const items = content.filter(c => c.category === activeCat).map(c => ({
        key: c.key,
        value: c.value,
        type: c.type,
        category: c.category
      }));
      
      await cmsApi.saveBulkContent(token, items);
      setMsg('✅ Saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('❌ Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setSaving(true);
    try {
      await cmsApi.uploadResume(token, resumeFile);
      setMsg('✅ Resume uploaded!');
      setResumeFile(null);
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('❌ Upload failed');
    } finally {
      setSaving(false);
    }
  };

  const filteredContent = content.filter(c => c.category === activeCat);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.cmsTab}>
      <div className={styles.cmsHeader}>
        <h3>📝 Content Management</h3>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {msg && <p className={msg.includes('✅') ? styles.success : styles.error}>{msg}</p>}

      <div className={styles.cmsNav}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.cmsNavBtn} ${activeCat === cat.id ? styles.cmsNavActive : ''}`}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.cmsContent}>
        {activeCat === 'files' ? (
          <div className={styles.cmsSection}>
            <h4>📄 Resume File</h4>
            <p className={styles.cmsHint}>Upload a new resume PDF. It will replace the current one.</p>
            <div className={styles.cmsField}>
              <label>Choose File</label>
              <input 
                type="file" 
                accept=".pdf" 
                onChange={e => setResumeFile(e.target.files[0])} 
              />
            </div>
            {resumeFile && (
              <button className="btn btn-primary" onClick={handleResumeUpload} disabled={saving}>
                <FiUpload /> Upload Resume
              </button>
            )}
          </div>
        ) : (
          filteredContent.map(item => (
            <div key={item.id} className={styles.cmsField}>
              <label>{item.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              {item.type === 'textarea' ? (
                <textarea
                  value={item.value || ''}
                  onChange={e => updateField(item.id, e.target.value)}
                  rows={4}
                />
              ) : item.type === 'json' ? (
                <textarea
                  value={item.value || '[]'}
                  onChange={e => updateField(item.id, e.target.value)}
                  rows={4}
                  className={styles.jsonField}
                />
              ) : (
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={e => updateField(item.id, e.target.value)}
                />
              )}
              <span className={styles.cmsType}>{item.type}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}