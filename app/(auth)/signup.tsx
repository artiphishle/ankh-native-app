import { confirmSignUp, signUp } from '@aws-amplify/auth'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Formik, FormikValues } from 'formik'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
  TextInputProps,
} from 'react-native-paper'
import * as Yup from 'yup'

import { AnkhConfig as ANKH } from '@/config/ankh'
import Locales from '@/lib/locales'
import { styles } from '@/lib/ui'

enum ESignUpStatus {
  Default,
  IsSigningUp,
  IsSignedUp,
  IsConfirmingSignUp,
}
enum EAnkhFormFieldType {
  Checkbox = 'checkbox',
  Date = 'date',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Phone = 'phone',
  Radio = 'radio',
  Text = 'text',
  Textarea = 'textarea',
}
interface IAnkhFormField {
  readonly id: string
  readonly label?: string
  readonly maxLen?: number
  readonly minLen?: number
  readonly placeholder?: string
  readonly type?: EAnkhFormFieldType
}

function Logo() {
  const logo = require('@/assets/images/logo.jpg')

  return (
    <Image
      alt="Logo"
      source={logo}
      style={{
        height: 150,
        width: 150,
        borderRadius: 16,
        marginBottom: 32,
        marginHorizontal: 'auto',
      }}
    />
  )
}

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [signUpStatus, setSignUpStatus] = useState(ESignUpStatus.Default)
  const isReadyForConfirmation = [
    ESignUpStatus.IsSignedUp,
    ESignUpStatus.IsConfirmingSignUp,
  ].includes(signUpStatus)

  const { cognito } = ANKH.auth
  const { userAttributes = {} } = cognito
  const { logo, themes } = ANKH.brand
  const [theme] = themes.filter((theme) => theme.active)
  const { colors } = theme

  const ids = Object.keys(userAttributes)
  const customFields: IAnkhFormField[] = ids.map((id) => {
    const values = userAttributes[id as any] as Record<string, unknown>
    const type = ((dataType) => {
      switch (dataType) {
        case 'String':
          return EAnkhFormFieldType.Text
        case 'Number':
          return EAnkhFormFieldType.Number
        case 'DateTime':
          return EAnkhFormFieldType.Date
        case 'Boolean':
          return EAnkhFormFieldType.Checkbox
        default:
          throw new Error(`cognito.userAttributes.${id}.dataType is invalid.`)
      }
    })(values.dataType)

    return {
      id,
      label: Locales.t(id.replace(/custom:/, '')),
      type,
      min: values.minLen,
      max: values.maxLen,
    }
  })
  // Set 'username' (can be email, phone, externalProviders)
  const loginWith = (({ email, phone, externalProviders }) => {
    const hasNoLoginWith = !email && !phone && !externalProviders
    if (externalProviders || hasNoLoginWith) throw new Error('Nope!')
    if (email) return { id: 'username', label: 'email' }
    if (phone) return { id: 'username', label: 'phone' }
  })(cognito.loginWith)
  if (!loginWith) throw new Error(`Missing config: 'auth.cognito.loginWith'`)

  // Set 'initial' values
  const initialValues: FormikValues = { username: '', password: '' }
  customFields.forEach(({ id }) => {
    initialValues[id] = ''
  })
  const signUpFields: IAnkhFormField[] = [
    {
      id: 'username',
      label: Locales.t(loginWith.label),
      placeholder: loginWith.label,
    },
    {
      id: 'password',
      label: Locales.t('password'),
      type: EAnkhFormFieldType.Password,
      placeholder: 'Password',
    },
    ...customFields,
  ]
  function getValidationSchema(fields: IAnkhFormField[]) {
    const schema: any = {}
    fields.forEach(
      ({ id, maxLen = 64, minLen = 2, type = EAnkhFormFieldType.Text }) => {
        const yup = Yup.string()
        yup
          .max(maxLen, 'Too Long!')
          .min(minLen, 'Too short!')
          .required(`Please enter a ${name}`)

        if (type === EAnkhFormFieldType.Password)
          yup.matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            'Must 1 uppercase, 1 lowercase, 1 number and 1 special case character',
          )
        else if (type === EAnkhFormFieldType.Email) yup.email()

        schema[id] = yup
      },
    )
    return schema
  }

  function renderConfirmation() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Surface style={{ ...styles.screen, alignItems: undefined }}>
          <Logo />
          <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
            Almost there!
          </Text>

          <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
            We've sent a eMail with your account conirmation code.
          </Text>

          <Formik
            initialValues={{ confirmationCode: '' }}
            onSubmit={async ({ confirmationCode }) => {
              try {
                setSignUpStatus(ESignUpStatus.IsConfirmingSignUp)
                await confirmSignUp({
                  confirmationCode,
                  username,
                })
                router.push('/(auth)/login')
              } catch (error: any) {
                console.error(error)
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <Surface>
                <TextInput
                  id="confirmationCode"
                  label="Code"
                  mode="outlined"
                  maxLength={6}
                  placeholder="000000"
                  right={64 - values.confirmationCode?.length}
                  onBlur={handleBlur('confirmationCode')}
                  error={!!errors.confirmationCode}
                  value={values.confirmationCode}
                  onChangeText={handleChange('confirmationCode')}
                />
                <Button
                  mode="contained"
                  loading={signUpStatus === ESignUpStatus.IsConfirmingSignUp}
                  onPress={() => handleSubmit()}
                >
                  {signUpStatus === ESignUpStatus.IsConfirmingSignUp
                    ? 'Confirming eMail'
                    : 'Confirm eMail'}
                </Button>
              </Surface>
            )}
          </Formik>
        </Surface>
      </ScrollView>
    )
  }

  if (isReadyForConfirmation) return renderConfirmation()

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface style={{ ...styles.screen, alignItems: undefined }}>
        <Logo />

        <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
          {Locales.t('signUpHeadline')}
        </Text>

        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {Locales.t('signUpBody')}
        </Text>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const userAttributes = { ...values }
            delete userAttributes.username
            delete userAttributes.password

            try {
              setSignUpStatus(ESignUpStatus.IsSigningUp)

              const { nextStep } = await signUp({
                username: values.username,
                password: values.password,
                options: { userAttributes },
              })
              setUsername(values.username)

              switch (nextStep.signUpStep) {
                case 'CONFIRM_SIGN_UP':
                  setSignUpStatus(ESignUpStatus.IsSignedUp)
                  break
                case 'DONE':
                  router.push('/(auth)/login')
                  break
              }
            } catch (error: any) {
              console.error(error)
            }
          }}
          validationSchema={Yup.object().shape(
            getValidationSchema(signUpFields),
          )}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            return (
              <>
                {signUpFields.map(
                  ({
                    id,
                    label,
                    maxLen: maxLength = 64,
                    placeholder = '',
                    type = EAnkhFormFieldType.Text,
                  }: IAnkhFormField) => {
                    const fieldProps: TextInputProps = {
                      maxLength,
                      placeholder,
                      disabled: signUpStatus !== ESignUpStatus.Default,
                      label: label || id,
                      mode: 'outlined',
                      secureTextEntry: type === EAnkhFormFieldType.Password,
                      value: values[id],
                      error: !!errors[id],
                      right: 64 - values[id].length,
                      onBlur: handleBlur(id),
                      onChangeText: handleChange(id),
                    }
                    return (
                      <Surface key={id} elevation={0}>
                        <TextInput {...fieldProps} />
                        <HelperText type="error" visible={!!errors[id]}>
                          {errors[id] as string}
                        </HelperText>
                      </Surface>
                    )
                  },
                )}

                <Button
                  mode="contained"
                  loading={signUpStatus === ESignUpStatus.IsSigningUp}
                  onPress={() => handleSubmit()}
                >
                  {signUpStatus === ESignUpStatus.IsSigningUp
                    ? Locales.t('signingUp')
                    : Locales.t('signUp')}
                </Button>
              </>
            )
          }}
        </Formik>

        <Button
          mode="contained-tonal"
          onPress={() => router.push('/(auth)/login')}
        >
          {Locales.t('signUpHaveExistingAccount')}
        </Button>
      </Surface>
    </ScrollView>
  )
}
