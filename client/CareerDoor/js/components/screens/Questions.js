import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'

class Questions extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestions(1)
  }

  _onQuestionPress = (question) => {
    console.log(question)
  }

  _renderItem = ({ item }) => (
    <Questioncard question={item} onPress={this._onQuestionPress} />
    )

  _renderFooter = () => {
    if (this.props.isLoading && this.props.questions.length < this.props.totalCount) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator animating size="large" />
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
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.questions}
          renderItem={this._renderItem}
          keyExtractor={item => item.qId}
          ref={(ref) => { this._captureRef = ref }}
          onEndReached={this._loadMore}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    paddingVertical: 20
  }
});


const mapStateToProps = state => ({
  questions: state.Questions.questions,
  isLoading: state.Questions.isLoadingQuestions,
  pageNo: state.Questions.pageNo,
  totalCount: state.Companies.currentSelectedCompany.qCount
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
