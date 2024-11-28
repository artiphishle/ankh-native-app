import React from 'react'
import { Surface } from 'react-native-paper'
import { ElevationLevels } from 'react-native-paper/src/types'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const TabsHome = () => (
  <Surface elevation={ElevationLevels.level0} style={styles.screen}>
    <ScreenInfo title={Locales.t('titleHome')} />
  </Surface>
)

export default TabsHome
