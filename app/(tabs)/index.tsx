import React from 'react'
import { Surface, Text } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'
import SearchBar from '@/lib/ui/components/SearchBar'
import { ElevationLevels } from 'react-native-paper/lib/typescript/types'

const TabsHome = () => (
  <>
    <SearchBar value='' placeholder='Search LIchess user' />
    <Surface elevation={ElevationLevels.level0} style={styles.screen}>
      <ScreenInfo title={Locales.t('titleHome')}>
        <Text>{Locales.t('contentToFollow')}</Text>
      </ScreenInfo>
    </Surface>
  </>
)

export default TabsHome
