import React, { PureComponent } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/styles/hljs'

const REGEX_LANG = new RegExp('{{(.*)}}')

export default class extends PureComponent {

  render() {
    const allViews = this.props.question.qText.map((element, index) => {
      const key = this.props.question.qId + index
      if (!element.startsWith('{{')) {
        return (
          <TouchableHighlight
            underlayColor="red"
            key={key}
            style={{ marginVertical:6, width: '100%' }}
            onPress={() => this.props.onPress(this.props.question)}
          >
            <Text style={styles.text} >
              {element}
            </Text>
          </TouchableHighlight>
        )
      } else {
        const language = element.match(REGEX_LANG).pop()
        const codeString = element.replace(REGEX_LANG, '')
        return (
          <SyntaxHighlighter
            customStyle={{ width: '98%' }}
            key={key}
            language={language}
            style={dracula}
          >
            {codeString}
          </SyntaxHighlighter>
        )
      }
    })

    return (
      <View style={[styles.itemStyle, this.props.style]}>
        {allViews}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    alignItems: 'flex-start',
    paddingHorizontal:4,
    marginVertical:6,
    marginHorizontal:12,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,

  },
  text:{
    fontSize: 16
  }

});
