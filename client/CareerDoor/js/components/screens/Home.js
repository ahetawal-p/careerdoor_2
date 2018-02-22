import React,  { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableHighlight, TextInput, Image, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'react-native-micro-animated-button'
import * as Actions from '../../actions/Companies'

class Home extends PureComponent {
  static navigationOptions = {
    title: 'Home123',
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      filterText:''
    }
  }

  componentDidMount() {
    // this.b1.load()
    this.props.loadCompanies()
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

  _renderItem = ({ item }) => {
    const label = `${item.companyName} (${item.qCount})`
    return  (
      <TouchableHighlight
        underlayColor="lightgray"
        onPress={() => this._onPress(item)}
        style={styles.card}
      >
        <View style={styles.itemStyle}>
          <Image
            style={{ width: 50, height: 50, margin:4 }}
            source={{ uri:item.qLogo }}
          />
          <Text style={styles.text} numberOfLines={3}>
            {label}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _onChangeFilterText = (filterText) => {
    this.b1.success()
    this.setState(() => ({ filterText }));
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i')
    const filter = item => (filterRegex.test(item.companyName))
    const filteredData = this.props.companies.filter(filter)
    console.log((Dimensions.get('window').width) / 2)
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>Home!</Text>
      //   <Button
      //     title="Go to Settings"
      //     onPress={() => this.props.navigation.navigate('Settings')}
      //   />
      //   <Button
      //     title="Go to Questions"
      //     onPress={() => this.props.navigation.navigate('Questions')}
      //   />
      //   <Button
      //     title="Go to QuestionDetail"
      //     onPress={() => this.props.navigation.dispatch({ type: 'QuestionDetail' })}
      //   />
      // </View>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          renderItem={this._renderItem}
          numColumns={1}
          ListHeaderComponent={this._getHeader}
          keyExtractor={item => item.companyName}
        />
        <View style={styles.box2}>
          <Button
            foregroundColor="#4cd964"
            label="Submit"
            scaleOnSuccess
            scaleFactor={2.2}
            onPress={() => this.b1.success()}
            ref={(ref) => { this.b1 = ref }}
            successIconName="check"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box2: {
    position: 'absolute',
    top: 40,
    left: (Dimensions.get('window').width / 2) - 50,
    width: 100,
    height: 100,

  },
  text: {
    color: '#ffffff',
    fontSize: 80
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  headerFooter: {
    height:40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFooterContainer:{
    padding:8
  },
  itemStyle: {
    height:70,
    flexDirection:'row',
    alignItems: 'center',
  },
  card:{
    margin:4,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    borderColor: 'lightgray',
    borderWidth: 1,
  },

  searchTextInput: {
    borderColor: '#cccccc',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    padding:4,
    backgroundColor: 'rgb(239, 239, 244)',
    fontSize: 14,
  },
  text:{
    fontSize: 18,
    // width: 0, /* Special fix for wraping text */
    flex: 1,
  },

});

const mapStateToProps = state => ({
  companies: state.Companies.companies,
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
