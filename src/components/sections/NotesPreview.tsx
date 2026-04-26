import { Container } from '@/components/site/Container';
import { SectionHeader } from '@/components/site/SectionHeader';
import { NoteRow } from '@/components/cards/NoteRow';
import { getPublishedNotes } from '@/data/notes';

export function NotesPreview() {
  const recent = getPublishedNotes()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);
  return (
    <section className="border-b border-border py-16">
      <Container width="text">
        <SectionHeader
          eyebrow="Field notes"
          title="Recent notes"
          action={{ label: 'Browse all notes', href: '/notes' }}
        />
        {recent.map((n, i) => (
          <NoteRow key={n.slug} note={n} last={i === recent.length - 1} />
        ))}
      </Container>
    </section>
  );
}
