import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from '../../utils/colors'

export default class HeaderFilter extends Component {

  _onSelect = (idx, value) => {
    console.log(value)
  }

  render() {
    return (
      <View style={styles.container}>
        <ModalDropdown
          style={styles.filter}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdown_text}
          options={['Companies', 'Topics']}
          onSelect={(idx, value) => this._onSelect(idx, value)}
        >
          <View style={styles.filterContainer}>
            <Text style={styles.filterText}>Companies</Text>
            <Icon name="chevron-down" size={12} color={COLOR.black} />
          </View>

        </ModalDropdown>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  filter:{
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  dropdown: {
    width: 100,
    height: 70,
    borderWidth: 1,
  },
  filterText:{
    fontSize: 18,
    textAlign:'center',
    paddingHorizontal:2,
    fontFamily: 'Roboto-Regular',
  },
  dropdown_text:{
    fontSize: 14,
    color:COLOR.black,
    fontFamily: 'Roboto-Regular',
  },
  filterContainer:{
    marginBottom:4,
    flexDirection:'row',
    alignItems:'center'
  }

});
