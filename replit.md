# Romlaw Advocates LLP Website

## Overview
A static website for Romlaw Advocates LLP, a law firm in Kenya. The site showcases the firm's practice areas, team members, case studies, and contact information. The design follows the elegant Attorna law firm theme with sophisticated typography and luxury gold accents.

## Project Structure
```
src/
├── css/
│   └── style.css          # Main stylesheet (Attorna-style design)
├── images/
│   ├── Hero-image.jpeg
│   └── Logo.png
├── includes/
│   ├── _footer.html       # Footer component (multi-column layout)
│   ├── _navbar.html       # Navigation bar component
│   └── _top-bar.html      # Top bar component with contact info
├── js/
│   └── script.js          # JavaScript functionality (nav, testimonials)
├── blog.html              # Blog page
├── case-studies.html      # Case studies page
├── index.html             # Homepage
└── practice-areas.html    # Practice areas page
```

## Technology Stack
- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- JavaScript (Vanilla)
- External dependencies:
  - Font Awesome 6.0.0 (CDN)
  - Google Fonts (Cormorant Garamond, Montserrat)

## Design System
- **Primary Colors:**
  - Brand Gold: #c5a47e
  - Brand Black: #1a1a1a
  - Background Cream: #fcf9f5
- **Typography:**
  - Headings: Cormorant Garamond (serif)
  - Body: Montserrat (sans-serif)
- **Key Features:**
  - Watermark text backgrounds
  - Image overlays with hover effects
  - Team member cards with social icons
  - Testimonial slider
  - Responsive grid layouts

## Running the Project
The project uses a Python static file server:
```bash
python server.py
```
This serves the `src` directory on port 5000.

## Deployment
Configured for static deployment with `src` as the public directory.

## Recent Changes
- December 2025: Complete UI redesign to match Attorna law firm theme
  - New hero section with split layout and watermark
  - Practice areas with image overlay cards
  - About/Story section with badge
  - Team section with hover social icons
  - Video tour section with play button overlay
  - Redesigned testimonials slider
  - Case studies and blog grids
  - Multi-column footer
  - Fully responsive design
