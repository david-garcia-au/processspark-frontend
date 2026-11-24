---
name: solution-demo-video
description: "Use when building, extending or editing a scripted interactive 'video' demo on a ProcessSpark solution page (e.g. Talk to Your Documents, Digitise Your Paperwork, Supplier Portal). Covers the story structure, beats and durations, the square narration cards, the CRM-styled stage, cursor and micro-animations, images, EN/ES copy, page placement and how to QA it with screenshots."
---

# Solution demo "video": how it is built

The reference implementation is the **Talk to Your Documents** demo. Copy its pattern for every new solution demo. It is a scripted player inside a CRM-looking window, not a real video and not an iframe. The website visitor only presses play, pause, back and forward. Everything else is scripted.

Reference files (in the `site-restructure` worktree, `/Users/david.garcia.au/ProcessSpark/site-restructure-worktree`):

| File | What it holds |
|---|---|
| `components/docs-demo.tsx` | The player: beats, timings, micro-steps, cursor, cards, controls |
| `lib/crm-demo.ts` | All copy and data, EN and ES (`docsDemo`, shared `crmDemoUi`) |
| `app/crm-demo.css` | Stage and CRM look, scoped to `.crm-stage`; imported in `app/[lang]/layout.tsx` |
| `app/solution-demo.css` | Page section around the stage (`.demo-section`, `.demo-head`) |
| `app/[lang]/solutions/[product]/page.tsx` | Renders the demo section for the product id, right after the hero |
| `public/images/demo-*.webp` | Photos used by the photo beats |

A second, finished demo follows the same pattern: **Quote & RFQ Automation** (`/solutions/quotes-rfqs`). It has its own player `components/quotes-demo.tsx`, data `lib/quotes-demo.ts` (EN with A$ and GST, ES with euros and IVA 21%) and `app/quotes-demo.css` (`qd-*` classes, also imported in `app/[lang]/layout.tsx`), and reuses the `crm-demo.css` stage, cards, cursor and controls. Give each new demo its own component and data file like this, rather than generalising `docs-demo.tsx`.

A third demo reuses `DocsDemo` with a different script: **Talk to Your Documents for contract managers** (`contractsDemo` in `lib/crm-demo.ts`). Anna is a contracts manager and Matt a project manager, and Anna asks the documents for him. Optional data fields switch the player's behaviour: no `faultPhoto` skips that beat, `chatBy: "admin"` puts Anna at the keyboard, `docs.others` adds rows, `story: "contracts"` picks the card icons, and `resolvedCardAt: "left"` keeps the closing card off Matt. A row low in a longer table opens its menu upward. It is shown on the demos page (below), not on a solution page yet.

Older groundwork (`components/solution-demo.tsx`, `lib/demos.ts`, generic timed engine) is not the pattern. Don't build on it.

## Rules David has set

- **The square cards are the only narration.** No caption strip at the bottom, no white text on the photos.
- **Each card stays on screen for about 6 seconds.** 2 seconds was far too short to read.
- **A person intro shows alone for 4 seconds** before its card fades in, then the card stays about 6 seconds: every intro beat is 10 seconds. David asked for this on the contracts demo. Use it for every person in every demo.
- **On an app screen, the task card shows before the cursor moves.** The screen is dimmed behind it; the card goes, then the cursor starts.
- **The cursor hits real elements.** Positions are measured from element refs, never guessed percentages.
- **Pace:** slow and calm. Transitions crossfade, and nothing changes in under ~2 seconds.
- **No vendor or platform names** (no Microsoft, AWS, etc.). Names, dates and figures are invented.
- **Every string exists in English and Spanish.** For Spanish, use direct, common terms.
- **CTAs elsewhere point to the demo** with "See it in action" / "Míralo en acción" (menu card and home hero). Nothing points to demo.processspark.com.
- **Fixed-size card, no inner scrolling.** Everything visible must fit the stage.
- **The demo returns to the start screen** by itself when it finishes.
- **Commit and push only when David asks.**

## Story structure

A demo tells one short story with two or three people, in this order:

