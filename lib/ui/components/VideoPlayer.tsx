import { useRef } from 'react'
import { StyleSheet } from 'react-native'
import Video, { VideoRef } from 'react-native-video'

export default function VideoPlayer() {
  const videoRef = useRef<VideoRef>(null)
  const source = require('https://download.samplelib.com/mp4/sample-5s.mp4')

  function onBuffer({ isBuffering }: { isBuffering: boolean }) {
    if (!isBuffering) return
    console.log('buffering...')
  }

  function onError(error: any) {
    console.error(error)
  }

  return (
    <Video
      // Can be a URL or a local file.
      source={source}
      // Store reference
      ref={videoRef}
      // Callback when remote video is buffering
      onBuffer={onBuffer}
      // Callback when video cannot be loaded
      onError={onError}
      style={styles.backgroundVideo}
    />
  )
}

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
