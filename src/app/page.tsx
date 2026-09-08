import { Arrival } from '@/components/sections/Arrival';
import { PrototypeControls } from '@/components/site/PrototypeControls';

/**
 * Homepage, redesign branch (The Open Door, brand v2.0). Built one section per round.
 * Round 1: the arrival. Later rounds add the three entry points, the featured piece, the
 * channels row, Building now, the letter, and About, then the previous homepage sections
 * and this note are removed.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Arrival />
      <section className="next-rounds" aria-label="What comes next in this prototype">
        <div className="mx-auto max-w-[720px] px-6 text-fg-2">
          <h2 className="mb-3 font-serif text-[1.6rem] font-normal text-fg">Round 1 ends here.</h2>
          <p>
            This round is the header, the arrival, and the door. The three entry points, the
            featured piece, the channels row, Building now, the letter, and About come in the next
            rounds once this one is agreed.
          </p>
        </div>
      </section>
      <PrototypeControls />
    </main>
  );
}
