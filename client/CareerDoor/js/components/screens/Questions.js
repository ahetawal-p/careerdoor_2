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
    this.props.loadQuestions(0)
  }

  _onQuestionPress = (question) => {
    console.log(question)
  }

  _renderItem = ({ item }) => (
    <Questioncard key={item.qId} question={item} onPress={this._onQuestionPress} />
    )

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.isLoading ?
            <View style={styles.loader}>
              <ActivityIndicator animating size="large" />
            </View>
          :
            <FlatList
              data={this.props.questions}
              renderItem={this._renderItem}
              keyExtractor={item => item.qId}
              ref={(ref) => { this._captureRef = ref }}
            />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  }
});


const mapStateToProps = state => ({
  questions: state.Questions.questions,
  isLoading: state.Questions.isLoadingQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
