/* Header / Footer / Command menu */

const NAV_LINKS = [
  ['Writing', 'writing'],
  ['Notes', 'notes'],
  ['Projects', 'projects'],
  ['Videos', 'videos'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

function Header({ page, navigate, dark, toggleDark, openCmd }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const linkStyle = (p) => ({
    fontSize: 13.5, fontWeight: 500,
    padding: '6px 10px', borderRadius: 6,
    color: page === p ? 'var(--accent)' : 'var(--fg-2)',
    textDecoration: 'none', cursor: 'pointer',
    transition: 'color 120ms, background 120ms',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1024, margin: '0 auto',
        padding: '0 24px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" onClick={e => { e.preventDefault(); navigate('home'); setMobileOpen(false); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            color: 'var(--fg)', textDecoration: 'none',
          }}>
          <span style={{
            width: 24, height: 24, borderRadius: 6,
            background: 'var(--fg)', color: 'var(--bg)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>j</span>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 400,
            letterSpacing: '-0.01em', whiteSpace: 'nowrap',
          }}>Jatto Abdul</span>
        </a>

        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {NAV_LINKS.map(([label, p]) => (
            <a key={p} href="#" style={linkStyle(p)}
              onClick={e => { e.preventDefault(); navigate(p); }}
              onMouseEnter={e => { if (page !== p) { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--bg-raised)'; } }}
              onMouseLeave={e => { e.currentTarget.style.color = page === p ? 'var(--accent)' : 'var(--fg-2)'; e.currentTarget.style.background = 'transparent'; }}>
              {label}
            </a>
          ))}
          <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 10px' }} />
          <button onClick={openCmd} title="Search (⌘K)"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 9px', borderRadius: 6,
              background: 'var(--bg-raised)', border: '1px solid var(--border)',
              color: 'var(--fg-3)', fontSize: 12, cursor: 'pointer',
              transition: 'border-color 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <Icon name="search" size={13} />
            <kbd style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>⌘K</kbd>
          </button>
          <button onClick={toggleDark} title="Toggle theme"
            style={{
              marginLeft: 4, padding: 7, borderRadius: 6,
              background: 'none', border: 'none',
              color: 'var(--fg-3)', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-3)'}>
            <Icon name={dark ? 'sun' : 'moon'} size={16} />
          </button>
        </nav>

        <button className="nav-mobile-btn" onClick={() => setMobileOpen(v => !v)}
          style={{
            display: 'none', padding: 8, borderRadius: 6,
            background: 'none', border: 'none',
            color: 'var(--fg)', cursor: 'pointer',
          }}>
          <Icon name={mobileOpen ? 'x' : 'menu'} size={20} />
        </button>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '8px 24px 16px' }}>
          {NAV_LINKS.map(([label, p]) => (
            <a key={p} href="#"
              onClick={e => { e.preventDefault(); navigate(p); setMobileOpen(false); }}
              style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                fontSize: 15, fontWeight: 500,
                color: page === p ? 'var(--accent)' : 'var(--fg)',
                textDecoration: 'none',
              }}>{label}</a>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={() => { toggleDark(); }}
              style={{
                fontSize: 13, padding: '8px 14px', borderRadius: 6,
                background: 'var(--bg-raised)', border: '1px solid var(--border)',
                color: 'var(--fg-2)', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
              <Icon name={dark ? 'sun' : 'moon'} size={13} /> {dark ? 'Light' : 'Dark'} mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function CommandMenu({ open, onClose, navigate, setArticle }) {
  const { POSTS } = window.SITE_DATA;
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) { setQ(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  if (!open) return null;

  const navItems = NAV_LINKS.map(([label, p]) => ({
    group: 'Navigate', label, icon: 'hash',
    action: () => { navigate(p); onClose(); }
  }));
  const homeItem = { group: 'Navigate', label: 'Home', icon: 'hash', action: () => { navigate('home'); onClose(); } };
  const postItems = POSTS.map(p => ({
    group: 'Writing', label: p.title, icon: p.source === 'medium' ? 'arrowUpRight' : 'fileText', meta: p.cat,
    action: () => { if (p.source === 'medium') { window.open(p.mediumUrl, '_blank'); } else { setArticle(p.slug); navigate('article'); } onClose(); }
  }));
  const all = [homeItem, ...navItems, ...postItems];
  const filtered = q.trim()
    ? all.filter(i => i.label.toLowerCase().includes(q.toLowerCase()) || (i.meta || '').toLowerCase().includes(q.toLowerCase()))
    : all;
  const grouped = filtered.reduce((acc, i) => ((acc[i.group] = acc[i.group] || []).push(i), acc), {});

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: '14vh',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 540, margin: '0 16px',
        background: 'var(--bg-surface)', border: '1px solid var(--border-mid)',
        borderRadius: 14, boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <Icon name="search" size={16} color="var(--fg-3)" />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search pages, posts, projects…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 15, color: 'var(--fg)', fontFamily: 'var(--sans)',
            }} />
          <kbd style={{
            fontSize: 11, color: 'var(--fg-3)',
            background: 'var(--bg-raised)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 6px', fontFamily: 'var(--mono)',
          }}>esc</kbd>
        </div>
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: '4px 0 8px' }}>
          {Object.keys(grouped).length === 0 ? (
            <div style={{ padding: '36px 18px', textAlign: 'center', fontSize: 14, color: 'var(--fg-3)' }}>No results for "{q}"</div>
          ) : Object.entries(grouped).map(([g, items]) => (
            <div key={g}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '12px 18px 4px', fontFamily: 'var(--mono)' }}>{g}</div>
              {items.map((item, i) => (
                <button key={i} onClick={item.action}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '9px 18px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 100ms',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-raised)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <Icon name={item.icon} size={15} color="var(--fg-3)" />
                  <span style={{ flex: 1, fontSize: 14, color: 'var(--fg)' }}>{item.label}</span>
                  {item.meta && <span style={{ fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{item.meta}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', display: 'flex', gap: 16, background: 'var(--bg-raised)' }}>
          {[['↑↓', 'navigate'], ['↵', 'open'], ['esc', 'close']].map(([k, l]) => (
            <span key={k} style={{ fontSize: 11, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <kbd style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 5px', fontFamily: 'var(--mono)', fontSize: 10.5 }}>{k}</kbd> {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  const { SOCIAL } = window.SITE_DATA;
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-raised)',
      padding: '52px 24px 28px',
      marginTop: 60,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 48, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 36 }}>
          <div style={{ maxWidth: 280 }}>
            <a href="#" onClick={e => { e.preventDefault(); navigate('home'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                color: 'var(--fg)', textDecoration: 'none', marginBottom: 12,
              }}>
              <span style={{
                width: 22, height: 22, borderRadius: 5,
                background: 'var(--fg)', color: 'var(--bg)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--serif)', fontSize: 13,
              }}>j</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 400 }}>Jatto Abdul</span>
            </a>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: 16 }}>
              Senior software engineer. Writing about backend, platform, and applied-AI systems — and the engineering judgment around them.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['github', SOCIAL.github], ['twitter', SOCIAL.x], ['linkedin', SOCIAL.linkedin], ['youtube', SOCIAL.youtube], ['rss', '#']].map(([icon, href]) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--fg-3)', display: 'flex', transition: 'color 120ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-3)'}
                  aria-label={icon}>
                  <Icon name={icon} size={16} />
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[
              ['Site', [['Writing', 'writing'], ['Notes', 'notes'], ['Projects', 'projects'], ['Videos', 'videos']]],
              ['More', [['About', 'about'], ['Contact', 'contact'], ['Newsletter', 'contact'], ['RSS', null]]],
              ['Topics', [['Backend', null], ['Applied AI', null], ['Platform', null], ['Career', null]]],
            ].map(([grp, lnks]) => (
              <div key={grp} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4, fontFamily: 'var(--mono)' }}>{grp}</div>
                {lnks.map(([l, p]) => (
                  <a key={l} href="#"
                    onClick={e => { e.preventDefault(); if (p) navigate(p); }}
                    style={{ fontSize: 13.5, color: 'var(--fg-2)', textDecoration: 'none' }}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 20, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>© 2026 Jatto Abdul · jattoabdul.com</span>
          <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>Built with Next.js + MDX</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, CommandMenu, Footer, NAV_LINKS });
