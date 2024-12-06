import type { AmplifyAuthProps } from '@aws-amplify/backend-auth/lib/factory.d'
import {
  Appbar,
  Button,
  Card,
  Dialog,
  IconButton,
  ListSectionProps,
  Snackbar,
  TextInput,
  type AppbarProps,
  type ButtonProps,
  type CardProps,
  type DialogProps,
  type IconButtonProps,
  type SnackbarProps,
  type TextInputProps,
} from 'react-native-paper'
import ListSection from 'react-native-paper/lib/typescript/components/List/ListSection'
import { Video, type ReactVideoProps } from 'react-native-video'
import { v4 } from 'uuid'

enum EAnkhUi {
  Appbar = 'Appbar',
  Button = 'Button',
  Card = 'Card',
  Dialog = 'Dialog',
  IconButton = 'IconButton',
  ListSection = 'ListSection',
  Snackbar = 'Snackbar',
  TextInput = 'TextInput',
  Video = 'Video',
}

// Map EAnkhUi to UI components
export const AnkhUiMap: Record<EAnkhUi, React.ComponentType<any>> = {
  [EAnkhUi.Appbar]: Appbar,
  [EAnkhUi.Button]: Button,
  [EAnkhUi.Card]: Card,
  [EAnkhUi.Dialog]: Dialog,
  [EAnkhUi.IconButton]: IconButton,
  [EAnkhUi.ListSection]: ListSection,
  [EAnkhUi.Snackbar]: Snackbar,
  [EAnkhUi.TextInput]: TextInput,
  [EAnkhUi.Video]: Video,
}

// Props mapping for each UI type
type UiPropsMap = {
  [EAnkhUi.Appbar]: AppbarProps
  [EAnkhUi.Button]: ButtonProps
  [EAnkhUi.Card]: CardProps
  [EAnkhUi.Dialog]: DialogProps
  [EAnkhUi.IconButton]: IconButtonProps
  [EAnkhUi.ListSection]: ListSectionProps
  [EAnkhUi.Snackbar]: SnackbarProps
  [EAnkhUi.TextInput]: TextInputProps
  [EAnkhUi.Video]: ReactVideoProps
}

// Discriminated union for IAnkhUi
export type IAnkhUi = {
  [K in keyof UiPropsMap]: {
    id: string
    ui: K
    props?: UiPropsMap[K]
    uis?: IAnkhUi[]
  }
}[keyof UiPropsMap] // Flatten into a union

export enum EAnkhAuthMode {
  Entire = 'ENTIRE',
  InApp = 'IN_APP',
}

export interface IAnkhPage {
  readonly id: string
  readonly name: string
  readonly route: string
  readonly title: string
  readonly uis?: IAnkhUi[]
  readonly icon?: string
}
interface IAnkhTheme {
  readonly name: string
  readonly colors: {
    primary: { text: string; bg: string }
    default: { text: string; bg: string }
  }
  readonly active?: boolean
  readonly logo?: string
}
interface IAnkhBrand {
  readonly logo?: string
  readonly themes: IAnkhTheme[]
}
interface IAnkhConfig {
  readonly brand: IAnkhBrand
  readonly auth: {
    readonly mode: EAnkhAuthMode
    readonly cognito: AmplifyAuthProps
  }
  readonly pages: IAnkhPage[]
}

const COLORS = {
  WHITE: '#fff',
  RED: '#cf1444',
  BLACK: '#000',
}

export const AnkhConfig: IAnkhConfig = {
  brand: {
    themes: [
      {
        name: 'light',
        colors: {
          default: {
            text: COLORS.BLACK,
            bg: COLORS.WHITE,
          },
          primary: {
            text: COLORS.WHITE,
            bg: COLORS.RED,
          },
        },
        active: true,
        logo: 'logo.jpg',
      },
    ],
  },
  auth: {
    mode: EAnkhAuthMode.InApp,
    cognito: {
      loginWith: {
        email: true,
      },
      userAttributes: {
        'custom:firstName': {
          dataType: 'String',
          mutable: true,
          minLen: 2,
          maxLen: 25,
        },
        'custom:lastName': {
          dataType: 'String',
          mutable: true,
          minLen: 2,
          maxLen: 25,
        },
      },
    },
  },
  pages: [
    {
      id: v4(),
      name: 'index',
      route: '/',
      title: 'Home',
      icon: 'home',
    },
    {
      id: v4(),
      name: 'profile',
      route: '/profile',
      title: 'Profile',
      icon: 'account',
    },
    {
      id: v4(),
      name: 'lesson',
      route: '/lesson/1',
      title: 'Lesson 1',
      icon: 'school',
      uis: [
        {
          id: v4(),
          ui: EAnkhUi.Video,
          props: { source: { uri: '@/assets/videos/lesson-01.mp4' } },
        },
        {
          id: v4(),
          ui: EAnkhUi.ListSection,
        },
      ],
    },
    {
      id: v4(),
      name: 'settings',
      route: '/settings',
      title: 'Settings',
      icon: 'cog',
    },
  ],
}
