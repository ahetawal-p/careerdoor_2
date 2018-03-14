import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as COLOR from '../../utils/colors'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'
import RetryView from '../common/RetryView'

class Questions extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestions(1)
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

  _onRetry = () => {
    this.props.loadQuestions(1)
  }

  _renderItem = ({ item, index }) => (
    <Questioncard
      style={index % 2 === 0 ? { backgroundColor: COLOR.lightBlue50 } : { backgroundColor:COLOR.lightBlue100 }}
      question={item}
      onPress={this._onQuestionPress}
      onBookmarkPress={this._onQuestionBookmark}
      onExternalLinkPress={this._onQuestionExternalLink}
    />
    )

  _renderFooter = () => {
    if (this.props.isLoading && this.props.questions.length < this.props.totalCount) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator animating size="large" color={COLOR.white} />
        </View>
      )
    }
    return null
  }

  _loadMore = () => {
      // see: https://github.com/facebook/react-native/issues/14015
    if (!this.props.isLoading && !this.onEndReachedCalledDuringMomentum && this.props.questions.length < this.props.totalCount ) {
      this.props.loadQuestions(this.props.pageNo + 1)
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  render() {
    const isLoadingFirstTime =  this.props.isLoading && this.props.questions.length < this.props.totalCount
    return (
      <View style={[styles.container, isLoadingFirstTime ? { backgroundColor:COLOR.lightBlue600 } : null]}>
        {
          this.props.isErrorLoadingQuestions
          ?
            <RetryView
              onRetryClick={this._onRetry}
              errorMsg={'Error loading Questions'}
            />
          :
            <FlatList
              data={this.props.questions}
              renderItem={this._renderItem}
              keyExtractor={item => item.qId}
              ref={(ref) => { this._captureRef = ref }}
              onEndReached={this._loadMore}
              onEndReachedThreshold={5}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              ListFooterComponent={this._renderFooter}
            />
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent:'center'
  },
  loader: {
    paddingVertical: 20
  }
});


const mapStateToProps = state => ({
  questions: state.Questions.questions,
  isLoading: state.Questions.isLoadingQuestions,
  pageNo: state.Questions.pageNo,
  totalCount: state.Questions.totalQCount,
  isErrorLoadingQuestions: state.Questions.isErrorLoadingQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
