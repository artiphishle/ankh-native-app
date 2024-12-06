import { Fragment } from 'react'
import { Surface, useTheme } from 'react-native-paper'

import { AnkhConfig as ANKH, AnkhUiMap, type IAnkhUi } from '@/config/ankh'

export default function Lesson() {
  const { pages } = ANKH
  const [page] = pages.filter((page) => page.name === 'lesson')
  const { uis = [] } = page
  const theme = useTheme()

  function renderComponent(config: IAnkhUi): JSX.Element | null {
    const { ui, props, uis: childUis = [] } = config
    const Component = AnkhUiMap[ui]

    if (!Component) {
      console.error(`No component found for ui: ${ui}`)
      return null
    }

    // Render component with children if present
    return (
      <Component {...props}>
        {childUis &&
          childUis.map((childUi) => (
            <Fragment key={childUi.id}>{renderComponent(childUi)}</Fragment>
          ))}
      </Component>
    )
  }

  return <Surface theme={theme}>{uis.map((ui) => renderComponent(ui))}</Surface>
}
