/* Home page sections + reusable cards */

function Hero({ navigate, setArticle, variant, terminalCopy }) {
  const { POSTS } = window.SITE_DATA;
  if (variant === 'minimal') return <HeroMinimal navigate={navigate} setArticle={setArticle} />;
  if (variant === 'reading') return <HeroReading navigate={navigate} setArticle={setArticle} />;
  if (variant === 'terminal') return <HeroTerminal navigate={navigate} copy={terminalCopy} />;
  return <HeroEditorial navigate={navigate} setArticle={setArticle} />;
}

function HeroEditorial({ navigate, setArticle }) {
  return (
    <section style={{ padding: '88px 24px 72px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
          padding: '4px 12px 4px 9px',
          background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
          borderRadius: 9999,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--mono)' }}>Senior Software Engineer · open to staff roles</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.4rem, 5.4vw, 3.5rem)',
          fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.028em',
          color: 'var(--fg)', marginBottom: 22, textWrap: 'balance',
        }}>
          Building backend, platform,<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>and applied&#8209;AI systems.</span>
        </h1>

        <p style={{ fontSize: 17.5, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: '54ch', marginBottom: 36 }}>
          I'm Jatto. I write about practical engineering, AI-assisted product building, and communication for engineers — notes from real builds, not tutorials.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate('writing'); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 600,
              background: 'var(--accent)', color: 'var(--fg-on-accent)',
              padding: '11px 20px', borderRadius: 8,
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>Read writing <Icon name="arrowRight" size={14} color="var(--fg-on-accent)" /></a>
          <a href="#" onClick={e => { e.preventDefault(); navigate('videos'); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 500,
              border: '1px solid var(--border-mid)', color: 'var(--fg-2)',
              padding: '11px 20px', borderRadius: 8,
              textDecoration: 'none',
            }}>Watch videos</a>
          <a href="#" onClick={e => { e.preventDefault(); navigate('projects'); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 500,
              border: '1px solid var(--border-mid)', color: 'var(--fg-2)',
              padding: '11px 20px', borderRadius: 8,
              textDecoration: 'none',
            }}>View projects</a>
          <a href="#" onClick={e => { e.preventDefault(); navigate('contact'); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 500,
              color: 'var(--fg-3)',
              padding: '11px 14px',
              textDecoration: 'none',
            }}>Resume / contact <Icon name="arrowUpRight" size={13} color="var(--fg-3)" /></a>
        </div>
      </div>
    </section>
  );
}

function HeroMinimal({ navigate, setArticle }) {
  const { POSTS, fmtDate } = window.SITE_DATA;
  const recent = POSTS.slice(0, 3);
  return (
    <section style={{ padding: '88px 24px 56px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.015em', marginBottom: 14 }}>
          Jatto Abdul
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: '54ch', marginBottom: 40 }}>
          Senior software engineer building backend, platform, and applied-AI systems. Currently writing notes from real builds.
        </p>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Recent</SectionLabel>
        {recent.map((p, i) => (
          <a key={p.slug} href="#"
            onClick={e => { e.preventDefault(); if (p.source === 'medium') window.open(p.mediumUrl, '_blank'); else { setArticle(p.slug); navigate('article'); } }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
              padding: '14px 0', borderBottom: '1px solid var(--border)',
              textDecoration: 'none', color: 'inherit',
              alignItems: 'baseline',
            }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--fg)', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
              {p.title}
              {p.source === 'medium' && <SourceBadge small />}
            </span>
            <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>{fmtDate(p.date)}</span>
          </a>
        ))}
        <div style={{ display: 'flex', gap: 18, marginTop: 28, fontSize: 13.5 }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate('writing'); }} style={{ color: 'var(--accent)', textDecoration: 'none' }}>All writing →</a>
          <a href="#" onClick={e => { e.preventDefault(); navigate('projects'); }} style={{ color: 'var(--fg-2)', textDecoration: 'none' }}>Projects</a>
          <a href="#" onClick={e => { e.preventDefault(); navigate('about'); }} style={{ color: 'var(--fg-2)', textDecoration: 'none' }}>About</a>
        </div>
      </div>
    </section>
  );
}

