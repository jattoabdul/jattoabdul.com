'use client';

import { Typography } from '@components/ui/Typography/demo';
import { IconDemo } from '@components/ui/Icons/demo';
import { ButtonDemo } from '@components/ui/Button/demo';
import { Section } from '@components/ui/Section';
import { Grid } from '@components/ui/Grid';
import { Container } from '@components/ui/Container';

export function ThemeContent() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section variant="default" animation="slide-down" className="min-h-[50vh] flex items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Component Library</h1>
          <p className="text-xl text-muted-foreground">
            A showcase of our design system and components
          </p>
        </div>
      </Section>

      {/* Layout Components Demo */}
      <Section variant="muted" animation="fade" delay={0.2}>
        <h2 className="text-2xl font-semibold mb-8">Layout Components</h2>

        {/* Container Sizes */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Container Sizes</h3>
            {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => (
              <Container key={size} size={size} className="bg-background/50 p-4 rounded-lg">
                <p className="text-center">Container {size}</p>
              </Container>
            ))}
          </div>

          {/* Grid Layouts */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Grid Layouts</h3>
            <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-background/50 p-4 rounded-lg text-center">
                  Grid Item {i + 1}
                </div>
              ))}
            </Grid>
          </div>

          {/* Section Variants */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Section Variants</h3>
            {(['default', 'muted', 'accent'] as const).map(variant => (
              <Section
                key={variant}
                variant={variant}
                size="sm"
                animation="slide-up"
                className="rounded-lg"
              >
                <p className="text-center py-8">{variant} Section</p>
              </Section>
            ))}
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section animation="slide-up" delay={0.3}>
        <Typography />
      </Section>

      {/* Icons */}
      <Section variant="muted" animation="slide-up" delay={0.4}>
        <IconDemo />
      </Section>

      {/* Buttons */}
      <Section animation="slide-up" delay={0.5}>
        <ButtonDemo />
      </Section>
    </main>
  );
}
