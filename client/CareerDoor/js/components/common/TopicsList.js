import React,  { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableHighlight, TextInput } from 'react-native'
import * as COLOR from '../../utils/colors'
import LoadingIndicator from '../common/LoadingIndicator'

export default class TopicsList extends PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      filterText:''
    }
  }

  _getHeader =() => (
    <View style={styles.headerFooterContainer}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        underlineColorAndroid="transparent"
        placeholder="Search..."
        onChangeText={this._onChangeFilterText}
        style={styles.searchTextInput}
      />
    </View>
  )

  _renderItem = ({ item, index }) => {
    const label = `${item.topicName} (${item.qCount})`
    const customStyle = index % 2 === 0 ? { backgroundColor: COLOR.lightBlue50 } : { backgroundColor:COLOR.lightBlue100 }
    return  (
      <TouchableHighlight
        underlayColor="lightgray"
        onPress={() => this.props.onTopicPress(item)}
        style={[styles.card, customStyle]}
      >
        <View style={styles.itemStyle}>
          {/* <Image
            style={{ width: 40, height: 40, margin:4 }}
            source={{ uri:item.qLogo, cache:'force-cache' }}
          /> */}
          <Text style={styles.text} numberOfLines={2}>
            {label}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _onChangeFilterText = (filterText) => {
    this.setState(() => ({ filterText }));
  }

  _onLoadMoreClick = () => {
    this._captureRef.scrollToIndex({ animate: true, index:0 });
    this.props.onLoadMoreClick()
  }

  _getItemLayout = (data, index) =>
    ({ length: 68, offset: (68 * index), index })

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i')
    const filter = item => (filterRegex.test(item.topicName))
    const filteredData = this.props.topics.filter(filter)
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          contentContainerStyle={styles.contentContainer}
          renderItem={this._renderItem}
          numColumns={2}
          ListHeaderComponent={this._getHeader}
          keyExtractor={item => item.topicName}
          ref={(ref) => { this._captureRef = ref }}
          getItemLayout={this._getItemLayout}
        />

        <LoadingIndicator
          onLoadMoreClick={this._onLoadMoreClick}
          isDataChanged={this.props.isDataChanged}
          isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  headerFooterContainer:{
    padding:8
  },
  itemStyle: {
    height:60,
    paddingHorizontal:8,
    flexDirection:'row',
    alignItems: 'center',
  },
  card:{
    margin:4,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
  },
  searchTextInput: {
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    padding:4,
    color: COLOR.lightBlue400,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  text:{
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical:2,
    // width: 0, /* Special fix for wraping text */
    flex: 1,
  },
});
