// Header.jsx — Site navigation header
const { useState } = React;

function Header({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Writing', page: 'home' },
    { label: 'Projects', page: 'home' },
    { label: 'Notes', page: 'notes' },
    { label: 'About', page: 'home' },
  ];

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.inner}>
        <a
          href="#"
          style={headerStyles.wordmark}
          onClick={e => { e.preventDefault(); navigate('home'); }}
        >
          Jatto Abdul
        </a>

        {/* Desktop nav */}
        <nav style={headerStyles.desktopNav}>
          {navLinks.map(({ label, page }) => (
            <a
              key={label}
              href="#"
              style={{
                ...headerStyles.navLink,
                color: currentPage === page && label === 'Writing' ? 'var(--accent)' : 'var(--fg-secondary)',
              }}
              onClick={e => { e.preventDefault(); navigate(page); }}
              onMouseEnter={e => { e.target.style.color = 'var(--fg)'; e.target.style.background = 'var(--bg-raised)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--fg-secondary)'; e.target.style.background = 'transparent'; }}
            >
              {label}
            </a>
          ))}
          <a href="#" style={headerStyles.ctaBtn} onClick={e => e.preventDefault()}>
            Subscribe
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          style={headerStyles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ ...headerStyles.bar, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
          <span style={{ ...headerStyles.bar, opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ ...headerStyles.bar, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={headerStyles.mobileMenu}>
          {navLinks.map(({ label, page }) => (
            <a
              key={label}
              href="#"
              style={headerStyles.mobileLink}
              onClick={e => { e.preventDefault(); navigate(page); setMenuOpen(false); }}
            >
              {label}
            </a>
          ))}
          <a href="#" style={{ ...headerStyles.ctaBtn, marginTop: 8, display: 'block', textAlign: 'center' }} onClick={e => e.preventDefault()}>
            Subscribe
          </a>
        </div>
      )}
    </header>
  );
}

const headerStyles = {
  header: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(250,250,248,0.92)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: 1024, margin: '0 auto',
    padding: '0 40px', height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  wordmark: {
    fontFamily: 'var(--font-serif)', fontSize: 19,
    color: 'var(--fg)', textDecoration: 'none', letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  },
  desktopNav: {
    display: 'flex', alignItems: 'center', gap: 2,
  },
  navLink: {
    fontSize: 14, fontWeight: 500,
    padding: '6px 10px', borderRadius: 4,
    textDecoration: 'none', transition: 'color 150ms, background 150ms',
    background: 'transparent',
  },
  ctaBtn: {
    marginLeft: 10, fontSize: 13, fontWeight: 500,
    background: 'var(--accent)', color: '#fff',
    padding: '7px 14px', borderRadius: 6, textDecoration: 'none',
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: 4,
    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  },
  bar: {
    display: 'block', width: 22, height: 2,
    background: 'var(--fg-secondary)', borderRadius: 2,
    transition: 'transform 200ms, opacity 200ms',
  },
  mobileMenu: {
    padding: '16px 24px 20px',
    borderTop: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', gap: 2,
  },
  mobileLink: {
    fontSize: 15, fontWeight: 500, color: 'var(--fg-secondary)',
    textDecoration: 'none', padding: '8px 4px',
    borderBottom: '1px solid var(--border)',
  },
};

Object.assign(window, { Header });
