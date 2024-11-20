import { useAuthenticator } from '@aws-amplify/ui-react'
import { router } from 'expo-router'
import React from 'react'
import { Button, Surface, Text } from 'react-native-paper'

import { conf, EAnkhConfAuthMode } from '@/conf/ankh.conf'
import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Profile = () => {
  const { username } = useAuthenticator()

  return (
    <Surface style={styles.screen}>
      <ScreenInfo title={Locales.t('profile')}>
        <Text>Hallo, {username}! </Text>
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
        {conf.auth.mode === EAnkhConfAuthMode.InApp && (
          <>
            <Button
              mode="contained"
              onPress={() => router.push('/(auth)/login')}
            >
              Login
            </Button>

            <Button
              mode="contained"
              onPress={() => router.push('/(auth)/signup')}
            >
              Sign Up
            </Button>
          </>
        )}
      </Surface>
    </Surface>
  )
}

export default Profile
