import React,  { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as COLOR from '../../utils/colors'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'
import QuestionDetailcard from '../common/QuestionDetailcard'
import RetryView from '../common/RetryView'
import LottieLoader from '../common/LottieLoader'

class QuestionDetail extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestionDetail()
  }

  _onQuestionBookmark = (question) => {
    this.props.updateBookmark(question)
  }

  _onQuestionExternalLink = (question) => {
    this.props.openQuestionExternalLink(question)
  }

  _renderCurrentQuestion = currentQuestion => (
    <Questioncard
      style={{ backgroundColor:COLOR.lightBlue50 }}
      question={currentQuestion}
      onPress={() => {}}
      onBookmarkPress={this._onQuestionBookmark}
      onExternalLinkPress={this._onQuestionExternalLink}
    />
  )

  _renderQuestionDetails = (questionDetail) => {
    const allViews = questionDetail.map((element, index) => {
      const key = `qd${index}`
      return (
        <QuestionDetailcard
          key={key}
          style={{ backgroundColor:COLOR.white }}
          questionDetail={element}
        />
      )
    })
    return allViews
  }

  _renderAnswerHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Answers
      </Text>
    </View>
  )

  _onRetry = () => {
    this.props.loadQuestionDetail()
  }

  render() {
    const {
      isLoading,
      questionDetail,
      currentQuestion,
      isErrorLoadingQuestionDetail
    } = this.props

    return (
      <View style={[styles.container]}>
        {
          isErrorLoadingQuestionDetail
          ?
            <RetryView
              onRetryClick={this._onRetry}
              errorMsg={'Error loading Question Details'}
            />
          :
          isLoading
          ?
            <LottieLoader />
          :
            <ScrollView>
              {this._renderCurrentQuestion(currentQuestion)}
              {this._renderAnswerHeader()}
              {this._renderQuestionDetails(questionDetail)}
            </ScrollView>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: COLOR.white
  },
  headerContainer: {
    margin:16,
    paddingBottom: 4,
    borderBottomWidth:1,
    borderBottomColor:COLOR.blue200
  },
  headerText:{
    fontSize: 24,
    fontFamily: 'Roboto-Italic',
    color: COLOR.lightBlue800
  },


});


const mapStateToProps = state => ({
  questionDetail: state.Questions.questionDetail,
  isLoading: state.Questions.isLoadingQuestionDetail,
  currentQuestion: state.Questions.currentSelectedQuestion,
  isErrorLoadingQuestionDetail: state.Questions.isErrorLoadingQuestionDetail
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
