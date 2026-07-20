
# NCHG Website Rebuild — Aligning to Real Service Offer

Rebuild the site around one entry point ("Book a free Ti64 feedstock assessment") and one capability powering three benefit-led services: **Qualify**, **Recover**, **Recycle**. Drop the community/marketplace/Uptimo/"UK Source by 2030" framing entirely.

## 1. Content to remove entirely

- **Marketplace & Community** section, page (`/marketplace-community`, `/marketplace`), preview listings, "founding member" CTAs, community forum previews.
- **Digital Manufacturing Intelligence / Uptimo software / Ti64 Mechanical Properties Database** page and content.
- **Smart Feedstock Solutions** page will be replaced by a services page structured around Qualify / Recover / Recycle (URL kept for SEO or redirected — see decisions below).
- "100% UK Source by 2030", "Join the Movement", "Partner With Us", "Join the Community", "Founding Members" language across Hero, Services, Community, About, Index.
- "Qualify. Recover. Route." → replaced with "Qualify. Recover. Recycle."
- Related forms: `FoundingMemberForm`, `MarketplaceEarlyAccessForm`, `OperationalExcellenceForm`, `Ti64DatabaseForm`, `ReconditioningServicesForm` (folded into a single enquiry form).
- Header/footer nav links to removed pages.

## 2. New page structure

### Home (`/`)
- **Hero**: New headline "Cut cost. Cut waste. Cut carbon." Subhead + two CTAs: `[Book a free feedstock assessment]` and `[See the Atherton Bikes case study]`. Replace AuthModal CTAs with enquiry-form CTA (scrolls to `#enquiry` or opens modal) and case-study anchor.
- **What We Do** — three cards (Qualify / Recover / Recycle) with the exact copy from the brief, each with quantified figures where cleared:
  - Qualify: gas flow assessment + on-site mechanical testing → 4–8 weeks vs 6–12 months, up to 26% lower cost. NPL + Fraunhofer ILT reviewed.
  - Recover: same technique on sieve-rejected powder. Atherton Bikes: 500–600 kg assessed, 50% recoverable, £39,000 net customer value, 4.8 tonnes CO₂ avoided.
  - Recycle: brokering scrap to highest-value recycler in NCHG's network. Qualitative only — no invented numbers.
- **Proof / Case study**: Atherton Bikes flagship block with the quantified figures above.
- **Who We Serve**: UK (and secondarily European) metal LPBF AM operators in Ti-6Al-4V — aerospace & defence primes, AM bureaus, process development.
- **How It Works**: two short flows (Qualify/Recover, Recycle) as stepper/diagram.
- **Team**: Nick, Claudia, Jemma, Jon (bios from brief; Jemma/Jon marked as placeholder headshots since real photos are pending — use initials avatar).
- **Trust signals**: NPL collaboration, Fraunhofer ILT-reviewed protocol, Companies House 16015518, UK-based delivery.
- **Enquiry form** section (`#enquiry`).

### Contact (`/contact`)
- Replace existing lead-capture forms with a single enquiry form: Name, Company, Role, Email, "Which service are you interested in?" dropdown (Qualify / Recover / Recycle / Not sure), Message. Submits via existing `process-form-submission` edge function so Claudia gets email notification.

### Legal pages
- Keep Privacy, Cookies, Terms as-is.

### Removed routes
- `/marketplace-community`, `/marketplace`, `/create-listing`, `/messages`, `/digital-manufacturing-intelligence` → deleted from `App.tsx` routes and page files removed. `/smart-feedstock-solutions` → redirect to `/#services` (or removed and 301 via NotFound).

## 3. Header / Footer

- **Nav**: Home · What We Do (anchors `/#services`) · Case Study (`/#case-study`) · Team (`/#team`) · Contact.
- Remove Sign In / Auth buttons from primary nav (kept in profile flows only). Language selector (EN/DE) preserved.
- **Footer**: Quick Links & Services refreshed to match new IA. Keep LinkedIn, email, phone, address, legal links. Drop "Join the Community" and any references to Uptimo/Marketplace.

## 4. Translations

Update `LanguageContext` EN + DE strings: replace all hero/services/community/marketplace/footer keys with new copy for Qualify/Recover/Recycle, hero headline, CTAs, team bios, trust signals, enquiry form labels. Remove obsolete keys.

## 5. SEO / meta

- Update `index.html` and per-page `<Helmet>`:
  - Title: `NCHG — Cut cost and carbon from your Ti64 feedstock`
  - Meta description: benefit-led, mentions Ti64, aerospace AM, quantified (26% lower cost, 4.8 t CO₂ avoided), CTA to book assessment.
  - Update OG/Twitter title + description. OG image left to be supplied (do not invent one).
- Update `robots.txt` unchanged.

## 6. Decisions needed before build

1. **Removed routes** — permanent delete of `/marketplace`, `/marketplace-community`, `/digital-manufacturing-intelligence`, `/smart-feedstock-solutions`, `/create-listing`, `/messages`, and the Sign In / Profile flows? (Recommended: yes — brief drops the community model. Auth/profile likely no longer needed for public site; enquiry form is the only lead capture.)
2. **Team headshots for Jemma & Jon** — brief says photos pending. Use initials avatar placeholders until supplied?
3. **"See the Atherton Bikes case study" CTA** — link to the case-study section on the home page for now (no separate `/case-studies/atherton-bikes` page), correct?
4. **Enquiry form destination** — reuse existing `process-form-submission` Supabase edge function and route submissions to `claudia@nchg.co.uk`?

## Technical notes

- Delete files: `src/pages/Marketplace.tsx`, `MarketplaceCommunity.tsx`, `DigitalManufacturingIntelligence.tsx`, `SmartFeedstockSolutions.tsx`, `CreateListing.tsx`, `Messages.tsx`, `Profile.tsx` (if profile flow dropped), `src/components/Marketplace.tsx`, `src/components/Community.tsx`, and obsolete forms.
- Refactor `src/components/Hero.tsx`, `Services.tsx`, `About.tsx`, `Header.tsx`, `Footer.tsx`, `src/pages/Index.tsx`, `Contact.tsx`.
- Add new components: `WhatWeDo`, `CaseStudy`, `HowItWorks`, `Team`, `TrustSignals`, `EnquiryForm`.
- Update `src/contexts/LanguageContext.tsx` with new EN/DE keys.
- Update routes in `src/App.tsx`.
- Update `index.html` title/description/OG.
- Keep Lovable Cloud + edge function for form submissions.
