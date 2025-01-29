# Portfolio Website Implementation Plan

## Current Status: Design System Implementation

## 1. Initial Setup & Cleanup

- [x] Create Next.js app with `npx create-next-app@latest`
- [x] Add .nvmrc file
- [x] Update .gitignore
- [x] Move favicon.ico to public folder
- [x] Setup env files (.env.development.local, .env.example)

## 2. Project Structure & Configuration

- [x] Remove default Next.js boilerplate
    - [x] Clean up page.tsx
    - [x] Clean up globals.css
    - [x] Clean up layout.tsx
    - [x] Remove unused metadata
- [x] Setup folder structure
  ```
  src/
  ├── app/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── components/
  │   ├── layout/
  │   │   ├── Header/
  │   │   ├── Navigation/
  │   │   └── Footer/
  │   ├── sections/
  │   │   ├── Hero/
  │   │   ├── About/
  │   │   ├── Projects/
  │   │   └── Contact/
  │   ├── ui/
  │   │   ├── Button/
  │   │   ├── Card/
  │   │   └── Icons/
  │   └── animations/
  │       ├── TextReveal/
  │       ├── FadeIn/
  │       └── Shapes/
  ├── styles/
  │   ├── globals.css
  │   └── colors.css
  ├── lib/
  │   ├── utils.ts
  │   └── constants.ts
  ├── hooks/
  │   ├── useScrollPosition.ts
  │   └── useMediaQuery.ts
  └── types/
      └── index.ts
  ```
- [x] Configure TypeScript settings
    - [x] Add path aliases
    - [x] Enable strict mode
    - [x] Configure compiler options
- [x] Setup ESLint & Prettier
    - [x] Configure ESLint rules
    - [x] Setup Prettier formatting
    - [x] IDE integration
- [ ] Add required dependencies
    - [x] UI components (shadcn)
    - [ ] Animation libraries
    - [ ] Utility packages

## 3. Design System Implementation

- [x] Configure Tailwind
    - [x] Add custom colors (Ruby, Sapphire, Jade)
    - [x] Setup HSL color system
    - [x] Configure dark mode
    - [x] Add chart colors
    - [x] Add shadow system
    - [x] Add animation durations
    - [x] Setup layout constants
- [x] Add custom fonts
    - [x] Avant Garde
    - [x] Nunito Sans
    - [ ] General Sans
    - [ ] Plus Jakarta Sans
- [ ] Setup base styles
    - [x] Color system
    - [x] Typography classes
    - [ ] Utility classes
    - [x] Animation utilities
- [ ] Create component library
    - [x] Buttons
    - [ ] Cards
    - [x] Icons
        - [x] Setup icon system with lucide-react
        - [x] Create reusable Icon component
        - [x] Define common icon sizes
        - [x] Create icon demo component

## 4. Layout & Navigation

- [ ] Create base layout
    - [ ] Container components
    - [ ] Grid system
    - [ ] Dark mode toggle
- [ ] Implement vertical navigation
    - [ ] Nav structure
    - [ ] Icons
    - [ ] Hover states
    - [ ] Active indicators
- [ ] Setup smooth scrolling
    - [ ] Section navigation
    - [ ] Scroll progress
- [ ] Add page transitions
    - [ ] Route changes
    - [ ] Loading states
    - [ ] Section transitions

## 5. Hero Section

- [ ] Basic structure
    - [ ] Responsive grid
    - [ ] Content placement
    - [ ] Geometric shapes
- [ ] Text animations
    - [ ] Main title reveal
    - [ ] Subtitle animations
