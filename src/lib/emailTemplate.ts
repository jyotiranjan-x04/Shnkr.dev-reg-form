const FIELD_LABELS: Record<string, string> = {
  clientName: 'Client Name',
  contactPerson: 'Contact Person',
  contactEmail: 'Client Email',
  contactPhone: 'Contact Phone',
  projectType: 'Project Type',
  projectNotes: 'Initial Notes',
  brandColours: 'Brand Colours',
  brandFont: 'Brand Fonts',
  businessFullName: 'Business Name',
  tagline: 'Tagline / Slogan',
  businessAddress: 'Business Address',
  primaryPhone: 'Primary Phone',
  secondaryPhone: 'Secondary Phone',
  businessEmail: 'Business Email',
  whatsappNumber: 'WhatsApp Number',
  googleMapsUrl: 'Google Maps URL',
  googleBusinessAccess: 'Google Business Access',
  yearEstablished: 'Year Established',
  gstNumber: 'GST Number',
  website: 'Existing Website',
  aboutUs: 'About Us',
  usps: 'Why Choose You',
  homepageHeadline: 'Homepage Headline',
  productCategories: 'Product / Service Categories',
  productDescriptions: 'Product Descriptions',
  pricing: 'Pricing',
  testimonials: 'Testimonials / Reviews',
  faq: 'FAQ',
  shippingPolicy: 'Shipping / Return Policy',
  domainName: 'Existing Domain',
  preferredDomains: 'Preferred Domains',
  hostingProvider: 'Hosting Provider',
  domainRegistrar: 'Domain Registrar',
  existingWebsiteUrl: 'Existing Website URL',
  businessEmails: 'Existing Business Emails',
  designStyle: 'Design Style',
  colorPreference: 'Colours You Like',
  colorsToAvoid: 'Colours to Avoid',
  referenceWebsites: 'Reference Websites',
  competitorWebsites: 'Competitor Websites',
  additionalNotes: 'Additional Design Notes',
  facebookPageUrl: 'Facebook Page URL',
  socialMediaLoginId: 'Social Media Login ID',
  socialMediaPassword: 'Social Media Password',
  instagramHandle: 'Instagram Handle',
  facebookLinkedToInstagram: 'Instagram linked to Facebook Page',
  metaBusinessManagerId: 'Meta Business Manager ID',
  otaNumber: 'Meta 2FA / OTP Number',
  youtubeChannel: 'YouTube Channel URL',
  otherSocialLinks: 'Other Social Links',
  monthlyAdBudget: 'Monthly Ad Budget',
  adAccountId: 'Meta Ads Account ID',
  adAccountFunded: 'Ad Account Funded',
  existingPixelId: 'Existing Pixel ID',
  targetLocation: 'Target Geography',
  targetAgeRange: 'Target Age Range',
  targetGender: 'Target Gender',
  targetCustomer: 'Target Customer',
  keyProductsToPromote: 'Products / Services to Promote',
  brandTone: 'Brand Tone',
  captionLanguages: 'Caption Languages',
  contentThemes: 'Content Themes',
  topicsToAvoid: 'Topics to Avoid',
  upcomingLaunches: 'Upcoming Launches / Events',
  currentOffers: 'Current Offers / Discounts',
  existingHashtags: 'Existing Hashtags',
  pocName: 'Approval POC Name',
  pocWhatsapp: 'POC WhatsApp Number',
  reportEmail: 'Report Email',
  preferredApprovalTime: 'Preferred Approval Time',
}

