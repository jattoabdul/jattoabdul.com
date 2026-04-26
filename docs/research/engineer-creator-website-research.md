# Engineer-Creator Website Research

Prepared: 2026-04-25 19:52 EDT

Target project: this repository

## Research Goal

Find website examples for engineers who combine senior/staff-level credibility with public writing, teaching, video, newsletter, open-source, or product-building. The goal is not to copy any one site; it is to choose patterns that fit Jatto Abdul's next website.

Useful screenshots:

- [inspiration-contact-sheet.png](../../output/playwright/personal-site-research-2026-04-25/inspiration-contact-sheet.png)
- individual screenshots are in [output/playwright/personal-site-research-2026-04-25](../../output/playwright/personal-site-research-2026-04-25)

![Inspiration contact sheet](../../output/playwright/personal-site-research-2026-04-25/inspiration-contact-sheet.png)

## Best Overall Pattern

The strongest fit is a hybrid of:

- Lee Robinson for minimal personal positioning and curated links
- Hamel Husain for applied-AI authority and consulting/teaching clarity
- Tania Rascia for maintainable blog/notes/projects structure
- Arpit Bhayani for backend/systems credibility and social proof
- Josh Comeau or Kent C. Dodds for warmth and teaching personality, used sparingly

Recommended direction:

> A clean technical-editorial site with a strong hero, a writing-first homepage, selected work proof, and a lightweight creator hub.

## Inspiration Matrix

