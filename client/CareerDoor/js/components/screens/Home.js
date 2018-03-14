import React,  { PureComponent } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as COLOR from '../../utils/colors'
import * as CompanyActions from '../../actions/Companies'
import * as TopicsActions from '../../actions/Topics'
import HeaderFilter from '../common/HeaderFilter'
import CompanyList from '../common/CompanyList'
import TopicsList from '../common/TopicsList'

class Home extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => (
    {
      title: screenProps.title,
      headerTitle: <HeaderFilter options={screenProps.filterProps} />
    }
  );

  _onCompanyPress = (company) => {
    this.props.openQuestionsFromCompany(company)
  }

  _onLoadMoreCompanyClick = () => {
    this.props.loadMoreCompanies()
  }

  _onTopicPress = (topic) => {
    this.props.openQuestionsFromTopic(topic)
  }

  _onLoadMoreTopicsClick = () => {
    this.props.loadMoreTopics()
  }

  _onRetry = () => {
    if (this.props.screenProps.onRetry) {
      this.props.screenProps.onRetry()
    }
  }

  _showError = () => {
    if (this.props.currentFilter === 'Companies' && this.props.isErrorLoadingCompany) {
      return true
    } else if (this.props.currentFilter === 'Topics' && this.props.isErrorLoadingTopic) {
      return true
    }
    return false
  }

  render() {
    const isError = this._showError()
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
        {
            isError
            ?
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}> Error loading {this.props.currentFilter} </Text>
                <Button
                  onPress={this._onRetry}
                  title="Retry"
                  color={COLOR.blue600}
                />
              </View>
            :
            this.props.currentFilter === 'Companies'
            ?
              <CompanyList
                companies={this.props.companies}
                onLoadMoreClick={this._onLoadMoreCompanyClick}
                onCompanyPress={this._onCompanyPress}
                isDataChanged={this.props.isCompaniesDataChanged}
                isLoading={this.props.isCompaniesLoading}
              />
        :
              <TopicsList
                topics={this.props.topics}
                onLoadMoreClick={this._onLoadMoreTopicsClick}
                onTopicPress={this._onTopicPress}
                isDataChanged={this.props.isTopicDataChanged}
                isLoading={this.props.isTopicsLoading}
              />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent:'center'
  },
  errorContainer: {
    alignSelf:'center'
  },
  errorText:{
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'gray'
  }
});

const mapStateToProps = state => ({
  companies: state.Companies.companies,
  isCompaniesLoading: state.Companies.isLoadingCompany,
  isCompaniesDataChanged: state.Companies.isDataChanged,
  isErrorLoadingCompany: state.Companies.isErrorLoadingCompany,
  topics: state.Topics.topics,
  isTopicsLoading: state.Topics.isLoadingTopic,
  isTopicsDataChanged: state.Topics.isTopicsDataChanged,
  isErrorLoadingTopic: state.Topics.isErrorLoadingTopic,
  currentFilter : state.HomeFilter.currentSelectedFilter
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ ...CompanyActions, ...TopicsActions }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
