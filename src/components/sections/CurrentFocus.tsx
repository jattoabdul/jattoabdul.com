import { Container } from '@/components/site/Container';
import { SectionHeader } from '@/components/site/SectionHeader';
import { focusItems } from '@/data/focus';

export function CurrentFocus() {
  return (
    <section className="border-b border-border py-16">
      <Container width="wide">
        <SectionHeader eyebrow="Current focus" title="What I'm thinking about" />
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {focusItems.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex flex-col gap-2.5 bg-bg-surface p-5"
              >
                <div className="flex size-[30px] items-center justify-center rounded-md border border-accent-mid bg-accent-light">
                  <Icon className="size-[15px] text-accent" />
                </div>
                <div className="text-[14.5px] font-semibold leading-tight text-fg">
                  {f.label}
                </div>
                <div className="text-[13px] leading-[1.55] text-fg-2">{f.desc}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
