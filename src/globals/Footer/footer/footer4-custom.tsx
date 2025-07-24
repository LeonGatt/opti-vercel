import { FaDiscord, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaVimeo } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Footer } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { SocialIcon } from '@/components/SocialIcon'
import RichText from '@/components/RichText'

const Footer4Custom: React.FC<{
  footer: Footer
  publicContext: PublicContextProps
}> = ({ footer, publicContext }) => {
  return (
    <section className="bg-background text-foreground" data-theme="dark">
      <div className="container px-8 py-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-around items-center mb-24 lg:mb-16">
          {footer.sublineRichText && (
            <div className="max-w-2xl mb-8 lg:mb-0 text-center">
              <RichText content={footer.sublineRichText} publicContext={publicContext} />
            </div>
          )}
          {footer.contactButton && footer.contactButton.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {footer.contactButton?.map((button, buttonIdx) => (
                <CMSLink
                  key={`${buttonIdx}`}
                  publicContext={publicContext}
                  {...button.link}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Footer Content */}
        {footer.navItems && footer.navItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24 md:mb-16">
            {footer.navItems &&
              footer.navItems.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-4">
                  <h3 className="text-white font-bold text-md md:text-sm leading-12 md:leading-8 mb-0" >{section.title}</h3>
                  {section.subNavItems && section.subNavItems.length > 0 && (
                    <ul>
                      {section.subNavItems.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <CMSLink
                            publicContext={publicContext}
                            {...link.link}
                            className="text-text-light hover:text-white text-md md:text-sm transition-colors leading-12 md:leading-8"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Bottom Section */}
        <div className="pt-8 md:pt-16 md:border-t border-gray-800">
          <div className="flex items-center flex-col md:flex-row justify-between gap-8">
            {footer.legalLinks && footer.legalLinks.length > 0 && (
              <div className="flex items-center gap-6">
                {footer.legalLinks?.map((item, index) => (
                  <CMSLink
                    key={index}
                    publicContext={publicContext}
                    {...item.link}
                    className="text-xs md:text-sm text-text-light"
                  />
                ))}
              </div>
            )}
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <ul className="flex items-center gap-6 order-first md:order-last">
                {footer.socialLinks?.map((social, index) => (
                  <li key={index} className="font-medium transition-colors hover:text-muted-foreground">
                    <a href={social.url}>
                      <SocialIcon type={social.icon} className="size-10 md:size-6" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-text-light text-center md:text-left text-xs md:text-sm mt-4">
            {footer.copyright && `© ${new Date().getFullYear()} ${footer.copyright}`}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer4Custom
