# SHNKR.DEV — Client Onboarding Form
## Complete Build Prompt for AI Coding Assistants (Cursor / Claude Code / Copilot)

---

## 🎯 WHAT YOU ARE BUILDING

A **multi-step client onboarding form** for a web development & digital marketing agency called **SHNKR.DEV** (run by Sai Shankar Das). When a client submits the form, **all their details + uploaded files arrive as a structured, clearly labelled email** at `sahoojyotiranjan595@gmail.com` — using **Nodemailer via a Next.js API Route** (no separate backend server).

The form must be **universal** — any client (not just Puri Handloom Garden) can fill it. The business name they enter at Step 1 is used throughout the email subject, file names, and report sections.

---

## 🛠️ TECH STACK — EXACT VERSIONS

```
Next.js 15 (App Router, TypeScript)
Tailwind CSS v4
Nodemailer ^6.9.x
react-hook-form ^7.x
zod ^3.x
@hookform/resolvers ^3.x
react-dropzone ^14.x
```

### Install command:
```bash
npx create-next-app@latest shnkrdev-onboarding --typescript --tailwind --app --src-dir --import-alias "@/*"
cd shnkrdev-onboarding
npm install nodemailer react-hook-form zod @hookform/resolvers react-dropzone
npm install --save-dev @types/nodemailer
```

---

## 📁 COMPLETE FOLDER STRUCTURE

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with SHNKR.DEV meta
│   ├── page.tsx                    # Renders <OnboardingForm />
│   ├── globals.css                 # Tailwind + custom CSS variables
│   └── api/
│       └── send-email/
│           └── route.ts            # POST handler — Nodemailer logic
│
├── components/
│   ├── OnboardingForm.tsx          # Master form shell (step controller)
│   ├── ProgressBar.tsx             # Step progress indicator
│   ├── StepIndicator.tsx           # Numbered step bubbles
│   │
│   ├── steps/
│   │   ├── Step0_ClientInfo.tsx    # Client name, email, phone, project type
│   │   ├── Step1_BrandAssets.tsx   # Logo uploads, brand colours, fonts
│   │   ├── Step2_BusinessInfo.tsx  # Address, phones, WhatsApp, GMaps
│   │   ├── Step3_Content.tsx       # About us, tagline, USPs, categories
│   │   ├── Step4_Photos.tsx        # Product photos, banners, store photos
│   │   ├── Step5_Technical.tsx     # Domain, hosting, existing site
│   │   ├── Step6_DesignPrefs.tsx   # Style preferences, reference sites
│   │   ├── Step7_SocialMedia.tsx   # FB/IG handles + access info
│   │   ├── Step8_MetaAds.tsx       # Ad budget, account details
│   │   └── Step9_Strategy.tsx      # Target audience, brand voice, tone
│   │
│   ├── ui/
│   │   ├── DropZone.tsx            # Reusable drag-and-drop file uploader
│   │   ├── FieldWrapper.tsx        # Label + input + error + badge (Required/Optional)
│   │   ├── SectionHeading.tsx      # Orange-accented section title
│   │   ├── TagBadge.tsx            # "Required" / "Preferred" / "Optional" pill
│   │   └── SuccessScreen.tsx       # Final confirmation screen
│   │
│   └── layout/
│       ├── Header.tsx              # SHNKR.DEV logo + form title
│       └── Footer.tsx              # shnkrdev.in branding
│
├── lib/
│   ├── schema.ts                   # Full Zod validation schema
│   ├── emailTemplate.ts            # HTML email builder function
│   ├── fileHelpers.ts              # File renaming + base64 conversion utils
│   └── constants.ts                # Step definitions, field configs
│
└── types/
    └── form.ts                     # All TypeScript interfaces
