import { AppLink } from '@/components/AppLink'
import { Heading } from '@/components/Heading'
import { CMSLink } from '@/components/Link'
import { Paragraph } from '@/components/Paragraph'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations()
  return (
    <div className="container">
      <div className="prose max-w-none">
        <Heading tag="h1">404</Heading>

        {/* \/\/\/ Delete this example after developing some components \/\/\/ */}
        <Heading tag="h2">Heading h2 usage</Heading>
        <Heading tag="h2" size="sm">
          Heading h2 usage with sm size
        </Heading>

        <Paragraph>
          Paragraph usage example. This is a simple paragraph to demonstrate the usage of the
          Paragraph component. It can be used to display text content in a styled manner.
        </Paragraph>

        <div className="py-20 styled-tags">
          <h1>The Joke Tax Chronicles</h1>
          <p>
            Once upon a time, in a far-off land, there was a very lazy king who spent all day
            lounging on his throne. One day, his advisors came to him with a problem: the kingdom
            was running out of money.
          </p>
          <h2>The King's Plan</h2>
          <p>
            The king thought long and hard, and finally came up with{' '}
            <a href="/">a brilliant plan:</a> he would tax the jokes in the kingdom.
          </p>
          <blockquote>
            "After all," he said, "everyone enjoys a good joke, so it's only fair that they should
            pay for the privilege."
          </blockquote>
          <h3>The Joke Tax</h3>
          <p>
            The king's subjects were not amused. They grumbled and complained, but the king was
            firm:
          </p>
          <ul>
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners: 20 gold coins</li>
          </ul>
          <p>
            As a result, people stopped telling jokes, <strong>and the kingdom fell</strong> into a
            gloom. <b>But there was one person</b> who refused to let the king's foolishness get him
            down: a court jester named Jokester.
          </p>
          <h4>Jokester's Revolt</h4>
          <p>
            Jokester began sneaking into the castle in the middle of the night and leaving jokes all
            over the place: under the king's pillow, in his soup, even in the royal toilet. The king
            was furious, but he couldn't seem to stop Jokester.
          </p>
          <p>
            And then, one day, the people of the kingdom discovered that the jokes left by Jokester
            were so funny that they couldn't help but laugh. And once they started laughing, they
            couldn't stop.
          </p>
          <h5>
            The People's
            <br />
            Rebellion
          </h5>
          <p>
            The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and
            puns again, and soon the entire kingdom was in on the joke.
          </p>
          <table>
            <thead>
              <tr>
                <th>King's Treasury</th>
                <th>People's happiness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Empty</td>
                <td>Overflowing</td>
              </tr>
              <tr>
                <td>Modest</td>
                <td>Satisfied</td>
              </tr>
              <tr>
                <td>Full</td>
                <td>Ecstatic</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Testik</td>
              </tr>
            </tfoot>
          </table>
          <p>
            The king, seeing how much happier his subjects were, realized the error of his ways and
            repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever
            after.
          </p>
          <p>
            The moral of the story is: never underestimate the power of a good laugh and always be
            careful of bad ideas.
          </p>
        </div>
        {/* /\/\/\ Delete this example after developing some components /\/\/\ */}

        <Paragraph className="mb-4">{t('error.not_found')}</Paragraph>
      </div>

      <AppLink variant="default" href="/">
        Go home
      </AppLink>

      <CMSLink variant="default" url="/">
        Go home
      </CMSLink>
    </div>
  )
}
