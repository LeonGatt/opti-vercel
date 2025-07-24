import './index.scss'
import { revalidatePath } from 'next/cache'
import { restoreBackup, restoreSeedMedia } from '../BackupDashboard/actions'
import { getPayload, User } from 'payload'

import { Button, Popup } from '@payloadcms/ui'
import { isAdminHidden } from '@/access/isAdmin'
import { serverConfig } from '@/config/server'
import configPromise from '@payload-config'
import { env } from '@/env'

const SEED_DUMP_URL =
  env.SERVER_URL + '/seed/demo-payblocks---demo-payblocks.trieb.work---1739813600714.json'

const SEED_OPTITRACK_HOMEPAGE_URL = env.SERVER_URL + '/seed/optitrack-homepage-seed.json'

const BackupDashboard: React.FC = async ({ user }: { user: User | null }) => {
  if (!user) return

  if (isAdminHidden({ user })) {
    return
  }

  // Check if example-contact-page was created by some previous seeding. If so, do not show the seeding button. anymore
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: 'example-contact-page',
      },
    },
  })
  const showSeeding = pages.totalDocs === 0

  return (
    <div className="backup-dashboard-2">
      <h2>Welcome to the Optitrack Payblocks</h2>

      <p>
        Payblocks is a comprehensive website builder toolkit that combines PayloadCMS&apos;s
        powerful content management capabilities with shadcn/ui&apos;s modern components and
        shadcnblocks.com&apos;s extensive block library. Visit the{' '}
        <a href="https://docs.shadcnblocks.com/payload/getting-started/" target="_blank">
          documentation
        </a>{' '}
        to guide you through setting up, configuring, and extending your Payblocks project.
      </p>
      {process.env.DATABASE_URI && (
        <div style={{ marginTop: '20px' }}>
          Here you can seed the database with the optitrack seed - currently only for the{' '}
          <strong>footer</strong>, <strong>header</strong> and <strong>homepage</strong>.<br />
          <Popup
            className="btn-inline btn-right"
            button={
              <div className="btn btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-primary btn--withoutPopup">
                Seed DB
              </div>
            }
          >
            <div>
              Warning: This will replace all your existing content with the optitrack seed.
              <br />
              After seeding you will be automatically logged out and have to login with your
              previously created admin user again.
              <br />
              Do you want to proceed?
            </div>
            <Button
              className="button-pop-up"
              onClick={async () => {
                'use server'
                await restoreSeedMedia()
                await restoreBackup(SEED_OPTITRACK_HOMEPAGE_URL, ['users', 'roles'], false) // Restore globals configuration - replace
                revalidatePath('/admin')
              }}
            >
              Yes
            </Button>
          </Popup>
        </div>
      )}
    </div>
  )
}

export default BackupDashboard
