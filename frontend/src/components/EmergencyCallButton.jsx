'use client';

import { useState } from 'react';

export default function EmergencyCallButton() {
  const [showMenu, setShowMenu] = useState(false);

  const emergencyNumbers = [
    { name: '911 - Emergency', number: '911', icon: '🚨' },
    { name: 'Poison Control', number: '1-800-222-1222', icon: '☠️' },
    { name: 'Suicide Prevention', number: '988', icon: '💙' },
    { name: 'Red Cross', number: '1-800-733-2767', icon: '🏥' },
  ];

  const handleCall = (number) => {
    // Use tel: protocol to initiate call on mobile devices
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      {/* Floating Emergency Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={styles.floatingButton}
        aria-label="Emergency Call"
      >
        📞
      </button>

      {/* Emergency Numbers Menu */}
      {showMenu && (
        <>
          <div style={styles.overlay} onClick={() => setShowMenu(false)} />
          <div style={styles.menu}>
            <div style={styles.menuHeader}>
              <h3 style={styles.menuTitle}>Emergency Contacts</h3>
              <button onClick={() => setShowMenu(false)} style={styles.closeBtn}>
                ✕
              </button>
            </div>
            
            <div style={styles.menuContent}>
              {emergencyNumbers.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCall(contact.number)}
                  style={styles.contactButton}
                >
                  <span style={styles.contactIcon}>{contact.icon}</span>
                  <div style={styles.contactInfo}>
                    <div style={styles.contactName}>{contact.name}</div>
                    <div style={styles.contactNumber}>{contact.number}</div>
                  </div>
                  <span style={styles.callIcon}>📱</span>
                </button>
              ))}
            </div>

            <div style={styles.menuFooter}>
              <p style={styles.footerText}>
                Tap any number to call immediately
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    border: '4px solid white',
    fontSize: '32px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'pulse 2s infinite',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
  },
  menu: {
    position: 'fixed',
    bottom: '120px',
    right: '30px',
    width: '320px',
    maxWidth: 'calc(100vw - 60px)',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    zIndex: 1002,
    overflow: 'hidden',
  },
  menuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    color: 'white',
  },
  menuTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  contactIcon: {
    fontSize: '32px',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  contactNumber: {
    fontSize: '14px',
    color: '#666',
  },
  callIcon: {
    fontSize: '24px',
  },
  menuFooter: {
    padding: '16px',
    background: '#f8f9fa',
    borderTop: '1px solid #e9ecef',
  },
  footerText: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
  },
};
