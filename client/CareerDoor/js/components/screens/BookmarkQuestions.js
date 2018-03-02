import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Actions from '../../actions/Questions'
import Questioncard from '../common/Questioncard'


class BookmarkQuestions extends PureComponent {

  _onQuestionPress = (question) => {
     // TODO NEED TO FIX THIS NAVIGATION
    // this.props.openQuestionDetail(question)
  }

  _onQuestionExternalLink = (question) => {
    this.props.openQuestionExternalLink(question)
  }

  _onQuestionBookmark = (question) => {
    this.props.updateBookmark(question)
  }

  _renderItem = ({ item, index }) => (
    <Questioncard
      style={index % 2 === 0 ? { backgroundColor:'lightgray' } : { backgroundColor:'#f2f2f2' }}
      question={item}
      onPress={this._onQuestionPress}
      onBookmarkPress={this._onQuestionBookmark}
      onExternalLinkPress={this._onQuestionExternalLink}
    />
    )

  _renderEmptyView = () => (
    <View style={{ flex:1, alignSelf: 'center', alignItems:'center', justifyContent:'center' }}>
      <Icon name="list" size={32} color={'lightblue'} />
      <Text style={{ padding:4, fontSize: 16, textAlign:'center' }}>No Bookmarks present</Text>
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
    flex: 1
  },
  loader: {
    paddingVertical: 20
  }
});


const mapStateToProps = state => ({
  questions: state.Questions.bookmarkQuestions
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkQuestions);