function HeroReading({ navigate, setArticle }) {
  const { POSTS, fmtDate } = window.SITE_DATA;
  return (
    <section style={{ padding: '72px 24px 56px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontSize: 14, color: 'var(--fg-3)', fontFamily: 'var(--mono)', marginBottom: 22, letterSpacing: '0.04em' }}>
          jattoabdul.com / a personal operating system for public work
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4.8vw, 2.8rem)', fontWeight: 400, lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 18, textWrap: 'balance' }}>
            A curated reading list,<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>by an engineer in motion.</span>
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: '54ch', marginBottom: 40 }}>
          Posts on backend, platform engineering, applied AI, and the human side of senior engineering. Updated regularly.
        </p>

        {POSTS.slice(0, 5).map((p, i) => (
          <a key={p.slug} href="#"
            onClick={e => { e.preventDefault(); if (p.source === 'medium') window.open(p.mediumUrl, '_blank'); else { setArticle(p.slug); navigate('article'); } }}
            style={{
              display: 'grid', gridTemplateColumns: '78px 1fr auto', gap: 20,
              padding: '14px 0', borderBottom: '1px solid var(--border)',
              textDecoration: 'none', color: 'inherit', alignItems: 'baseline',
            }}>
            <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{fmtDate(p.date).replace(', 2026', '')}</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--fg)' }}>
              {p.title}
              {p.source === 'medium' && <span style={{ marginLeft: 8 }}><SourceBadge small /></span>}
            </span>
            <span style={{ fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>{p.mins} min</span>
          </a>
        ))}
      </div>
    </section>
  );
}

const TERMINAL_COPY = {
  blueprint: {
    headline: ['A systems blueprint', 'in long form.'],
    sub: 'Practical engineering essays, field notes, and the projects behind them. Pick a thread.',
  },
  workshop: {
    headline: ['A working engineer\u2019s', 'public workshop.'],
    sub: 'Backend, platform, and applied-AI builds \u2014 written down so the lessons survive the work.',
  },
  field: {
    headline: ['Field notes from', 'real software.'],
    sub: 'Senior engineering, told plainly: what I tried, what broke, what worked, and what I\u2019d do differently.',
  },
  staff: {
    headline: ['Engineering thought,', 'written clearly.'],
    sub: 'Backend, platform, and applied-AI systems \u2014 plus the communication that holds them together.',
  },
  build: {
    headline: ['Build, write,', 'review, repeat.'],
    sub: 'I ship backend and platform systems, then write the parts that were actually hard.',
  },
};

function HeroTerminal({ navigate, copy }) {
  const c = TERMINAL_COPY[copy] || TERMINAL_COPY.blueprint;
  return (
    <section style={{ padding: '72px 24px 56px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg-code)', border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden', marginBottom: 36,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg-code) 60%, var(--border))' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            <span style={{ marginLeft: 10, fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>~/jattoabdul.com — whoami</span>
          </div>
          <div style={{ padding: '20px 22px', fontFamily: 'var(--mono)', fontSize: 13.5, lineHeight: 1.75 }}>
            <div><span style={{ color: 'var(--accent)' }}>jatto</span><span style={{ color: 'var(--fg-3)' }}>@laptop</span> <span style={{ color: 'var(--fg-3)' }}>~ %</span> whoami</div>
            <div style={{ color: 'var(--fg)', marginBottom: 10 }}>jatto-abdul · senior software engineer</div>
            <div><span style={{ color: 'var(--accent)' }}>jatto</span><span style={{ color: 'var(--fg-3)' }}>@laptop</span> <span style={{ color: 'var(--fg-3)' }}>~ %</span> cat focus.txt</div>
            <div style={{ color: 'var(--fg)', marginBottom: 10 }}>backend · platform · applied-ai · product · communication</div>
            <div><span style={{ color: 'var(--accent)' }}>jatto</span><span style={{ color: 'var(--fg-3)' }}>@laptop</span> <span style={{ color: 'var(--fg-3)' }}>~ %</span> ls public/</div>
            <div style={{ color: 'var(--fg-2)' }}>writing/  notes/  projects/  videos/  about/  contact/</div>
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4.6vw, 2.6rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 16 }}>
          {c.headline[0]} <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>{c.headline[1]}</span>
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: '54ch', marginBottom: 24 }}>
          {c.sub}
        </p>
      </div>
    </section>
  );
}

