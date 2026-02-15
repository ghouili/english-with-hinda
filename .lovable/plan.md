

# English With Hinda — Official Website (Phase 1)

## Overview
A premium educational publisher website for Tunisian students (grades 5–9), built in **French** with SEO-first architecture. Clean editorial design with subtle British motifs and a 5-color grade system. Static data files for easy future migration to a CMS/database.

---

## 1. Design System & Global Layout

### Brand Colors & Grade Tokens
- 5 distinct grade colors applied consistently across the site:
  - **5ème**: Sky Blue · **6ème**: Emerald Green · **7ème**: Warm Orange · **8ème**: Royal Purple · **9ème**: Crimson Red
- Each color used for grade badges, hub heroes, book ribbons, and resource tags

### Typography
- Friendly serif/soft-serif for headings (British-school feel)
- Clean sans-serif for body text (high readability)
- Google Fonts optimized for fast loading

### UK Visual Motifs
- Subtle background textures and section dividers using phone booth, double-decker bus, and London skyline silhouettes
- Never compromising readability or contrast

### Global Layout
- **Header**: Logo + primary navigation (Accueil, Livres, Ressources, Blog, Où acheter, À propos, Contact)
- **Footer**: Trust signals, legal links (FAQ, Confidentialité, Conditions, Cookies, Plan du site), social links, newsletter signup
- **Mobile**: Hamburger menu + floating WhatsApp CTA button
- Breadcrumb navigation on all inner pages

---

## 2. Pages

### Home (`/`)
- Hero with value proposition + two CTAs ("Découvrir les livres" / "Ressources gratuites")
- 5 grade cards with distinct colors linking to grade hubs
- Featured books carousel
- Testimonials / social proof section
- Newsletter signup form
- Mini "Où acheter" preview (top cities snippet)
- Floating WhatsApp CTA on mobile
- **SEO**: Organization JSON-LD, unique meta tags, Open Graph image

### Books Index (`/livres`)
- Overview of all 5 grades with visual cards
- Search + filter bar (grade, skills: grammar/vocab/reading/writing/listening)
- Links to each grade hub
- **SEO**: BreadcrumbList schema

### Grade Hub Pages (5 pages: `/livres/5eme` through `/livres/9eme`)
- Grade-colored hero with subtle UK motif background
- Book grid for that grade
- "What you'll learn" — curriculum outcome highlights
- Sample pages preview area
- FAQ section (visible on page)
- CTA: Où acheter + WhatsApp inquiry
- Internal links to previous/next grade + top resources
- **SEO**: BreadcrumbList + optional FAQPage schema, grade-specific meta tags

### Book Detail Pages (`/livre/{slug}`)
- Hero with book cover + grade badge + key promise
- Quick facts panel (grade, pages, edition, language, ISBN if real)
- Table of contents highlights
- Sample page gallery
- "Who it's for" section (Parents / Students / Teachers)
- Where to buy with stockists + WhatsApp CTA
- Related books (same + adjacent grades)
- FAQ section
- **SEO**: Book JSON-LD (with Offer only if price shown), BreadcrumbList, optional FAQPage

### Where to Buy (`/ou-acheter`)
- City filter (Tunis, Ariana, Sfax, Sousse, etc.)
- Stockist list with address, phone, map links
- WhatsApp ordering instructions
- B2B section for bookstores/distributors
- **SEO**: BreadcrumbList schema

### Resources Index (`/ressources`)
- Search + filters (grade, skill, format: PDF/audio/article)
- Resource cards with grade color tags
- Each resource links to its relevant book
- 10 starter resources (2 per grade) to avoid empty page
- **SEO**: BreadcrumbList schema

### Blog Index (`/blog`)
- Editorial listing with categories (Parents, Students, Teachers, Grade 5–9)
- Author box (Hinda) for E-E-A-T trust
- 5 starter posts (1 per grade)
- **SEO**: BreadcrumbList schema

### About (`/a-propos`)
- Mission & story
- Hinda bio and credentials
- Why these books — trust signals
- **SEO**: Organization JSON-LD

### Contact (`/contact`)
- Contact form with topic selector (Parents / Teachers / Bookstores)
- WhatsApp CTA button
- Social media links
- FAQ section
- **SEO**: Optional FAQPage schema

### Legal Pages (`/confidentialite`, `/conditions`, `/cookies`)
- Standard legal content blocks
- Contact details

---

## 3. Static Data & Content

### Data Architecture
- TypeScript data files for Books, Stockists, Resources, and Blog Posts
- Full metadata fields per model (SEO titles, descriptions, slugs, grades, etc.)
- Designed for seamless future migration to a database

### Starter Content
- **5 books** (1 per grade) with complete metadata
- **10 resources** (2 per grade) with summaries and grade/skill tags
- **5 blog posts** (1 per grade) — revision guides / common mistakes
- **10+ stockists** across major Tunisian cities

---

## 4. SEO Built From Day One
- Unique meta title (≤60 chars) and description (≤155 chars) per page
- Canonical URLs set automatically
- Open Graph tags per page
- JSON-LD structured data: Organization, BreadcrumbList, Book (with Offer when applicable), FAQPage where visible
- Semantic HTML with proper H1/H2/H3 hierarchy
- Internal linking strategy (grade ↔ books ↔ resources ↔ blog)
- Noindex on any pages with insufficient content

## 5. Performance & Accessibility
- Mobile-first responsive design
- Lazy-loaded images with descriptive alt text
- Minimal JavaScript on first load
- WCAG-compliant contrast ratios throughout

