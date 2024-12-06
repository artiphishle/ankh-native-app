import { Fragment } from 'react'
import { Surface, useTheme } from 'react-native-paper'

import { AnkhConfig as ANKH, AnkhUiMap, type IAnkhUi } from '@/config/ankh'
import { styles } from '@/lib/ui/styles'

export default function Lesson() {
  const theme = useTheme()
  const [page] = ANKH.pages.filter((p) => p.name === 'lesson')
  const { uis = [] } = page

  function renderComponent(config: IAnkhUi): JSX.Element | null {
    const { id, ui, props, uis: childUis = [] } = config
    const Component = AnkhUiMap[ui]

    if (!Component) {
      console.error(`No component found for ui: ${ui}`)
      return null
    }

    // Render component with children if present
    return (
      <Component key={id} {...props}>
        {childUis.map((childUi) => (
          <Fragment key={childUi.id}>{renderComponent(childUi)}</Fragment>
        ))}
      </Component>
    )
  }

  return (
    <Surface style={styles.screen} theme={theme}>
      {uis.map((ui) => renderComponent(ui))}
    </Surface>
  )
}
