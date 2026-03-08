'use server'
import { secureFetch } from '@/lib/serverUtils'

export async function uploadImageAction(formData: FormData): Promise<{ url: string }> {
  return secureFetch('/api/upload-image', { method: 'POST', body: formData })
}
