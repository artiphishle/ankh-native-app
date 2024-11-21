import { AuthUser, getCurrentUser } from '@aws-amplify/auth'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, Surface, Text } from 'react-native-paper'

import AnkhConf from '@/conf/ankh.json'
import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Profile = () => {
  const conf = JSON.parse(JSON.stringify(AnkhConf))
  const [user, setUser] = useState<AuthUser>()

  useEffect(() => {
    async function fetchCurrentUser() {
      setUser(await getCurrentUser())
      console.log('User:', user)
    }
    fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Surface style={styles.screen}>
      <ScreenInfo title={Locales.t('profile')}>
        <Text>Hello, {user?.username}! </Text>
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
        {conf.auth.mode === 'IN_APP' && (
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
