import React, { PureComponent } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/styles/hljs'

const REGEX_LANG = new RegExp('{{(.*)}}')

export default class extends PureComponent {


  _renderQuestionContent = (qId, qText) => {
    const allViews = qText.map((element, index) => {
      const key = qId + index
      if (!element.startsWith('{{')) {
        return (
          <TouchableHighlight
            underlayColor="red"
            key={key}
            onPress={() => this.props.onPress(this.props.question)}
          >
            <View style={styles.textNodeContainer}>
              <Text style={styles.text} >
                {element}
              </Text>
            </View>
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
    return allViews
  }

  _renderTags = (qId, qTags) => {
    const tags = qTags.map((tagName, index) => {
      const key = qId + index
      return (
        <View style={styles.tag} key={key}>
          <Text style={styles.tagNameText}>
            {tagName}
          </Text>
        </View>
      )
    })
    return tags
  }

  _renderInfoView = (qDate, qLocation) =>
    (<View style={styles.infoContainer}>
      <Text style={styles.infoText}>{qDate}</Text>
      <Text style={styles.infoText}>{qLocation}</Text>
    </View>)

  _renderBookmarkIcon = () => {
    const bookmarkIcon =
    (
      <TouchableHighlight
        underlayColor="red"
        onPress={() => this.props.onBookmarkPress(this.props.question)}
      >
        <Icon name="bookmark-o" size={22} />
      </TouchableHighlight>
    )

    const linkOutIcon =
    (
      <TouchableHighlight
        underlayColor="red"
        onPress={() => this.props.onExternalLinkPress(this.props.question)}
      >
        <Icon name="external-link" size={22} color={'blue'} />
      </TouchableHighlight>
    )

    return (
      <View style={styles.actionContainer}>
        <View style={styles.linkOut}>
          {linkOutIcon}
        </View>
        <View style={styles.bookmark}>
          {bookmarkIcon}
        </View>
      </View>
    )
  }

  _renderAnswerView = ansCount => (
    <View style={styles.ansContainer}>
      <Text style={styles.ansText}>
        {ansCount}
      </Text>
      <Text style={styles.ansText}>
          Answers
      </Text>
    </View>
  )

  _renderBottomContainer = () => {
    const {
      qId,
      qDate,
      qLocation,
      ansCount,
      qTags
    } = this.props.question

    return (
      <TouchableHighlight
        underlayColor="red"
        style={{ flex:1, width:'100%' }}
        onPress={() => this.props.onPress(this.props.question)}
      >
        <View style={styles.bottomContainer}>
          {this._renderInfoView(qDate, qLocation)}

          <View style={styles.tagAnsContainer}>
            <View style={styles.tagContainer}>
              {this._renderTags(qId, qTags)}
            </View>
            {this._renderAnswerView(ansCount)}
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderBufferView = () => (
    <View style={{ marginVertical:10, backgroundColor:'blue', height:12 }}  />
  )

  render() {
    const {
      qText,
      qId
    } = this.props.question

    return (
      <View style={[styles.itemStyle, this.props.style]}>

        {this._renderBookmarkIcon()}

        {this._renderBufferView()}

        {this._renderQuestionContent(qId, qText)}

        {this._renderBottomContainer()}


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionContainer: {
    position: 'absolute',
    right:10,
    top:5,
    padding:8
  },
  linkOut: {
    position: 'absolute',
    right:0,
    top:0,
    padding:4
  },
  bookmark: {
    position: 'absolute',
    right:35,
    top:0,
    padding:4
  },
  bottomContainer:{
    flexDirection:'column',
    alignItems:'flex-start',
    marginTop:16,
    backgroundColor:'transparent'
  },

  infoContainer:{
    alignItems:'flex-start',
    flexDirection:'row',
  },
  infoText:{
    fontSize: 14,
    padding:4,
    textAlign:'center',
    fontStyle: 'italic'
  },

  tagAnsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  tagContainer:{
    flex:4,
    flexWrap:'wrap',
    flexDirection:'row',
  },

  tag: {
    backgroundColor:'lightgray',
    padding:6,
    margin:4,
    borderRadius:4,
    borderWidth:1,
    borderColor:'gray'
  },
  tagNameText: {
    // textAlign:'center',
  },

  ansContainer:{
    flex:1,
    alignSelf:'flex-start',
    flexWrap:'wrap',
    flexDirection:'column',
    backgroundColor:'#0076a3',
    paddingVertical:4,
    paddingHorizontal:1,
    borderRadius:4,
    borderWidth:1,
    borderColor:'white',
    marginBottom:4
  },

  ansText:{
    textAlign:'center',
    color:'white',
    fontWeight: 'bold',
    fontSize: 14
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
    fontSize: 16,
    flex:1
  },

  textNodeContainer: {
    flexDirection:'row',
    width:'100%',
    marginVertical:6
  }

});
