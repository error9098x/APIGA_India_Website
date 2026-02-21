# APIGA India Website - Code Review Plan

**Started:** February 21, 2026  
**Status:** In Progress

---

## Overview

This document tracks the systematic review of all files in the APIGA India Website project to identify issues, inconsistencies, and potential improvements.

---

## File Inventory & Review Status

| # | File | Status | Issues Found |
|---|------|--------|--------------|
| 1 | `index.html` | ✅ Completed | 6 |
| 2 | `css/style.css` | ✅ Completed | 7 |
| 3 | `js/main.js` | ✅ Completed | 4 |
| 4 | `js/main_component.js` | ✅ Completed | 3 |
| 5 | `components/header.html` | ✅ Completed | 4 |
| 6 | `components/footer.html` | ✅ Completed | 3 |
| 7 | `pages/information.html` | ✅ Completed | 4 |
| 8 | `pages/program.html` | ✅ Completed | 3 |
| 9 | `pages/participants.html` | ✅ Completed | 2 |
| 10 | `pages/sponsors.html` | ✅ Completed | 3 |
| 11 | `pages/localhost.html` | ✅ Completed | 2 |
| 12 | `pages/contact.html` | ✅ Completed | 3 |
| 13 | `pages/apiga_oc_2025.html` | ✅ Completed | 2 |
| 14 | `pages/apiga_oc_2026.html` | ✅ Completed | 2 |
| 15 | `pages/coming_soon.html` | ✅ Completed | 2 |
| 16 | `pages/photos.html` | ✅ Completed | 4 |
| 17 | `pages/registration.html` | ✅ Completed | 2 |

**Legend:** ✅ Completed | 🔄 In Progress | ⬜ Pending | ❌ Critical Issues

---

## Review Categories

### 1. HTML Issues
- [ ] Missing or incomplete meta tags
- [ ] Accessibility issues (ARIA labels, alt text, semantic HTML)
- [ ] Broken links
- [ ] Duplicate IDs
- [ ] Missing favicon
- [ ] Improper document structure

### 2. CSS Issues
- [ ] Unused styles
- [ ] Browser compatibility issues
- [ ] Responsive design issues
- [ ] CSS specificity conflicts
- [ ] Missing vendor prefixes
- [ ] Hardcoded values vs CSS variables

### 3. JavaScript Issues
- [ ] Console errors
- [ ] Memory leaks
- [ ] Event listener issues
- [ ] Missing error handling
- [ ] Code duplication
- [ ] Performance issues

### 4. Performance Issues
- [ ] Large unoptimized images
- [ ] Missing lazy loading
- [ ] Too many external requests
- [ ] Missing caching headers
- [ ] Unminified resources

### 5. SEO Issues
- [ ] Missing meta descriptions
- [ ] Missing Open Graph tags
- [ ] Missing structured data
- [ ] Missing sitemap
- [ ] Missing robots.txt

### 6. Security Issues
- [ ] External resource integrity
- [ ] XSS vulnerabilities
- [ ] Sensitive data exposure

---

## Detailed File Reviews

### 1. `index.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 30 | HTML | Duplicate ID "header" - conflicts with header.html nav#header | P0 | Rename div to id="header-container" |
| 45-64 | A11y | SVG lacks accessibility attributes (role, aria-label) | P2 | Add role="img" aria-label="India flag text animation" |
| 157 | Security | External link missing rel="noopener noreferrer" | P2 | Add rel="noopener noreferrer" to ICANN link |
| 238, 333 | Security | External links missing rel="noopener noreferrer" | P2 | Add to Google Forms links |
| 349-363 | JS | Inline JavaScript function throwConfetti() | P3 | Move to external JS file |
| 336 | Content | Links to coming_soon.html instead of program.html | P1 | Update to /pages/program.html |

#### Notes:
- Good SEO implementation with meta tags, OpenGraph, and Twitter cards
- Tailwind CDN usage is fine for dev but should be built for production
- Consider adding skip-to-content link for accessibility

---

