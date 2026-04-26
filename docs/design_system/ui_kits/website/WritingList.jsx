// WritingList.jsx — Homepage writing/blog list section
function WritingList({ navigate }) {
  const posts = [
    {
      slug: 'pipelines',
      category: 'Backend Systems',
      title: 'Designing data pipelines that don\'t lie to you',
      excerpt: 'Most pipeline failures aren\'t bugs — they\'re assumption violations baked in at design time. The schema changed. A field that was always populated is now sometimes null.',
      date: 'Apr 12, 2025', readTime: '8 min',
    },
    {
      slug: 'ai-workflows',
      category: 'Applied AI',
      title: 'Building AI-assisted workflows without the hype',
      excerpt: 'Real notes from integrating LLMs into production systems — what worked, what didn\'t, and what I\'d do differently.',
      date: 'Mar 28, 2025', readTime: '6 min',
    },
    {
      slug: 'staff-eng',
      category: 'Career & Communication',
      title: 'What staff-level judgment actually looks like',
      excerpt: 'It\'s less about technical complexity and more about which problems you choose to solve — and which ones you let go.',
      date: 'Mar 10, 2025', readTime: '5 min',
    },
    {
      slug: 'event-driven',
      category: 'Platform Engineering',
      title: 'Event-driven architecture: the hard parts nobody mentions',
      excerpt: 'Schema drift, ordering guarantees, and the operational cost of choreography over orchestration.',
      date: 'Feb 22, 2025', readTime: '10 min',
    },
  ];

  return (
    <section style={wlStyles.section}>
      <div style={wlStyles.container}>
        <div style={wlStyles.header}>
          <h2 style={wlStyles.h2}>Recent Writing</h2>
          <a href="#" style={wlStyles.seeAll} onClick={e => e.preventDefault()}>See all writing →</a>
        </div>
        <div style={wlStyles.list}>
          {posts.map((post, i) => (
            <article
              key={post.slug}
              style={wlStyles.item}
              onClick={() => navigate('article', post.slug)}
            >
              <div style={wlStyles.itemLeft}>
                <span style={wlStyles.category}>{post.category}</span>
                <h3 style={wlStyles.title}>{post.title}</h3>
                <p style={wlStyles.excerpt}>{post.excerpt}</p>
              </div>
              <div style={wlStyles.itemRight}>
                <span style={wlStyles.meta}>{post.date}</span>
                <span style={wlStyles.meta}>{post.readTime} read</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const wlStyles = {
  section: { padding: '72px 40px', borderBottom: '1px solid var(--border)' },
  container: { maxWidth: 960, margin: '0 auto' },
  header: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 },
  h2: { fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.01em' },
  seeAll: { fontSize: 14, fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' },
  list: { display: 'flex', flexDirection: 'column' },
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '22px 0', borderBottom: '1px solid var(--border)',
    cursor: 'pointer', transition: 'background 150ms',
    gap: 24,
  },
  itemLeft: { flex: 1 },
  itemRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0, paddingTop: 2 },
  category: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 5 },
  title: { fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.35, marginBottom: 6 },
  excerpt: { fontSize: 14, lineHeight: 1.65, color: 'var(--fg-secondary)', maxWidth: 560 },
  meta: { fontSize: 12, color: 'var(--fg-muted)', whiteSpace: 'nowrap' },
};

Object.assign(window, { WritingList });
