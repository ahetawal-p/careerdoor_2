import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'
import * as COLOR from '../../utils/colors'

class BookmarkQuestions extends PureComponent {

  _onQuestionPress = (question) => {
    this.props.openQuestionDetail(question)
  }

  _onQuestionExternalLink = (question) => {
    this.props.openQuestionExternalLink(question)
  }

  _onQuestionBookmark = (question) => {
    this.props.updateBookmark(question)
  }

  _renderItem = ({ item, index }) => (
    <Questioncard
      style={{ backgroundColor:COLOR.yellow50 }}
      question={item}
      onPress={this._onQuestionPress}
      onBookmarkPress={this._onQuestionBookmark}
      onExternalLinkPress={this._onQuestionExternalLink}
    />
    )

  _renderEmptyView = () => (
    <View style={{ flex:1, alignSelf: 'center', alignItems:'center', justifyContent:'center' }}>
      <Ionicons name={'ios-book-outline'} size={32} color={COLOR.blue700} />
      <Text style={styles.bookmarkMsgTxt}>No Bookmarks present</Text>
    </View>
    )

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.questions && this.props.questions.length > 0 ?
            <FlatList
              data={this.props.questions}
              renderItem={this._renderItem}
              keyExtractor={item => item.qId}
              ref={(ref) => { this._captureRef = ref }}
            />
          :
          this._renderEmptyView()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.white
  },
  bookmarkMsgTxt:{
    padding:2,
    fontSize: 16,
    textAlign:'center',
    color: COLOR.lightBlue400,
    fontFamily: 'Roboto-Regular',
  }
});


const mapStateToProps = state => ({
  questions: state.Questions.bookmarkQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkQuestions);
