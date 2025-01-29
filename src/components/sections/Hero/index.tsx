import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';

export function HeroSection() {
  return (
    <section className="min-h-screen hero-section">
      {/* Main Hero Content */}
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight">
            Jatto Abdul
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-heading tracking-wide">
            BUILDING DIGITAL EXPERIENCES SINCE 2017
          </p>

          {/* Tech Stack Box */}
          <div className="mt-8 px-4 py-2 bg-secondary/10 backdrop-blur-sm rounded-lg border border-border">
            <p className="text-sm md:text-base font-mono text-muted-foreground">
              RUBY - GO - JAVASCRIPT - PHP
            </p>
          </div>

          <p className="mt-4 text-lg text-muted-foreground">FULLSTACK ENGINEER WITH SUPERPOWERS</p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <Icon name="Briefcase" />
              View Work
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="Mail" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
