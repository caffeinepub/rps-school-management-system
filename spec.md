# RPS School Management System

## Current State
- Landing page has a single 'TAKE ME NOW' button that navigates to `/login`
- No public-facing website pages exist
- Login page is accessible directly; no portal login entry from a public header
- Login flow is triple-factor (Username → Password → Token → Device fingerprint)
- No signup form exists, but the subtitle says 'Secure Management Portal'

## Requested Changes (Diff)

### Add
- Public website layout with a Navy Blue/Gold header containing: school logo/name, navigation links (Home, About, Admission, Staff, Gallery), and a 'Portal Login' button
- Public pages:
  - `/home` — Public Home: hero section, school tagline, highlights about RPS Sector 50
  - `/about` — About: school history, vision/mission, values
  - `/admission` — Admission: process overview, eligibility, contact info
  - `/staff` — Staff: if backend returns no staff records, show professional 'Staff Directory — Updating Soon' placeholder; no fake data
  - `/gallery` — Gallery: if backend returns no gallery records, show professional 'Gallery — Coming Soon' placeholder; no fake data
- Shared `PublicLayout` component wrapping all public pages with the header and footer
- Route `/home` pointing to the new Public Home page

### Modify
- Landing page: 'TAKE ME NOW' button navigates to `/home` instead of `/login`
- Landing page subtitle: change 'Secure Management Portal' to something welcoming like 'Welcome to RPS International School'
- App router: add all new public routes; keep all existing portal routes unchanged
- 'Portal Login' button in the public header navigates to `/login`

### Remove
- Any random username generation or signup form (there is none currently, but ensure none is introduced)
- The 'Two Passwords' fields — already not present; confirm login page has only: Username, Password, Security Token, Device Fingerprint steps (no duplicate password field)

## Implementation Plan
1. Create `PublicLayout` component: sticky navy header with logo/school name, nav links, gold 'Portal Login' button; navy/gold/white footer
2. Create public page components: `PublicHome`, `PublicAbout`, `PublicAdmission`, `PublicStaff`, `PublicGallery`
   - Staff and Gallery: fetch data if available; if empty array or error, show professional placeholder message
3. Add routes in `App.tsx`: `/home`, `/about`, `/admission`, `/staff`, `/gallery`
4. Update `LandingPage.tsx`: navigate to `/home` on 'TAKE ME NOW' click; update subtitle text
5. Keep `LoginPage.tsx` exactly as-is (triple-factor, no signup)