### 2. `css/style.css`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 501 | Consistency | Hardcoded color `#0f172a` instead of CSS variable | P3 | Use `var(--color-gray-900)` or define new variable |
| 568 | Performance | `will-change` on mask-image may cause performance issues | P3 | Test and consider removing if not needed |
| 966 | Browser | `:has()` pseudo-class has limited support in older browsers | P2 | Add fallback or document browser requirements |
| - | A11y | Missing `prefers-reduced-motion` media query | P1 | Add reduced motion support for accessibility |
| 759-779 | Cleanup | `.carousel` classes appear unused | P3 | Verify usage or remove |
| 798-861 | Cleanup | `.professional-title` and `.animate-title` - verify usage | P3 | Remove if unused |
| - | Responsive | Only one breakpoint at 768px | P3 | Consider adding more granular breakpoints |

#### Notes:
- Well-organized with clear sections
- Good use of CSS custom properties
- Shadow system is well-implemented
- Animation system is comprehensive

---

### 3. `js/main.js`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 2 | Code | Unused variable `appBanner` - dead code | P3 | Remove unused variable |
| 42-44 | Error | No error handling for fetch() of header.html | P1 | Add .catch() block with error handling |
| 106-111 | Error | No error handling for fetch() of footer.html | P1 | Add .catch() block with error handling |
| - | Code | Duplicate code with main_component.js | P2 | Consider consolidating into one file with path parameter |

#### Notes:
- Clean code structure
- Good event delegation patterns
- Hero section grid interaction is well-implemented with requestAnimationFrame

---

### 4. `js/main_component.js`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 16-18 | Error | No error handling for fetch() of header.html | P1 | Add .catch() block |
| 80-85 | Error | No error handling for fetch() of footer.html | P1 | Add .catch() block |
| - | Code | 95% duplicate of main.js - only path differs | P2 | Merge with main.js, use path parameter |

#### Notes:
- Same functionality as main.js but with `../` path prefix for subdirectory pages
- Consider creating a single configurable component

---

### 5. `components/header.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 2 | HTML | Duplicate ID "header" - nav#header loaded into div#header | P0 | Change nav id to "main-nav" or remove entirely |
| 44-47 | Content | "Participants" nav button label could be clearer | P3 | Consider "View Participants" or "Meet Participants" |
| 86 | HTML | Button missing type="button" attribute | P3 | Add type="button" to prevent form submission |
| - | A11y | Mobile menu lacks aria-expanded attribute | P2 | Add aria-expanded="false" and toggle with JS |

#### Notes:
- Floating glassmorphism header design is modern and accessible
- Good use of tooltips for navigation items
- Dropdown functionality works well

---

### 6. `components/footer.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 1 | Performance | Duplicate Font Awesome stylesheet - loaded in parent pages | P2 | Remove this line |
| 52 | Bug | Google Maps URL timestamp seems invalid (year 1770891577434) | P1 | Verify and fix the maps embed URL |
| 71,74,77 | Security | Social media links missing rel="noopener noreferrer" | P2 | Add rel="noopener noreferrer" |

#### Notes:
- Well-structured footer with all necessary information
- Good use of contact details and social links
- Map embed is a nice addition

---

### 7. `pages/information.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 53 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` (relative) |
| - | SEO | Missing meta description, keywords, OpenGraph tags | P1 | Add complete SEO meta tags like index.html |
| - | Content | Page title is generic "Information Page" | P2 | Use descriptive title like "About APIGA India - Information" |
| 21 | Content | h1 says "Information Page" - not descriptive | P2 | Update to meaningful heading |

#### Notes:
- Page is underdeveloped with minimal content
- Could benefit from more detailed information sections
- Same styling and structure as other pages is good

---

### 8. `pages/program.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 46 | Content | Says "Three days" but schedule shows Day 0, 1, 2 (which is 3 events) | P2 | Clarify or correct description |
| 233 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |

#### Notes:
- Well-structured timeline design
- Tab functionality works correctly
- Good responsive design for schedule

---

### 9. `pages/participants.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 213 | Path | Uses `../js/main_component.js` - correct relative path | ✅ | No fix needed |
| - | SEO | Missing OpenGraph tags | P2 | Add OG meta tags for social sharing |

