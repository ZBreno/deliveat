import { View, Text } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { NotificationStackParamList } from '../navigators/NotificationStack'

export type NotificationScreenProps = StackScreenProps<NotificationStackParamList, 'Notification'>

export default function NotificationScreen() {
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  )
}