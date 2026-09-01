# KRUI.CO — Design System Documentation

**Brand:** KRUI.CO — Curated Tourism Platform for Krui, West Coast Lampung
**Tagline:** Explore · Capture · Experience
**Style direction:** Bright, Clean, Modern, Premium, Tropical
**Model:** Managed marketplace — partners submit info, KRUI.CO admin publishes & manages listings

---

## 1. Brand Positioning

KRUI.CO connects travelers with curated, verified local tourism partners in Krui across 7 service categories. The design should feel like a trustworthy, well-run travel startup — not a generic template, not an old-fashioned travel agency, and not a dark/moody theme.

**Core message:** *"Everything you need to explore Krui, in one place."*

---

## 2. Color System

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FAFAF8` | Primary page background |
| `--bg-alt` | `#F3F0E9` | Alternating section background |
| `--ink` | `#171717` | Primary text, headings, dark buttons |
| `--ink-soft` | `#5B5952` | Secondary/body text |
| `--line` | `#E7E3D8` | Borders, dividers |
| `--blue` | `#1E6FD9` | Tour & Guide, Surf accent |
| `--blue-soft` | `#E7F0FD` | Blue background tint |
| `--green` | `#2FA84F` | Stay, Rental accent |
| `--green-soft` | `#E7F6EA` | Green background tint |
| `--orange` | `#F5821F` | Capture, Adventure, primary CTA accent |
| `--orange-soft` | `#FDECDA` | Orange background tint |
| `--sand` | `#E8DCC8` | Neutral/Merchandise accent |

**Category color mapping** (must stay consistent site-wide):
- Tour → Blue
- Stay → Green
- Transport → Orange
- Surf → Blue (deeper teal variant `#0E8FBF`)
- Rental → Green (variant `#3C9A3F`)
- Experience → Orange (variant `#E0672F`)

**Rule:** Dark theme is never used for the main site. Footer is the one intentionally dark section (`--ink` background), used to create visual close/contrast at the bottom of every page.

---

## 3. Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headings | **Outfit** | 700–800 | H1–H4, logo, nav |
| Body | **Inter** | 400–600 | Paragraphs, UI labels, forms |
| Data / Mono | **DM Mono** | 400–500 | Prices, ratings, durations, badges, eyebrows |

**Why three fonts:** The mono face is used deliberately, not decoratively — anywhere a *fact* is being displayed (price, rating, date, category badge), DM Mono signals "this is data you can rely on," distinct from marketing copy set in Inter/Outfit.

**Scale reference:**
- H1 (hero): 58px desktop / 32px mobile, weight 800
- H2 (section): 36px desktop / 27px mobile, weight 700
- H3 (card title): 17–19px, weight 700
- Body: 15–16px, line-height 1.6
- Eyebrow/label: 12px, uppercase, letter-spacing 0.14em

---

## 4. Layout & Spacing

- Max content width: **1240px**
- Page gutter: 28px desktop / 18px mobile
- Section vertical padding: 88px desktop / 56px mobile
- Grid gap: 24px
- Border radius scale:
  - Large (hero media, page banners): 22–28px
  - Medium (cards, buttons/panels): 14px
  - Small (inputs, chips, thumbnails): 10px

---

## 5. Signature Design Element

**Contour wave lines** — a set of thin, layered wavy strokes echoing the ocean wave in the KRUI.CO logo and the coastline of Krui itself. Used as:
- Overlay texture inside the hero background
- Section dividers between major homepage blocks
- Background pattern inside category thumbnail placeholders
- The centerpiece motif inside the 404 illustration

This motif is the **one recurring signature** — it should not be diluted with unrelated decorative elements (no generic blobs, no stock gradient meshes).

---

## 6. Components

### Buttons
- **Primary** — solid `--ink`, white text, pill radius (100px), hover → blue
- **Orange (CTA)** — solid `--orange`, used for primary conversion actions (Explore, Book/Inquire, Submit)
- **Outline** — transparent with 1.5px border, used for secondary actions
- **Outline White** — used on dark/hero backgrounds only

