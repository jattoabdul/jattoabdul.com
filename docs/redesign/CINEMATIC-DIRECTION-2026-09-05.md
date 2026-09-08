# The Open Door: cinematic direction

Draft for discussion, September 5, 2026, America/Toronto. This proposes a new website art direction based on the owner's Dala reference and colour substitutions. It does not promote a new canonical brand edition, replace approved positioning, or change the prototype source.

## The idea

A visitor enters a personal world, meets Jatto, and discovers the different rooms of his life. Each room shows a different practice: writing, speaking, building, mentoring, and the personal history that connects them. Across all of them, the same person and the same principles remain recognisable.

The experience should make an ambitious, grounded life feel possible. The emotional progression is curiosity, recognition, discovery, understanding, and invitation. The message is already present in the existing brand: grow without losing yourself. The new direction gives that message a spatial form.

The strongest device is continuity. The same doorway, light, camera language, typography, and person persist while the surroundings change. The rooms contain meaningful differences, but share a foundation. Faith, character, responsibility, and the people who matter are that foundation. Faith should be present in the actual stories and choices, as the existing positioning specifies. A visual metaphor alone cannot communicate it adequately.

Treat the homepage as a short introduction with several useful exits. People can enjoy its sequence or go directly to Writing, Speaking, Building, Mentoring, About, and Contact. The room pages hold the substantial work.

## What the current prototype contributes

Keep the contact door's recognisable rest, hover, and opening states, the personal contact view, the five room names, and the direct email invitation. Preserve the existing URLs and content archives. The present hero composition and unfinished section plan do not need to constrain this exploration.

The current prototype explains the person through a portrait and text beside it. Its door is a separate interaction. In the proposed direction, the door becomes the visual device that organises the introduction and the room transitions. Contact remains its own clearly understood action.

## Reference investigation and evidence limits

Sources:

