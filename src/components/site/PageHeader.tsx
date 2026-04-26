import { Container } from './Container';
import { SectionLabel } from './SectionHeader';

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  width?: 'text' | 'wide';
};

export function PageHeader({ eyebrow, title, intro, width = 'text' }: PageHeaderProps) {
  return (
    <Container width={width} className="pt-14 sm:pt-16">
      <SectionLabel className="mb-3.5 block">{eyebrow}</SectionLabel>
      <h1 className="mb-3.5 font-serif text-[clamp(2rem,4.4vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.022em] text-fg [text-wrap:balance]">
        {title}
      </h1>
      {intro && (
        <p className="mb-8 max-w-[58ch] text-[16px] leading-[1.75] text-fg-2">{intro}</p>
      )}
    </Container>
  );
}
