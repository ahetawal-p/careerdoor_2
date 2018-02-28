import React,  { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Questions'

class QuestionDetail extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestionDetail()
  }


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
        (<Text>QuestionDetail!</Text>)
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    paddingVertical: 20
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