const SECTION_HEADERS: Record<string, string> = {
  clientName: 'Client & Project',
  contactPerson: 'Client & Project',
  contactEmail: 'Client & Project',
  contactPhone: 'Client & Project',
  projectType: 'Client & Project',
  projectNotes: 'Client & Project',
  brandColours: 'Brand Identity',
  brandFont: 'Brand Identity',
  businessFullName: 'Business Information',
  tagline: 'Business Information',
  businessAddress: 'Business Information',
  primaryPhone: 'Business Information',
  secondaryPhone: 'Business Information',
  businessEmail: 'Business Information',
  whatsappNumber: 'Business Information',
  googleMapsUrl: 'Business Information',
  googleBusinessAccess: 'Business Information',
  yearEstablished: 'Business Information',
  gstNumber: 'Business Information',
  website: 'Business Information',
  aboutUs: 'Written Content',
  usps: 'Written Content',
  homepageHeadline: 'Written Content',
  productCategories: 'Written Content',
  productDescriptions: 'Written Content',
  pricing: 'Written Content',
  testimonials: 'Written Content',
  faq: 'Written Content',
  shippingPolicy: 'Written Content',
  domainName: 'Technical Details',
  preferredDomains: 'Technical Details',
  hostingProvider: 'Technical Details',
  domainRegistrar: 'Technical Details',
  existingWebsiteUrl: 'Technical Details',
  businessEmails: 'Technical Details',
  designStyle: 'Design Preferences',
  colorPreference: 'Design Preferences',
  colorsToAvoid: 'Design Preferences',
  referenceWebsites: 'Design Preferences',
  competitorWebsites: 'Design Preferences',
  additionalNotes: 'Design Preferences',
  facebookPageUrl: 'Social Media',
  socialMediaLoginId: 'Social Media',
  socialMediaPassword: 'Social Media',
  instagramHandle: 'Social Media',
  facebookLinkedToInstagram: 'Social Media',
  metaBusinessManagerId: 'Social Media',
  otaNumber: 'Social Media',
  youtubeChannel: 'Social Media',
  otherSocialLinks: 'Social Media',
  monthlyAdBudget: 'Meta Ads',
  adAccountId: 'Meta Ads',
  adAccountFunded: 'Meta Ads',
  existingPixelId: 'Meta Ads',
  targetLocation: 'Meta Ads',
  targetAgeRange: 'Meta Ads',
  targetGender: 'Meta Ads',
  targetCustomer: 'Strategy',
  keyProductsToPromote: 'Strategy',
  brandTone: 'Strategy',
  captionLanguages: 'Strategy',
  contentThemes: 'Strategy',
  topicsToAvoid: 'Strategy',
  upcomingLaunches: 'Strategy',
  currentOffers: 'Strategy',
  existingHashtags: 'Strategy',
  pocName: 'Strategy',
  pocWhatsapp: 'Strategy',
  reportEmail: 'Strategy',
  preferredApprovalTime: 'Strategy',
}

export function buildEmailHTML({ fields, clientName, submittedAt, fileManifest, totalFiles }: any) {
  const sections: Record<string, Array<{ label: string; value: string }>> = {}

  Object.entries(fields).forEach(([key, value]) => {
    const label = FIELD_LABELS[key] || key
    const section = SECTION_HEADERS[key] || 'Other Details'
    const text = Array.isArray(value) ? value.join(', ') : String(value)
    if (!sections[section]) sections[section] = []
    sections[section].push({ label, value: text })
  })

  const sectionHtml = Object.entries(sections).map(([section, items]) => `
    <div style="padding:16px;background:#111;margin-bottom:16px;border-radius:12px;">
      <h3 style="margin-bottom:12px;color:#F2540F;">${section}</h3>
      ${items.map(item => `
        <div style="margin-bottom:8px;"><strong>${item.label}:</strong> ${item.value || '<em>empty</em>'}</div>
      `).join('')}
    </div>
  `).join('')

  const attachmentsHtml = Object.entries(fileManifest || {}).map(([section, files]) => `
    <div style="margin-bottom:12px;">
      <strong>${section}</strong>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">
        ${((files as string[]) || []).map((file) => `<span style="display:inline-block;padding:4px 10px;background:#2E2E2E;border-radius:999px;font-size:12px;">${file}</span>`).join('')}
      </div>
    </div>
  `).join('')

  return `
  <html>
    <body style="background:#111;color:#f5f5f5;font-family:Arial, sans-serif;">
      <div style="background:#F2540F;padding:20px;color:white;border-radius:0 0 12px 12px;">
        <h1 style="margin:0;">SHNKR.DEV Onboarding Submission</h1>
        <p style="margin:4px 0 0;">Received from ${clientName}</p>
      </div>
      <div style="padding:20px;">
        <div style="margin-bottom:24px;padding:18px;background:#1A1A1A;border-radius:12px;">
          <div style="margin-bottom:8px;"><strong>Submitted:</strong> ${submittedAt} IST</div>
          <div><strong>Total files attached:</strong> ${totalFiles}</div>
        </div>
        ${sectionHtml}
        <div style="padding:16px;background:#1A1A1A;border-radius:12px;">
          <h3 style="color:#F2540F;margin-bottom:12px;">Attachments</h3>
          ${attachmentsHtml || '<div style="color:#888888;">No attachments uploaded.</div>'}
        </div>
      </div>
      <div style="padding:16px;color:#999999;text-align:center;font-size:12px;">SHNKR.DEV · shnkrdev.in</div>
    </body>
  </html>
  `
}

export function buildClientConfirmationHTML(clientName: string) {
  return `
  <div style="font-family:Arial, sans-serif; color:#111;">
    <div style="background:#F2540F; color:#fff; padding:18px; border-radius:12px; text-align:center;">
      <h2 style="margin:0;">Thanks for sending your details, ${clientName}!</h2>
    </div>
    <div style="padding:20px; background:#fafafa; color:#111; border-radius:12px; margin-top:12px;">
      <p>We have received your onboarding form and our team will review it within 24 hours.</p>
      <p>If you have any additional assets or updates, reply to this email and we will take care of it.</p>
      <p style="margin:0;">– Team SHNKR.DEV</p>
    </div>
  </div>
  `
}
