import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import React, { useCallback } from 'react'
import { Appbar, Menu, Tooltip } from 'react-native-paper'

import { AnkhConfig } from '@/config/ankh'
import Locales from '@/lib/locales'
import { TabBar, TabsHeader } from '@/lib/ui'

const TabLayout = () => {
  const ANKH = AnkhConfig
  const [visible, setVisible] = React.useState(false)
  const todoHasSearch = true
  /** @todo ANKH config menu on the right too */

  const renderPages = useCallback(
    (pages: (typeof AnkhConfig)['pages']) => {
      return pages.map(({ id, name, route, icon }) => {
        const localName = Locales.t(name === 'index' ? 'home' : name)
        const options: any = {
          route,
          title: localName,
          headerRight: () => (
            <>
              {todoHasSearch && (
                <Tooltip title={Locales.t('search')}>
                  <Appbar.Action
                    icon="magnify"
                    onPress={() => router.push('/search')}
                  />
                </Tooltip>
              )}
              <Menu
                statusBarHeight={48}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Tooltip title={Locales.t('options')}>
                    <Appbar.Action
                      icon="dots-vertical"
                      onPress={() => setVisible(true)}
                    />
                  </Tooltip>
                }
              >
                <Menu.Item
                  title={Locales.t('titleSettings')}
                  leadingIcon="cog"
                  onPress={() => router.push('/(tabs)/settings')}
                />
                <Menu.Item
                  title={Locales.t('stackNav')}
                  leadingIcon="card-multiple-outline"
                  onPress={() => router.push('/modal')}
                />
                <Menu.Item
                  title={Locales.t('drawerNav')}
                  leadingIcon="gesture-swipe"
                  onPress={() => router.push('/drawer')}
                />
              </Menu>
            </>
          ),
          tabBarIcon: (
            props: (typeof MaterialCommunityIcons)['defaultProps'],
          ) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? icon : `${icon}-outline`}
            />
          ),
        }
        return <Tabs.Screen key={id} name={name} options={options} />
      })
    },
    [todoHasSearch, visible],
  )

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => {
          return <TabsHeader navProps={props} children={undefined} />
        },
      }}
    >
      {renderPages(ANKH.pages)}
    </Tabs>
  )
}

export default TabLayout

/** @obsolete Remove after verifying page generation */
/* <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('titleHome'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
              <Menu
                statusBarHeight={48}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Tooltip title={Locales.t('options')}>
                    <Appbar.Action
                      icon="dots-vertical"
                      onPress={() => setVisible(true)}
                    />
                  </Tooltip>
                }
              >
                <Menu.Item
                  title={Locales.t('titleSettings')}
                  leadingIcon="cog"
                  onPress={() => router.push('/(tabs)/settings')}
                />
                <Menu.Item
                  title={Locales.t('stackNav')}
                  leadingIcon="card-multiple-outline"
                  onPress={() => router.push('/modal')}
                />
                <Menu.Item
                  title={Locales.t('drawerNav')}
                  leadingIcon="gesture-swipe"
                  onPress={() => router.push('/drawer')}
                />
              </Menu>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: Locales.t('profile'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
              <Tooltip title={Locales.t('titleSettings')}>
                <Appbar.Action
                  icon="cog"
                  onPress={() => router.push('/(tabs)/settings')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'account' : 'account-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: Locales.t('titleSettings'),
          headerRight: () => (
            <Tooltip title={Locales.t('drawerNav')}>
              <Appbar.Action
                icon="gesture-swipe"
                onPress={() => router.push('/drawer')}
              />
            </Tooltip>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'cog' : 'cog-outline'}
            />
          ),
        }}
      /> */
