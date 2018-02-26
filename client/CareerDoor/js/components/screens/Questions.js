import React,  { PureComponent } from 'react'
import { Text, View, FlatList, TouchableHighlight, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/Questions'

class Questions extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({ title: `${navigation.state.params.title}` });

  componentDidMount() {
    this.props.loadQuestions(0)
  }

  _renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="lightgray"
      style={styles.card}
    >
      <View style={styles.itemStyle}>
        <View style={styles.tester} />
        <Text style={styles.text}>
          {item.qText[0]}
        </Text>
      </View>
    </TouchableHighlight>
    )

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.props.questions}
          contentContainerStyle={styles.contentContainer}
          renderItem={this._renderItem}
          numColumns={1}
          keyExtractor={item => item.qId}
          ref={(ref) => { this._captureRef = ref }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tester: {
    top:20,
    alignSelf:'flex-end',
    left:'auto',
    height:20,
    width:20,
    backgroundColor:'red'
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  itemStyle: {

    alignItems: 'flex-start',
    padding:8,
    flex:1
  },
  card:{
    margin:4,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    borderColor: 'lightgray',
    borderWidth: 1,
  },

  text:{
    fontSize: 14,
    // width: 0, /* Special fix for wraping text */
    flex: 1,


  },

});


const mapStateToProps = state => ({
  questions: state.Questions.questions,
  isLoading: state.Questions.isLoadingQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
