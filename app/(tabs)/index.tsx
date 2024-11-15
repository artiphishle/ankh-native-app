import React from 'react'
import { Surface, Text } from 'react-native-paper'
import { ElevationLevels } from 'react-native-paper/src/types'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'
import SearchBar from '@/lib/ui/components/SearchBar'

const TabsHome = () => (
  <>
    <SearchBar value="" placeholder="Username" />
    <Surface elevation={ElevationLevels.level0} style={styles.screen}>
      <ScreenInfo title={Locales.t('titleHome')}>
        <Text>{Locales.t('contentToFollow')}</Text>
      </ScreenInfo>
    </Surface>
  </>
)

export default TabsHome
