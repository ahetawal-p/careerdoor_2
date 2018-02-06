import React from 'react'
import { Button, Text, View } from 'react-native'

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Questions"
          onPress={() => this.props.navigation.navigate('Questions')}
        />
        <Button
          title="Go to QuestionDetail"
          onPress={() => this.props.navigation.dispatch({ type: 'QuestionDetail' })}
        />
      </View>
    );
  }
}
