// ProjectCard.jsx — Project card component
function ProjectCard({ title, desc, tags, icon }) {
  const icons = {
    layers: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    terminal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...pcStyles.card,
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)' : '0 1px 3px rgba(0,0,0,0.06)',
        borderColor: hovered ? 'var(--border-mid)' : 'var(--border)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={pcStyles.iconWrap}>{icons[icon]}</div>
      <h3 style={pcStyles.title}>{title}</h3>
      <p style={pcStyles.desc}>{desc}</p>
      <div style={pcStyles.tags}>
        {tags.map(t => (
          <span key={t} style={pcStyles.tag}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const pcStyles = {
  card: {
    background: 'var(--bg-surface)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '20px 22px',
    transition: 'box-shadow 150ms, border-color 150ms',
    cursor: 'pointer',
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: 8,
    background: 'var(--bg-accent)', border: '1px solid var(--accent-medium)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 15, fontWeight: 600, color: 'var(--fg)', marginBottom: 6, lineHeight: 1.3 },
  desc:  { fontSize: 13, lineHeight: 1.6, color: 'var(--fg-secondary)', marginBottom: 14 },
  tags:  { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tag:   { fontSize: 11, background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 7px', color: 'var(--fg-secondary)' },
};

Object.assign(window, { ProjectCard });
