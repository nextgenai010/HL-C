import { z } from 'zod'
import { YDELSER } from './services'

export const CONTACT_OPTIONS = [...YDELSER.map(y => y.title), 'Andet / jeg er ikke sikker']
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Angiv venligst dit navn').max(100, 'Navnet er for langt'),
  phone: z.string().trim().min(6, 'Angiv venligst et telefonnummer').max(30, 'Telefonnummeret er for langt'),
  email: z.string().trim().email('Angiv en gyldig email').max(254),
  type: z.string().refine(value => CONTACT_OPTIONS.includes(value), 'Vælg en opgavetype'),
  message: z.string().trim().min(10, 'Beskriv opgaven med mindst 10 tegn').max(10000, 'Beskeden må højst være 10.000 tegn'),
})
export type ContactData = z.infer<typeof contactSchema>
export const MAX_FILES = 3
export const MAX_FILE_SIZE = 1.5 * 1024 * 1024
// Leave room for multipart headers within the hosting platform request limit.
export const MAX_TOTAL_FILE_SIZE = 4 * 1024 * 1024
export const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']
export const CONTACT_ERRORS: Record<string, string> = {
  invalid: 'Kontrollér dine oplysninger. Beskeden skal være mindst 10 tegn.',
  'too-many-files': 'Du kan vedhæfte op til 3 filer.',
  'file-too-large': 'Hver fil må højst fylde 1,5 MB.',
  'files-too-large': 'Dine vedhæftninger må højst fylde 4 MB i alt.',
  'file-type-not-allowed': 'Brug JPG, PNG, WEBP, HEIC eller PDF.',
}
