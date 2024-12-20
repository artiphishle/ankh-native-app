import { Authenticator } from '@aws-amplify/ui-react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  useFonts,
  JetBrainsMono_400Regular,
} from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import { Amplify } from 'aws-amplify'
import * as Localization from 'expo-localization'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import outputs from '../amplify_outputs.json'
import { AnkhConfig } from '../config/ankh'
import { EAnkhAuthMode } from '../config/types'
import Locales from '../lib/locales'
import { Setting } from '../lib/types'
import { StackHeader, Themes } from '../lib/ui'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(outputs)
const ANKH = JSON.parse(JSON.stringify(AnkhConfig))

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  return loaded ? <RootLayoutNav /> : null
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()
  const [settings, setSettings] = React.useState<Setting>({
    theme: 'auto',
    color: 'default',
    language: 'auto',
  })
  const { color, theme } = settings

  // Load settings from the device
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings').then((result) => {
        if (result === null) {
          SecureStore.setItemAsync('settings', JSON.stringify(settings)).then(
            (res) => console.log(res),
          )
        }
        setSettings(JSON.parse(result ?? JSON.stringify(settings)))
      })
    } else {
      setSettings({ ...settings, theme: colorScheme ?? 'light' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (settings.language === 'auto') {
      Locales.locale = Localization.getLocales()[0].languageCode ?? 'en'
    } else {
      Locales.locale = settings.language
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const App = () => (
    <PaperProvider
      theme={Themes[theme === 'auto' ? (colorScheme ?? 'dark') : theme][color]}
    >
      <Stack
        screenOptions={{
          animation: 'slide_from_bottom',
          header: (props) => (
            <StackHeader navProps={props} children={undefined} />
          ),
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="drawer" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: Locales.t('search') }} />
        <Stack.Screen
          name="modal"
          options={{
            title: Locales.t('titleModal'),
            presentation: 'modal',
          }}
        />
      </Stack>
    </PaperProvider>
  )

  if (ANKH.auth.mode === EAnkhAuthMode.InApp) return <App />
  return <Authenticator>{({ signOut, user }) => <App />}</Authenticator>
}

export default RootLayout
