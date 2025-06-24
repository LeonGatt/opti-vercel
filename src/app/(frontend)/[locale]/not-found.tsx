import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations()
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">{t('error.not_found')}</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