1. **Start screen.** The first photo, blurred and dimmed, with a square card: the product name as the label, one sentence on what it does, and the **Run the demo** button inside the card.
2. **Person A intro (photo).** "Meet Anna, Service admin" plus one line. After 4 seconds, the situation card ("New manual version …").
3. **Person A's app screen.** First a task card ("Anna's task: upload, mark as current, set access"), then the cursor does the work: clicks, picker, spinner, new row, three-dots menu.
4. **Person B intro (photo).** "Meet John, Service technician". After 4 seconds, the trigger card ("Alarm: press out of service …").
5. **The problem (photo).** The fault screen photo, no text.
6. **Person B's app screen.** He types the question in AI Chat, sees "thinking", then the answer with its source. Then the result card ("Fault fixed …").
7. **Resolution (photo).** The all-green panel, then the closing card ("Back in production …").
8. **End:** back to the start screen.

Ask David for each new demo's script: who the people are, what they do on screen, and what each card says. Don't invent the story beats.

## Beats and timings (reference values)

The beats are listed in `BEATS`, and `BEAT_MS` sets how long each one runs before auto-advancing. After the last beat, the player resets to the start screen.

| Beat | Screen | Length | What happens inside (ms from beat start) |
|---|---|---|---|
| `intro-admin` | Photo | 10000 | Card at 4000 |
| `upload` | Docs | 17000 | Task card 0–5400 (screen dimmed); cursor to Upload at 6700, click at 8200; picker at 8800; file at 9800, selected at 11000; Open at 11800, click at 12800; spinner at 13100 ("Uploading and extracting context…", about 2.2 s); v2 row lands at 15300 |
| `permissions` | Docs (same window) | 9600 | Cursor to ⋮ at 800, click at 2200; menu at 2800; team at 3800, click at 5000; granted at 5600; "Supersedes v1" at 6400, click at 7400; menu closes and cursor hides at 8000 |
| `intro-tech` | Photo | 10000 | Card at 4000 |
| `fault` | Photo | 5600 | Photo only |
| `question` | Chat | 8000 | Composer at 700; typing starts at 1500, 110 ms per character |
| `answer` | Chat (same window) | 14500 | "Thinking" 0–2600; answer at 2600; source panel at 4200; result card at 7500 (screen dimmed) |
| `resolved` | Photo | 9000 | Card at 1800; then reset to the start screen |

Total run time is about 85 seconds. When you add a card, give it about 6 seconds before the next change.

Pattern for a micro-step: `at(ms, () => setMicro(n))` or `pointAt(ref)`, with `ms` counted from the start of the beat.

In `DocsDemo` the intro delay comes from the data (`introDelayMs`, default 2000; all three demos set 4000), and the intro beat grows by the same amount so the card keeps its 6 seconds. In `QuotesDemo` it is set in the component.

### Playback: how Pause, Play, Back and Forward must work

Every timed step goes through the pausable beat clock, `useBeatClock(playing)` in `components/demo-clock.ts`. Never call `setTimeout` for a step directly.

- **Every step is registered with `at(ms, fn)`.** This includes cursor moves, clicks, each typed character, cards, and the advance to the next beat (`at(beatMs, advance)`). There is no separate auto-advance timer.
- **Pause freezes the beat.** No step fires while paused: the cursor, typing and cards stop where they are, and the clock keeps the time already played.
- **Play resumes where it stopped.** Only the time that was left is waited. The bug this fixed: Pause only stopped the advance timer while the steps kept playing, and Play restarted the whole beat length (up to 24 s of nothing).
- **Back and Forward jump to the start of that beat and play from there,** even if the demo was paused. A paused beat at 0 ms is often an empty screen.
- **A new beat calls `clock.reset()`** (aliased `clearTimers`), and the end of the demo resets to the start screen.
- **Reduced motion:** register the steps, then call `clock.flush()` so the beat's end state shows at once with no timers.

To QA it, start the demo, pause 3 seconds into a beat, and wait 6 seconds. Nothing should change. Press Play and check the next step comes after the remaining time. Check the DOM (`.crm-stage[data-beat]`, number of `.crm-brief`) as well as screenshots.

## Narration cards (`.crm-brief`)

