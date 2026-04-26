/* Page-level views: Writing, Notes, Projects, Videos, Article, Project, About, Contact */

function WritingPage({ navigate, setArticle }) {
  const { POSTS } = window.SITE_DATA;
  const [filter, setFilter] = React.useState('All');
  const [sourceFilter, setSourceFilter] = React.useState('All');
  const [feedState, setFeedState] = React.useState('success');

  const tags = [
    'All',
    'backend',
    'applied-ai',
    'platform',
    'career',
    'communication',
    'kafka',
    'data',
    'llms',
    'sql',
  ];
  let visible = POSTS;
  if (filter !== 'All') visible = visible.filter(p => p.tags.includes(filter));
  if (sourceFilter === 'First-party') visible = visible.filter(p => p.source === 'local');
  if (sourceFilter === 'Via Medium') visible = visible.filter(p => p.source === 'medium');

  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Writing</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.4vw, 2.6rem)',
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Practical notes{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>from real builds.</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-2)',
            marginBottom: 32,
            maxWidth: '58ch',
          }}
        >
          Some posts live here as first-party MDX; others are syndicated from Medium. Filter by
          topic or source. Canonical links always point to the source.
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {tags.map(t => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  border: '1px solid',
                  cursor: 'pointer',
                  background: active ? 'var(--accent)' : 'var(--bg-raised)',
                  color: active ? 'var(--fg-on-accent)' : 'var(--fg-2)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                  fontFamily: t === 'All' ? 'var(--sans)' : 'var(--mono)',
                  transition: 'all 120ms',
                }}
              >
                {t === 'All' ? t : `#${t}`}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 11.5,
              color: 'var(--fg-3)',
              fontFamily: 'var(--mono)',
              marginRight: 4,
            }}
          >
            source:
          </span>
          {['All', 'First-party', 'Via Medium'].map(s => {
            const active = sourceFilter === s;
            return (
              <button
                key={s}
                onClick={() => setSourceFilter(s)}
                style={{
                  fontSize: 11.5,
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: 5,
                  border: '1px solid',
                  cursor: 'pointer',
                  background: active ? 'var(--bg-sunken)' : 'transparent',
                  color: active ? 'var(--fg)' : 'var(--fg-3)',
                  borderColor: active ? 'var(--border-mid)' : 'var(--border)',
                  fontFamily: 'var(--mono)',
                  transition: 'all 120ms',
                }}
              >
                {s}
              </button>
            );
          })}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>
              feed:
            </span>
            {['success', 'loading', 'error', 'empty'].map(s => (
              <button
                key={s}
                onClick={() => setFeedState(s)}
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 3,
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  background: feedState === s ? 'var(--bg-raised)' : 'transparent',
                  color: 'var(--fg-3)',
                  fontFamily: 'var(--mono)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {feedState === 'loading' && (
          <div style={{ marginBottom: 32 }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  height: 78,
                  background: 'var(--bg-raised)',
                  borderRadius: 6,
                  marginBottom: 10,
                  opacity: 0.6,
                  animation: 'pulse 1.4s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        )}
        {feedState === 'error' && (
          <div
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '14px 18px',
              marginBottom: 24,
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Icon name="rss" size={15} color="var(--fg-3)" />
            <span style={{ fontSize: 13.5, color: 'var(--fg-2)', flex: 1 }}>
              Couldn't load Medium posts right now. First-party posts below.
            </span>
            <a
              href="https://medium.com/@jattoabdul"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'var(--accent)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              View on Medium →
            </a>
          </div>
        )}
        {feedState === 'empty' && (
          <div
            style={{ padding: '48px 0', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}
          >
            Nothing here yet. Check back soon.
          </div>
        )}
        {feedState === 'success' && (
          <div>
            {visible.length === 0 ? (
              <div
                style={{
                  padding: '48px 0',
                  textAlign: 'center',
                  color: 'var(--fg-3)',
                  fontSize: 14,
                }}
              >
                No posts match this filter.
              </div>
            ) : (
              visible.map((p, i) => (
                <PostRow
                  key={p.slug}
                  post={p}
                  last={i === visible.length - 1}
                  onClick={() => {
                    if (p.source === 'medium') window.open(p.mediumUrl, '_blank');
                    else {
                      setArticle(p.slug);
                      navigate('article');
                    }
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function NotesPage({ navigate }) {
  const { NOTES } = window.SITE_DATA;
  const [filter, setFilter] = React.useState('All');
  const tags = [
    'All',
    'backend',
    'applied-ai',
    'platform',
    'career',
    'communication',
    'sql',
    'kafka',
  ];
  const filtered = filter === 'All' ? NOTES : NOTES.filter(n => n.tags.includes(filter));

  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Field notes</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.4vw, 2.6rem)',
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Notes <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>in progress.</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-2)',
            marginBottom: 32,
            maxWidth: '54ch',
          }}
        >
          Short observations, build notes, and engineering lessons. Less polished than essays — an
          active thinking archive.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {tags.map(t => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  border: '1px solid',
                  cursor: 'pointer',
                  background: active ? 'var(--accent)' : 'var(--bg-raised)',
                  color: active ? 'var(--fg-on-accent)' : 'var(--fg-2)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                  fontFamily: t === 'All' ? 'var(--sans)' : 'var(--mono)',
                  transition: 'all 120ms',
                }}
              >
                {t === 'All' ? t : `#${t}`}
              </button>
            );
          })}
        </div>
        <div>
          {filtered.map((n, i) => (
            <NoteRow key={i} note={n} last={i === filtered.length - 1} onClick={() => {}} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProjectsPage({ navigate, setProject }) {
  const { PROJECTS } = window.SITE_DATA;
  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Projects</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.4vw, 2.6rem)',
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Selected work{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>and ongoing builds.</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-2)',
            marginBottom: 36,
            maxWidth: '56ch',
          }}
        >
          A handful of products and platforms I've built or contributed to. Most are commercial; the
          experiments are public-safe.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 14,
          }}
        >
          {PROJECTS.map(p => (
            <ProjectCard
              key={p.slug}
              project={p}
              onClick={() => {
                setProject(p.slug);
                navigate('project');
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function VideosPage() {
  const { VIDEOS, SHORTS } = window.SITE_DATA;
  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>
          Videos & creator work
        </SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.4vw, 2.6rem)',
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Engineering, <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>on camera.</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-2)',
            marginBottom: 40,
            maxWidth: '56ch',
          }}
        >
          Long-form videos on YouTube and short-form themes across LinkedIn, X, and Instagram. Same
          ideas, different shapes.
        </p>

        {/* Featured row */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 48 }}
          className="video-feature"
        >
          <VideoCard video={VIDEOS[0]} large />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {VIDEOS.slice(1).map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>

        <SectionLabel style={{ display: 'block', marginBottom: 18 }}>
          Short-form themes
        </SectionLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginBottom: 32,
          }}
        >
          {window.SITE_DATA.SHORTS.map(s => (
            <div
              key={s.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                aspectRatio: '9/12',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  {s.platform}
                </span>
                <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>
                  {s.dur}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'var(--fg)',
                  lineHeight: 1.35,
                  flex: 1,
                }}
              >
                {s.title}
              </p>
              <Icon name="play" size={18} color="var(--fg-3)" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ArticlePage({ slug, navigate }) {
  const { POSTS, fmtDate } = window.SITE_DATA;
  const post = POSTS.find(p => p.slug === slug) || POSTS[0];
  return (
    <main id="main-content" style={{ padding: '48px 24px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            navigate('writing');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13.5,
            color: 'var(--fg-3)',
            textDecoration: 'none',
            marginBottom: 40,
            fontFamily: 'var(--mono)',
          }}
        >
          <Icon name="arrowLeft" size={13} color="var(--fg-3)" /> writing
        </a>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            display: 'block',
            marginBottom: 14,
            fontFamily: 'var(--mono)',
          }}
        >
          {post.cat}
        </span>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.6vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.024em',
            color: 'var(--fg)',
            marginBottom: 18,
            textWrap: 'balance',
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            fontSize: 13,
            color: 'var(--fg-3)',
            marginBottom: 36,
            flexWrap: 'wrap',
            fontFamily: 'var(--mono)',
          }}
        >
          <span>{fmtDate(post.date)}</span>
          <span>·</span>
          <span>{post.mins} min read</span>
          {post.tags.map(t => (
            <span
              key={t}
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '1px 7px',
                fontSize: 11,
                color: 'var(--fg-3)',
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 36 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg)' }}>
            Most pipeline failures aren't bugs — they're assumption violations baked in at design
            time. The schema changed. The upstream vendor didn't tell you. A field that was always
            populated is now sometimes null. The job didn't crash; it produced wrong numbers, and
            the dashboard kept going.
          </p>
          <blockquote
            style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: 22,
              color: 'var(--fg-2)',
              fontFamily: 'var(--serif)',
              fontSize: 19.5,
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.55,
              margin: '4px 0',
            }}
          >
            The most dangerous pipelines are the ones that succeed silently with wrong data.
          </blockquote>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 24,
              fontWeight: 400,
              color: 'var(--fg)',
              lineHeight: 1.25,
              marginTop: 14,
              letterSpacing: '-0.012em',
            }}
          >
            Validate at the boundary
          </h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg)' }}>
            Use{' '}
            <code
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.875em',
                background: 'var(--bg-sunken)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '1px 6px',
              }}
            >
              pydantic
            </code>{' '}
            or a schema contract layer to assert shape at ingestion time — not inside your
            transforms. Inside transforms is too late: errors there mean you've already promised
            correctness to someone downstream.
          </p>

          <div
            style={{
              background: 'var(--bg-code)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                borderBottom: '1px solid var(--border)',
                background: 'color-mix(in srgb, var(--bg-code) 60%, var(--border))',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-3)',
                  fontFamily: 'var(--mono)',
                }}
              >
                python
              </span>
              <button
                style={{
                  fontSize: 11,
                  color: 'var(--fg-3)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--mono)',
                }}
              >
                copy
              </button>
            </div>
            <pre
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13.5,
                lineHeight: 1.75,
                padding: '18px 22px',
                overflowX: 'auto',
                color: 'var(--fg)',
                background: 'none',
                border: 'none',
                borderRadius: 0,
                margin: 0,
              }}
            >
              {`from pydantic import BaseModel, validator

class Event(BaseModel):
    user_id: str
    event_type: str
    ts: int

    @validator("event_type")
    def check_event(cls, v):
        if v not in VALID_EVENTS:
            raise ValueError(f"unknown event: {v}")
        return v`}
            </pre>
          </div>

          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 24,
              fontWeight: 400,
              color: 'var(--fg)',
              lineHeight: 1.25,
              marginTop: 14,
              letterSpacing: '-0.012em',
            }}
          >
            Design for observability
          </h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg)' }}>
            Emit metrics on schema violations. Track null rates per field. Alert when rates deviate
            from a rolling baseline. The pipeline that <em>tells you</em> when it's confused is
            worth ten that fail loudly once a year.
          </p>
        </div>

        <hr
          style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0 28px' }}
        />

        <div
          style={{
            background: 'var(--bg-accent)',
            border: '1px solid var(--accent-mid)',
            borderRadius: 10,
            padding: '22px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 17,
                fontWeight: 400,
                color: 'var(--fg)',
                marginBottom: 4,
              }}
            >
              Enjoyed this? There's more.
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--fg-2)' }}>
              Notes on backend systems, applied AI, and engineering judgment.
            </p>
          </div>
          <a
            href="#"
            onClick={e => e.preventDefault()}
            style={{
              background: 'var(--accent)',
              color: 'var(--fg-on-accent)',
              fontSize: 13.5,
              fontWeight: 600,
              padding: '10px 18px',
              borderRadius: 7,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Subscribe →
          </a>
        </div>
      </div>
    </main>
  );
}