function FocusSection() {
  const { FOCUS } = window.SITE_DATA;
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader eyebrow="Current focus" title="What I'm thinking about" />
        <div style={{
          display: 'grid', gap: 1,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
        }}>
          {FOCUS.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-surface)', padding: '22px 22px 24px',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={f.icon} size={15} color="var(--accent)" />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>{f.label}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostRow({ post, last, onClick }) {
  const { fmtDate } = window.SITE_DATA;
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 24,
        alignItems: 'start', padding: '20px 0',
        borderBottom: last ? 'none' : '1px solid var(--border)',
        cursor: 'pointer', opacity: hov ? 0.7 : 1, transition: 'opacity 120ms',
      }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>{post.cat}</span>
          {post.source === 'medium' && <SourceBadge />}
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 400, color: 'var(--fg)', lineHeight: 1.3, marginBottom: 6, letterSpacing: '-0.005em' }}>{post.title}</h3>
        {post.excerpt && <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: '62ch' }}>{post.excerpt}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, paddingTop: 22, flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'nowrap', fontFamily: 'var(--mono)' }}>{fmtDate(post.date)}</span>
        <span style={{ fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'nowrap', fontFamily: 'var(--mono)' }}>{post.mins} min</span>
      </div>
    </div>
  );
}