- **Size:** a square about 340px wide (`aspect-ratio: 1`), with 32px padding and 20px corner radius. The start card is 380px wide and holds the button.
- **Glass effect:** white at 70% opacity (`rgb(255 255 255 / .7)`), `backdrop-filter: blur(14px) saturate(1.4)`, a soft shadow and a thin white border.
- **Top:** a short blue bar (`::before`, 44×4px, `#2f5bff`), then the label (uppercase, 0.78rem, 600 weight, `#2447d6`) with a lucide icon. The text below is 1.45rem, 500 weight, `#0b1120`.
- **Placement:**
  - `data-at="intro"`: right side, vertically centred, clear of the person's intro text. Used on every intro photo, even when the person sits on the right of the photo (Matt): the "Meet …" name, role and line must always stay visible, so never put the card over them or fade them out.
  - `data-at="corner"`: lower right, so the photo's key content stays visible (the green "NORMAL OPERATION" banner).
  - `data-at="center"` inside `.crm-brief-scrim`: centred over a dimmed app screen (`rgb(15 23 42 / .18)`). Used for task and result cards.
- **Motion:** fade and scale in from 0.96 over 0.8 seconds. Don't animate `translate` on cards that are positioned with `translate`.
- **Data:** `briefs.<name> = { label, text }` in `lib/crm-demo.ts`, in both languages.
- **Icons used:** MessageSquareText (start), BellRing (new version), ListChecks (task), TriangleAlert (alarm), Wrench (fixed), CircleCheck (resolved).
- **Copy:** one or two short sentences, about 20–25 words. The label names the situation ("Alarm: press out of service").

## The stage (CRM look)

- **Size:** `height: min(720px, 100svh - 150px)`, `min-height: 480px`, 20px radius. The stage never grows or scrolls.
- **Look:** taken from the CRM design (`docs/DESIGN` and the reference repo `/Users/david.garcia.au/ProcessSpark/AI-CRM-with-Zernio`). Geist font (`geist` package), neutral grays, white rounded cards, gray-900 primary buttons, a light-blue tint (`--crm-blue: #2f5bff`, `--crm-blue-soft: #e8eefc`). The UI is rebuilt with plain markup and CSS. Don't copy shadcn components.
- **Chrome:** a tab strip (Documents / AI Chat) and a user pill (avatar, name, role) for whoever is acting.
- **App screens:**
  - Docs: folder sidebar, file table with version pills (v1 grey, v2 blue), a "Supersedes v1" pill, a permission pill, and a ⋮ menu that opens **downward** with the teams, a separator and the supersede option.
  - macOS-style file picker: decoy files plus the right one.
  - Upload spinner bar.
  - Chat: full window with a left sidebar (New chat, Chats, thread title), user bubble, "Searching your manuals and past jobs" spinner, answer, source chips and source panel with the cited line highlighted.
- **Playback bar** (54px at the bottom): Back, Play/Pause (Replay on the last beat) and progress dots. Content leaves `padding-bottom: 54px` for it.
- **Crossfades:** 0.9 seconds by default, and 1.4 seconds into and out of photo beats.

### Transition rules (bugs already fixed, don't reintroduce)

- **Key the window by screen, not by beat.** Use `screenKey = docs | chat | <beat>`. Beats on the same screen (upload → permissions, question → answer) must keep the window mounted, or it blinks to blank and rows animate in again.
- **Never give two siblings the same React `key`.** The window and an overlay keyed with the same value made the old screen stick.
- **The cursor enters from the middle of the stage, then travels** to its target (`pointAt` with `cursorRef`). It must never pop up on its target.
- **A new row gets a short tint that fades by itself** (`crm-rowflash`, 2.4 seconds). A permanent tint hid the blue v2 pill.
- **Hide the cursor once its last click is done.**
- **Menus and popovers must not cover the button that was just used,** or get clipped by the card edge.
- **A table inside `.crm-docs` needs `align-self: stretch`.** `.crm-table` has `align-self: start`, so in the column flex layout it shrinks to its content instead of filling the width.

## Images

- **Photo beats:** `object-fit: cover`. Intro photos sit behind a dark left-to-right gradient so the white intro text reads.
- **Formats:**
  - Intro photos: 3:2, about 1536×1024 (`demo-anna.webp`, `demo-john.webp`).
  - Machine and screen photos: 16:9, 1600×900 (`demo-plc.webp` fault, `demo-plc-green.webp` resolved). A "before" and "after" pair should share framing.
