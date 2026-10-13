# ProcessSpark — Content Revision Report

Iteration: 1 (first pass; no prior verdict file present).
Scope: TEXT-ONLY copy revision per `.agents/tasks/content-revision-spec.md`. No colours, fonts,
spacing, typography, dimensions, layout, navigation, section structure, responsive behaviour or
animations were changed. Visuals were handled per the updated image-handling direction (described
placeholders, same dimensions — see FLAGS).

## Verification

- Command: `npm run build` (run in `/Users/david.garcia.au/ProcessSpark/processspark-frontend`).
- Result: `✓ Compiled successfully`, TypeScript passed, all 11 static pages generated, **exit code 0**.
- `components/structured-data.tsx` and `app/llms.txt/route.ts` are generated from `lib/content.ts`
  / `lib/site.ts`; they were NOT hand-edited and rebuilt cleanly, auto-propagating the new copy.

## Change log

### Hero (`app/page.tsx`) — §2
- 2.1 Headline → "Less manual work. Smoother operations."
- 2.2 Supporting headline → "Make everyday work easier, faster and more reliable."
- 2.3 Main description → paperwork/spreadsheets/repetitive-tasks opener.
- 2.4 Secondary description → "find the work that slows your team down…".
- 2.5 Primary CTA → "Show us what's slowing you down"; secondary → "Explore the possibilities".

### Hero Demonstration (`components/transformation-visuals.tsx` VisionHero) — §3
- 3.1 Badge → "LESS PAPERWORK. MORE PRODUCTIVITY."
- 3.2 Caption → "FROM MANUAL DATA ENTRY / To information ready when you need it."
- 3.3 Workflow steps → "Documents received → Information extracted → People review".
- 3.4 Supporting statement → "Less copying. Fewer errors. Faster processing."
- 3.5 Visual → see FLAGS (described placeholder; same container).

### Value proposition band (`app/page.tsx`) — §4
- 4.1 Headline → "Less repetitive work. More time for what matters."
- 4.2 "make. move. maintain." + sector list — KEPT UNCHANGED.

### Business Transformation (`components/transformation-visuals.tsx`) — §5
- 5.1 Eyebrow → "SMALL CHANGES. MEASURABLE IMPROVEMENTS."
- 5.2 Headline → "Same work. Less effort to get it done."
- 5.3 Supporting lines → documents/reports/information triplet.

### Document Processing example — §6
- 6.1 Badge → "DOCUMENT PROCESSING". 6.2 "PAPERWORK IN. USEFUL INFORMATION OUT." — KEPT.
- 6.3 Heading → "Still copying information from documents by hand?"
- 6.4 Description, 6.5 TODAY, 6.6 improved-workflow text → replaced per spec.
- 6.7 CTA "See how your process could change" — KEPT.

### Business Benefits — §7
- 7.1/7.2/7.3 titles + descriptions replaced per spec (team time back / handle more work without
  adding complexity / spot problems before they become delays).

### "Sound Familiar?" (`app/page.tsx` + `lib/content.ts`) — §8
- 8.1 Intro → paperwork/manual-checks/administration.
- 8.2–8.4 Pain cards: new quotes + answers (roles & tags unchanged).
- 8.5 Under-note → "Not sure where to start? …"; button "Let's find it together" — KEPT.

### Interactive Use Cases (`lib/content.ts`, `components/process-explorer.tsx`) — §9
- 9.1 Heading "What is your team still doing manually?" — KEPT.
- 9.2 Supporting text replaced.
- 9.3 Category labels → Documents | Reporting | Requests | Searching | Writing | Talking | Inspecting.
- 9.4 All seven use cases: title/description/TODAY/AFTER/outcome replaced per spec.
- 9.5 Order: **Documents first, Inspecting (computer vision) last**; default-selected tab set to
  "Documents" (`useState("Documents")`); illustrative-workflow disclaimer preserved; tab icons
  remapped (Documents=Files, Reporting=Activity, Requests=Mail, Searching=Search, Writing=FilePenLine,
  Talking=MessagesSquare, Inspecting=ScanLine — `Mail` added to the icon map).

### Practical Possibilities cards (`lib/content.ts` + icon map in `app/page.tsx`) — §10
Reordered + retitled to: Document processing (OPERATIONS & ADMINISTRATION) · Quality documentation
(QUALITY & COMPLIANCE) · Operational reporting (OPERATIONS & MANAGEMENT) · Email and request
processing (CUSTOMER OPERATIONS) · Find answers in your technical documents (ENGINEERING &
MAINTENANCE) · Quotation preparation (ENGINEERING & SALES). Index-based icon ternary updated to
keep each card's icon sensible (Files, ShieldCheck, Activity, Mail, Search, FilePenLine).

