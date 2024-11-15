import { ReactNode } from 'react'
import { Chip, Text } from 'react-native-paper'

import GradientBackground from '@/lib/ui/components/GradientBackground'

const ScreenInfo = ({ children, title }: Props) => (
  <>
    <GradientBackground />

    <Text variant="displaySmall">{title}</Text>

    <Chip textStyle={{ fontFamily: 'JetBrainsMono_400Regular' }}>
      {children}
    </Chip>
  </>
)

interface Props {
  readonly children: ReactNode
  readonly title: string
}

export default ScreenInfo
