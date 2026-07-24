import { useState, useEffect, useRef } from 'react';
import api from '../api';
import { FiUpload, FiTrash2, FiLogOut, FiFile, FiMail, FiImage, FiPlus, FiX } from 'react-icons/fi';
import styles from './Admin.module.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

const CATEGORIES = [
  { value: 'event', label: '🎪 Event' },
  { value: 'prize', label: '🏆 Prize Won' },
  { value: 'photo', label: '📸 Photo' },
];

export default function AdminDashboard({ token, onLogout }) {
  const [tab, setTab] = useState('gallery');
  const [gallery, setGallery] = useState([]);
  const [files, setFiles] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Gallery upload state
  const [gTitle, setGTitle] = useState('');
  const [gDesc, setGDesc] = useState('');
  const [gCat, setGCat] = useState('event');
  const [gFile, setGFile] = useState(null);
  const [gPreview, setGPreview] = useState(null);
  const [gMsg, setGMsg] = useState('');
  const [gUploading, setGUploading] = useState(false);
  const gFileRef = useRef();

  // File upload state
  const [fDesc, setFDesc] = useState('');
  const [fFile, setFFile] = useState(null);
  const [fMsg, setFMsg] = useState('');
  const [fUploading, setFUploading] = useState(false);
  const fFileRef = useRef();

  const [filterCat, setFilterCat] = useState('all');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    const [g, f, c] = await Promise.all([
      api.get('/api/admin/gallery', { headers }),
      api.get('/api/admin/uploads', { headers }),
      api.get('/api/admin/contacts', { headers }),
    ]);
    setGallery(g.data);
    setFiles(f.data);
    setContacts(c.data);
  };

  useEffect(() => { fetchAll(); }, []);

  // Image preview on select
  const handleGFileChange = e => {
    const file = e.target.files[0];
    setGFile(file);
    if (file) setGPreview(URL.createObjectURL(file));
  };

  const clearGForm = () => {
    setGTitle(''); setGDesc(''); setGCat('event');
    setGFile(null); setGPreview(null);
    if (gFileRef.current) gFileRef.current.value = '';
  };

  const handleGUpload = async e => {
    e.preventDefault();
    if (!gFile) return;
    setGUploading(true); setGMsg('');
    const form = new FormData();
    form.append('image', gFile);
    form.append('title', gTitle);
    form.append('description', gDesc);
    form.append('category', gCat);
    try {
      await api.post('/api/admin/gallery', form, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      setGMsg('✅ Uploaded!');
      clearGForm();
      fetchAll();
    } catch {
      setGMsg('❌ Upload failed');
    } finally {
      setGUploading(false);
    }
  };

  const handleGDelete = async id => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/api/admin/gallery/${id}`, { headers });
      fetchAll();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleFUpload = async e => {
    e.preventDefault();
    if (!fFile) return;
    setFUploading(true); setFMsg('');
    const form = new FormData();
    form.append('file', fFile);
    form.append('description', fDesc);
    try {
      await api.post('/api/admin/upload', form, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      setFMsg('✅ Uploaded!');
      setFDesc(''); setFFile(null);
      if (fFileRef.current) fFileRef.current.value = '';
      fetchAll();
    } catch {
      setFMsg('❌ Upload failed');
    } finally {
      setFUploading(false);
    }
  };

  const handleFDelete = async id => {
    if (!confirm('Delete this file?')) return;
    try {
      await api.delete(`/api/admin/uploads/${id}`, { headers });
      fetchAll();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const formatSize = b => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

  const filteredGallery = filterCat === 'all' ? gallery : gallery.filter(g => g.category === filterCat);

  return (
    <div className={styles.dashboard}>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.logo}>AM<span>.</span></span>
          <h2>CMS Admin Panel</h2>
        </div>
        <button className="btn btn-outline" onClick={onLogout}><FiLogOut /> Logout</button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard} onClick={() => setTab('gallery')}>
          <FiImage size={22} />
          <div><p className={styles.statNum}>{gallery.length}</p><p className={styles.statLabel}>Gallery Items</p></div>
        </div>
        <div className={styles.statCard} onClick={() => setTab('files')}>
          <FiFile size={22} />
          <div><p className={styles.statNum}>{files.length}</p><p className={styles.statLabel}>Files</p></div>
        </div>
        <div className={styles.statCard} onClick={() => setTab('contacts')}>
          <FiMail size={22} />
          <div><p className={styles.statNum}>{contacts.length}</p><p className={styles.statLabel}>Messages</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={tab === 'gallery' ? styles.activeTab : ''} onClick={() => setTab('gallery')}>
          <FiImage /> Gallery
        </button>
        <button className={tab === 'files' ? styles.activeTab : ''} onClick={() => setTab('files')}>
          <FiFile /> Files
        </button>
        <button className={tab === 'contacts' ? styles.activeTab : ''} onClick={() => setTab('contacts')}>
          <FiMail /> Messages {contacts.length > 0 && <span className={styles.badge}>{contacts.length}</span>}
        </button>
      </div>

      {/* ── GALLERY TAB ── */}
      {tab === 'gallery' && (
        <>
          {/* Upload Form */}
          <form className={styles.cmsForm} onSubmit={handleGUpload}>
            <h3><FiPlus /> Add New Gallery Item</h3>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label>Category</label>
                <div className={styles.catBtns}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.value}
                      type="button"
                      className={`${styles.catBtn} ${gCat === c.value ? styles.catActive : ''}`}
                      onClick={() => setGCat(c.value)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Won 1st Prize at Hackathon 2024"
                  value={gTitle}
                  onChange={e => setGTitle(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formCol}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={gDesc}
                  onChange={e => setGDesc(e.target.value)}
                />
              </div>
            </div>

            {/* Drag & Drop Image Upload */}
            <div
              className={`${styles.dropZone} ${gPreview ? styles.dropZoneHasImage : ''}`}
              onClick={() => gFileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { setGFile(f); setGPreview(URL.createObjectURL(f)); } }}
            >
              {gPreview ? (
                <div className={styles.previewWrap}>
                  <img src={gPreview} alt="preview" className={styles.preview} />
                  <button type="button" className={styles.clearPreview} onClick={e => { e.stopPropagation(); clearGForm(); }}>
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className={styles.dropContent}>
                  <FiUpload size={32} />
                  <p>Drag & drop image here or <span>click to browse</span></p>
                  <p className={styles.dropHint}>PNG, JPG, WEBP supported</p>
                </div>
              )}
              <input ref={gFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleGFileChange} />
            </div>

            {gMsg && <p className={gMsg.includes('✅') ? styles.success : styles.error}>{gMsg}</p>}
            <button type="submit" className="btn btn-primary" disabled={gUploading || !gFile}>
              <FiUpload /> {gUploading ? 'Uploading...' : 'Upload to Gallery'}
            </button>
          </form>

          {/* Gallery Grid */}
          <div className={styles.gallerySection}>
            <div className={styles.galleryHeader}>
              <h3>Gallery ({gallery.length})</h3>
              <div className={styles.filterBtns}>
                {['all', 'event', 'prize', 'photo'].map(c => (
                  <button
                    key={c}
                    className={`${styles.filterBtn} ${filterCat === c ? styles.filterActive : ''}`}
                    onClick={() => setFilterCat(c)}
                  >
                    {c === 'all' ? 'All' : c === 'event' ? '🎪 Events' : c === 'prize' ? '🏆 Prizes' : '📸 Photos'}
                  </button>
                ))}
              </div>
            </div>

            {filteredGallery.length === 0 && <p className={styles.empty}>No items in this category yet.</p>}

            <div className={styles.galleryGrid}>
              {filteredGallery.map(item => (
                <div key={item._id || item.id} className={styles.galleryCard}>
                  <div className={styles.galleryImgWrap}>
                    <img 
                      src={item.filename.startsWith('http') 
                        ? item.filename 
                        : `${API_BASE}${item.filename}`} 
                      alt={item.title} 
                      className={styles.galleryImg} 
                    />
                    <span className={styles.galleryCat}>
                      {item.category === 'event' ? '🎪' : item.category === 'prize' ? '🏆' : '📸'}
                    </span>
                    <button className={styles.galleryDelete} onClick={() => handleGDelete(item._id || item.id)}>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                  <div className={styles.galleryInfo}>
                    <p className={styles.galleryTitle}>{item.title}</p>
                    {item.description && <p className={styles.galleryDesc}>{item.description}</p>}
                    <p className={styles.fileMeta}>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── FILES TAB ── */}
      {tab === 'files' && (
        <>
          <form className={styles.cmsForm} onSubmit={handleFUpload}>
            <h3><FiPlus /> Upload File</h3>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label>File *</label>
                <input ref={fFileRef} type="file" onChange={e => setFFile(e.target.files[0])} required />
              </div>
              <div className={styles.formCol}>
                <label>Description</label>
                <input type="text" placeholder="What is this file?" value={fDesc} onChange={e => setFDesc(e.target.value)} />
              </div>
            </div>
            {fMsg && <p className={fMsg.includes('✅') ? styles.success : styles.error}>{fMsg}</p>}
            <button type="submit" className="btn btn-primary" disabled={fUploading}>
              <FiUpload /> {fUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>

          <div className={styles.listSection}>
            <h3>Uploaded Files ({files.length})</h3>
            {files.length === 0 && <p className={styles.empty}>No files uploaded yet.</p>}
            {files.map(f => (
              <div key={f.id} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <a href={f.filename.startsWith('http') ? f.filename : `${API_BASE}/uploads/${f.filename}`} target="_blank" rel="noreferrer" className={styles.fileName}>
                    {f.originalName}
                  </a>
                  {f.description && <p className={styles.fileDesc}>{f.description}</p>}
                  <span className={styles.fileMeta}>{formatSize(f.size)} · {new Date(f.createdAt).toLocaleDateString()}</span>
                </div>
                <button className={styles.deleteBtn} onClick={() => handleFDelete(f.id)}><FiTrash2 /></button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── CONTACTS TAB ── */}
      {tab === 'contacts' && (
        <div className={styles.listSection}>
          <h3>Contact Messages ({contacts.length})</h3>
          {contacts.length === 0 && <p className={styles.empty}>No messages yet.</p>}
          {contacts.map(c => (
            <div key={c.id} className={styles.contactItem}>
              <div className={styles.contactHeader}>
                <strong>{c.name}</strong>
                <span>{c.email}</span>
                <span className={styles.fileMeta}>{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <p>{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


