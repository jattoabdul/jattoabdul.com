// NotesIndex.jsx — Notes/archive index page
function NotesIndex({ navigate }) {
  const notes = [
    { date: 'Apr 20, 2025', title: 'On idempotency in distributed systems', tags: ['backend', 'distributed'] },
    { date: 'Apr 15, 2025', title: 'Why I stopped using ORMs for reporting queries', tags: ['sql', 'backend'] },
    { date: 'Apr 8,  2025', title: 'Prompt caching in production: what actually matters', tags: ['applied ai'] },
    { date: 'Mar 30, 2025', title: 'Structured outputs vs function calling — a practical comparison', tags: ['applied ai', 'llms'] },
    { date: 'Mar 22, 2025', title: 'The underrated value of boring architecture', tags: ['platform', 'career'] },
    { date: 'Mar 14, 2025', title: 'How I run async standups for distributed teams', tags: ['communication'] },
    { date: 'Mar 6,  2025', title: 'Notes on Kafka consumer group rebalancing', tags: ['kafka', 'backend'] },
    { date: 'Feb 27, 2025', title: 'What I look for in senior engineering candidates', tags: ['career', 'hiring'] },
  ];

  const [filter, setFilter] = React.useState('All');
  const allTags = ['All', 'backend', 'applied ai', 'platform', 'career', 'communication'];

  const filtered = filter === 'All' ? notes : notes.filter(n => n.tags.includes(filter));

  return (
    <main style={niStyles.main}>
      <div style={niStyles.container}>
        <div style={niStyles.header}>
          <h1 style={niStyles.title}>Notes</h1>
          <p style={niStyles.sub}>Short-form observations, quick references, and ongoing thinking. Not polished essays — just honest notes.</p>
        </div>

        {/* Filter bar */}
        <div style={niStyles.filters}>
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                ...niStyles.filterBtn,
                background: filter === t ? 'var(--accent)' : 'var(--bg-raised)',
                color: filter === t ? '#fff' : 'var(--fg-secondary)',
                borderColor: filter === t ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Notes list */}
        <div style={niStyles.list}>
          {filtered.map((note, i) => (
            <div
              key={i}
              style={niStyles.row}
              onClick={() => navigate('article', 'pipelines')}
            >
              <span style={niStyles.date}>{note.date}</span>
              <div style={niStyles.middle}>
                <span style={niStyles.noteTitle}>{note.title}</span>
                <div style={niStyles.tagRow}>
                  {note.tags.map(t => (
                    <span key={t} style={niStyles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <span style={niStyles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const niStyles = {
  main:      { padding: '48px 40px 80px' },
  container: { maxWidth: 760, margin: '0 auto' },
  header:    { marginBottom: 32 },
  title:     { fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 8 },
  sub:       { fontSize: 15, lineHeight: 1.65, color: 'var(--fg-secondary)', maxWidth: 520 },
  filters:   { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 },
  filterBtn: { fontSize: 12, fontWeight: 500, padding: '5px 12px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'background 150ms, color 150ms' },
  list:      { display: 'flex', flexDirection: 'column' },
  row:       { display: 'flex', alignItems: 'flex-start', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 150ms' },
  date:      { fontSize: 12, color: 'var(--fg-muted)', whiteSpace: 'nowrap', paddingTop: 2, minWidth: 90, flexShrink: 0 },
  middle:    { flex: 1 },
  noteTitle: { fontSize: 15, fontWeight: 500, color: 'var(--fg)', display: 'block', marginBottom: 4, lineHeight: 1.35 },
  tagRow:    { display: 'flex', gap: 5 },
  tag:       { fontSize: 11, background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: 'var(--fg-muted)' },
  arrow:     { fontSize: 14, color: 'var(--fg-muted)', paddingTop: 2, flexShrink: 0 },
};

Object.assign(window, { NotesIndex });
