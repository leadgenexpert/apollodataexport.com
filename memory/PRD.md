# Apollo Scraping Service - Landing Page

## Problem Statement
Create a WordPress-style landing page for Apollo Scraping Service - a B2B lead generation service that extracts data from Apollo.io.

## User Personas
- B2B businesses seeking targeted leads
- Marketing agencies
- Sales teams
- Startups needing lead generation

## Core Requirements
- Modern dark theme landing page
- WhatsApp integration (8801743212291)
- Lead request form (MongoDB storage)
- 3 pricing tiers

## What's Been Implemented (Dec 2025)
### Backend (FastAPI + MongoDB)
- POST /api/leads - Submit lead request (name, email, phone, apollo_url)
- GET /api/leads - Retrieve all submitted leads

### Frontend (React + Tailwind)
- Hero Section: Badge, headline, CTA buttons (WhatsApp + Request Leads)
- Stats Section: 500+ clients, 10M+ leads, 50+ countries, 4.9 rating
- Trust Section: Apollo.io data description with checkmarks
- Features Section: 6 cards (Direct Apollo Data, Custom Filtering, Excel/CSV Export, etc.)
- How It Works: 3 steps process
- Pricing Section: Starter ($15/10k/24h), Growth ($75/50k/48h), Gold ($750/1M/10d)
- Lead Form: Name, Email, Phone, Apollo URL
- Floating WhatsApp button

## Tech Stack
- Frontend: React, Tailwind CSS, Shadcn/UI, Lucide Icons
- Backend: FastAPI, Motor (async MongoDB)
- Database: MongoDB

## Backlog
- P0: All core features implemented ✓
- P1: Email notification on form submission
- P2: Admin dashboard for leads management
- P3: Integration with CRM systems
