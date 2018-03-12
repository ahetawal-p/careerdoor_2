import React,  { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as COLOR from '../../utils/colors'
import * as Actions from '../../actions/Companies'
import HeaderFilter from '../common/HeaderFilter'
import CompanyList from '../common/CompanyList'


class Home extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => (
    {
      title: screenProps.title,
      headerTitle: <HeaderFilter options={screenProps.filterProps} />
    }
  );

  _onCompanyPress = (company) => {
    this.props.openQuestions(company)
  }

  _onLoadMoreClick = () => {
    this.props.loadMoreCompanies()
  }


  render() {
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
        <CompanyList
          companies={this.props.companies}
          onLoadMoreClick={this._onLoadMoreClick}
          onCompanyPress={this._onCompanyPress}
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
  }
});

const mapStateToProps = state => ({
  companies: state.Companies.companies,
  isLoading: state.Companies.isLoadingCompany,
  isDataChanged: state.Companies.isDataChanged
});

const mapDispatchToProps = dispatch => (
   bindActionCreators(Actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
