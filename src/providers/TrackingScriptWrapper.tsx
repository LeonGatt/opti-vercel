import { env } from '@/env'
import Script from 'next/script'
import type React from 'react'

const TrackingScriptWrapper = ({
  id,
  scriptContent,
  scriptOptions,
  ignoreInDevelopment = true,
}: {
  scriptContent: string
  id: string
  scriptOptions: Exclude<React.ComponentProps<typeof Script>, 'id' | 'dangerouslySetInnerHTML'>
  ignoreInDevelopment?: boolean
}) => {
  if (ignoreInDevelopment) {
    return null
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <Script id={id} dangerouslySetInnerHTML={{ __html: scriptContent }} {...scriptOptions} />
}

const GTMScript = () => {
  if (!env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
    return null
  }

  return (
    <TrackingScriptWrapper
      id="tracking-gtm"
      scriptOptions={{ strategy: 'afterInteractive' }}
      scriptContent={`
       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${env.NEXT_PUBLIC_GTM_AUTH}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
      `}
    />
  )
}

const RecaptchaScript = () => {
  if (!env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return null
  }

  return (
    <TrackingScriptWrapper
      id="tracking-recaptcha"
      scriptOptions={{ strategy: 'afterInteractive' }}
      scriptContent={`(function() {
            var recaptchaScript = document.createElement('script');
            recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}';
            document.head.appendChild(recaptchaScript);
        })();`}
    />
  )
}

export const TrackingScriptsHead = () => {
  return (
    <>
      <GTMScript />
      <RecaptchaScript />
    </>
  )
}

export const TrackingScriptsBody = () => {
  return (
    <>
      {env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}&gtm_auth=${env.NEXT_PUBLIC_GTM_AUTH}&gtm_cookies_win=x`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </>
  )
}
