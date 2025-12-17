# Romlaw Advocates LLP Website

## Overview
A static website for Romlaw Advocates LLP, a law firm in Kenya. The site showcases the firm's practice areas, team members, case studies, and contact information.

## Project Structure
```
src/
├── css/
│   └── style.css          # Main stylesheet
├── images/
│   ├── Hero-image.jpeg
│   └── Logo.png
├── includes/
│   ├── _footer.html       # Footer component
│   ├── _navbar.html       # Navigation bar component
│   └── _top-bar.html      # Top bar component
├── js/
│   └── script.js          # JavaScript functionality
├── blog.html              # Blog page
├── case-studies.html      # Case studies page
├── index.html             # Homepage
└── practice-areas.html    # Practice areas page
```

## Technology Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- External dependencies:
  - Font Awesome 6.0.0 (CDN)
  - Google Fonts (Cormorant Garamond, Montserrat)

## Running the Project
The project uses a Python static file server:
```bash
python server.py
```
This serves the `src` directory on port 5000.

## Deployment
Configured for static deployment with `src` as the public directory.

## Recent Changes
- December 2025: Initial setup in Replit environment