#### Notes:
- Well-designed participants table with gender breakdown stats
- Good use of card-modern styling
- Accessible table design with hover states

---

### 10. `pages/sponsors.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 42 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |
| 28 | Content | Image path uses `/images/` (absolute) | P2 | Consider using `../images/` for consistency |

#### Notes:
- Simple, clean design focusing on sponsor image
- Could add individual sponsor logos/cards for better recognition

---

### 11. `pages/localhost.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |
| 94 | Path | Uses `../js/main_component.js` - correct relative path | ✅ | No fix needed |

#### Notes:
- Good content about local host (JGU)
- Well-structured with images and descriptions
- Clean design with content sections

---

### 12. `pages/contact.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 63 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |
| 38,43,48 | Security | Social media links missing rel="noopener noreferrer" | P2 | Add rel="noopener noreferrer" |

#### Notes:
- Simple contact page with essential information
- Good use of icons and layout
- Could benefit from a contact form

---

### 13. `pages/apiga_oc_2025.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 211 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |

#### Notes:
- Well-designed team page with grid layout
- Good hover effects on team member cards
- Responsive grid adjustments for mobile

---

### 14. `pages/apiga_oc_2026.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 306 | Path | Script uses `/js/main_component.js` (absolute) | P2 | Change to `../js/main_component.js` |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |

#### Notes:
- Same structure as 2025 page - good consistency
- Added LinkedIn buttons for team members - nice enhancement
- Includes sponsors section at bottom

---

### 15. `pages/coming_soon.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 37 | Path | Uses `../js/main_component.js` - correct relative path | ✅ | No fix needed |
| - | SEO | Missing meta description and OpenGraph tags | P2 | Add complete SEO meta tags |

#### Notes:
- Clean coming soon page design
- Could add countdown timer or email subscription
- Now that program.html exists, this page may be unnecessary

---

### 16. `pages/photos.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 541 | Path | Uses `../js/main_component.js` - correct relative path | ✅ | No fix needed |
| - | SEO | Missing meta description and OpenGraph tags | P1 | Add complete SEO meta tags |
| 552 | Code | `imageFiles` array truncated at line 552 - incomplete list | P1 | Verify the array is complete |
| 819-831 | Code | `closeModal()` function defined twice (duplicate) | P2 | Remove duplicate function definition |

#### Notes:
- Comprehensive gallery with modal, pagination, search, and sort
- Uses external Hugging Face dataset for images
- Good accessibility implementation with keyboard navigation
- Swipe gesture support for mobile

---

### 17. `pages/registration.html`

**Status:** ✅ Completed

#### Issues Found:
| Line | Category | Issue | Severity | Fix |
|------|----------|-------|----------|-----|
| 97 | Path | Uses `../js/main_component.js` - correct relative path | ✅ | No fix needed |
| - | SEO | Missing meta description and OpenGraph tags | P2 | Add complete SEO meta tags |

#### Notes:
- Well-designed "Applications Closed" page
- Links to participants list
- Good use of info cards for event details

---

## Global Issues Found

### Critical (P0)
| Issue | Files Affected | Status | Fix |
|-------|---------------|--------|-----|
| Duplicate ID "header" | index.html, components/header.html | ❌ Not Fixed | Rename one of the IDs |