- [ ] Tech Stack Crystal Showcase
    - [ ] Crystal Container Component
        * Distinct section with custom background
        * Responsive grid for crystal placement
        * Mouse tracking for section-wide effects
    - [ ] Individual Language Crystals
        * Ruby Crystal
            - Gem logo centered
            - Ruby-colored gradients
            - Tooltip with "Ruby"
            - Hover/drag interactions
        * Go Crystal
            - Go gopher logo centered
            - Blue-tinted crystal
            - Tooltip with "Go"
            - Matching interactions
        * JavaScript Crystal
            - JS logo centered
            - Yellow/amber crystal
            - Tooltip with "JavaScript"
            - Consistent animations
        * PHP Crystal
            - PHP logo centered
            - Purple/blue crystal
            - Tooltip with "PHP"
            - Unified interaction style
    - [ ] Crystal Effects (2D First Approach)
        * CSS clip-path for crystal shapes
        * Gradient overlays for shine
        * GSAP animations for:
            - Floating effect
            - Rotation on hover
            - Mouse movement reaction
            - Smooth transitions
        * Tooltip system
        * Touch-friendly interactions
    - [ ] 3D Enhancement (Future Improvement)
        * Three.js crystal meshes
        * Advanced lighting
        * Real 3D rotation
        * Performance-based fallback
- [ ] Interactive elements
    - [ ] Hover states
    - [ ] Cursor effects
- [ ] Geometric elements
    - [ ] Crystal shapes
    - [ ] Background effects
- [ ] Interactive elements
    - [ ] Hover states
    - [ ] Cursor effects

## 6. Core Sections

### About/Experience

- [ ] Timeline component
- [ ] Skill presentation
- [ ] Animated reveals

### Projects/Work

- [ ] Project grid
- [ ] Card components
- [ ] Filter system

### Skills/Tech Stack

- [ ] Icon grid
- [ ] Category organization
- [ ] Hover interactions

### Contents

- [ ] Blog posts
- [ ] Videos - Youtube Channels (jattoabul - tech and lifestyle, jasportstalk - sports shows and podcast,
  kicksandkickschannel - sports shows and talks and vlog on only football and taekwondo)

### Contact

- [ ] Form design
- [ ] Resume
- [ ] Social links

## 7. Interactive Features

- [ ] Command menu (cmd+k)
    - [ ] Search functionality
    - [ ] Navigation shortcuts
- [ ] Cursor effects
    - [ ] Custom cursor
    - [ ] Hover animations
- [ ] Scroll animations
    - [ ] Section reveals
    - [ ] Parallax effects
- [ ] Page transitions
    - [ ] Route changes
    - [ ] Loading states

## 8. Polish & Optimization

- [ ] Performance optimization
    - [ ] Image optimization
    - [ ] Code splitting
    - [ ] Bundle analysis
- [ ] SEO setup
    - [ ] Meta tags
    - [ ] Open Graph
    - [ ] Sitemap
- [ ] Analytics integration
- [ ] Testing & debugging
    - [ ] Cross-browser testing
    - [ ] Mobile testing
    - [ ] Performance testing

## Recording Segments

1. "Project Setup & Structure" (15-20 mins)
    - Removing boilerplate
    - Setting up folders
    - Initial configuration

2. "Design System Implementation" (20-25 mins)
    - Color system
    - Typography
    - Component foundations

3. "Building the Navigation" (15-20 mins)
    - Vertical nav structure
    - Animations
    - Responsive behavior

4. "Hero Section Development" (25-30 mins)
    - Layout
    - Animations
    - Interactive elements

5. "Core Sections - Part 1" (20-25 mins)
    - About section
    - Experience timeline

6. "Core Sections - Part 2" (20-25 mins)
    - Projects grid
    - Work showcase

7. "Interactive Features" (25-30 mins)
    - Command menu
    - Cursor effects
    - Scroll animations

8. "Final Polish" (15-20 mins)
    - Performance
    - Testing
    - Deployment

## Notes

- Each section should be completed before moving to the next
- Regular commits after each major change
- Test across different devices throughout development
- Document any major decisions or changes
- Update this plan as needed

## Next Steps:

1. Add custom fonts (Avant-Garde as main + Nunito-Sans as secondary. If needed later on, add General Sans as main and
   Plus Jakarta Sans as secondary)
2. Create base component library
3. Implement setting dark mode as default theme for now
4. Start layout implementation
