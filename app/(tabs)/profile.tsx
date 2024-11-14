import { router } from 'expo-router'
import React from 'react'
import { Button, Surface, Text } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Profile = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('profile')}>
      <Text>Content to follow.</Text>
    </ScreenInfo>

    <Surface
      elevation={0}
      style={{
        padding: 16,
        gap: 16,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Button mode="contained" onPress={() => router.push('/(auth)/login')}>
        Login
      </Button>

      <Button mode="contained" onPress={() => router.push('/(auth)/signup')}>
        Sign Up
      </Button>
    </Surface>
  </Surface>
)

export default Profile
