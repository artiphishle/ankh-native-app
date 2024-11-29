import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const DrawerHome = () => (
  <Surface style={{ flex: 1 }}>
    <Surface style={styles.screen}>
      <ScreenInfo title={Locales.t('titleHome')} />
    </Surface>
  </Surface>
)

export default DrawerHome
