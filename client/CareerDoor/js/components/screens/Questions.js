import React,  { PureComponent } from 'react'
import { Button, Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Questions'

class Questions extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestions()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Questions!</Text>
        <Button
          title="Go to QuestionDetail"
          onPress={() => this.props.navigation.navigate('QuestionDetail')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.Questions.questions,
  isLoading: state.Questions.isLoadingQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
