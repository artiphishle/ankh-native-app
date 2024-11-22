import {
  fetchUserAttributes,
  signOut,
  UserAttributeKey,
} from '@aws-amplify/auth'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Avatar, Button, Surface } from 'react-native-paper'

// import Locales from '@/lib/locales'
import { styles } from '@/lib/ui'

export default function Profile() {
  const [user, setUser] =
    useState<Partial<Record<UserAttributeKey, string> | null>>(null)
  const [userInitials, setUserInitials] = useState('??')

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const userAttributes = await fetchUserAttributes()

        if (!userAttributes?.email) return

        setUser(userAttributes)
        setUserInitials(
          `${userAttributes['custom:firstName']?.[0]}${userAttributes['custom:lastName']?.[0]}`,
        )
        console.log('UserAttributes:', userAttributes)
        console.log('UserInitials:', userInitials)
      } catch (error: any) {
        console.error(error)
      }
    }
    fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Surface style={styles.screen}>
      <Avatar.Text size={240} label={userInitials} />

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
        {user ? (
          <Button
            mode="contained"
            onPress={() => {
              signOut()
              router.push('/profile')
            }}
          >
            Sign Out
          </Button>
        ) : (
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
