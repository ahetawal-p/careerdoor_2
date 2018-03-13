import React,  { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
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
        { this.props.currentFilter === 'Companies' ?
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
    backgroundColor: COLOR.white
  }
});

const mapStateToProps = state => ({
  companies: state.Companies.companies,
  isCompaniesLoading: state.Companies.isLoadingCompany,
  isCompaniesDataChanged: state.Companies.isDataChanged,
  topics: state.Topics.topics,
  isTopicsLoading: state.Topics.isLoadingTopic,
  isTopicsDataChanged: state.Topics.isTopicsDataChanged,
  currentFilter : state.HomeFilter.currentSelectedFilter
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ ...CompanyActions, ...TopicsActions }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