- [Dala live reference](https://dala.craftedbygc.com/)
- [Refero design-system extraction](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648)
- [Dala theme JavaScript](https://dala.craftedbygc.com/scripts/theme.js?id=f72e8450ba238dbf931f)
- [Dala vendor JavaScript](https://dala.craftedbygc.com/scripts/vendor.js?id=5cba2073b4fe69285205)
- [Dala stylesheet](https://dala.craftedbygc.com/css/style.css?id=3a3f3a982e763a689cb5)

Review included consecutive loading captures, desktop hero and scroll scenes, a narrow mobile layout, the mobile menu, a Team navigation action, and the team carousel controls. The live page's text structure and public JavaScript were also inspected. Local captures are stored with this task's Dala reference artifacts.

This is a scene study with sampled frames, not a recording of every rendered frame. Several desktop captures displayed clipping, repeated image strips, or large black areas after viewport and scroll changes. A native Chrome hero capture was clean, but native scrolling and the extension connection were unreliable. Corrupted captures are diagnostic evidence only; they must not become fidelity targets. Later scene descriptions distinguish visual observations from DOM or source evidence. Exact camera paths, full carousel transitions, the complete footer animation, touch-device performance, and all reduced-motion behavior still need a clean playback pass. No frame rate or complete accessibility compliance is claimed.

## Dala, sequence by sequence

### 1. Loading: establish the visual world before the main page

Observed: a black screen, a small white geometric spinner, and two centred lines of introductory text. Consecutive frames show the spinner and text arriving, then the hero emerging. The loader uses the same restrained typography and contrast as the page.

Source evidence: the spinner scales in over 0.6 seconds and has a three-second rotation cycle. Introductory lines rise through masks with a small rotation. The code handles asset progress and contains both standard and expedited exits. The loading line moves upward, the spinner scales out, completion text appears, and the overlay fades. Those are individual timeline durations, not a guaranteed total load time.

Assessment: a coherent opening, but a compulsory loader would be a poor default for frequent readers. Transfer the continuity between opening and hero, with a much shorter introduction and an immediately available escape into the site.

### 2. Hero: a clear promise and one recognisable moving subject

Observed: oversized, tightly spaced white sans-serif type on the left; a multicoloured particle brain on the right; sparse navigation and violet primary actions. Foreground and background fragments create depth around the main mass. The later hero frames contain a substantially more formed and luminous shape than the early reveal frames.

Assessment: strong identity and hierarchy. The meaningful lesson is to choose one recurring subject. For Jatto, that subject is the doorway and the world it reveals. A brain-shaped particle system would communicate Dala's idea.

### 3. First scroll: keep the visual subject while changing the composition

Observed: the large particle mass shifts toward the left and fills more of the view while the introductory text gives way to another message on the right. There is no abrupt background-colour change.

Assessment: the transition feels continuous because the visitor retains a recognisable point of reference. Use the first scroll to approach Jatto's doorway and reveal depth behind it. Reserve readable space for text throughout.

### 4. Problem, first beat: fragments replace the whole

Observed: the coherent shape gives way to scattered particles behind centrally composed text. The DOM confirms a first passage describing dispersed knowledge and time spent looking for it.

Assessment: the illustration and argument reinforce each other. For Jatto, use recognisable pieces of a life and its competing demands. Avoid suggesting that having several interests is itself a defect.

### 5. Problem, emotional beat

Observed: the floating field persists while the next text passage appears. The DOM describes the human experience of uncertainty and interruption. Some text was clipped in captures.

Assessment: this adds feeling after explanation. Jatto's equivalent should be short and personal: the pressure to grow while staying close to what matters. His voice should accompany the visitor, with a concrete personal example rather than a catalogue of anxieties.

### 6. Problem, final beat

Observed: another passage appears in the same visual world. The DOM describes the limitations of existing tools.

Assessment: a third problem passage suits a product sales argument more than this personal introduction. Compress the equivalent on Jatto's homepage. Give the extra space to useful work and real stories.

### 7. Resolution: the particle material becomes a new readable object

Observed: a lightbulb-shaped particle object accompanies the resolution passage. The individual fragments remain recognisable as the same material used earlier. Exact transition geometry was not reliably captured.

Assessment: the transformation is meaningful because it resolves the earlier visual state. Jatto's corresponding reveal is that the different rooms share one structure and one continuing source of light.

### 8. Mission: widen the meaning

The DOM confirms a mission passage after the resolution. Partial captures show the shared particle environment continuing, but did not reliably establish the complete composition or its motion.

Assessment: the structural move is useful: after showing what happens, explain why it matters. Jatto's promise belongs here as a conclusion supported by the rooms already seen. Full visual judgment is pending.

### 9. Team: introduce people and tangible credibility

Observed: real rounded portraits, an active person with a larger/brighter image, nearby role/name/social information, and Previous/Next controls. The desktop capture showed a horizontal portrait arrangement. On mobile, the person information and controls stack with the recruiting copy. Mobile navigation reached this region, and a Next action was exercised; the entire animated transition was not validated.

Assessment: the site becomes more human after its abstract sequence. Jatto needs that human evidence much earlier. Use his real face and actual work inside the first two scenes, then let the rooms deepen it.

### 10. Investors: external credibility

The DOM lists backers and a supporting credibility passage. A clean complete visual capture was not obtained.

Assessment: the analogous content for Jatto is a small selection of verifiable work, experience, or attributed feedback. It should arise naturally in the relevant room. Avoid inventing a large logo wall or impressive metrics to fill the reference layout.

### 11. Closing invitation

The DOM returns to the opening proposition and a primary access action, then navigation, legal links, and social/contact routes. The complete closing animation was not validated.

Assessment: returning to the initial invitation gives the page closure. For Jatto, return to the original doorway with the visitor now understanding who is behind it. The existing personal contact view is a fitting destination.

### 12. Mobile and navigation

Observed: the desktop navigation becomes a menu button; the primary action remains visible. Opening the menu exposes a dark panel containing navigation and another primary action. The hero keeps large type and crops the particle visual into the available space. A dark text surface gives the paragraph a quieter background. The cookie notice remains prominent.

Assessment: preserve hierarchy on small screens, but compose a dedicated mobile story. Jatto's five rooms should remain explicit links. Any moving artwork needs a reading-safe area. Repeated carousel items and split-letter text appear in Dala's accessibility structure, so its rendering technique is not an accessibility implementation template.

## Visual direction and colour roles

Use the exact requested base substitutions. Black, white, and the two grays stay from the reference. Do not dilute the direction back into the current warm-paper homepage.

| Role | Reference | Proposed base |
| --- | --- | --- |
| Canvas | #000000 | #000000 |
| Main text | #FFFFFF | #FFFFFF |
| Secondary text | #9A9A9A | #9A9A9A |
| Supporting text | #BDBDBD | #BDBDBD |
| Primary chromatic accent | #8052FF | #792A3D |
| Warm accent | #FFB829 | #EFC9A3 |
| Cool accent | #15846E | #1B3358 |

Maroon carries the primary filled action, a door surface catching light, and deliberate accents. Peach carries emitted light, highlighted invitations, and focus indication. Navy carries shadowed room depth and cool spatial separation. Black is the unifying canvas rather than the navy of the current prototype.

Calculated contrast with the WCAG relative-luminance formula: white on maroon 9.50:1; maroon on black 2.21:1; peach on black 13.55:1; navy on black 1.66:1. These results explain why the substitutions cannot be assigned blindly to every old role. Maroon and navy can be materials and atmosphere; neither is suitable for small reading text on black. Essential controls need sufficiently visible labels, focus treatment, and boundaries where their shape is necessary to recognise the control. Use white or peach for small interactive marks. Adjust material lighting or a nearby shade only where the scene requires separation.

Dala's rendered particles also include colours beyond the three named chromatic tokens. For Jatto's original scene, derive the particle and lighting colours from his three replacements and the neutral palette. Do not accidentally retain a rainbow through an imported shader palette.

Typography should move toward the reference's neutral grotesk: large regular-weight headlines, tight tracking, generous negative space, and simple body text. PP Neue Montreal is the direct reference choice, subject to a suitable self-hosting licence. The final font choice should be tested against real Jatto copy. Fraunces should no longer dictate the cinematic homepage or wordmark. Its use elsewhere in the brand can be decided separately. Keep the reviewed Arabic-text requirements and proper code typography where those content types need them.

## The proposed Jatto story

The following copy is working copy for a storyboard, not a replacement for the canonical brand statement.

### Scene A. Someone is home

The first frame is black. Jatto's name is visible and a restrained doorway occupies the composition. A little peach light appears at the threshold. The door opens a few degrees and the view resolves into the hero. Keep the first-visit flourish around 1 to 1.5 seconds when assets permit, with no artificial waiting. Returning visitors and reduced-motion users see the resolved view immediately.

This is an arrival animation rather than an asset-loading gate. The page text and navigation must work while the 3D layer is still preparing.

### Scene B. Meet the person

Large white type reads: "Grow without losing yourself." Supporting copy identifies Jatto as an engineer and entrepreneur who writes, speaks, and mentors. The exact existing supporting line can serve as the first draft.

To the right, the open doorway contains a real image or short, silent filmed moment of Jatto. The viewer sees a person early. The framing has depth, warm side light, and a few meaningful objects, with substantial black space around it. Avoid replacing the person with a particle portrait.

The header retains About, Writing, Speaking, Building, Mentoring, and the contact door. "Explore the rooms" scrolls into the introduction. "Come on in" continues to open Contact, so the interaction the owner likes retains a consistent meaning. A selected work can supply the existing "Start here" route elsewhere in the first content beat if needed; do not give one label two destinations.

### Scene C. Cross the threshold

On the first deliberate scroll, the camera approaches the doorway. Its frame expands past the viewport edges and briefly becomes a mask for the next composition. A warm edge of light remains visible. The camera motion is straight and restrained, with no roll or sudden acceleration.

Working line: "There are different rooms to my life."

A second line can name the human connection: "The things I build, the words I share, and the people I make time for."

This passage should occupy one short transition. It should not force a visitor to navigate a simulated building.

### Scene D. The rooms come into view

A small set of open architectural frames appears in depth. They feel related through proportions, materials, and light. Content is visible through each opening. The scene previews the rooms; each room also has a normal linked page.

| Room | What it reveals | Scene material | Useful action |
| --- | --- | --- | --- |
| About | The person and the story behind the work | Real portrait, one verified turning point, a personal object | Read my story |
| Writing | How Jatto thinks and makes sense of experience | A real essay excerpt, poetry or notes, his writing surface | Read an essay |
| Speaking | His voice in conversation and public | A real video still or quiet clip, talks and conversations | Watch a conversation |
| Building | Ideas made tangible through engineering and entrepreneurship | Actual product views, one clear problem and contribution | See what I am building |
| Mentoring | His attention to people coming up behind him | A real question and useful response; a welcoming chair if used as a physical cue | Find guidance |

About can be established through the earlier portrait and a later biographical passage; it does not require a fifth repetitive full-screen animation. The homepage should give balanced attention to the rooms, with one bounded Building passage. The full archives live in their destinations.

A guided scroll can reveal Writing, Speaking, Building, and Mentoring in sequence. Keep all room links available so people can skip directly to what they want. Do not make everyone complete five camera flights before they can read an essay.

### Scene E. Let the differences feel real

Writing has the closest, quietest camera. Text moves into place and holds still long enough to read. Speaking opens the composition around real human footage. Building introduces a more structured arrangement around a real artifact. Mentoring slows the pace and gives space to a question and response.

The palette and type remain shared. The differences come from content, light direction, framing, and pacing. A room must explain what it contains before its visual treatment becomes elaborate.

### Scene F. Reveal the common ground

The camera draws back just enough to show that the room frames share one foundation. A continuous warm light remains across them, even as the room content changes. This is the key meaning-bearing transformation.

Working copy: "As my life grows, I want my faith, my character, and the people I love to grow with it."

Support it with one short, true story or decision. The foundation is a visual expression of a principle; it should not turn faith into a mystical visual effect. Avoid animated scripture or sacred text used as texture.

### Scene G. Turn the invitation toward the visitor

The room architecture recedes so the text has room to breathe. The original headline returns in the context of what has just been seen, or a shorter invitation leads to a selected piece.

Working copy: "I am building that life in public, and sharing what I learn along the way."

Offer one strong next piece to read or watch, with a reason it is a useful beginning. The letter can follow as a quiet ongoing connection. Keep subscription mechanics ordinary and clear.

### Scene H. The door stays open

Return to the doorway from the beginning. It is already open. Jatto's name and a brief invitation sit beside it. "Come on in" reveals the familiar personal contact view: portrait, email, social links, and the sign-off.

The narrative door and the contact door share their visual language. The contact control always means Contact. The large architectural scene should not masquerade as a second ambiguous contact control.

## Contact, room pages, and return visits

Preserve the contact dialog's personal warmth and the behaviour the owner liked. The header icon can keep its light, hover opening, and welcoming figure. Adapt its surfaces to the new black-based palette, then test the existing focus trap, Escape handling, return focus, and background inertness. Keep a normal Contact route.

Room transitions use the same brief threshold gesture. Once inside, the content settles. Writing prioritises reading; Speaking prioritises finding and playing videos; Building prioritises understanding real work; Mentoring prioritises useful guidance and the actual ways to engage. Each route needs to be useful when opened directly, including from search or a shared link. No homepage intro should replay on every article.

For mobile, use a shorter opening and a single-column composition. The room previews become clear, vertically arranged passages with restrained reveals. Keep the common-ground reveal, but use little or no camera travel. Reduced motion retains the full story in static compositions. All important content and navigation stay in HTML, independent of WebGL.

## What changes in the brand guide

Proposed changes: black becomes the cinematic website canvas; the requested accent substitutions become the website palette; sans-serif display typography replaces the current homepage serif; the portrait appears within cinematic scenes; the door develops into a spatial storytelling device; and the homepage order changes from content blocks to a connected narrative.

Keep: the existing positioning, builder identity, grounded perspective, mentorship purpose, room names, direct personal invitation, truthful claims, privacy boundaries, and faith/source discipline. Keep the door as a gesture rather than automatically promoting it to the identity mark. The name and the real person remain the identifiers.

The current guide's light-first rule, colour percentages, Fraunces homepage treatment, and tightly limited motion language need explicit revision if this direction is chosen. The owner's new brief supersedes them for this proposal. No need to invent a new personal identity to justify a new website treatment.

## Implementation direction

The public Dala bundles include Three.js rendering code, shaders and model loading, GSAP timelines, ScrollTrigger integration, a smooth-scroll controller, and a DOM-to-WebGL layer. This is evidence for those technologies; it does not establish every authoring tool used by the studio. No verified evidence here identifies the site as a Framer-built site.

Recommended architecture for Jatto:

1. Keep the existing Next.js application, routes, and content.
2. Use Three.js for one shared spatial scene: doorway, light, camera, room frames, and depth. A React binding is optional.
3. Use GSAP/ScrollTrigger for the coordinated story timeline and bounded pinned passages. Let native document scroll remain usable.
4. Keep ordinary text and controls in HTML. Animate text containers when needed, but avoid moving the reading interface into the 3D renderer.
5. Use the existing Motion/Framer Motion dependency for isolated contact or menu interactions only where helpful. One system owns each animated property; two animation systems must not compete over a transform.
6. Prepare static poster compositions and reduced-motion layouts before the heavy scene is required. Lazy-load detail, cap rendering resolution, and reduce effects on small devices.

Official capability references: [Three.js fundamentals](https://threejs.org/manual/en/fundamentals.html), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and [Motion scroll animation](https://motion.dev/docs/react-scroll-animations).

The most consequential production work is art direction: door proportions, lighting, authentic media, camera blocking, readable transitions, and the relationship between rooms. Choosing libraries will not supply those decisions.

## First proof to build after the concept is agreed

Storyboard the arrival, the threshold transition, and the common-ground reveal. Those three frames test whether the metaphor works. Then build one continuous interaction containing the hero, one room transition, the foundation reveal, and the preserved contact door. Evaluate its warmth, clarity, pacing, mobile composition, keyboard use, and reduced-motion form before extending it to every room.

The key creative choice is the degree of physical detail. Recommendation: recognisable doorways and a few real objects in an otherwise abstract black space. This offers cinematic depth while keeping Jatto's face, ideas, and work at the centre.
