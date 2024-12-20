import { v4 } from 'uuid'

import { EAnkhAuthMode, EAnkhUi, type IAnkhConfig } from './types'

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
          ui: EAnkhUi.VideoPlayer,
          props: {
            source: {
              uri: 'http://localhost:8081/assets/videos/lesson-01.mp4',
            },
          },
        },
        {
          id: v4(),
          ui: EAnkhUi.AnkhUiList,
          props: {
            id: v4(),
            items: [
              {
                description: 'Lorem ipsum and dollar Schein.',
                title: 'Uno',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Billie Gates wieder besser jetzt.',
                title: 'Dos',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Die drei bäumen sich auf zu einer Triangle.',
                title: 'Tree',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Der Rosenquark ist ein essbarer Stein.',
                title: 'Quark',
                icon: { left: 'play-circle' },
              },
            ],
          },
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
