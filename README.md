# SHNKR.DEV — Client Onboarding Form

This repository contains a complete SHNKR.DEV client onboarding form built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `react-hook-form`, `zod`, `react-dropzone`, and `nodemailer`.

## Features Implemented

- **Next.js 15 & React 19:** Fully upgraded to the latest stable stack.
- **Tailwind v4 CSS-First Design:** Implements the official SHNKR.DEV light/warm branding system with premium micro-interactions.
- **Dynamic Multi-Step Flow:** Automatically shows/hides Social Media and Meta Ads steps based on the services selected in Step 1.
- **Form Validation:** Comprehensive Zod schemas with custom error messages for every field.
- **File Uploads:** Custom `DropZone` component with image previews, drag-and-drop support, and 50MB payload handling.
- **Draft Autosave:** LocalStorage persistence so users can return to the form without losing progress.
- **Serverless Email:** API route (`/api/send-email`) that sends a beautifully formatted HTML submission to SHNKR.DEV inbox with attachment renaming, plus an automated client confirmation email.

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Add environment variables:
Create a `.env.local` file in the root directory (you can copy `.env.example`).
**IMPORTANT:** For Gmail, you MUST use a 16-character App Password, NOT your regular password.
*Go to Google Account > Security > 2-Step Verification > App Passwords*

```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASS=abcd_efgh_ijkl_mnop
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Code Structure

- `src/components/OnboardingForm.tsx`: The master controller. Handles draft parsing, dynamic step navigation, and API submission.
- `src/components/steps/*`: Individual step components with modular forms.
- `src/lib/schema.ts`: Single source of truth for Zod validation schemas.
- `src/lib/constants.ts`: Defines the step hierarchy and conditional rendering rules.
- `src/lib/fileHelpers.ts`: Attachment renaming logic based on the PRD manifest mapping.
- `src/app/api/send-email/route.ts`: Nodemailer POST handler.
- `src/globals.css`: Tailwind v4 configuration and master design system tokens.

## Build for Production

```bash
npm run build
```
