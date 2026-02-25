# BSLA Deal Room — Bug & Fix List
## Comparing live build vs. design mockup

---

### CRITICAL — Layout & Structure

**1. Sidebar: "All Documents" overlapping the BIGSTAR logo in top bar**
- In the screenshot, "All Documents" text is rendering on top of the BIGSTAR wordmark in the top-left corner
- The sidebar nav should START below the top bar (56px from top), not overlap it
- Fix: Ensure the sidebar's first nav item starts below the topbar. The layout grid should be `grid-template-rows: 56px 1fr` with the sidebar in the second row, OR add `padding-top` to the sidebar to clear the fixed top bar

**2. Sidebar: "All Documents" should be its own nav item, not a heading**
- In the design, "All Documents" is the first clickable nav item with a document count (15) — when active, it shows all 8 categories
- Currently it appears to be merged/overlapping with the header area

**3. Sidebar: Missing contact card at the bottom**
- Cecil's headshot, name, title, phone, email, and "Book a Call" button should be pinned at the bottom of the sidebar
- The contact card should have: photo (headshot image, grayscale-filtered), name "Cecil Robles", role "Chief Revenue Officer", phone "(469) 776-0908", email "cecil@bigstarblockchain.com", and a gold "Book a Call" button
- The sidebar should use `display: flex; flex-direction: column` with the contact card using `margin-top: auto` to pin it to the bottom

**4. Sidebar: Document counts clipped on right edge**
- The document counts (15, 1, 5, 2, 2, 1, 2, 1, 1) appear to be cut off on the right side of the sidebar
- These should be fully visible, right-aligned within the sidebar width
- Fix: Ensure the sidebar has enough width (280px) and the count spans have `flex-shrink: 0` and aren't overflowing

---

### HIGH — Top Bar Issues

**5. Top bar: BIGSTAR and "LAND ACQUISITION" rendering incorrectly**
- The screenshot shows "BIGSTARLAND ACQUISITION" running together or overlapping
- Should be a stacked lockup: "BIGSTAR" on top (Fraunces 800, 16px), "LAND ACQUISITION" below (Fraunces 500, 6.5px, letter-spacing 3.5px)
- These should be in a flex column: `display: flex; flex-direction: column; line-height: 1`

**6. Top bar: Gold vertical divider missing between logo and "Private Deal Room"**
- Design has a 1px gold divider (24px tall) separating the logo lockup from the "PRIVATE DEAL ROOM" label
- CSS: `width: 1px; height: 24px; background: rgba(201,165,78,.15)`

---

### MEDIUM — Main Content Area

**7. Welcome banner: Stats section needs border-top separator**
- The $7.5M / 15 / 8 stats row should have a `border-top: 1px solid rgba(201,165,78,.08)` and `padding-top: 16px; margin-top: 20px` to visually separate it from the description text

**8. Welcome banner: Stat values should be Fraunces serif, not sans-serif**
- "$7.5M", "15", "8" should use `font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700`
- Currently they may be rendering in DM Sans

**9. Category headers: Spacing between categories feels tight**
- Design spec calls for `gap: 48px` between category blocks in the `.all-cats` container
- Verify there's enough vertical breathing room between each section

**10. Document cards: Verify hover states are working**
- On hover, cards should: lift slightly (`transform: translateY(-1px)`), gain a subtle shadow (`box-shadow: 0 4px 16px rgba(0,0,0,.06)`), and the border should shift to a gold tint (`border-color: rgba(201,165,78,.15)`)

**11. Document card buttons: Style check**
- "VIEW" button should be outlined/light: white background, light border, dark text
- "DOWNLOAD" button should be filled/dark: navy background, white text
- Both should be 11px, uppercase, letter-spacing 0.5px
- Verify they're not both the same style

---

### LOW — Polish & Details

**12. Sidebar nav: Active state should have gold left border**
- The active nav item should have `border-left: 2px solid var(--gold)` and a subtle gold background tint `background: rgba(201,165,78,.1)`
- Currently "06 Corporate Documents" appears highlighted (blue-ish) — should be gold-tinted

**13. Sidebar nav: Hover state**
- On hover, nav items should get `background: rgba(201,165,78,.06)` — very subtle gold tint, not a stark color change

**14. Confidential watermark in bottom-right**
- Should be fixed position, bottom-right: "Confidential · BSLA, LLC · Do Not Distribute"
- `font-family: 'JetBrains Mono'; font-size: 8px; letter-spacing: 2px; color: rgba(148,163,184,.2)`
- Very faint, non-interactive (`pointer-events: none`)

**15. Main content scrolling should be independent of sidebar**
- The sidebar should be fixed/sticky (full height, scrollable independently if content overflows)
- The main content area should scroll independently
- CSS: Both `.sidebar` and `.main` should have `overflow-y: auto` within the grid layout

**16. Category filter functionality**
- Clicking a sidebar nav item should filter the main content to show ONLY that category
- Clicking "All Documents" should show all categories + the welcome banner
- When filtering to a single category, hide the welcome banner

**17. Fonts: Verify Fraunces is loading**
- All headlines (category titles, welcome banner "BSLA Deal Room", stat values) should be in Fraunces serif
- If Fraunces isn't loading, the Google Fonts import URL needs the full variable weight range:
```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,400;1,9..144,700
```

**18. Mobile responsive: Sidebar collapses to horizontal scroll**
- At ≤1024px, sidebar should become a horizontal scrollable nav bar below the top bar
- Contact card hides on mobile
- Main content becomes full-width

---

### Summary Priority Order

| # | Issue | Priority |
|---|-------|----------|
| 1 | "All Documents" overlapping logo | Critical |
| 2 | "All Documents" as nav item | Critical |
| 3 | Missing contact card | Critical |
| 4 | Document counts clipped | Critical |
| 5 | BIGSTAR/LAND ACQUISITION text overlap | High |
| 6 | Missing gold divider in top bar | High |
| 7 | Stats border-top separator | Medium |
| 8 | Stat values font (Fraunces) | Medium |
| 9 | Category spacing | Medium |
| 10 | Card hover states | Medium |
| 11 | Button style differentiation | Medium |
| 12 | Active nav gold border | Low |
| 13 | Nav hover state | Low |
| 14 | Confidential watermark | Low |
| 15 | Independent scroll areas | Low |
| 16 | Category filter function | Low |
| 17 | Font loading verification | Low |
| 18 | Mobile responsive | Low |