| Person / Site | Positioning | What It Looks Like | Borrow | Be Careful |
| --- | --- | --- | --- | --- |
| [Lee Robinson](https://leerob.com/) | Developer/writer teaching AI; strong company credibility without over-explaining. | Extremely minimal white page, short bio, curated favorite writing, direct links. | Crisp bio, favorite writing list, `read/code/follow/videos` paths. | Too sparse if used alone; Jatto needs stronger project proof. |
| [Hamel Husain](https://hamel.dev/) | Applied AI/evals practitioner, teacher, consultant. | Simple blog homepage with bio, work-with-me block, and long writing archive. | Applied-AI specificity, teaching/consulting clarity, writing as authority. | Very text-heavy; needs warmer visual identity for Jatto. |
| [Simon Willison](https://simonwillison.net/) | Independent technologist with high-frequency notes, links, and tools. | Dense weblog, old-web feel, massive archive, tags, daily publishing rhythm. | Publish notes often; make the site useful as a memory system. | Too dense for first impression unless separated into a `/notes` area. |
| [swyx](https://www.swyx.io/) | AI engineer/community builder/devtools advisor. | Personal homepage with bio, latest content, popular writing, speaking, newsletters. | Strong content hub and explicit topic clusters. | Could feel too busy unless simplified. |
| [Addy Osmani](https://addyosmani.com/) | Senior engineering leader, AI/devtools/books/talks. | Dark premium profile with books, case studies, featured articles, videos, network links. | Leadership credibility modules and featured AI writing. | Too much inventory can overwhelm a newer creator site. |
| [The Pragmatic Engineer](https://blog.pragmaticengineer.com/) | Engineering newsletter/publication. | Publication-first layout with prominent newsletter/book/podcast links. | Treat writing as a product surface; make subscription obvious. | This is more media company than personal portfolio. |
| [Josh Comeau](https://www.joshwcomeau.com/) | Frontend educator with high-craft interactive writing. | Soft playful visuals, clouds, categories, popular content, newsletter, courses. | Warmth, memorable illustration, strong content taxonomy. | Whimsy should be a seasoning, not the main system for Jatto. |
| [Kent C. Dodds](https://kentcdodds.com/) | JavaScript educator and open-source teacher. | Polished educator homepage with video, courses, blog proof, community CTA. | Strong creator CTA stack: blog, course/content, community, newsletter. | Too course-platform-heavy for the first rebuild. |
| [Tania Rascia](https://tania.dev/) | Software engineer, open-source creator, digital garden. | Warm light theme, sidebar, blog/notes/projects/about, newsletter and RSS. | Maintainable structure; separate blogs from notes; clear personal voice. | The anti-AI stance is part of her brand, not Jatto's. |
| [Julia Evans](https://jvns.ca/) | Technical explainer, zines, systems/networking education. | Simple centered blog with orange identity, lists, and links to zines/tools. | Strong color identity and teaching-first archive. | Too intentionally old-school if copied directly. |
| [Arpit Bhayani](https://edge.arpitbhayani.me/) | Principal/staff-level systems engineer, database/distributed systems educator. | Cream editorial page with bio, portrait, social proof, recent posts, papers, courses. | Best match for backend/platform authority plus creator proof. | Social count blocks should wait until they are meaningful. |
| [Hussein Nasser](https://www.husseinnasser.com/p/about-hussein.html) | Backend engineering author, course creator, YouTuber. | Basic Blogger layout, course tiles, about story, backend topic focus. | Narrow topic authority and deep backend content lane. | Visual polish is weak; use topic focus, not the design. |
| [ByteByteGo](https://blog.bytebytego.com/) | System design education/newsletter brand. | Centered newsletter capture, simple promise, testimonials, visual diagrams. | One-line promise and diagram-first technical education. | More brand/publication than personal site. |
| [Cassidy Williams](https://cassidoo.co/) | Software engineer, dev advocacy leader, newsletter/blog/personality. | Tiny personal homepage, friendly bio, recent posts, tags, newsletter. | Casual voice, tags, recent-post stream, open-source transparency. | Too casual if the staff-engineer signal is underdeveloped. |
| [Sarah Drasner](https://sarah.dev/) | Senior engineering leader, speaker, author. | Bold dark visual hero, short nav, high-credibility bio, contact form. | One memorable hero statement and leadership credibility. | Dark/artistic treatment could overpower content manageability. |
| [Dan Abramov / Overreacted](https://overreacted.io/) | Deep React/software thinking through essays. | Minimal blog index with color accent and essay titles. | Let writing carry authority; keep article index fast and clean. | No homepage context for new visitors unless paired with an About section. |
| [Jacob Kaplan-Moss](https://jacobian.org/) | Django co-creator, engineering leader, consultant/writer. | Bold simple header, concise bio, chronological writing list. | Senior credibility in one paragraph; clear writing list. | Topic mix can drift once the brand expands. |
| [Monica Lent](https://monica.carrd.co/) | Software engineer with projects and personal sites. | Minimal Carrd-style profile, short tech stack, project and CV links. | Simple single-page structure and project grouping. | Feels older and less content-led than the target site. |

## Patterns Worth Borrowing

### 1. The One-Sentence Identity

Most strong sites make the visitor understand the person quickly:

- what they do
- what they write or teach about
- why they are credible
- where to go next

For Jatto:

> Senior Software Engineer building backend, platform, and applied-AI systems. I write about practical engineering, AI-assisted product building, and communication for engineers.

### 2. Writing Is The Product

The best creator-engineer sites do not bury writing under `Projects`.

Good patterns:

- latest writing on the homepage
- popular/favorite writing list
- tags or categories
- RSS/newsletter
- notes for shorter posts

For Jatto:

- `Writing`: polished essays
- `Notes`: build logs, short lessons, learning notes
- `Videos`: long-form and shorts linked from YouTube

### 3. Staff Signal Comes From Judgment, Not Title Styling

Staff-level signal should come from:

- systems thinking
- migration and platform stories
- impact under ambiguity
- communication/leadership lessons
- public technical writing
- strong case studies

Do not make the site say `aspiring staff engineer` in the hero. Make the work and writing imply it.

### 4. Creator Signal Needs Clear CTAs

Common CTA paths:

- read the writing
- subscribe to newsletter/RSS
- watch videos
- see projects
- contact/work with me

For Jatto, the homepage should not only say `Resume`. It should give a hiring manager, teammate, learner, or follower a clear next step.

### 5. Visual Polish Should Support Repeat Publishing

The site should be easy to update weekly. That argues for:

- simple cards
- reusable post lists
- structured content data
- restrained visual identity
- no dependence on one-off Canva-style layouts

## Candidate Design Directions

### Direction A: Technical Editorial

References:

- Lee Robinson
- Hamel Husain
- Tania Rascia
- Jacob Kaplan-Moss

Feel:

- clean, readable, professional
- strong on writing and credibility
- easiest to maintain

Best for:

- staff-track positioning
- LinkedIn/blog alignment
- practical engineering essays

### Direction B: Systems Blueprint

References:

- Arpit Bhayani
- ByteByteGo
- Simon Willison
- The Pragmatic Engineer

Feel:

- structured, technical, diagram-friendly
- strong for backend/platform/system design
- good for applied-AI workflows and architecture notes

Best for:

- backend/platform authority
- technical breakdowns
- diagrams and build notes

### Direction C: Warm Product Educator

References:

- Josh Comeau
- Kent C. Dodds
- Cassidy Williams

Feel:

- approachable, creator-first, memorable
- more personality and teaching energy
- good for audience growth

Best for:

- YouTube/blog bridge
- friendly learning content
- career/communication posts

### Direction D: Premium Engineering Leader

References:

- Addy Osmani
- Sarah Drasner

Feel:

- high-status, bold, speaker/author energy
- impressive at first glance

Best for:

- leadership proof
- books/talks/course surfaces later

Risk:

- can become too much about inventory and visual drama before the writing engine exists.

## Recommended Blend

Use:

- 55% Technical Editorial
- 25% Systems Blueprint
- 15% Warm Product Educator
- 5% Premium Engineering Leader

In practice:

- homepage structure from Lee/Hamel/Tania
- backend/platform credibility modules from Arpit
- diagrams and explainers inspired by ByteByteGo
- a little warmth and personality from Josh/Kent/Cassidy
- avoid launching with a dark, high-drama Addy/Sarah-style identity until the content body is stronger

## Homepage Sketch

1. Hero:
   - name
   - role/focus
   - one-sentence creator promise
   - CTAs: `Read writing`, `Watch videos`, `View resume`, `Contact`

2. Latest:
   - 3 latest writing/notes/videos

3. What I Work On:
   - Backend and platform systems
   - Applied-AI workflows
   - Product engineering
   - Engineering communication

4. Selected Proof:
   - Minerva
   - Fera
   - Heroshe
   - Discova
   - TrustKarry

5. Popular/Start Here:
   - 3 evergreen posts once written
   - until then, use planned topics or project writeups

6. Follow/Subscribe:
   - LinkedIn
   - YouTube
   - X
   - GitHub
   - newsletter/RSS when ready

## First Adoption Shortlist

Most useful to adopt:

1. Lee Robinson: minimal first impression and curated writing links.
2. Hamel Husain: applied-AI credibility through practical writing.
3. Tania Rascia: blog/notes/projects information architecture.
4. Arpit Bhayani: backend/platform authority and recent-post proof.
5. Josh Comeau: warmth and memorable teaching energy.

Most useful to discard for now:

- full publication model from The Pragmatic Engineer
- heavy course/community funnel from Kent C. Dodds
- dark premium inventory wall from Addy Osmani
- raw dense weblog homepage from Simon Willison as the main first screen
- old-school single-page CV layout from Monica Lent

## Sources

- [jattoabdul.com](https://jattoabdul.com)
- [Lee Robinson](https://leerob.com/)
- [Hamel Husain](https://hamel.dev/)
- [Simon Willison](https://simonwillison.net/)
- [swyx](https://www.swyx.io/)
- [Addy Osmani](https://addyosmani.com/)
- [The Pragmatic Engineer](https://blog.pragmaticengineer.com/)
- [Josh Comeau](https://www.joshwcomeau.com/)
- [Kent C. Dodds](https://kentcdodds.com/)
- [Tania Rascia](https://tania.dev/)
- [Julia Evans](https://jvns.ca/)
- [Arpit Bhayani](https://edge.arpitbhayani.me/)
- [Hussein Nasser](https://www.husseinnasser.com/p/about-hussein.html)
- [ByteByteGo](https://blog.bytebytego.com/)
- [Cassidy Williams](https://cassidoo.co/)
- [Sarah Drasner](https://sarah.dev/)
- [Dan Abramov / Overreacted](https://overreacted.io/)
- [Jacob Kaplan-Moss](https://jacobian.org/)
- [Monica Lent](https://monica.carrd.co/)
