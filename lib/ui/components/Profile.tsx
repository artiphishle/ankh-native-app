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

enum ESignOutStatus {
  Default,
  IsSigningOut,
}

export default function Profile() {
  const INITIAL_USER_INITIALS = '??'
  const [user, setUser] =
    useState<Partial<Record<UserAttributeKey, string> | null>>(null)
  const [userInitials, setUserInitials] = useState(INITIAL_USER_INITIALS)
  const [signOutStatus, setSignOutStatus] = useState(ESignOutStatus.Default)

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const userAttributes = await fetchUserAttributes()

        if (!userAttributes?.email) return

        setUser(userAttributes)
        setUserInitials(
          `${userAttributes['custom:firstName']?.[0]}${userAttributes['custom:lastName']?.[0]}`,
        )
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
            disabled={signOutStatus === ESignOutStatus.IsSigningOut}
            loading={signOutStatus === ESignOutStatus.IsSigningOut}
            onPress={async () => {
              setSignOutStatus(ESignOutStatus.IsSigningOut)
              await signOut()
              setUser(null)
              setUserInitials(INITIAL_USER_INITIALS)
              router.push('/profile')
            }}
          >
            {signOutStatus === ESignOutStatus.IsSigningOut
              ? 'Signing out'
              : 'Sign Out'}
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
