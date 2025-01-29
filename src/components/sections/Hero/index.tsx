import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon, IconProps } from '@/components/ui/Icons';

const sideNavItems = [
  { icon: 'House', href: '/' },
  { icon: 'User', href: '/about' },
  { icon: 'BriefcaseBusiness', href: '/work' },
  { icon: 'Play', href: '/content' },
];

const socialLinks = [
  { icon: 'Mail', href: 'mailto:jattoabdul@gmail.com' },
  { icon: 'SiGithub', href: 'https://github.com/jattoabdul' },
  { icon: 'Play', href: 'https://youtube.com/jattoabdul' },
  { icon: 'SiInstagram', href: 'https://instagram.com/jattoabdul' },
  { icon: 'Linkedin', href: 'https://linkedin.com/in/jattoabdul' },
  { icon: 'SiX', href: 'https://x.com/jatto_abdul' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Left Side Navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        {sideNavItems.map(({ icon, href }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={icon as IconProps['name']} className="size-6" />
            <span className="sr-only">{icon}</span>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <div className="container px-4 md:px-6">
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

      {/* Right Side Social Links */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        {socialLinks.map(({ icon, href }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={icon as IconProps['name']} className="size-5" />
            <span className="sr-only">{icon}</span>
          </Link>
        ))}
      </nav>

      {/* Drone/Tech Icon */}
      <div className="fixed top-8 right-8 text-muted-foreground/20">
        <Icon name="SiDrone" className="size-12" />
      </div>
    </section>
  );
}