### Cards
- White background, 1px `--line` border, 14px radius
- Hover: lift (-3px translateY) + soft shadow, border becomes transparent
- Package card anatomy: thumbnail (category badge + icon) → title → location/duration meta → partner byline → price + rating footer

### Category Thumbnail
- Gradient background using the category's brand color
- Contour wave pattern overlay (signature element)
- Category badge (white pill, top-left)
- Line-art icon (white, circular chip, top-right)

### Navigation
- Sticky, blurred background on scroll
- "Paket" is the **only** top-level item with a dropdown; Tour/Stay/Transport/Surf/Rental/Experience live inside it — never as separate top-level nav items
- Mobile: full-screen slide-in menu with accordion for "Paket"

### Forms
- Label above field, 13.5px semi-bold
- Input: 1.5px border, `--bg` fill, 10px radius, focus state → blue border
- Every form (Contact, Become a Partner, Booking/Inquiry) ends in a **success state**, not a page redirect — confirms what happens next and who will follow up

### Badges
- `Verified Partner` — green-soft pill with checkmark icon, used anywhere a partner is referenced
- Category badge — white pill with category label, always paired with the category's accent color nearby

---

## 7. Site Map / Page Inventory

| # | Page | Route pattern | Notes |
|---|---|---|---|
| 1 | Home | `/` | Hero, 7 categories, featured packages, stays, experiences, transport, why us, partners, testimonials, guide, partner CTA, final CTA |
| 2 | All Packages | `/paket` | Tabs + search + filters + sort + load more |
| 3–8 | Category pages | `/paket/tour`, `/stay`, `/transport`, `/surf`, `/rental`, `/experience` | Implemented as filtered views of Page 2 (same component, `cat` param) |
| 9 | Package Detail | `/paket/:id` | Gallery, info stats, description, itinerary, included/excluded, meeting point, partner card, reviews, similar packages, sticky booking panel |
| 10 | Partner Profile | `/partner/:name` | Cover, verified badge, about, all packages by that partner |
| 11 | About | `/about` | Mission, vision, why Krui, community, partner ecosystem |
| 12 | Contact | `/contact` | Contact channels + form + "need help choosing" notice |
| 13 | Become a Partner | `/jadi-mitra` | Explains managed-listing model explicitly; application form |
| 14 | Search Results | `/search` | Search bar + filters + empty state |
| 15 | Booking / Inquiry | `/booking/:id` | Package summary + inquiry form (no online payment) |
| 16 | 404 | `*` | Branded illustration + back-to-home |

**Primary conversion path (by design):**
`Home → Paket → Category → Package Detail → Book/Inquire → Inquiry Form → Success`
This is intentionally an **inquiry funnel**, not a checkout funnel — KRUI.CO's managed model means the team (not the customer) finalizes bookings with partners.

---

## 8. Interaction States Checklist

Every listing/form surface must support:
- [x] Default / hover / active
- [x] Empty state (no search results) with a clear next action
- [x] Loading (skeleton or spinner) for anything fetched dynamically
- [x] Success state after form submission (in-place, not a popup)
- [x] Mobile menu open / Paket dropdown open
- [x] 404 fallback

---

## 9. What NOT to Do

- ❌ No dark theme on primary pages
- ❌ No generic terracotta/cream "AI template" palette
- ❌ No category items as separate top-level nav links — must stay inside "Paket"
- ❌ No online payment flow — conversion ends at "Inquiry sent"
- ❌ No partner self-publishing UI — partners only reach a contact/application form
- ❌ Don't let the contour-wave motif turn into decoration everywhere — reserve it for hero, dividers, and thumbnails only

---

## 10. Asset Notes

The current build uses **gradient + line-art icon placeholders** instead of real photography, so the file renders reliably with zero external dependencies. Before/during development, replace:
- Category thumbnails → real photography (beach, surf, villa, driver, etc.)
- Gallery strips on Package Detail → actual partner-submitted photos
- Map placeholders (Meeting Point, Contact page) → embedded Google Maps
- Partner logo chips → uploaded partner logos
