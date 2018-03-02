import React,  { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'
import QuestionDetailcard from '../common/QuestionDetailcard'

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
      style={{ backgroundColor:'lightgray' }}
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
          style={{ backgroundColor:'lightgray' }}
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

  render() {
    const {
      isLoading,
      questionDetail,
      currentQuestion
    } = this.props

    return (
      <View style={styles.container}>
        { isLoading ? (<ActivityIndicator animating size="large" />)
        :
        (<ScrollView>
          {this._renderCurrentQuestion(currentQuestion)}
          {this._renderAnswerHeader()}
          {this._renderQuestionDetails(questionDetail)}
        </ScrollView>)
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },
  headerContainer: {
    margin:12,
    paddingBottom: 4,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'lightgray'
  },
  headerText:{
    fontSize: 18,
    fontStyle: 'italic'
  }

});


const mapStateToProps = state => ({
  questionDetail: state.Questions.questionDetail,
  isLoading: state.Questions.isLoadingQuestionDetail,
  currentQuestion: state.Questions.currentSelectedQuestion
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
