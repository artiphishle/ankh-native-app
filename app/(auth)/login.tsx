import { signIn } from 'aws-amplify/auth'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
} from 'react-native-paper'
import * as Yup from 'yup'

import Locales from '@/lib/locales'
import { styles } from '@/lib/ui'

import { AnkhConfig as ANKH } from '../../config/ankh'

export default function Login() {
  const { cognito } = ANKH.auth
  const { logo /* ,themes */ } = ANKH.brand
  // const [theme] = themes.filter((theme) => theme.active)
  // const { colors } = theme

  /** @todo duplicate from 'signUp' */
  // Set 'username' (can be email, phone, externalProviders)
  const loginWith = (({ email, phone, externalProviders }) => {
    const hasNoLoginWith = !email && !phone && !externalProviders
    if (externalProviders || hasNoLoginWith) throw new Error('Nope!')
    if (email) return { id: 'username', label: 'email' }
    if (phone) return { id: 'username', label: 'phone' }
  })(cognito.loginWith)
  if (!loginWith) throw new Error(`Missing config: 'auth.cognito.loginWith'`)

  const cd = {
    logo: logo
      ? require('@/assets/images/logo.jpg')
      : require('@/assets/images/icon.png'),
  }

  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Image
        alt="Logo"
        source={cd.logo}
        style={{
          height: 150,
          width: 150,
          borderRadius: 16,
          marginBottom: 32,
          marginHorizontal: 'auto',
        }}
      />

      <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
        Welcome
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
        We're excited to have you back. Please log in to continue.
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async ({ password, username }) => {
          const { isSignedIn } = await signIn({ password, username })
          if (isSignedIn) router.push('/(tabs)/profile')
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(3, 'Too Short!')
            .max(64, 'Too Long!')
            .required(`Please enter a ${Locales.t(loginWith.label)}.`),
          password: Yup.string()
            .min(8, 'Too Short! must be at least 8 characters.')
            .max(64, 'Too Long!')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
              'Must 1 uppercase, 1 lowercase, 1 number and 1 special case character',
            )
            .required(`Please enter a ${Locales.t('password')}`),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Surface elevation={0}>
              <TextInput
                maxLength={64}
                mode="outlined"
                label={Locales.t(loginWith.label)}
                value={values.username}
                error={!!errors.username}
                onBlur={handleBlur('username')}
                right={64 - values.username.length}
                placeholder={`Enter your ${Locales.t(loginWith.label)}...`}
                onChangeText={handleChange('username')}
              />
              <HelperText type="error" visible={!!errors.username}>
                {errors.username}
              </HelperText>
            </Surface>

            <Surface elevation={0}>
              <TextInput
                secureTextEntry
                maxLength={64}
                mode="outlined"
                label={Locales.t('password')}
                value={values.password}
                error={!!errors.password}
                onBlur={handleBlur('password')}
                right={64 - values.password.length}
                placeholder={`Enter your ${Locales.t('password')}...`}
                onChangeText={handleChange('password')}
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
            </Surface>

            <Button mode="contained" onPress={() => handleSubmit()}>
              Login
            </Button>
          </>
        )}
      </Formik>

      <Button
        mode="contained-tonal"
        onPress={() => router.push('/(auth)/signup')}
      >
        New here?
      </Button>
    </Surface>
  )
}
