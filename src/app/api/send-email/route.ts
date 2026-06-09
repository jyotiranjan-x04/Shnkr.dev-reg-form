import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { buildEmailHTML, buildClientConfirmationHTML } from '../../../lib/emailTemplate'
import { renameAndManifestFromFormData } from '../../../lib/fileHelpers'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fields: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') fields[key] = value
    }

    const clientName = fields.clientName || 'Unknown Client'
    const clientEmail = fields.contactEmail || ''
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    // Process files and build attachments
    const { attachments, fileManifest } = await renameAndManifestFromFormData(formData)

    const htmlBody = buildEmailHTML({ fields, clientName, submittedAt, fileManifest, totalFiles: attachments.length })

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"SHNKR.DEV Onboarding" <${process.env.GMAIL_USER}>`,
      to: 'sahoojyotiranjan595@gmail.com',
      replyTo: clientEmail,
      subject: `[SHNKR.DEV] New Client Onboarding — ${clientName} — ${submittedAt}`,
      html: htmlBody,
      attachments,
    })

    if (clientEmail) {
      await transporter.sendMail({
        from: `"SHNKR.DEV" <${process.env.GMAIL_USER}>`,
        to: clientEmail,
        subject: `✅ We received your onboarding form — SHNKR.DEV`,
        html: buildClientConfirmationHTML(clientName),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
