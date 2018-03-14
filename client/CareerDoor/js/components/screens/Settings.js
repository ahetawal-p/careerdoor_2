import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    Linking,
    Platform,
    ScrollView
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import { SUPPORT_EMAIL, APP_VERSION, ANDROID_RATE_APP, IOS_RATE_APP } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from '../../utils/colors'
import { DISCLAIMER_TEXT } from '../../constants'

const EMAIL_LINK = `mailto:${SUPPORT_EMAIL}&subject=CareerDoor Feedback&body=Version ${APP_VERSION}`

const openURL = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      console.log(`Cannot handle url: ${url}`);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}

export default class Settings extends PureComponent {

  _emailFeedback = () => {
    openURL(EMAIL_LINK)
  }

  _rateApp = () => {
    if (Platform.OS === 'ios') {
      openURL(IOS_RATE_APP)
    } else {
      openURL(ANDROID_RATE_APP)
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.subHeaderText}>VERSION</Text>
            <View style={styles.rowContainer}>
              <View style={styles.row}>
                <Text style={styles.rowText}>Version</Text>
                <Text style={styles.rowText}>{APP_VERSION}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, { marginTop:32 }]}>
            <Text style={styles.subHeaderText}>FEEDBACK</Text>
            <View style={styles.rowContainer}>
              <TouchableHighlight
                underlayColor="lightgray"
                onPress={this._rateApp}
              >
                <View style={styles.row}>
                  <Text style={styles.rowText}>Rate App</Text>
                  <Icon name="chevron-right" size={14} color={'gray'} />
                </View>
              </TouchableHighlight>
              <View style={styles.rowDivider} />
              <TouchableHighlight
                underlayColor="lightgray"
                onPress={this._emailFeedback}
              >
                <View style={styles.row}>
                  <Text style={styles.rowText}>Email Feedback</Text>
                  <Icon name="chevron-right" size={14} color={'gray'} />
                </View>
              </TouchableHighlight>
            </View>

            <Text style={styles.subHeaderBottomText}>Your feedback helps make this app better</Text>
          </View>

          <View style={[styles.section, { marginTop:32 }]}>
            <Text style={styles.subHeaderText}>DISCLAIMER</Text>
            <View style={styles.rowContainer}>
              <View style={styles.row}>
                <HTMLView
                  value={DISCLAIMER_TEXT}
                  stylesheet={styles}
                />

              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start'
  },
  p: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  section:{
    marginVertical:16,
  },
  subHeaderText:{
    fontSize: 14,
    marginLeft:8,
    marginBottom:4,
    fontFamily: 'Roboto-Regular',
    color: 'gray'
  },
  subHeaderBottomText:{
    fontSize: 10,
    marginLeft:8,
    paddingVertical:4,
    fontFamily: 'Roboto-Regular',
    color: 'gray'
  },
  rowContainer:{
    paddingVertical:4,
    justifyContent:'flex-start',
    backgroundColor:'white',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:'lightgray',
    marginBottom:4
  },
  row:{
    paddingVertical:6,
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal:8,
    alignItems:'center'
  },
  rowDivider: {
    marginLeft:8,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'lightgray'
  },
  rowText:{
    textAlign:'center',
    paddingVertical:8,
    fontFamily: 'Roboto-Regular',
  },
  actionContainer: {
    position: 'absolute',
    right:10,
    top:5,
    padding:8
  },
  linkOut: {
    position: 'absolute',
    right:0,
    top:0,
    padding:4
  },
  bookmark: {
    position: 'absolute',
    right:35,
    top:0,
    padding:4
  },
  bottomContainer:{
    flexDirection:'column',
    alignItems:'flex-start',
    marginTop:16,
    backgroundColor:'transparent'
  },

  infoContainer:{
    alignItems:'flex-start',
    flexDirection:'row',
  },
  infoText:{
    fontSize: 12,
    padding:4,
    textAlign:'center',
    fontFamily: 'Roboto-Italic',
  },

  tagAnsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  tagContainer:{
    flex:4,
    flexWrap:'wrap',
    flexDirection:'row',
  },

  tag: {
    backgroundColor:'lightgray',
    padding:4,
    margin:4,
    borderRadius:4,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'gray'
  },
  tagNameText: {
    fontSize: 10,
    fontFamily: 'Roboto-LightItalic',
  },

  ansContainer:{
    flex:1,
    alignSelf:'flex-start',
    flexWrap:'wrap',
    flexDirection:'column',
    backgroundColor:'#0076a3',
    paddingVertical:2,
    paddingHorizontal:1,
    borderRadius:4,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'white',
    marginBottom:4
  },

  ansText:{
    textAlign:'center',
    color:'white',
    fontSize: 12,
    fontFamily: 'Roboto-Italic',
  },

  itemStyle: {
    alignItems: 'flex-start',
    paddingHorizontal:4,
    marginVertical:6,
    marginHorizontal:12,
    borderRadius: 6,
    borderColor: COLOR.lightBlue300,
    borderWidth: 1,
  },
  text:{
    fontSize: 16,
    flex:1,
    fontFamily: 'Roboto-Regular',
  },

  textNodeContainer: {
    flexDirection:'row',
    width:'100%',
    marginVertical:6
  }

});
