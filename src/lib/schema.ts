import { z } from 'zod'

export const step0Schema = z.object({
  clientName: z.string().min(2, 'Business name is required'),
  contactPerson: z.string().min(2, 'Your name is required'),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  projectType: z.array(z.string()).min(1, 'Select at least one service'),
  projectNotes: z.string().optional(),
})

export const step1Schema = z.object({
  brandColours: z.string().optional(),
  brandFont: z.string().optional(),
})

export const step2Schema = z.object({
  businessFullName: z.string().min(2, 'Business name is required'),
  tagline: z.string().optional(),
  businessAddress: z.string().min(10, 'Full address is required (min 10 characters)'),
  primaryPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  secondaryPhone: z.string().optional(),
  businessEmail: z.string().email('Please enter a valid email address'),
  whatsappNumber: z.string().min(10, 'WhatsApp number must be at least 10 digits'),
  googleMapsUrl: z.string().url('Please enter a valid Google Maps URL'),
  googleBusinessAccess: z.enum(['Yes', 'No']).optional(),
  yearEstablished: z.string().optional(),
  gstNumber: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})

export const step3Schema = z.object({
  aboutUs: z.string().min(50, 'Please write at least a short brand story (50+ characters)'),
  usps: z.string().optional(),
  homepageHeadline: z.string().optional(),
  productCategories: z.string().min(5, 'Please list at least one product category'),
  productDescriptions: z.string().optional(),
  pricing: z.string().optional(),
  testimonials: z.string().optional(),
  faq: z.string().optional(),
  shippingPolicy: z.string().optional(),
})

export const step4Schema = z.object({
  // file uploads validated in UI
})

export const step5Schema = z.object({
  domainName: z.string().optional(),
  preferredDomains: z.string().optional(),
  hostingProvider: z.string().optional(),
  domainRegistrar: z.string().optional(),
  existingWebsiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  businessEmails: z.string().optional(),
})

export const step6Schema = z.object({
  designStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  colorsToAvoid: z.string().optional(),
  referenceWebsites: z.string().optional(),
  competitorWebsites: z.string().optional(),
  additionalNotes: z.string().optional(),
})

export const step7Schema = z.object({
  facebookPageUrl: z.string().url('Please enter a valid Facebook URL'),
  instagramHandle: z.string().min(2, 'Instagram handle is required'),
  facebookLinkedToInstagram: z.enum(['Yes', 'No', 'Not Yet']),
  metaBusinessManagerId: z.string().optional(),
  otaNumber: z.string().min(10, 'OTP phone number must be at least 10 digits'),
  youtubeChannel: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  otherSocialLinks: z.string().optional(),
  socialMediaLoginId: z.string().min(2, 'Social Media Login ID is required'),
  socialMediaPassword: z.string().min(2, 'Social Media Password is required'),
})

export const step8Schema = z.object({
  monthlyAdBudget: z.number().min(1, 'Please enter an approved ad spend budget'),
  adAccountId: z.string().optional(),
  adAccountFunded: z.enum(['Yes', 'No']),
  existingPixelId: z.string().optional(),
  targetLocation: z.string().min(2, 'Target location is required'),
  targetAgeRange: z.string().optional(),
  targetGender: z.enum(['All', 'Male', 'Female']).optional(),
})

export const step9Schema = z.object({
  targetCustomer: z.string().min(10, 'Please describe your ideal customer (min 10 characters)'),
  keyProductsToPromote: z.string().min(10, 'Please list products to promote (min 10 characters)'),
  brandTone: z.string().optional(),
  captionLanguages: z.array(z.string()).optional(),
  contentThemes: z.string().optional(),
  topicsToAvoid: z.string().min(5, 'Please specify topics to avoid'),
  upcomingLaunches: z.string().optional(),
  currentOffers: z.string().optional(),
  existingHashtags: z.string().optional(),
  pocName: z.string().min(2, 'Approval contact name is required'),
  pocWhatsapp: z.string().min(10, 'WhatsApp number must be at least 10 digits'),
  reportEmail: z.string().email('Please enter a valid email address'),
  preferredApprovalTime: z.string().optional(),
})

export type FullFormData = z.infer<typeof step0Schema>
  & z.infer<typeof step1Schema>
  & z.infer<typeof step2Schema>
  & z.infer<typeof step3Schema>
  & z.infer<typeof step4Schema>
  & z.infer<typeof step5Schema>
  & z.infer<typeof step6Schema>
  & z.infer<typeof step7Schema>
  & z.infer<typeof step8Schema>
  & z.infer<typeof step9Schema>
