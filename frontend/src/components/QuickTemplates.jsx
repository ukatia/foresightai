'use client';

export default function QuickTemplates({ onSelectTemplate }) {
  const templates = [
    {
      icon: '🔥',
      title: 'Kitchen Fire',
      location: 'Home Kitchen',
      situation: 'Small fire started in the oven while cooking. Flames are visible but contained to the oven area.',
    },
    {
      icon: '🩹',
      title: 'Minor Injury',
      location: 'Home',
      situation: 'Cut finger while cooking. Bleeding moderately but person is conscious and alert.',
    },
    {
      icon: '💧',
      title: 'Water Leak',
      location: 'Home Bathroom',
      situation: 'Pipe burst under sink. Water flooding the bathroom floor rapidly.',
    },
    {
      icon: '⚡',
      title: 'Power Outage',
      location: 'Home',
      situation: 'Sudden power outage during storm. No electricity in the entire house.',
    },
    {
      icon: '🌪️',
      title: 'Severe Weather',
      location: 'Home',
      situation: 'Tornado warning issued for my area. Strong winds and heavy rain.',
    },
    {
      icon: '🚗',
      title: 'Car Accident',
      location: 'Highway',
      situation: 'Minor car accident. No serious injuries but vehicles are damaged.',
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Quick Start Templates</h3>
      <p style={styles.subtitle}>Select a common scenario to get started quickly</p>
      
      <div style={styles.grid}>
        {templates.map((template, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTemplate(template)}
            style={styles.card}
          >
            <span style={styles.icon}>{template.icon}</span>
            <span style={styles.cardTitle}>{template.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '20px',
    color: 'white',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
  },
  card: {
    background: 'rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    color: 'white',
  },
  icon: {
    fontSize: '32px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
  },
};
