---
id: deployment
title: Deployment
---

# Portfolio v2 - Deployment

- This project uses a monorepo deployment strategy with separate deployments for the portfolio application and documentation platform.

--- 

## Repository

The project is hosted on:

- GitHub repository

Monorepo structure:

portfolio-v2
│
├── apps
│   ├── web
│   └── docs

--- 

## Deployment Targets

Portfolio:

- erzan.dev

Documentation:

- docs.erzan.dev

Both applications are deployed as separate projects on Vercel.

--- 

## Deployment Flow

GitHub push
    ↓
Vercel build
    ↓
Automatic deployment

--- 

## Build Configuration

Portfolio build:

- root directory: apps/web
- framework: Next.js

Documentation build:

- root directory: apps/docs
- framework: Docusaurus