### How We Work (`app/page.tsx`) — §11
- 11.1 Headline — KEPT. 11.2 supporting description + 11.3–11.7 step descriptions replaced
  (step titles kept).

### Technology & Integration (`app/page.tsx`) — §12
- 12.1 Heading → "Solutions that work with what you already have."
- 12.2 Description replaced. 12.3 "If AI isn't the right tool, we'll tell you." — KEPT.

### Final CTA (`app/page.tsx`) — §14
- 14.1 Headline — KEPT. 14.2 paragraph, 14.3 three benefits, 14.4 sign-off replaced per spec.

### Contact form (`components/process-brief.tsx`) — §15
- 15.1 → "LET'S START WITH YOUR CHALLENGE". 15.2 name/email/company — KEPT.
- 15.3 label → "What would you like to improve?" + 8 new dropdown options (default "Other / Not sure yet").
- 15.4 textarea label + placeholder replaced.
- 15.5 Submit → "Let's discuss your challenge" (fits full-width `.form-submit`, so no fallback needed).
- 15.6 "Opens an email draft…" message — KEPT (mechanism unchanged, as instructed).

### Footer / Nav — §16/§17
- 16.3 descriptor → "Practical solutions for real-world operations." 16.1/16.2 — KEPT. Nav — UNTOUCHED.

### Media slot keys (`lib/media.ts`)
Renamed capability slots to match new category names (capability-documents/-reporting/-requests/
-searching/-writing/-talking/-inspecting) and use-case slots to match new card titles, updating
each placeholder's label/brief/alt to the new described subject so the build resolves and the
placeholder text matches the new copy. Ratios/kinds/dimensions unchanged.

## FLAGS

1. **Hero demonstration visual (§3.5) — placeholder, awaiting real asset.** The previous bottling-
   line photo (`/images/bottle-inspection.webp`) plus the bespoke computer-vision targeting SVG
   ("Detect · Count · Check") were a computer-vision scene that contradicts the new document-
   processing copy. Per the updated image-handling direction, the inner visual was replaced with a
   same-sized described placeholder (reusing the shared `.media-placeholder` styling, positioned to
   fill the existing `.vision-photo` container exactly — height, border radius, overlays and
   styling unchanged). Placeholder caption: "Supplier certificate or delivery note entering a
   digital workflow — fields extracted, checked and ready for review". All overlay text (badge,
   caption, workflow steps) applied. The `bottle-inspection.webp` asset remains in `/public` but is
   no longer referenced. **Needs a real document-processing image.**

2. **Application-card images (§10) — placeholders, awaiting real assets.** These already used the
   `Media` placeholder mechanism (no `src`); their descriptions were updated to the new subjects:
   - Document processing → "Document details captured automatically"
   - Quality documentation → "Certificates reviewed for gaps"
   - Operational reporting → "Reports prepared from existing data"
   - Email and request processing → "Enquiries sorted and prepared for the team"
   - Find answers in your technical documents → "Answers from manuals and records"
   - Quotation preparation → "RFQ turned into a draft quotation"

3. **Interactive-explorer visuals (§9) — placeholders, awaiting real assets.** Reporting, Requests,
   Writing and Talking placeholder descriptions were re-pointed to the new subjects (reporting,
   emails/requests, quotation, service-report-from-voice-notes). Documents, Searching and Inspecting
   descriptions remained apt.

4. **Credibility paragraph (§13) — NOT added (design-preservation).** §13 is Medium priority and
   explicitly conditional on fitting "without altering design". Adding a new paragraph to the
   `.agnostic` block would introduce a new text element and change the section's vertical rhythm/
   layout, so it was left out to honour the absolute design-preservation rule. The §12 replacements
   were prioritised instead. Flag for the user: if a copy slot for this sentence is desired, it needs
   a deliberate (design-affecting) placement decision.

5. **Overflow checks.** Hero primary CTA "Show us what's slowing you down" was applied: `.button-
   primary` has a fixed height (48px) with content-driven width inside a `flex-wrap` `.hero-actions`,
   so the longer label grows/wraps without a dimension change — recommend a quick visual confirm in
   the running dev server. Contact submit "Let's discuss your challenge" sits in a full-width
   (`width:100%`) `.form-submit`, no overflow. The seven tab labels are single words comparable in
   length to the originals (e.g. "Monitoring"→"Inspecting"), so the fixed 7-column tab grid is
   unaffected.

## Cleanup
No temporary files were created.
