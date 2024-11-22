import { signUp } from '@aws-amplify/auth'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
  Banner,
} from 'react-native-paper'
import * as Yup from 'yup'

import { styles } from '@/lib/ui'

enum ESignUpStatus {
  Default,
  IsSigningUp,
  IsSignedUp,
}

const SignUp = () => {
  const [signUpStatus, setSignUpStatus] = useState(ESignUpStatus.Default)

  return (
    <ScrollView style={{ flex: 1 }}>
      <Banner visible={signUpStatus === ESignUpStatus.IsSignedUp}>
        <Text>Perfect! Check your eMail to verify your new account.</Text>
      </Banner>
      <Surface style={{ ...styles.screen, alignItems: undefined }}>
        <Image
          alt="Logo"
          source={require('@/assets/images/icon.png')}
          style={{
            height: 150,
            width: 150,
            borderRadius: 16,
            marginBottom: 32,
            marginHorizontal: 'auto',
          }}
        />

        <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
          Join Today!
        </Text>
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          We're thrilled to have you on board. Let's get you set up.
        </Text>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
          }}
          onSubmit={async ({ password, username, firstName, lastName }) => {
            try {
              setSignUpStatus(ESignUpStatus.IsSigningUp)
              await signUp({
                password,
                username,
                options: {
                  userAttributes: {
                    'custom:firstName': firstName,
                    'custom:lastName': lastName,
                  },
                },
              })
              setSignUpStatus(ESignUpStatus.IsSignedUp)
            } catch (error: any) {
              console.error(error)
            }
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .min(3, 'Too Short!')
              .max(64, 'Too Long!')
              .required('Please enter a username.'),
            password: Yup.string()
              .min(8, 'Too Short! must be at least 8 characters.')
              .max(64, 'Too Long!')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                'Must 1 uppercase, 1 lowercase, 1 number and 1 special case character',
              )
              .required('Please enter a password'),
            email: Yup.string().email().required('Please enter an email.'),
            firstName: Yup.string()
              .min(3, 'Too Short!')
              .max(64, 'Too Long!')
              .required('Please enter a first name.'),
            lastName: Yup.string()
              .min(3, 'Too Short!')
              .max(64, 'Too Long!')
              .required('Please enter a last name.'),
          })}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <Surface elevation={0}>
                <TextInput
                  disabled={signUpStatus !== ESignUpStatus.Default}
                  maxLength={64}
                  mode="outlined"
                  label="Username"
                  value={values.username}
                  error={!!errors.username}
                  onBlur={handleBlur('username')}
                  right={64 - values.username.length}
                  placeholder="Enter your username..."
                  onChangeText={handleChange('username')}
                />
                <HelperText type="error" visible={!!errors.username}>
                  {errors.username}
                </HelperText>
              </Surface>

              <Surface elevation={0}>
                <TextInput
                  disabled={signUpStatus !== ESignUpStatus.Default}
                  secureTextEntry
                  maxLength={64}
                  mode="outlined"
                  label="Password"
                  textContentType="password"
                  value={values.password}
                  error={!!errors.password}
                  onBlur={handleBlur('password')}
                  right={64 - values.password.length}
                  placeholder="Enter your password..."
                  onChangeText={handleChange('password')}
                />
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password}
                </HelperText>
              </Surface>

              <Surface elevation={0}>
                <TextInput
                  disabled={signUpStatus !== ESignUpStatus.Default}
                  maxLength={64}
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  error={!!errors.email}
                  onBlur={handleBlur('email')}
                  right={64 - values.email.length}
                  placeholder="Enter your email..."
                  onChangeText={handleChange('email')}
                />
                <HelperText type="error" visible={!!errors.email}>
                  {errors.email}
                </HelperText>
              </Surface>

              <Surface elevation={0}>
                <TextInput
                  disabled={signUpStatus !== ESignUpStatus.Default}
                  maxLength={64}
                  mode="outlined"
                  label="First name"
                  value={values.firstName}
                  error={!!errors.firstName}
                  onBlur={handleBlur('firstName')}
                  right={64 - values.firstName.length}
                  placeholder="Enter your first name..."
                  onChangeText={handleChange('firstName')}
                />
                <HelperText type="error" visible={!!errors.firstName}>
                  {errors.firstName}
                </HelperText>
              </Surface>

              <Surface elevation={0}>
                <TextInput
                  disabled={signUpStatus !== ESignUpStatus.Default}
                  maxLength={64}
                  mode="outlined"
                  label="Last name"
                  value={values.lastName}
                  error={!!errors.lastName}
                  onBlur={handleBlur('lastName')}
                  right={64 - values.lastName.length}
                  placeholder="Enter your first name..."
                  onChangeText={handleChange('lastName')}
                />
                <HelperText type="error" visible={!!errors.lastName}>
                  {errors.lastName}
                </HelperText>
              </Surface>

              <Button
                mode="contained"
                loading={signUpStatus === ESignUpStatus.IsSigningUp}
                onPress={() => handleSubmit()}
              >
                {signUpStatus === ESignUpStatus.IsSigningUp
                  ? 'Signing up'
                  : 'Sign up'}
              </Button>
            </>
          )}
        </Formik>

        <Button
          mode="contained-tonal"
          onPress={() => router.push('/(auth)/login')}
        >
          Already have an account?
        </Button>
      </Surface>
    </ScrollView>
  )
}

export default SignUp
