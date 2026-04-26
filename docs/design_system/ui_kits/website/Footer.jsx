// Footer.jsx — Site footer
function Footer({ navigate }) {
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.inner}>
        <div style={footerStyles.left}>
          <a href="#" style={footerStyles.wordmark} onClick={e => { e.preventDefault(); navigate('home'); }}>
            Jatto Abdul
          </a>
          <p style={footerStyles.tagline}>
            Senior Software Engineer. Writing about backend systems, applied AI, and engineering judgment.
          </p>
          <div style={footerStyles.socials}>
            {[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'Twitter / X', href: 'https://x.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
            ].map(s => (
              <a key={s.label} href={s.href} style={footerStyles.socialLink}
                onMouseEnter={e => e.target.style.color = 'var(--fg)'}
                onMouseLeave={e => e.target.style.color = 'var(--fg-muted)'}
              >{s.label}</a>
            ))}
          </div>
        </div>
        <div style={footerStyles.links}>
          <div style={footerStyles.linkGroup}>
            <div style={footerStyles.groupLabel}>Site</div>
            {[['Writing', 'home'], ['Projects', 'home'], ['Notes', 'notes'], ['About', 'home']].map(([label, page]) => (
              <a key={label} href="#" style={footerStyles.link}
                onClick={e => { e.preventDefault(); navigate(page); }}
                onMouseEnter={e => e.target.style.color = 'var(--fg)'}
                onMouseLeave={e => e.target.style.color = 'var(--fg-secondary)'}
              >{label}</a>
            ))}
          </div>
          <div style={footerStyles.linkGroup}>
            <div style={footerStyles.groupLabel}>Topics</div>
            {['Backend Systems', 'Applied AI', 'Platform Eng', 'Career'].map(t => (
              <a key={t} href="#" style={footerStyles.link}
                onClick={e => e.preventDefault()}
                onMouseEnter={e => e.target.style.color = 'var(--fg)'}
                onMouseLeave={e => e.target.style.color = 'var(--fg-secondary)'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={footerStyles.bottom}>
        <span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>© {new Date().getFullYear()} Jatto Abdul</span>
        <span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>Built with Next.js + Tailwind</span>
      </div>
    </footer>
  );
}

const footerStyles = {
  footer: { borderTop: '1px solid var(--border)', background: 'var(--bg-raised)', padding: '48px 40px 28px' },
  inner: { maxWidth: 960, margin: '0 auto', display: 'flex', gap: 64, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 40 },
  left: { maxWidth: 280 },
  wordmark: { fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--fg)', textDecoration: 'none', display: 'block', marginBottom: 10 },
  tagline: { fontSize: 13, lineHeight: 1.65, color: 'var(--fg-secondary)', marginBottom: 16 },
  socials: { display: 'flex', gap: 14 },
  socialLink: { fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none', transition: 'color 150ms' },
  links: { display: 'flex', gap: 48 },
  linkGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
  groupLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 4 },
  link: { fontSize: 14, color: 'var(--fg-secondary)', textDecoration: 'none', transition: 'color 150ms' },
  bottom: { maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid var(--border)' },
};

Object.assign(window, { Footer });
