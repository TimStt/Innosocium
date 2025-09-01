import { Experts } from '@/widgets/main-blocks/experts'
import FeedbackForm from '@/widgets/main-blocks/feedback-form'
import { Grant } from '@/widgets/main-blocks/grant'
import Nominations from '@/widgets/main-blocks/nominations'
import { Partners } from '@/widgets/main-blocks/partners'
import { StagesOfTheCompetition } from '@/widgets/main-blocks/stages-of-the-competition'
import ZeroHero from '@/widgets/main-blocks/zero-hero'

export default function Home() {
  return (
    <>
      <ZeroHero />
      <Nominations />
      <Grant />
      <StagesOfTheCompetition />
      <Experts />
      <Partners />
    </>
  )
}