### High (P1)
| Issue | Files Affected | Status | Fix |
|-------|---------------|--------|-----|
| Missing fetch error handling | js/main.js, js/main_component.js | ❌ Not Fixed | Add .catch() blocks |
| Missing SEO meta tags | All pages/*.html | ❌ Not Fixed | Add meta description, OG tags |
| Google Maps URL invalid | components/footer.html | ❌ Not Fixed | Fix the maps embed URL |
| Missing prefers-reduced-motion | css/style.css | ❌ Not Fixed | Add reduced motion support |
| imageFiles array truncated | pages/photos.html | ❌ Not Fixed | Verify array is complete |

### Medium (P2)
| Issue | Files Affected | Status | Fix |
|-------|---------------|--------|-----|
| Inconsistent path usage | Multiple pages | ❌ Not Fixed | Standardize to relative paths |
| Duplicate Font Awesome import | components/footer.html | ❌ Not Fixed | Remove duplicate import |
| Missing rel="noopener noreferrer" | Multiple files | ❌ Not Fixed | Add to external links |
| Code duplication (main.js vs main_component.js) | js/ | ❌ Not Fixed | Consolidate into one file |
| :has() browser support | css/style.css | ❌ Not Fixed | Add fallback or document |
| Duplicate closeModal() function | pages/photos.html | ❌ Not Fixed | Remove duplicate |

### Low (P3)
| Issue | Files Affected | Status | Fix |
|-------|---------------|--------|-----|
| Unused CSS classes | css/style.css | ❌ Not Fixed | Verify and remove unused |
| Unused variable appBanner | js/main.js | ❌ Not Fixed | Remove dead code |
| Inline JavaScript | index.html | ❌ Not Fixed | Move to external file |
| Button missing type attribute | components/header.html | ❌ Not Fixed | Add type="button" |
| Hardcoded colors | css/style.css | ❌ Not Fixed | Use CSS variables |

---

## Recommended Improvements

### Performance
- [ ] Add image optimization (use WebP format, lazy loading)
- [ ] Implement lazy loading for images (add loading="lazy" attribute)
- [ ] Minify CSS and JS files for production
- [ ] Add resource preloading for critical assets
- [ ] Consider building Tailwind CSS instead of using CDN
- [ ] Remove duplicate Font Awesome import in footer.html

### Accessibility
- [ ] Add skip navigation links
- [ ] Improve color contrast where needed
- [ ] Add proper ARIA labels to interactive elements
- [ ] Add aria-expanded to mobile menu button
- [ ] Ensure keyboard navigation works throughout
- [ ] Add prefers-reduced-motion support for animations

### SEO
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Add structured data (JSON-LD) for events
- [ ] Add meta descriptions to all pages
- [ ] Add OpenGraph tags to all pages
- [ ] Add canonical URLs to all pages

### Code Quality
- [ ] Remove duplicate code (main.js vs main_component.js)
- [ ] Add comments for complex logic
- [ ] Follow consistent naming conventions
- [ ] Remove unused CSS classes
- [ ] Remove unused JavaScript variables
- [ ] Fix duplicate ID issues
- [ ] Standardize path usage (relative vs absolute)

### Security
- [ ] Add rel="noopener noreferrer" to all external links
- [ ] Consider adding SRI hashes for CDN resources
- [ ] Fix Google Maps iframe URL

---

## Review Progress

- **Total Files:** 17
- **Completed:** 17
- **In Progress:** 0
- **Pending:** 0
- **Progress:** 100%

---

## Issue Summary

| Severity | Count | Status |
|----------|-------|--------|
| P0 (Critical) | 1 | ❌ Not Fixed |
| P1 (High) | 5 | ❌ Not Fixed |
| P2 (Medium) | 6 | ❌ Not Fixed |
| P3 (Low) | 5 | ❌ Not Fixed |
| **Total** | **17** | - |

---

## Notes & Observations

### Positive Findings
1. Well-organized codebase with consistent structure
2. Modern CSS with custom properties and good design system
3. Good use of Tailwind CSS for rapid development
4. Comprehensive meta tags on index.html
5. Accessible navigation with tooltips
6. Good responsive design patterns
7. Clean separation of components (header, footer)

### Areas for Improvement
1. Path consistency - mix of absolute `/js/` and relative `../js/`
2. Code duplication between main.js and main_component.js
3. SEO missing on most subpages
4. Error handling needed for fetch operations
5. Accessibility could be enhanced with ARIA attributes

### Architecture Recommendations
1. Consider using a build tool (Vite, Webpack) for:
   - CSS/JS minification
   - Tailwind CSS purging
   - Asset optimization
2. Implement a simple templating system or static site generator
3. Add linting (ESLint, Stylelint) for code quality
4. Consider TypeScript for better type safety

---

**Last Updated:** February 21, 2026
