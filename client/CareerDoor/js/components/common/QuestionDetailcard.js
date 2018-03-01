import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/styles/hljs'

const REGEX_LANG = new RegExp('{{(.*)}}')

export default class extends PureComponent {

  _renderQuestionDetailContent = (ansText) => {
    const allViews = ansText.map((element, index) => {
      const key = `ans${index}`
      if (!element.startsWith('{{')) {
        return (
          <View style={styles.textNodeContainer} key={key}>
            <Text style={styles.text} >
              {element}
            </Text>
          </View>
        )
      } else {
        const language = element.match(REGEX_LANG).pop()
        const codeString = element.replace(REGEX_LANG, '')
        return (
          <SyntaxHighlighter
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


  _renderInfoView = (qDate, qLocation) =>
    (<View style={styles.infoContainer}>
      <Text style={styles.infoText}>{qDate}</Text>
      <Text style={styles.infoText}>{qLocation}</Text>
    </View>)


  _renderVoteView = (netVote,totalVote) => (
    <View style={styles.voteContainer}>
      <Text style={styles.voteText}>
        {netVote}
      </Text>
      <Text style={styles.voteTotalText}>
        {`of ${totalVote}\nvotes`}
      </Text>
    </View>
  )

  _renderInfoView = ansDate => (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{ansDate}</Text>
    </View>
  )

  _renderBottomContainer = (netVote, totalVote,ansDate) => (
    <View style={styles.bottomContainer}>
      {this._renderInfoView(ansDate)}
      {this._renderVoteView(netVote, totalVote)}
    </View>
  )

  render() {
    const {
      ansText,
      netVote,
      totalVote,
      ansDate
    } = this.props.questionDetail

    return (
      <View style={[styles.itemStyle, this.props.style]}>
        {this._renderQuestionDetailContent(ansText)}
        {this._renderBottomContainer(netVote, totalVote, ansDate)}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bottomContainer:{
    flexDirection:'row',
    marginTop:12,
    backgroundColor:'transparent',
    justifyContent:'space-between'
  },
  infoContainer:{
    flex:1,
    alignItems:'flex-start',
  },
  infoText:{
    fontSize: 10,
    textAlign:'center',
    fontStyle: 'italic'
  },
  voteContainer:{
    alignSelf:'flex-end',
    backgroundColor:'#0076a3',
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:4,
    borderWidth:1,
    borderColor:'white'
  },
  voteText:{
    textAlign:'center',
    color:'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  voteTotalText:{
    textAlign:'center',
    color:'white',
    fontSize: 8
  },
  itemStyle: {
    alignItems: 'flex-start',
    padding:4,
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
  }
});
