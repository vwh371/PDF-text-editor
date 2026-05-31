import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard, PDFDocument } from './components/Dashboard';
import { DocViewer } from './components/DocViewer';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Poll backend health status and documents
  useEffect(() => {
    const checkStatusAndFetch = async () => {
      try {
        const res = await fetch(`${API_BASE}/status`);
        if (res.ok) {
          setIsBackendConnected(true);
          // Fetch documents
          const docsRes = await fetch(`${API_BASE}/documents`);
          if (docsRes.ok) {
            const data = await docsRes.json();
            setDocuments(data);
          }
        } else {
          setIsBackendConnected(false);
        }
      } catch (err) {
        setIsBackendConnected(false);
      }
    };

    checkStatusAndFetch();
    // Poll every 3 seconds for updates
    const interval = setInterval(checkStatusAndFetch, 3000);
    return () => clearInterval(interval);
  }, []);

  // Upload handler
  const handleUpload = async (name: string, size: string, pages: number) => {
    try {
      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, size, pages })
      });
      if (res.ok) {
        const newDoc = await res.json();
        setDocuments(prev => [newDoc, ...prev]);
      }
    } catch (err) {
      console.error('Failed to upload document', err);
    }
  };

  // PDF action trigger (OCR, Sign, Compress, etc.)
  const handleTriggerAction = async (id: string, action: string) => {
    // Optimistic local state update to processing
    setDocuments(prev => 
      prev.map(doc => doc.id === id ? { ...doc, status: 'Processing' } : doc)
    );

    try {
      const res = await fetch(`${API_BASE}/documents/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      
      if (res.ok) {
        // Refetch after 1000ms to allow backend simulation time to complete
        setTimeout(async () => {
          const docsRes = await fetch(`${API_BASE}/documents`);
          if (docsRes.ok) {
            const data = await docsRes.json();
            setDocuments(data);
          }
        }, 1000);
      }
    } catch (err) {
      console.error('Failed to trigger action', err);
    }
  };

  // Find active doc
  const activeDocument = documents.find(d => d.id === selectedDocId) || null;

  return (
    <>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isBackendConnected={isBackendConnected} 
      />

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            documents={documents}
            onUpload={handleUpload}
            onTriggerAction={handleTriggerAction}
            onSelectDoc={(id) => {
              setSelectedDocId(id);
              setActiveTab('editor');
            }}
          />
        )}

        {activeTab === 'editor' && (
          <DocViewer 
            document={activeDocument}
            onClose={() => {
              setSelectedDocId(null);
              setActiveTab('dashboard');
            }}
            onTriggerAction={handleTriggerAction}
          />
        )}

        {activeTab === 'automation' && (
          <div style={{ padding: 40, color: 'white', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h1>PDFlow Automations</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Create conditional pipelines to compress, scan, and sign documents automatically.</p>
            
            <div className="glass-panel" style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 24, background: 'rgba(22, 26, 37, 0.45)' }}>
              <h3>Active Pipeline Flowchart</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto', padding: '20px 0' }}>
                <div className="glass-panel" style={{ padding: 16, borderLeft: '4px solid var(--color-primary)', minWidth: 150 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>TRIGGER</div>
                  <div style={{ fontWeight: 'bold' }}>Document Uploaded</div>
                </div>
                
                <span style={{ color: 'var(--color-primary)' }}>➔</span>

                <div className="glass-panel" style={{ padding: 16, borderLeft: '4px solid var(--color-accent)', minWidth: 150 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>ACTION</div>
                  <div style={{ fontWeight: 'bold' }}>Run OCR Scan</div>
                </div>

                <span style={{ color: 'var(--color-primary)' }}>➔</span>

                <div className="glass-panel" style={{ padding: 16, borderLeft: '4px solid var(--color-accent)', minWidth: 150 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>ACTION</div>
                  <div style={{ fontWeight: 'bold' }}>Compress Size</div>
                </div>

                <span style={{ color: 'var(--color-primary)' }}>➔</span>

                <div className="glass-panel" style={{ padding: 16, borderLeft: '4px solid var(--color-warning)', minWidth: 150 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>DESTINATION</div>
                  <div style={{ fontWeight: 'bold' }}>Export to Cloud</div>
                </div>
              </div>
              
              <button className="glow-btn" style={{ alignSelf: 'flex-start' }} onClick={() => alert('Pipeline deployed! Add files to test autotrigger.')}>
                Deploy Pipeline
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
