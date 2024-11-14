import * as React from 'react'
import { Searchbar, SearchbarProps } from 'react-native-paper'

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search',
}: SearchbarProps) {
  const [searchQuery, setSearchQuery] = React.useState(defaultValue)

  return (
    <Searchbar
      value={searchQuery}
      placeholder={placeholder}
      onChangeText={setSearchQuery}
    />
  )
}