```

---

## 🎨 DESIGN SYSTEM — SHNKR.DEV BRAND

### Colours (define as CSS variables in globals.css):
```css
:root {
  --brand-orange:     #F2540F;   /* Primary brand orange */
  --brand-orange-dim: #C94309;   /* Hover / darker orange */
  --brand-cream:      #EFEEED;   /* Secondary light */
  --bg-dark:          #111111;   /* Page background */
  --bg-card:          #1A1A1A;   /* Form card background */
  --bg-step:          #222222;   /* Step section background */
  --border:           #2E2E2E;   /* Default border */
  --border-focus:     #F2540F;   /* Focused border */
  --text-primary:     #F5F5F5;   /* Main text */
  --text-muted:       #888888;   /* Placeholder / hints */
  --text-label:       #CCCCCC;   /* Field labels */
  --success:          #22C55E;
  --error:            #EF4444;
  --warning:          #F59E0B;
}
```

### Typography:
- **Display / Headings**: `Barlow Condensed` (Google Fonts) — bold, geometric, matches SHNKR.DEV logo feel
- **Body / Inputs**: `DM Sans` (Google Fonts) — clean and readable
- Import both in `layout.tsx` via `next/font/google`

### Logo:
Use an inline SVG text logo in the header:
```
<span style="color: #F2540F; font-family: 'Barlow Condensed'">SHNKR</span>
<span style="color: #F2540F">.DEV</span>
```
OR display the logo image if client provides it (place in `/public/logo.png`).

### Badge system:
```
🔴 Required   → bg: #2D1515, text: #EF4444, border: #7F1D1D
🟡 Preferred  → bg: #2D2415, text: #F59E0B, border: #78350F
🟢 Optional   → bg: #152D1A, text: #22C55E, border: #14532D
```

---

## 📋 FORM STEPS — COMPLETE FIELD SPECIFICATION

### STEP 0 — Client & Project Info
> This step personalises the entire form and email.

| Field ID | Label | Type | Required? | Email Section Label |
|----------|-------|------|-----------|-------------------|
| `clientName` | Client / Business Name | text | ✅ Required | Client Name |
| `contactPerson` | Your Name (Point of Contact) | text | ✅ Required | Contact Person |
| `contactEmail` | Your Email Address | email | ✅ Required | Client Email |
| `contactPhone` | Your WhatsApp / Phone Number | tel | ✅ Required | Contact Phone |
| `projectType` | Service Required | multi-checkbox | ✅ Required | Project Type |
| `projectNotes` | Any initial notes or context | textarea | 🟢 Optional | Initial Notes |

**projectType checkboxes**: `Website Development`, `Social Media Marketing`, `Meta Ads Management`, `Monthly Maintenance`, `Full Package`

---

### STEP 1 — Brand & Visual Identity
> File rename prefix: `A_Brand_`

| Field ID | Label | Type | Required? | File Rename Pattern |
|----------|-------|------|-----------|-------------------|
| `logo_primary` | Primary Logo | file (single) | ✅ Required | `A1_Logo_Primary.[ext]` |
| `logo_dark` | Logo — Dark Background Version | file (single) | 🟡 Preferred | `A2_Logo_Dark.[ext]` |
| `logo_light` | Logo — Light Background Version | file (single) | 🟢 Optional | `A3_Logo_Light.[ext]` |
| `logo_icon` | Logo Icon Only (no text) | file (single) | 🟡 Preferred | `A4_Logo_Icon.[ext]` |
| `favicon` | Favicon (browser tab icon) | file (single) | 🟡 Preferred | `A5_Favicon.[ext]` |
| `brandColours` | Brand Colours | text | 🟡 Preferred | Brand Colours |
| `brandFont` | Brand Font Name(s) | text | 🟢 Optional | Brand Fonts |
| `existingBrandGuide` | Brand Guide / Style Sheet | file (single) | 🟢 Optional | `A6_BrandGuide.[ext]` |

**DropZone accepts**: PNG, SVG, AI, PDF, JPG
**Show preview thumbnails** for all image uploads immediately after selection.

---

### STEP 2 — Business Information
> No file uploads in this step. All text fields.

| Field ID | Label | Type | Required? |
|----------|-------|------|-----------|
| `businessFullName` | Exact Business Name (for website) | text | ✅ Required |
| `tagline` | Tagline / Slogan | text | 🟡 Preferred |
| `businessAddress` | Full Business Address | textarea | ✅ Required |
| `primaryPhone` | Primary Phone Number | tel | ✅ Required |
| `secondaryPhone` | Secondary Phone (if any) | tel | 🟢 Optional |
| `businessEmail` | Business Email Address | email | ✅ Required |
| `whatsappNumber` | WhatsApp Business Number | tel | ✅ Required |
| `googleMapsUrl` | Google Maps Listing URL | url | ✅ Required |
| `googleBusinessAccess` | Can you add us as Google Business Manager? | radio (Yes/No) | 🟡 Preferred |
| `yearEstablished` | Year Established | text | 🟢 Optional |
| `gstNumber` | GST Number | text | 🟢 Optional |
| `website` | Existing Website URL (if any) | url | 🟢 Optional |

---

### STEP 3 — Written Content
> All textarea fields. No file uploads.

| Field ID | Label | Type | Required? | Rows |
|----------|-------|------|-----------|------|
| `aboutUs` | About Us — Brand Story | textarea | ✅ Required | 6 |
| `usps` | Why Choose You? (3–5 bullet points) | textarea | 🟡 Preferred | 4 |
| `homepageHeadline` | Homepage Hero Headline Text | text | 🟡 Preferred | 1 |
| `productCategories` | Product / Service Categories (one per line) | textarea | ✅ Required | 4 |
| `productDescriptions` | Product Descriptions | textarea | 🟡 Preferred | 5 |
| `pricing` | Pricing (if to be shown on website) | textarea | 🟢 Optional | 3 |
| `testimonials` | Customer Testimonials / Reviews | textarea | 🟡 Preferred | 4 |
| `faq` | Frequently Asked Questions | textarea | 🟢 Optional | 4 |
| `shippingPolicy` | Shipping / Return Policy | textarea | 🟢 Optional | 3 |

---

### STEP 4 — Photos & Visual Assets
> File rename prefixes per sub-section. All multi-file uploads.

| Field ID | Label | Type | Required? | File Rename Pattern |
|----------|-------|------|-----------|-------------------|
| `productPhotos` | Product Photos (all categories) | multi-file | ✅ Required | `D1_Product_[n].[ext]` |
| `heroImages` | Hero / Banner Images (wide landscape) | multi-file | ✅ Required | `D2_Hero_Banner_[n].[ext]` |
| `storePhotos` | Store / Shop Photos | multi-file | 🟡 Preferred | `D3_Store_[n].[ext]` |
| `teamPhotos` | Owner / Team Photos | multi-file | 🟡 Preferred | `D4_Team_[n].[ext]` |
| `artisanPhotos` | Artisan / Process / Behind-the-scenes | multi-file | 🟡 Preferred | `D5_BTS_[n].[ext]` |
| `lifestylePhotos` | Lifestyle / Model Photos | multi-file | 🟢 Optional | `D6_Lifestyle_[n].[ext]` |
| `certificates` | Awards / Certificates / Recognition | multi-file | 🟢 Optional | `D7_Certificate_[n].[ext]` |
| `videos` | Short Videos (product / store walkthrough) | multi-file | 🟢 Optional | `D8_Video_[n].[ext]` |

**Accept**: JPG, PNG, WEBP, SVG, MP4, MOV
**Show**: Image preview grid with filename and size after upload
**Limit**: 10MB per file, 50 files total per upload zone
**Show file count badge** on each zone: "5 files selected ✓"

---

### STEP 5 — Domain, Hosting & Technical
> Mix of text and file uploads.

| Field ID | Label | Type | Required? | File Rename |
|----------|-------|------|-----------|-------------|
| `domainName` | Existing Domain (e.g. yourbusiness.com) | text | 🟡 Preferred | — |
| `preferredDomains` | Preferred Domain Names (if no existing domain) | textarea | 🟡 Preferred | — |
| `hostingProvider` | Hosting Provider Name | text | 🟢 Optional | — |
| `domainRegistrar` | Domain Registrar (GoDaddy / BigRock etc.) | text | 🟢 Optional | — |
| `existingWebsiteUrl` | Existing Website URL | url | 🟢 Optional | — |
| `businessEmails` | Existing Business Email IDs to keep | textarea | 🟡 Preferred | — |
| `domainScreenshot` | Screenshot of Domain / Hosting Dashboard | multi-file | 🟢 Optional | `E1_Domain_Screenshot_[n].[ext]` |

---

### STEP 6 — Design Preferences
> All text/select/textarea. No file uploads.

| Field ID | Label | Type | Required? | Options |
|----------|-------|------|-----------|---------|
| `designStyle` | Design Style Preference | select | 🟡 Preferred | Traditional, Modern & Clean, Minimal, Bold & Vibrant, Earthy & Natural, Luxury & Premium, Playful & Fun |
| `colorPreference` | Colours You Like | text | 🟡 Preferred | — |
| `colorsToAvoid` | Colours / Styles to AVOID | text | 🟢 Optional | — |
| `referenceWebsites` | Reference Websites You Like (URLs) | textarea | 🟡 Preferred | — |
| `competitorWebsites` | Competitor Websites (so we design differently) | textarea | 🟡 Preferred | — |
| `additionalNotes` | Anything else about design / feel | textarea | 🟢 Optional | — |

---

### STEP 7 — Social Media Accounts
> Only shown if client selected SMM in Step 0.

| Field ID | Label | Type | Required? |
|----------|-------|------|-----------|
| `facebookPageUrl` | Facebook Page URL | url | ✅ Required |
| `instagramHandle` | Instagram Handle (@username) | text | ✅ Required |
| `facebookLinkedToInstagram` | Is Instagram linked to Facebook Page? | radio (Yes/No/Not Yet) | ✅ Required |
| `metaBusinessManagerId` | Meta Business Manager ID | text | 🟡 Preferred |
| `otaNumber` | 2FA / OTP Phone Number for Meta | tel | ✅ Required |
| `youtubeChannel` | YouTube Channel URL | url | 🟢 Optional |
| `otherSocialLinks` | Other Social Media Links | textarea | 🟢 Optional |
| `smm_profilePhoto` | Social Media Profile Photo | file (single) | ✅ Required | `G1_SM_ProfilePhoto.[ext]` |
| `smm_coverPhoto` | Facebook Cover / Instagram Banner | file (single) | 🟡 Preferred | `G2_SM_CoverPhoto.[ext]` |
| `smm_productPhotos` | Product Photos for Posts | multi-file | ✅ Required | `G3_SMM_Product_[n].[ext]` |
| `smm_reelFootage` | Raw Reels / Video Footage | multi-file | 🟡 Preferred | `G4_SMM_Reels_[n].[ext]` |
| `smm_btsContent` | Behind-the-Scenes Photos | multi-file | 🟡 Preferred | `G5_SMM_BTS_[n].[ext]` |

---

### STEP 8 — Meta Ads
> Only shown if client selected Meta Ads or SMM in Step 0.

| Field ID | Label | Type | Required? |
|----------|-------|------|-----------|
| `monthlyAdBudget` | Approved Monthly Ad Spend Budget (Rs.) | number | ✅ Required |
| `adAccountId` | Meta Ads Account ID | text | 🟡 Preferred |
| `adAccountFunded` | Is payment method added to Ad Account? | radio (Yes/No) | ✅ Required |
| `existingPixelId` | Facebook Pixel ID (if existing) | text | 🟢 Optional |
| `targetLocation` | Target Geography (City / State / Country) | text | ✅ Required |
| `targetAgeRange` | Target Age Range | text | 🟡 Preferred |
| `targetGender` | Target Gender | select (All/Male/Female) | 🟡 Preferred |

---

### STEP 9 — Brand Voice & Strategy
> Only shown if client selected SMM in Step 0.

| Field ID | Label | Type | Required? | Options |
|----------|-------|------|-----------|---------|
| `targetCustomer` | Describe Your Ideal Customer | textarea | ✅ Required | — |
| `keyProductsToPromote` | Top Products / Services to Promote | textarea | ✅ Required | — |
| `brandTone` | Brand Tone | select | 🟡 Preferred | Formal & Professional, Friendly & Conversational, Traditional & Cultural, Youthful & Trendy, Aspirational & Premium, Casual & Fun |
| `captionLanguages` | Caption Languages | multi-checkbox | 🟡 Preferred | English, Hindi, Odia, Bengali |
| `contentThemes` | Content Themes You Want | textarea | 🟡 Preferred | — |
| `topicsToAvoid` | Topics / Content to Avoid | textarea | ✅ Required | — |
| `upcomingLaunches` | Upcoming Launches or Events (next 3 months) | textarea | 🟡 Preferred | — |
| `currentOffers` | Any Current Offers or Discounts | textarea | 🟢 Optional | — |
| `existingHashtags` | Hashtags You Already Use | text | 🟢 Optional | — |
| `pocName` | Approval Point of Contact Name | text | ✅ Required | — |
| `pocWhatsapp` | POC WhatsApp Number | tel | ✅ Required | — |
| `reportEmail` | Email for Monthly Reports | email | ✅ Required | — |
| `preferredApprovalTime` | Preferred Content Approval Time | text | 🟡 Preferred | — |

---

## 🧩 COMPONENT SPECIFICATIONS

### `OnboardingForm.tsx` — Master Controller
```typescript
// State to manage:
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState<FormData>({});
const [files, setFiles] = useState<FileStore>({});  // { fieldId: File[] }
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);

