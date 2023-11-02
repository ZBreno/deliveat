import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from '@ui-kitten/components'
import Icon from '../Icon'

export default function LocationUser() {
  return (
    <TouchableOpacity style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
      <Text category="s1">Tenente Ananias, RN</Text>
      <Icon name='chevron-down-outline' size={20} themeFillColor='color-primary-500'/>
    </TouchableOpacity>
  )
}