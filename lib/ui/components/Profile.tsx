import { fetchUserAttributes } from '@aws-amplify/auth'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Surface, Text } from 'react-native-paper'

import AnkhConf from '@/conf/ankh.json'
import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

export default function Profile() {
  const conf = JSON.parse(JSON.stringify(AnkhConf))
  const [user, setUser] = useState<any>()

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { email } = await fetchUserAttributes()
        setUser({ email })
      } catch (error: any) {
        console.error(error)
      }
    }
    fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Surface style={styles.screen}>
      <ScreenInfo title={Locales.t('profile')}>
        <Text>Hello, {user?.email || 'guest'}! </Text>
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
