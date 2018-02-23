import React from 'react'
import { Button, Text, View } from 'react-native'

export default class Questions extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Questions!</Text>
        <Button
          title="Go to QuestionDetail"
          onPress={() => this.props.navigation.navigate('QuestionDetail')}
        />
      </View>
    );
  }
}
