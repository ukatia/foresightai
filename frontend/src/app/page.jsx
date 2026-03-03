'use client';

import { useState } from 'react';
import EmergencyInput from '../components/EmergencyInput';
import ActionPlan from '../components/ActionPlan';
import QuickTemplates from '../components/QuickTemplates';
import SharePlan from '../components/SharePlan';
import ResponseTime from '../components/ResponseTime';
import EmergencyCallButton from '../components/EmergencyCallButton';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [step, setStep] = useState('input'); // 'input' | 'plan'
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [responseTime, setResponseTime] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      const endTime = Date.now();
      
      setPlanData(data);
      setResponseTime({ start: startTime, end: endTime });
      setHistory(prev => [...prev, { ...data, timestamp: new Date(), input: formData }]);
      setStep('plan');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    // Auto-fill form with template data
    handleAnalyze({
      location: template.location,
      situation: template.situation,
      photo_description: null,
    });
  };

  const handleReset = () => {
    setStep('input');
    setPlanData(null);
    setError(null);
    setResponseTime(null);
  };

  const handleViewHistory = (item) => {
    setPlanData(item);
    setResponseTime(null);
    setStep('plan');
  };

  return (
    <div style={styles.page}>
      {/* Floating Emergency Call Button - Always Visible */}
      <EmergencyCallButton />

      {error && (
        <div style={styles.error}>
          ❌ {error}
          <button onClick={handleReset} style={styles.errorBtn}>Try Again</button>
        </div>
      )}

      {step === 'input' && (
        <>
          <QuickTemplates onSelectTemplate={handleTemplateSelect} />
          <EmergencyInput onAnalyze={handleAnalyze} loading={loading} />
          
          {history.length > 0 && (
            <div style={styles.history}>
              <h3 style={styles.historyTitle}>📜 Recent Analyses</h3>
              <div style={styles.historyList}>
                {history.slice(-3).reverse().map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleViewHistory(item)}
                    style={styles.historyItem}
                  >
                    <span style={styles.historyIcon}>
                      {item.risk_level === 'CRITICAL' ? '🔴' : 
                       item.risk_level === 'HIGH' ? '🟠' :
                       item.risk_level === 'MODERATE' ? '🟡' : '🟢'}
                    </span>
                    <div style={styles.historyContent}>
                      <div style={styles.historyLocation}>{item.input.location}</div>
                      <div style={styles.historyTime}>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {step === 'plan' && planData && (
        <>
          {responseTime && (
            <ResponseTime startTime={responseTime.start} endTime={responseTime.end} />
          )}
          <ActionPlan data={planData} onReset={handleReset} />
          <SharePlan data={planData} />
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  error: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '16px',
    background: '#fff',
    color: '#667eea',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
  },
  errorBtn: {
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  history: {
    maxWidth: '700px',
    margin: '30px auto 0',
    padding: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
  },
  historyTitle: {
    color: 'white',
    fontSize: '18px',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  historyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white',
    textAlign: 'left',
  },
  historyIcon: {
    fontSize: '24px',
  },
  historyContent: {
    flex: 1,
  },
  historyLocation: {
    fontSize: '14px',
    fontWeight: '600',
  },
  historyTime: {
    fontSize: '12px',
    opacity: 0.8,
  },
};
