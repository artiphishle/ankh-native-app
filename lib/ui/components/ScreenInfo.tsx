import { ReactNode } from 'react'
import { Chip, Text } from 'react-native-paper'

import GradientBackground from '@/lib/ui/components/GradientBackground'

export default function ScreenInfo({ children, title }: Props) {
  const fontFamily = 'JetBrainsMono_400Regular'

  return (
    <>
      <GradientBackground />
      <Text variant="displaySmall">{title}</Text>
      {children && <Chip textStyle={{ fontFamily }}>{children}</Chip>}
    </>
  )
}

interface Props {
  readonly title: string
  readonly children?: ReactNode
}
