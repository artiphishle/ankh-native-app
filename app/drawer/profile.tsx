import { fetchUserAttributes } from '@aws-amplify/auth'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, Headline, Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Profile = () => {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { email } = (await fetchUserAttributes())
        setUser({ email });
      } catch (error: any) {
        console.error(error);
      }
    }
    fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Surface style={styles.screen}>
      <ScreenInfo title={Locales.t('profile')}>
        <Headline>Hello, {user?.email || '{guest}'}!</Headline>
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
}
export default Profile
