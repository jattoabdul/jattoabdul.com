// Hero.jsx — Homepage hero section
function Hero({ navigate }) {
  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.container}>
        <div style={heroStyles.eyebrow}>
          <span style={heroStyles.eyebrowDot}></span>
          Senior Software Engineer
        </div>
        <h1 style={heroStyles.headline}>
          Building backend, platform,<br />
          and applied&#8209;AI systems.
        </h1>
        <p style={heroStyles.subtext}>
          I write about practical engineering, AI-assisted product building,
          and communication for engineers. Notes from real builds — not tutorials.
        </p>
        <div style={heroStyles.actions}>
          <a
            href="#"
            style={heroStyles.primaryBtn}
            onClick={e => { e.preventDefault(); navigate('article', 'pipelines'); }}
          >
            Read the latest post →
          </a>
          <a
            href="#"
            style={heroStyles.secondaryBtn}
            onClick={e => { e.preventDefault(); navigate('notes'); }}
          >
            Browse notes
          </a>
        </div>
        <div style={heroStyles.pillars}>
          {['Backend Systems', 'Applied AI', 'Platform Eng', 'Engineering Communication'].map(t => (
            <span key={t} style={heroStyles.pillar}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const heroStyles = {
  section: {
    padding: '88px 40px 80px',
    borderBottom: '1px solid var(--border)',
  },
  container: {
    maxWidth: 720, margin: '0 auto',
  },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 13, fontWeight: 500, color: 'var(--fg-secondary)',
    letterSpacing: '0.02em', marginBottom: 20,
  },
  eyebrowDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: 'var(--accent)', display: 'inline-block',
  },
  headline: {
    fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400, lineHeight: 1.12, letterSpacing: '-0.02em',
    color: 'var(--fg)', marginBottom: 20,
  },
  subtext: {
    fontSize: 17, lineHeight: 1.75, color: 'var(--fg-secondary)',
    maxWidth: 560, marginBottom: 32,
  },
  actions: {
    display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40,
  },
  primaryBtn: {
    display: 'inline-flex', alignItems: 'center',
    fontSize: 15, fontWeight: 500,
    background: 'var(--accent)', color: '#fff',
    padding: '10px 20px', borderRadius: 6, textDecoration: 'none',
  },
  secondaryBtn: {
    display: 'inline-flex', alignItems: 'center',
    fontSize: 15, fontWeight: 500,
    border: '1px solid var(--border)', color: 'var(--fg-secondary)',
    padding: '10px 20px', borderRadius: 6, textDecoration: 'none',
    background: 'transparent',
  },
  pillars: {
    display: 'flex', gap: 8, flexWrap: 'wrap',
  },
  pillar: {
    fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
    background: 'var(--bg-raised)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '3px 9px', color: 'var(--fg-secondary)',
  },
};

Object.assign(window, { Hero });
