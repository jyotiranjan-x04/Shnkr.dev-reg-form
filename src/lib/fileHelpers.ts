import type nodemailer from 'nodemailer'

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
}

export async function renameAndManifestFromFormData(formData: FormData) {
  const attachments: any[] = []
  const fileManifest: Record<string, string[]> = {}
  const prefixCounters: Record<string, number> = {}

  for (const [key, value] of formData.entries()) {
    // web File in Next.js request
    if (typeof (value as any) !== 'string' && (value as any).size) {
      const file = value as any
      const rename = FILE_RENAME_MAP[key]
      const ext = (file.name || '').split('.').pop() || 'bin'
      let filename = file.name

      if (rename) {
        prefixCounters[rename.prefix] = (prefixCounters[rename.prefix] || 0) + 1
        const count = prefixCounters[rename.prefix]
        const isSingle = ['logo_primary','logo_dark','logo_light','logo_icon','favicon','existingBrandGuide','smm_profilePhoto','smm_coverPhoto'].includes(key)
        filename = isSingle ? `${rename.prefix}.${ext}` : `${rename.prefix}_${count}.${ext}`
        if (!fileManifest[rename.section]) fileManifest[rename.section] = []
        fileManifest[rename.section].push(filename)
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename, content: buffer, contentType: file.type || 'application/octet-stream' })
    }
  }

  return { attachments, fileManifest }
}
