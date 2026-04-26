// ArticlePage.jsx — Full article page layout
function ArticlePage({ slug, navigate }) {
  const articles = {
    pipelines: {
      category: 'Backend Systems',
      title: 'Designing data pipelines that don\'t lie to you',
      date: 'Apr 12, 2025', readTime: '8 min',
      tags: ['backend', 'data engineering', 'python'],
    },
    'ai-workflows': {
      category: 'Applied AI',
      title: 'Building AI-assisted workflows without the hype',
      date: 'Mar 28, 2025', readTime: '6 min',
      tags: ['applied ai', 'llms', 'engineering'],
    },
  };

  const post = articles[slug] || articles['pipelines'];

  return (
    <main style={apStyles.main}>
      <div style={apStyles.container}>
        {/* Back */}
        <a href="#" style={apStyles.back} onClick={e => { e.preventDefault(); navigate('home'); }}>
          ← All writing
        </a>

        {/* Header */}
        <div style={apStyles.header}>
          <span style={apStyles.category}>{post.category}</span>
          <h1 style={apStyles.title}>{post.title}</h1>
          <div style={apStyles.meta}>
            <span>{post.date}</span>
            <span style={apStyles.dot}>·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        <hr style={apStyles.divider} />

        {/* Body */}
        <div style={apStyles.body}>
          <p>Most pipeline failures aren't bugs — they're assumption violations baked in at design time. The schema changed. The upstream vendor didn't tell you. A field that was always populated is now sometimes null.</p>

          <blockquote style={apStyles.blockquote}>
            "The most dangerous pipelines are the ones that succeed silently with wrong data."
          </blockquote>

          <h2 style={apStyles.h2}>Validate at the boundary</h2>
          <p>Use <code style={apStyles.inlineCode}>pydantic</code> or a lightweight schema contract layer to assert shape at ingestion time, not inside your transforms. This is the single change that will save you the most debugging time.</p>

          <div style={apStyles.codeBlock}>
            <div style={apStyles.codeHeader}>
              <span style={apStyles.codeLang}>Python</span>
              <span style={apStyles.codeCopy}>Copy</span>
            </div>
            <pre style={apStyles.pre}><code style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5 }}>
              <span style={{color:'#6B9FD4'}}>{'@validator'}</span>
              <span style={{color:'#C97B30'}}>{'("event_type")'}</span>{'\n'}
              <span style={{color:'#6B9FD4'}}>{'def '}</span>
              <span style={{color:'#2E9968'}}>{'check_event'}</span>
              {'(cls, v):\n    assert v '}
              <span style={{color:'#6B9FD4'}}>{'in'}</span>
              {' VALID_EVENTS\n    '}
              <span style={{color:'#6B9FD4'}}>{'return'}</span>
              {' v'}
            </code></pre>
          </div>

          <h2 style={apStyles.h2}>The cost of silent failure</h2>
          <p>When a pipeline writes incorrect data without raising an error, it's often 3–5 days before anyone notices — usually a product manager asking why the numbers look off. By then, you have bad data in downstream tables, cached dashboards, and sometimes production decisions already made.</p>

          <p>Design for observability from the start: emit metrics on schema violations, track null rates per field, and alert when rates deviate from a rolling baseline.</p>
        </div>

        <hr style={apStyles.divider} />

        {/* Tags */}
        <div style={apStyles.tagRow}>
          {post.tags.map(t => (
            <span key={t} style={apStyles.tag}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={apStyles.cta}>
          <h3 style={apStyles.ctaTitle}>Enjoyed this? There's more.</h3>
          <p style={apStyles.ctaText}>Notes on backend systems, applied AI, and engineering judgment.</p>
          <a href="#" style={apStyles.ctaBtn} onClick={e => e.preventDefault()}>Subscribe →</a>
        </div>
      </div>
    </main>
  );
}

const apStyles = {
  main:      { padding: '48px 40px 80px' },
  container: { maxWidth: 720, margin: '0 auto' },
  back:      { fontSize: 14, color: 'var(--fg-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: 36 },
  header:    { marginBottom: 28 },
  category:  { fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 10 },
  title:     { fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 12 },
  meta:      { display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--fg-muted)' },
  dot:       { color: 'var(--fg-muted)' },
  divider:   { border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' },
  body:      { display: 'flex', flexDirection: 'column', gap: 18 },
  h2:        { fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, color: 'var(--fg)', lineHeight: 1.25, marginTop: 8 },
  blockquote:{ borderLeft: '3px solid var(--accent)', paddingLeft: 20, color: 'var(--fg-secondary)', fontFamily: 'var(--font-serif)', fontSize: 18, fontStyle: 'italic', lineHeight: 1.55 },
  inlineCode:{ fontFamily: 'var(--font-mono)', fontSize: '0.875em', background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 5px' },
  codeBlock: { background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' },
  codeHeader:{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 16px', borderBottom: '1px solid var(--border)', background: '#ECEAE3' },
  codeLang:  { fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-muted)' },
  codeCopy:  { fontSize: 11, color: 'var(--fg-muted)', cursor: 'pointer' },
  pre:       { fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.65, padding: '16px 20px', margin: 0, overflowX: 'auto', color: 'var(--fg)' },
  tagRow:    { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 },
  tag:       { fontSize: 12, background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 4, padding: '3px 8px', color: 'var(--fg-secondary)' },
  cta:       { background: 'var(--bg-accent)', border: '1px solid var(--accent-medium)', borderRadius: 10, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' },
  ctaTitle:  { fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--fg)', marginBottom: 4 },
  ctaText:   { fontSize: 13, color: 'var(--fg-secondary)' },
  ctaBtn:    { background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 500, padding: '9px 18px', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 },
};

Object.assign(window, { ArticlePage });