// Step logic:
// - Total steps = 10 (0 through 9)
// - Steps 7, 8, 9 are conditionally shown based on projectType selected in Step 0
// - If only "Website Development" selected → show Steps 0–6 only
// - If SMM selected → show Steps 0–9
// - Navigation: "Next" validates current step before advancing
// - "Back" always works without validation
// - Final step shows "Submit" button instead of "Next"
```

### `DropZone.tsx` — Reusable File Upload Component
```typescript
interface DropZoneProps {
  fieldId: string;
  label: string;
  accept: string[];          // e.g. ['image/*', 'video/mp4']
  multiple: boolean;
  maxFiles?: number;          // default 20
  maxSizeMB?: number;         // default 10
  required: boolean;
  badge: 'required' | 'preferred' | 'optional';
  onFilesChange: (fieldId: string, files: File[]) => void;
  hint?: string;              // spec text e.g. "JPG/PNG, min 800×800px"
  renamePattern?: string;     // e.g. "D1_Product_[n].[ext]" — shown as info
}

// Features:
// - Drag-and-drop area with dashed orange border on hover
// - Click-to-browse fallback
// - Show thumbnail grid for images (3 columns, 80px thumbnails)
// - Show filename + file size for non-image files
// - Individual remove button (×) on each file
// - File count badge: "3 files • 2.4 MB"
// - Error state if Required and empty on Next
// - Accepts multiple files in one drop
```

### `FieldWrapper.tsx`
```typescript
// Wraps any input with:
// - Label (with field ID as htmlFor)
// - Badge (Required/Preferred/Optional pill)
// - The child input/textarea/select
// - Error message (red, below input)
// - Optional hint text (muted grey, below input)
```

---

## 🔌 API ROUTE — `/app/api/send-email/route.ts`

### Full implementation:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const config = {
  api: { bodyParser: false }
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // ── 1. Extract all text fields ──────────────────────────────────────────
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        fields[key] = value;
      }
    }

    const clientName   = fields.clientName || 'Unknown Client';
    const clientEmail  = fields.contactEmail || '';
    const submittedAt  = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // ── 2. Extract and rename all files ────────────────────────────────────
    const attachments: nodemailer.Attachment[] = [];
    const fileManifest: Record<string, string[]> = {};  // section → [renamedFilename]

    // File rename map: formFieldId → rename pattern
    const FILE_RENAME_MAP: Record<string, { prefix: string; section: string }> = {
      logo_primary:         { prefix: 'A1_Logo_Primary',         section: 'A — Brand Assets' },
      logo_dark:            { prefix: 'A2_Logo_Dark',            section: 'A — Brand Assets' },
      logo_light:           { prefix: 'A3_Logo_Light',           section: 'A — Brand Assets' },
      logo_icon:            { prefix: 'A4_Logo_Icon',            section: 'A — Brand Assets' },
      favicon:              { prefix: 'A5_Favicon',              section: 'A — Brand Assets' },
      existingBrandGuide:   { prefix: 'A6_BrandGuide',           section: 'A — Brand Assets' },
      domainScreenshot:     { prefix: 'E1_Domain_Screenshot',    section: 'E — Technical' },
      productPhotos:        { prefix: 'D1_Product',              section: 'D — Photos' },
      heroImages:           { prefix: 'D2_Hero_Banner',          section: 'D — Photos' },
      storePhotos:          { prefix: 'D3_Store',                section: 'D — Photos' },
      teamPhotos:           { prefix: 'D4_Team',                 section: 'D — Photos' },
      artisanPhotos:        { prefix: 'D5_BTS',                  section: 'D — Photos' },
      lifestylePhotos:      { prefix: 'D6_Lifestyle',            section: 'D — Photos' },
      certificates:         { prefix: 'D7_Certificate',          section: 'D — Photos' },
      videos:               { prefix: 'D8_Video',                section: 'D — Photos' },
      smm_profilePhoto:     { prefix: 'G1_SM_ProfilePhoto',      section: 'G — Social Media' },
      smm_coverPhoto:       { prefix: 'G2_SM_CoverPhoto',        section: 'G — Social Media' },
      smm_productPhotos:    { prefix: 'G3_SMM_Product',          section: 'G — Social Media' },
      smm_reelFootage:      { prefix: 'G4_SMM_Reels',            section: 'G — Social Media' },
      smm_btsContent:       { prefix: 'G5_SMM_BTS',              section: 'G — Social Media' },
    };

    // Counter per prefix for multi-file fields
    const prefixCounters: Record<string, number> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        const rename = FILE_RENAME_MAP[key];
        const ext = value.name.split('.').pop() || 'bin';

        let filename: string;
        if (rename) {
          prefixCounters[rename.prefix] = (prefixCounters[rename.prefix] || 0) + 1;
          const count = prefixCounters[rename.prefix];
          // Single-file fields (logo, favicon etc.) don't need counter
          const isSingle = ['logo_primary','logo_dark','logo_light','logo_icon',
                            'favicon','existingBrandGuide','smm_profilePhoto','smm_coverPhoto']
                            .includes(key);
          filename = isSingle
            ? `${rename.prefix}.${ext}`
            : `${rename.prefix}_${count}.${ext}`;

          // Track in manifest
          if (!fileManifest[rename.section]) fileManifest[rename.section] = [];
          fileManifest[rename.section].push(filename);
        } else {
          filename = value.name;
        }

        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename,
          content: buffer,
          contentType: value.type || 'application/octet-stream',
        });
      }
    }

    // ── 3. Build HTML email body ─────────────────────────────────────────────
    const htmlBody = buildEmailHTML({
      fields,
      clientName,
      submittedAt,
      fileManifest,
      totalFiles: attachments.length,
    });

    // ── 4. Configure Nodemailer (Gmail SMTP) ────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,      // your Gmail address
        pass: process.env.GMAIL_APP_PASS,  // Gmail App Password (16-char)
      },
    });

    // ── 5. Send email ────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"SHNKR.DEV Onboarding" <${process.env.GMAIL_USER}>`,
      to: 'sahoojyotiranjan595@gmail.com',
      replyTo: clientEmail,
      subject: `[SHNKR.DEV] New Client Onboarding — ${clientName} — ${submittedAt}`,
      html: htmlBody,
      attachments,
    });

    // ── 6. Send confirmation to client ───────────────────────────────────────
    if (clientEmail) {
      await transporter.sendMail({
        from: `"SHNKR.DEV" <${process.env.GMAIL_USER}>`,
        to: clientEmail,
        subject: `✅ We received your onboarding form — SHNKR.DEV`,
        html: buildClientConfirmationHTML(clientName),
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
```

---

## 📧 EMAIL TEMPLATE — `lib/emailTemplate.ts`

### `buildEmailHTML()` must produce this structure:

```html
<!-- Email HTML structure -->
<html>
<head>
  <style>
    /* Inline all styles for email client compatibility */
    body { font-family: Arial, sans-serif; background: #111; color: #f5f5f5; margin: 0; padding: 0; }
    .header { background: #F2540F; padding: 24px 32px; }
    .header h1 { color: white; margin: 0; font-size: 28px; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px; }
    .meta-bar { background: #1A1A1A; padding: 12px 32px; border-bottom: 1px solid #2E2E2E; }
    .meta-bar table { width: 100%; }
    .meta-bar td { color: #888; font-size: 13px; padding: 2px 0; }
    .meta-bar td strong { color: #F2540F; }
    .section { padding: 24px 32px; border-bottom: 1px solid #2E2E2E; }
    .section-title { 
      color: #F2540F; font-size: 13px; font-weight: bold; 
      letter-spacing: 3px; text-transform: uppercase;
      border-left: 3px solid #F2540F; padding-left: 10px;
      margin: 0 0 16px; 
    }
    .field-row { margin-bottom: 12px; }
    .field-label { color: #888; font-size: 12px; text-transform: uppercase; 
                   letter-spacing: 1px; margin-bottom: 2px; }
    .field-value { color: #F5F5F5; font-size: 14px; line-height: 1.5; 
                   background: #222; padding: 8px 12px; border-radius: 4px; }
    .field-value.empty { color: #555; font-style: italic; }
    .files-section { background: #1A1A1A; padding: 24px 32px; }
    .file-group { margin-bottom: 16px; }
    .file-group-title { color: #F59E0B; font-size: 12px; letter-spacing: 2px; 
                        text-transform: uppercase; margin-bottom: 6px; }
    .file-chip { display: inline-block; background: #2E2E2E; color: #F5F5F5;
                 padding: 4px 10px; border-radius: 4px; font-size: 12px; 
                 margin: 3px 3px 3px 0; font-family: monospace; }
    .footer { background: #0A0A0A; padding: 16px 32px; text-align: center; }
    .footer p { color: #444; font-size: 12px; margin: 0; }
    .badge-required { background: #2D1515; color: #EF4444; padding: 2px 8px; 
                      border-radius: 12px; font-size: 11px; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  </style>
</head>
<body>
  <!-- Header with SHNKR.DEV branding -->
  <div class="header">
    <h1>SHNKR.DEV</h1>
    <p>New Client Onboarding Submission</p>
  </div>

  <!-- Meta summary bar -->
  <div class="meta-bar">
    <table>
      <tr>
        <td><strong>Client:</strong> {clientName}</td>
        <td><strong>Submitted:</strong> {submittedAt} IST</td>
      </tr>
      <tr>
        <td><strong>Email:</strong> {contactEmail}</td>
        <td><strong>Phone:</strong> {contactPhone}</td>
      </tr>
      <tr>
        <td><strong>Services:</strong> {projectType}</td>
        <td><strong>Total Files:</strong> {totalFiles} attachments</td>
      </tr>
    </table>
  </div>

  <!-- SECTION: Client & Project Info -->
  <div class="section">
    <div class="section-title">📋 Step 0 — Client & Project Info</div>
    ... all fields from Step 0 ...
  </div>

  <!-- SECTION: Brand & Visual Identity -->
  <div class="section">
    <div class="section-title">🎨 Section A — Brand & Visual Identity</div>
    ... fields + note "See attachments: A1_Logo_Primary, A2_Logo_Dark..." ...
  </div>

  <!-- Repeat for all sections B through K -->
  <!-- Each section only renders if that step's data exists -->

  <!-- FILE MANIFEST SECTION -->
  <div class="files-section">
    <div class="section-title">📎 Attached Files — Complete Manifest</div>
    <!-- For each section in fileManifest: -->
    <div class="file-group">
      <div class="file-group-title">D — Product Photos (12 files)</div>
      <span class="file-chip">D1_Product_1.jpg</span>
      <span class="file-chip">D1_Product_2.jpg</span>
      ... etc ...
    </div>
  </div>

  <div class="footer">
    <p>SHNKR.DEV · shnkrdev.in · Sai Shankar Das · Bhubaneswar, Odisha</p>
    <p>This submission was made via the SHNKR.DEV Client Onboarding Portal</p>
  </div>
</body>
</html>
```

### `buildClientConfirmationHTML(clientName)` sends to the client:
- Thank you message
- "We'll be in touch within 24 hours" 
- SHNKR.DEV contact details
- Orange-branded, clean design

---

## 🔐 ENVIRONMENT VARIABLES — `.env.local`

```env
GMAIL_USER=sahoojyotiranjan595@gmail.com
GMAIL_APP_PASS=xxxx xxxx xxxx xxxx
```

### Setting up Gmail App Password:
Add these comments in the README:
```
1. Go to myaccount.google.com
2. Security → 2-Step Verification (must be ON)
3. Security → App Passwords
4. Select "Mail" + "Other device" → name it "SHNKRDEV Onboarding"
5. Copy the 16-character password → paste as GMAIL_APP_PASS
```

---

## 🎭 UI/UX BEHAVIOUR SPECIFICATIONS

### Multi-Step Navigation
```
- Top of page: ProgressBar showing "Step 3 of 6 — Photos & Visual Assets"
- Below progress: StepIndicator showing numbered circles (completed = orange solid, 
  current = orange ring, upcoming = grey ring)
- Each step renders inside an animated card (slide in from right on Next, 
  slide in from left on Back) using CSS transitions
- "Next" button = orange, full-width on mobile, right-aligned on desktop
- "Back" button = ghost/outlined, left of "Next"
- Both buttons disabled during submission
```

### Form Validation
```
- Validate on "Next" click using react-hook-form + zod
- Only Required fields are validated on Next
- Preferred/Optional fields never block progression
- Errors appear inline below each field in red
- If any Required field in current step is empty → scroll to first error
- File fields: validate Required DropZones have at least 1 file
```

### Submission Flow
```
1. Client clicks "Submit" on final step
2. Button shows spinner + "Sending your details..."
3. All formData collected into a single FormData object
4. Files appended with their fieldId as the FormData key
5. POST to /api/send-email
6. On success → show <SuccessScreen /> with:
   - Large orange checkmark animation
   - "Your details have been submitted to SHNKR.DEV!"
   - "We'll review everything and get back to you within 24 hours."
   - Client's submitted email shown
   - "Start Over" button
7. On error → show red error toast with retry option
```

### DropZone Behaviour
```
- Default state: dashed border (#2E2E2E), dark background
  Shows: upload icon + "Drag files here or click to browse"
  Shows: accepted file types and max size as hint text
- Hover/drag-over state: dashed orange border, slight orange tint background
- Files selected state:
  → Images: 3-column thumbnail grid, 80px × 80px, object-cover
  → Non-images: icon + filename + file size
  → Each file has × remove button (top-right corner of thumbnail)
  → Bottom bar: "N files selected · X.X MB total · [Clear All]"
- Error state (Required + empty + Next clicked): red border + red error message
```

---

## 📐 PAGE LAYOUT SPECIFICATION

```
Page structure:
┌─────────────────────────────────┐
│           <Header />            │  Fixed top, SHNKR.DEV logo left, 
│    SHNKR.DEV   Onboarding Form  │  "Client Onboarding" tag right
├─────────────────────────────────┤
│         <ProgressBar />         │  Orange fill bar + step count text
│         <StepIndicator />       │  Numbered circles
├─────────────────────────────────┤
│                                 │
│     Current Step Component      │  Max-width 760px, centred
│     (animated card)             │  White card on dark background
│                                 │  32px padding, 8px border radius
├─────────────────────────────────┤
│  [← Back]          [Next →]     │  Sticky bottom on mobile
└─────────────────────────────────┘
```

### Responsive:
- Mobile (< 640px): full-width, 16px padding, sticky bottom nav buttons
- Tablet (640–1024px): 600px max-width card
- Desktop (> 1024px): 760px max-width card, centred with generous vertical space

---

## 🧪 ZOD SCHEMA — `lib/schema.ts`

```typescript
import { z } from 'zod';

// Step 0
export const step0Schema = z.object({
  clientName:      z.string().min(2, 'Business name is required'),
  contactPerson:   z.string().min(2, 'Your name is required'),
  contactEmail:    z.string().email('Valid email required'),
  contactPhone:    z.string().min(10, 'Phone number required'),
  projectType:     z.array(z.string()).min(1, 'Select at least one service'),
  projectNotes:    z.string().optional(),
});

// Step 1 — files validated separately in component
export const step1Schema = z.object({
  brandColours:    z.string().optional(),
  brandFont:       z.string().optional(),
  // Files validated via DropZone component, not Zod
});

// Step 2
export const step2Schema = z.object({
  businessFullName:      z.string().min(2, 'Business name required'),
  tagline:               z.string().optional(),
  businessAddress:       z.string().min(10, 'Full address required'),
  primaryPhone:          z.string().min(10, 'Phone number required'),
  secondaryPhone:        z.string().optional(),
  businessEmail:         z.string().email('Valid email required'),
  whatsappNumber:        z.string().min(10, 'WhatsApp number required'),
  googleMapsUrl:         z.string().url('Valid Google Maps URL required'),
  googleBusinessAccess:  z.enum(['Yes', 'No']).optional(),
  yearEstablished:       z.string().optional(),
  gstNumber:             z.string().optional(),
  website:               z.string().url().optional().or(z.literal('')),
});

// Step 3
export const step3Schema = z.object({
  aboutUs:           z.string().min(50, 'Please write at least a short brand story (50+ characters)'),
  usps:              z.string().optional(),
  homepageHeadline:  z.string().optional(),
  productCategories: z.string().min(5, 'Please list at least one product category'),
  productDescriptions: z.string().optional(),
  pricing:           z.string().optional(),
  testimonials:      z.string().optional(),
  faq:               z.string().optional(),
  shippingPolicy:    z.string().optional(),
});

// Steps 4–9: define similarly
// Export combined type:
export type FullFormData = z.infer<typeof step0Schema>
  & z.infer<typeof step1Schema>
  & z.infer<typeof step2Schema>
  & z.infer<typeof step3Schema>
  & { /* steps 4–9 fields */ };
```

---

## 📝 `lib/constants.ts` — Step Definitions

```typescript
export const STEPS = [
  { id: 0, title: 'Client & Project',     icon: '👤', conditional: false },
  { id: 1, title: 'Brand Assets',          icon: '🎨', conditional: false },
  { id: 2, title: 'Business Info',         icon: '🏪', conditional: false },
  { id: 3, title: 'Written Content',       icon: '📝', conditional: false },
  { id: 4, title: 'Photos & Media',        icon: '📸', conditional: false },
  { id: 5, title: 'Domain & Technical',    icon: '🌐', conditional: false },
  { id: 6, title: 'Design Preferences',    icon: '🎯', conditional: false },
  { id: 7, title: 'Social Media',          icon: '📱', conditional: true,  requires: ['Social Media Marketing'] },
  { id: 8, title: 'Meta Ads',              icon: '💰', conditional: true,  requires: ['Meta Ads Management', 'Social Media Marketing'] },
  { id: 9, title: 'Brand Strategy',        icon: '🗣️', conditional: true,  requires: ['Social Media Marketing'] },
];

// Computed active steps based on selected services in Step 0:
export function getActiveSteps(selectedServices: string[]): typeof STEPS {
  return STEPS.filter(step => 
    !step.conditional || 
    step.requires?.some(r => selectedServices.includes(r))
  );
}
```

---

## 🚀 SUBMISSION HANDLER — `OnboardingForm.tsx`

```typescript
const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const fd = new FormData();

    // Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fd.append(key, value.join(', '));
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    });

    // Append all files with their fieldId as key
    // Multiple files for same field → append multiple times with same key
    Object.entries(files).forEach(([fieldId, fileList]) => {
      fileList.forEach(file => {
        fd.append(fieldId, file);  // nodemailer API route handles renaming
      });
    });

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: fd,
      // DO NOT set Content-Type header — browser sets it with boundary for FormData
    });

    const result = await response.json();

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      setSubmitError(result.error || 'Submission failed. Please try again.');
    }
  } catch (err) {
    setSubmitError('Network error. Please check your connection and try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 💅 TAILWIND CONFIG ADDITIONS — `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:  '#F2540F',
          dim:     '#C94309',
          cream:   '#EFEEED',
        },
        surface: {
          dark:    '#111111',
          card:    '#1A1A1A',
          step:    '#222222',
          hover:   '#2A2A2A',
        },
        border: {
          DEFAULT: '#2E2E2E',
          focus:   '#F2540F',
        }
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-in-left':  'slideInLeft 0.25s ease-out',
        'fade-up':        'fadeUp 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%':   { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## ✅ SUCCESS SCREEN — `ui/SuccessScreen.tsx`

```
Design:
- Dark background with a large animated orange circle
- Inside circle: animated checkmark drawing itself (CSS SVG stroke-dashoffset animation)
- Bold heading: "Form Submitted Successfully!"
- Subheading: "We've received {clientName}'s details."
- Body text: "A confirmation has been sent to {contactEmail}. 
              Our team will review your submission and get back to you 
              within 24 hours on WhatsApp."
- Grey divider
- Filed summary:
  "Total fields filled: {count}"
  "Files uploaded: {fileCount} ({totalMB} MB)"
- Orange CTA button: "Submit Another Client →"
- Footer: "SHNKR.DEV · shnkrdev.in"
```

---

## ⚠️ IMPORTANT IMPLEMENTATION NOTES

1. **File size limit**: Next.js has a 4MB default body limit. For file uploads, configure in `next.config.ts`:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '50mb' },
  },
  api: {
    bodyParser: { sizeLimit: '50mb' },
    responseLimit: '50mb',
  },
};
```

2. **FormData in App Router**: Use `request.formData()` directly — do NOT use body parsers.

3. **Gmail rate limits**: Gmail SMTP allows ~500 emails/day. Fine for a client onboarding form.

4. **File previews**: Use `URL.createObjectURL(file)` for image previews. Clean up with `URL.revokeObjectURL()` on unmount.

5. **No third-party email service needed**: Gmail SMTP + App Password is sufficient.

6. **Large files**: Warn users that uploading many large files may take time. Show upload progress if possible using `XMLHttpRequest` instead of `fetch` for the final submit.

7. **Auto-save**: Use `localStorage` to persist form data between steps so users don't lose progress on accidental refresh:
```typescript
useEffect(() => {
  localStorage.setItem('shnkrdev_form_draft', JSON.stringify(formData));
}, [formData]);
// On mount: restore from localStorage
```

8. **Conditional step numbering**: When steps 7/8/9 are hidden, re-number the progress bar to show e.g. "Step 5 of 7" not "Step 5 of 10".

---

## 📦 FINAL CHECKLIST FOR IMPLEMENTATION

- [ ] `npx create-next-app@latest` with TypeScript + Tailwind + App Router
- [ ] Install dependencies (nodemailer, react-hook-form, zod, react-dropzone)
- [ ] Add Google Fonts (Barlow Condensed + DM Sans) via next/font/google in layout.tsx
- [ ] Create all step components (Step0 through Step9)
- [ ] Create DropZone, FieldWrapper, TagBadge, SectionHeading, SuccessScreen UI components
- [ ] Create /app/api/send-email/route.ts with full Nodemailer logic
- [ ] Create lib/emailTemplate.ts with HTML builder
- [ ] Create lib/fileHelpers.ts with rename logic
- [ ] Create lib/schema.ts with Zod schemas for all steps
- [ ] Create lib/constants.ts with STEPS array and getActiveSteps()
- [ ] Create .env.local with GMAIL_USER and GMAIL_APP_PASS
- [ ] Configure next.config.ts for 50MB body size limit
- [ ] Test with real Gmail App Password
- [ ] Test file upload + email receipt at sahoojyotiranjan595@gmail.com
- [ ] Test conditional steps (Website-only vs Full Package)
- [ ] Test mobile responsiveness
- [ ] Add localStorage auto-save
- [ ] Deploy to Vercel (set env vars in Vercel dashboard)

---

## 🌐 DEPLOYMENT (VERCEL)

```bash
# Push to GitHub, then:
# 1. Import repo in vercel.com
# 2. Add Environment Variables in Vercel Dashboard:
#    GMAIL_USER = sahoojyotiranjan595@gmail.com
#    GMAIL_APP_PASS = your-16-char-app-password
# 3. Deploy
# URL will be: https://shnkrdev-onboarding.vercel.app (or custom domain)
```

---

*Built for SHNKR.DEV · shnkrdev.in · Sai Shankar Das · sahoojyotiranjan595@gmail.com*