- **Conversion:** David drops PNGs into `public/images` (often in the main checkout, `processspark-frontend`). Convert them to WebP at quality 80 with sharp, then delete the PNG:

  ```
  node -e 'require("sharp")(SRC).resize({width:1600,height:900,fit:"cover"}).webp({quality:80}).toFile("public/images/demo-x.webp")'
  ```
- **Size target:** about 110–150 KB each. Write alt text in both languages.

## Page placement

- **Section order on the solution page:** hero (short, shared by all solution pages), then the demo section, then "What it does", then the rest.
- **Demo section:** `<section className="demo-section" id="demo">` with a full-width grey band and an inner `.shell`. It holds only the "Interactive demo" label, the heading and the stage: no intro paragraph, no "illustrative" note, no CTA row. The heading follows the "Upload a manual, define permissions, get the answers" pattern.
- **Anchor:** `#demo` with `scroll-margin-top: 76px`. `demoPath` lives in `lib/catalogue/structure.ts`, which the menu "See it in action" card and the home hero button use.

## The demos page (`/[lang]/demos`)

Every demo is also listed on one page, with filter chips for product and team (one of each, or All, combined). All "See it in action" links (`demoPath` in `lib/catalogue/structure.ts`: menu card, home hero) point here. A demo can also stay on its solution page.

- **Registry:** `lib/demo-gallery.ts`. `demoEntries` (order on the page) gives each demo an `id` (its anchor), a `kind` (which player and script), its `products` and its `teams`, and a demo can have several of each. `demoTeamIds` plus the EN/ES `teams` labels are the team list, separate from the catalogue.
- **Component:** `components/demo-gallery.tsx` (client) renders the chips and the matching demos. Each has its heading, product tag (blue) and team tags. When nothing matches, it shows a message and a "Show all demos" button. Styles are in `app/demo-gallery.css`.
- **Chips:** only products and teams that have a demo get a chip. They use the product's `shortName`, because the full Spanish names wrap.
- **To add a demo:** add its script, add a `kind` and render branch in the gallery, pass the script from `app/[lang]/demos/page.tsx`, and add an entry with its products and teams.
- **Listings:** the page is in the sitemap and llms.txt.

## Accessibility and behaviour

- **Reduced motion:** play jumps to the last beat and `clock.flush()` shows its end state, with no timer.
- **Decoration:** the cursor, tabs and decorative parts are `aria-hidden`. Controls have labels from `crmDemoUi`.
- **Mobile:** not designed yet. Ask David before shipping a new demo to phones.

## QA without Playwright

- Drive headless Chrome over CDP with a small Node script. Launch with `--headless=new --remote-debugging-port=97xx` and a fresh `--user-data-dir`, wait about 7 seconds, navigate, then remove `.consent`.
- Click `.crm-run` to start. Step with `.crm-ctl[2]` (Forward), which jumps to the start of the next beat and plays it, then wait N ms and screenshot at 1280×860. Pause (`.crm-ctl[1]`) now freezes the beat, so don't pause before waiting for a step to appear.
- Check the DOM as well as the picture: the beat in `.crm-stage[data-beat]`, a single `.crm-win`, and console errors (`Runtime.consoleAPICalled` type error).
- Kill stale `remote-debugging-port=97` Chrome processes before each run. The `read_file` image cache can show an old screenshot under the same name, so use a new file name per shot.
- Check both `/en/` and `/es/`, every card, the spinner, the open menu and the end reset.
- Type check: `npx tsc --noEmit`. Ignore errors matching `AppRoutes`, `unknown'`, `.next` and `never`.
- The dev server is David's (`npm run dev` in the worktree, port 3000). Don't start another.

## Checklist for a new solution demo

1. Get the script from David: people, screens, actions, card texts and photos.
2. Add a data object (EN and ES) in `lib/crm-demo.ts`, with briefs, photos and screen copy.
3. Build the beats, `BEAT_MS` and micro-steps, reusing the stage, the cards and `pointAt`.
4. Convert the photos to WebP and delete the PNGs.
5. Render the demo for the product id in the solution page and set the heading.
6. Run screenshot QA in EN and ES. Then tell David what changed and what wasn't checked (live motion, mobile).
7. Wait for his notes. Commit and push only when he asks: rebase on `origin/main` first, then push `HEAD:main` and `HEAD:site-restructure`.