function ProjectPage({ slug, navigate }) {
  const { PROJECTS } = window.SITE_DATA;
  const p = PROJECTS.find(x => x.slug === slug) || PROJECTS[0];
  return (
    <main id="main-content" style={{ padding: '48px 24px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            navigate('projects');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13.5,
            color: 'var(--fg-3)',
            textDecoration: 'none',
            marginBottom: 36,
            fontFamily: 'var(--mono)',
          }}
        >
          <Icon name="arrowLeft" size={13} color="var(--fg-3)" /> projects
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'var(--accent-light)',
              border: '1px solid var(--accent-mid)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={p.icon} size={22} color="var(--accent)" />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: 9999,
              border: '1px solid var(--border)',
              color: 'var(--fg-3)',
              background: 'var(--bg-raised)',
              fontFamily: 'var(--mono)',
            }}
          >
            {p.status}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.6vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.024em',
            color: 'var(--fg)',
            marginBottom: 12,
          }}
        >
          {p.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.45,
            color: 'var(--fg-2)',
            marginBottom: 28,
          }}
        >
          {p.tagline}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 36,
            overflow: 'hidden',
          }}
        >
          {[
            ['Role', p.role],
            ['Year', p.year],
            ['Status', p.status],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--bg-surface)', padding: '14px 18px' }}>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-3)',
                  fontFamily: 'var(--mono)',
                  marginBottom: 5,
                }}
              >
                {k}
              </div>
              <div style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 32 }} />

        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg)', marginBottom: 22 }}>
          {p.desc}
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg-2)', marginBottom: 36 }}>
          A longer case study lives behind this page — what we built, the tradeoffs, what I'd do
          differently. (Coming soon.)
        </p>

        <SectionLabel style={{ display: 'block', marginBottom: 12 }}>Stack</SectionLabel>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.stack.map(s => (
            <span
              key={s}
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 6,
                background: 'var(--bg-raised)',
                border: '1px solid var(--border)',
                color: 'var(--fg-2)',
                fontFamily: 'var(--mono)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

function AboutPage() {
  const { SOCIAL } = window.SITE_DATA;
  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>About</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.6vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.024em',
            color: 'var(--fg)',
            marginBottom: 28,
            textWrap: 'balance',
          }}
        >
          How I think, build,{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>and write.</span>
        </h1>

        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg)', marginBottom: 22 }}>
          I'm Jatto Abdul. Senior software engineer with a strong lane in backend, platform, and
          applied-AI systems — and strong frontend and product fluency to round it out.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg-2)', marginBottom: 22 }}>
          My work sits in the messy middle where product ideas become real software solutions —
          APIs, data flows, search and reporting workflows, integrations, caching, deployment, and
          the judgment calls that keep systems understandable as they grow.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg-2)', marginBottom: 22 }}>
          I think in systems: boundaries, contracts, observability, blast radius, and the people who
          have to operate the thing after it ships. I care about communication as much as code
          because most technical problems get easier when the assumptions are visible.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: 'var(--fg-2)', marginBottom: 22 }}>
          That is also why I write and create content. Writing, videos, and public notes help me
          turn real engineering work into clearer lessons — what I tried, what broke, what worked,
          and what I would do differently next time. It forces the assumptions out of my head and
          into something I can argue with.
        </p>

        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.01em',
            marginTop: 36,
            marginBottom: 14,
          }}
        >
          Operating style
        </h2>
        <ul
          style={{
            paddingLeft: 22,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginBottom: 28,
          }}
        >
          {[
            'I write down assumptions before writing code. Most bugs are assumption bugs.',
            "I prefer boring, durable architecture and reach for novelty only when boring genuinely doesn't fit.",
            "I instrument early. If I can't see what the system is doing, I haven't finished building it.",
            'I review my own PRs first. The fastest way to get useful feedback is to delete my own weak ideas before someone else has to.',
            'I explain the tradeoff, not just the decision. Good engineering is usually a record of what we chose, what we rejected, and why.',
            "I build in public where it makes sense. Thinking out loud helps me find the parts of an idea that don't actually work, that need rethinking, or that others can contribute to.",
          ].map((line, i) => (
            <li key={i} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)' }}>
              {line}
            </li>
          ))}
        </ul>

        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '-0.01em',
            marginTop: 28,
            marginBottom: 14,
          }}
        >
          Open to
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 36 }}>
          Staff-level engineering roles, advisory work with engineering-led teams, and
          collaborations around backend, platform, product, and applied-AI systems. I'm especially
          interested in teams that value clear thinking, durable software, and products that respect
          users. Always happy to trade notes with other engineers.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            ['mail', 'Email', `mailto:${SOCIAL.email}`],
            ['linkedin', 'LinkedIn', SOCIAL.linkedin],
            ['github', 'GitHub', SOCIAL.github],
            ['rss', 'RSS', '#'],
          ].map(([icon, label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--fg-2)',
                textDecoration: 'none',
                padding: '9px 14px',
                border: '1px solid var(--border)',
                borderRadius: 7,
                background: 'var(--bg-surface)',
              }}
            >
              <Icon name={icon} size={14} color="var(--fg-3)" /> {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

function ContactPage() {
  const { SOCIAL } = window.SITE_DATA;
  const links = [
    ['linkedin', 'LinkedIn', SOCIAL.linkedin, '@jattoade'],
    ['youtube', 'YouTube', SOCIAL.youtube, '@jatto_abdul'],
    ['twitter', 'X / Twitter', SOCIAL.x, '@Jattorize'],
    ['github', 'GitHub', SOCIAL.github, '@jattoabdul'],
    ['instagram', 'Instagram', SOCIAL.instagram, '@jatto_abdul'],
    ['rss', 'Medium', SOCIAL.medium, '@jattoabdul'],
  ];
  return (
    <main id="main-content" style={{ padding: '64px 24px 0' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Contact</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.6vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.024em',
            color: 'var(--fg)',
            marginBottom: 22,
            textWrap: 'balance',
          }}
        >
          Say hi.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>I read everything.</span>
        </h1>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.8,
            color: 'var(--fg-2)',
            marginBottom: 32,
            maxWidth: '54ch',
          }}
        >
          The fastest way to reach me is email. I usually reply within a few days. For everything
          else, I'm reachable on the platforms below.
        </p>

        <a
          href={`mailto:${SOCIAL.email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '18px 22px',
            borderRadius: 10,
            border: '1px solid var(--accent-mid)',
            background: 'var(--bg-accent)',
            textDecoration: 'none',
            color: 'inherit',
            marginBottom: 28,
          }}
        >
          <Icon name="mail" size={20} color="var(--accent)" />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontFamily: 'var(--mono)',
                marginBottom: 3,
              }}
            >
              Email
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--fg)',
                fontFamily: 'var(--mono)',
              }}
            >
              {SOCIAL.email}
            </div>
          </div>
          <Icon name="arrowUpRight" size={16} color="var(--accent)" />
        </a>

        <SectionLabel style={{ display: 'block', marginBottom: 14 }}>Elsewhere</SectionLabel>
        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {links.map(([icon, label, href, handle], i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr auto auto',
                gap: 14,
                alignItems: 'center',
                padding: '14px 18px',
                borderBottom: i === links.length - 1 ? 'none' : '1px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--bg-surface)',
              }}
            >
              <Icon name={icon} size={16} color="var(--fg-3)" />
              <span style={{ fontSize: 14.5, color: 'var(--fg)', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 12.5, color: 'var(--fg-3)', fontFamily: 'var(--mono)' }}>
                {handle}
              </span>
              <Icon name="arrowUpRight" size={13} color="var(--fg-3)" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

Object.assign(window, {
  WritingPage,
  NotesPage,
  ProjectsPage,
  VideosPage,
  ArticlePage,
  ProjectPage,
  AboutPage,
  ContactPage,
});
