'use client';

import { useState } from 'react';
import EmergencyInput from '../components/EmergencyInput';
import ActionPlan from '../components/ActionPlan';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [step, setStep] = useState('input'); // 'input' | 'plan'
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);

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
      setPlanData(data);
      setStep('plan');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setPlanData(null);
    setError(null);
  };

  return (
    <div style={styles.page}>
      {error && (
        <div style={styles.error}>
          ❌ {error}
          <button onClick={handleReset} style={styles.errorBtn}>Try Again</button>
        </div>
      )}

      {step === 'input' && (
        <EmergencyInput onAnalyze={handleAnalyze} loading={loading} />
      )}

      {step === 'plan' && planData && (
        <ActionPlan data={planData} onReset={handleReset} />
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
};
