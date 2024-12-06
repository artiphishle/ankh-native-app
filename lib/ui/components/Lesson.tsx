import {
  Button,
  Card,
  Divider,
  List,
  Surface,
  useTheme,
} from 'react-native-paper'

import VideoPlayer from './VideoPlayer'

export default function Lesson() {
  const theme = useTheme()
  const lessons = [
    { title: 'Lesson 1' },
    { title: 'Lesson 2' },
    { title: 'Lesson 3' },
    { title: 'Lesson 4' },
    { title: 'Lesson 5' },
    { title: 'Lesson 6' },
    { title: 'Lesson 7' },
    { title: 'Lesson 8' },
    { title: 'Lesson 9' },
  ]

  return (
    <Surface>
      <Surface elevation={1}>
        <Card theme={theme}>
          <Card.Title title="Lesson 01 Title" />
          <Card.Content>
            <VideoPlayer />
          </Card.Content>
        </Card>
      </Surface>
      <Surface elevation={1}>
        <List.Section>
          <List.Subheader>Lessons</List.Subheader>
          {lessons.map(({ title }) => (
            <List.Item
              title={title}
              left={() => <List.Icon icon="play-circle" />}
            />
          ))}
        </List.Section>
      </Surface>
    </Surface>
  )
}