function WritingSection({ navigate, setArticle }) {
  const { POSTS } = window.SITE_DATA;
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader eyebrow="Latest writing" title="Recent posts" action="See all writing" onAction={() => navigate('writing')} />
        {POSTS.slice(0, 4).map((p, i) => (
          <PostRow key={p.slug} post={p} last={i === 3}
            onClick={() => { if (p.source === 'medium') window.open(p.mediumUrl, '_blank'); else { setArticle(p.slug); navigate('article'); } }} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ video, large }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a href="#" onClick={e => e.preventDefault()}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{
        position: 'relative', aspectRatio: large ? '16/9' : '16/9',
        background: 'linear-gradient(135deg, var(--bg-raised), var(--bg-sunken))',
        border: '1px solid var(--border)', borderRadius: 8,
        overflow: 'hidden', marginBottom: 12,
        transition: 'border-color 150ms',
        borderColor: hov ? 'var(--border-mid)' : 'var(--border)',
      }}>
        {/* fake thumbnail look */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 30% 30%, var(--accent-light), transparent 50%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%)`,
          opacity: 0.85,
        }} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--fg)', fontFamily: 'var(--mono)',
          background: 'var(--bg-surface)', padding: '3px 8px', borderRadius: 4,
          border: '1px solid var(--border)',
        }}>{video.platform}</div>
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          fontSize: 11, fontWeight: 500, color: '#fff',
          background: 'rgba(0,0,0,0.65)', padding: '2px 7px', borderRadius: 4,
          fontFamily: 'var(--mono)',
        }}>{video.dur}</div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--bg-surface)', border: '1px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 150ms',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <Icon name="play" size={18} color="var(--accent)" />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{video.kind}</span>
        {video.views && <span style={{ fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>· {video.views} views</span>}
      </div>
      <h3 style={{
        fontFamily: 'var(--serif)', fontSize: large ? 19 : 15.5, fontWeight: 400,
        color: 'var(--fg)', lineHeight: 1.3, letterSpacing: '-0.005em',
      }}>{video.title}</h3>
    </a>
  );
}

function VideosSection({ navigate }) {
  const { VIDEOS, SHORTS } = window.SITE_DATA;
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader eyebrow="Creator work" title="Latest videos" action="All videos" onAction={() => navigate('videos')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28, marginBottom: 36 }}>
          {VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Short-form themes</SectionLabel>
          {SHORTS.map((s, i) => (
            <a key={s.id} href="#" onClick={e => e.preventDefault()}
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 16,
                padding: '12px 0', borderBottom: i === SHORTS.length - 1 ? 'none' : '1px solid var(--border)',
                textDecoration: 'none', color: 'inherit', alignItems: 'center',
              }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{s.platform}</span>
              <span style={{ fontSize: 14, color: 'var(--fg)' }}>{s.title}</span>
              <span style={{ fontSize: 11.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{s.dur}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--bg-surface)', border: '1px solid',
        borderColor: hov ? 'var(--border-mid)' : 'var(--border)',
        borderRadius: 10, padding: '22px',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow 150ms, border-color 150ms',
        cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={project.icon} size={17} color="var(--accent)" />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500,
          padding: '2px 9px', borderRadius: 9999,
          border: '1px solid var(--border)', color: 'var(--fg-3)',
          background: 'var(--bg-raised)', fontFamily: 'var(--mono)',
        }}>{project.status}</span>
      </div>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.35, marginBottom: 4 }}>{project.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)', marginBottom: 4 }}>{project.tagline}</p>
        <p style={{ fontSize: 12.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{project.role} · {project.year}</p>
      </div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 'auto' }}>
        {project.stack.slice(0, 3).map(t => (
          <span key={t} style={{ fontSize: 10.5, background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 7px', color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ navigate, setProject }) {
  const { PROJECTS } = window.SITE_DATA;
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader eyebrow="Selected projects" title="Things I've built" action="See all" onAction={() => navigate('projects')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.slug} project={p} onClick={() => { setProject(p.slug); navigate('project'); }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NoteRow({ note, last, onClick, mono }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 18,
        padding: '14px 0', borderBottom: last ? 'none' : '1px solid var(--border)',
        cursor: 'pointer', opacity: hov ? 0.65 : 1, transition: 'opacity 120ms',
      }}>
      <span style={{ fontSize: 11.5, color: 'var(--fg-3)', whiteSpace: 'nowrap', fontFamily: 'var(--mono)' }}>{note.date}</span>
      <div>
        <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--fg)', display: 'block', marginBottom: 4, lineHeight: 1.4 }}>{note.title}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {note.tags.map(t => (
            <span key={t} style={{ fontSize: 10, background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 6px', color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>#{t}</span>
          ))}
        </div>
      </div>
      <Icon name="arrowRight" size={13} color="var(--fg-3)" />
    </div>
  );
}

function NotesSection({ navigate }) {
  const { NOTES } = window.SITE_DATA;
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader eyebrow="Field notes" title="Recent notes" action="Browse all notes" onAction={() => navigate('notes')} />
        {NOTES.slice(0, 5).map((n, i) => (
          <NoteRow key={i} note={n} last={i === 4} onClick={() => navigate('notes')} />
        ))}
      </div>
    </section>
  );
}

function AboutSection({ navigate }) {
  return (
    <section style={{ padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 48, alignItems: 'start' }} className="about-grid">
        <SectionLabel>About / Operating style</SectionLabel>
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, color: 'var(--fg)', lineHeight: 1.45, letterSpacing: '-0.01em', marginBottom: 18, textWrap: 'balance' }}>
            I'm a senior engineer positioning toward staff. I think in systems, write to think clearly, and build to learn.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 14 }}>
            My strongest lanes are backend, platform, and applied-AI. I care about boundaries, contracts, and observability. I treat communication as engineering.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 22 }}>
            I publish here because thinking in public makes me better. The work compounds.
          </p>
          <a href="#" onClick={e => { e.preventDefault(); navigate('about'); }}
            style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            More about how I work <Icon name="arrowRight" size={13} color="var(--accent)" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConnectSection({ showNewsletter }) {
  const { SOCIAL } = window.SITE_DATA;
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  return (
    <section style={{ padding: '72px 24px', background: 'var(--bg-accent)', borderBottom: '1px solid var(--accent-mid)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        {showNewsletter && (
          <>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.015em', marginBottom: 12, textWrap: 'balance' }}>
              Practical engineering, <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>in your inbox.</span>
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 24, maxWidth: '50ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Notes on backend systems, applied AI, and engineering judgment. A few times a month. No spam.
            </p>
            {done ? (
              <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent)' }}>You're in. Talk soon.</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setDone(true); }}
                style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto 32px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
                  placeholder="your@email.com"
                  style={{
                    flex: '1 1 240px', minWidth: 200,
                    fontSize: 14, padding: '10px 14px',
                    border: '1px solid var(--border-mid)', borderRadius: 8,
                    background: 'var(--bg-surface)', color: 'var(--fg)', outline: 'none',
                    fontFamily: 'var(--sans)',
                  }} />
                <button type="submit" style={{
                  background: 'var(--accent)', color: 'var(--fg-on-accent)',
                  fontSize: 14, fontWeight: 600,
                  padding: '10px 20px', borderRadius: 8, border: 'none',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}>Subscribe</button>
              </form>
            )}
          </>
        )}
        <SectionLabel style={{ display: 'block', marginBottom: 16 }}>Or follow along</SectionLabel>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            ['linkedin', 'LinkedIn', SOCIAL.linkedin],
            ['youtube', 'YouTube', SOCIAL.youtube],
            ['twitter', 'X / Twitter', SOCIAL.x],
            ['github', 'GitHub', SOCIAL.github],
            ['instagram', 'Instagram', SOCIAL.instagram],
          ].map(([icon, label, href]) => (
            <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 13.5, fontWeight: 500,
                padding: '8px 14px', borderRadius: 9999,
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                color: 'var(--fg-2)', textDecoration: 'none',
              }}>
              <Icon name={icon} size={14} color="var(--fg-3)" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Hero, FocusSection, WritingSection, VideosSection, ProjectsSection,
  NotesSection, AboutSection, ConnectSection,
  PostRow, NoteRow, ProjectCard, VideoCard,
});
