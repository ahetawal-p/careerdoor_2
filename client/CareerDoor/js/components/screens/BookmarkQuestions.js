import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'
import * as COLOR from '../../utils/colors'
import { EMPTY_LIST } from '../../constants'

class BookmarkQuestions extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (this._anim && (!nextProps.questions || nextProps.questions.length === 0)) {
      this._anim.play()
    }
  }

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
    <View style={{ flex:1, alignSelf: 'center', justifyContent:'center' }}>
      <View style={{ height:100 }}>
        <LottieView
          ref={(ref) => { this._anim = ref }}
          source={EMPTY_LIST}
          loop
          enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
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
    color: COLOR.blue700,
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
