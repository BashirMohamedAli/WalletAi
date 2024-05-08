import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, Typography} from '../../../styles';
import AuthContext from '../../../context/AuthContext';

const BalanceCard = props => {
  const {state, authContext} = React.useContext(AuthContext);
  // Get User
  const user = state.user != null ? state.user : {joined: Date.now()};
  const date = new Date(user.joined);

  const incomes = props.incomes;
  const expenses = props.expenses;
  const balance = incomes - expenses;

  return (
    <>
      <View style={styles.container}>
        {/*  */}
        <View style={styles.blockContainer1}>
          <Icon2
            name="currency-usd"
            color={Colors.SUCESS}
            size={25}
            style={{marginTop: 10, marginRight: 10, marginLeft: -10}}
          />
          <View>
            <Text
              style={[
                Typography.H4,
                {color: Colors.GRAY_THIN, marginBottom: 1},
              ]}>
              Income
            </Text>
            <Text style={[Typography.BODY, {color: Colors.SUCESS}]}>
              {props.currency} {incomes}
            </Text>
          </View>
        </View>
        {/*  */}
        <View style={styles.barContainer1}></View>
        {/*  */}
        <View style={styles.blockContainer2}>
          <Icon2
            name="currency-usd-off"
            color={Colors.ALERT}
            size={25}
            style={{marginTop: 10, marginRight: 10, marginLeft: -10}}
          />
          <View>
            <Text
              style={[
                Typography.H4,
                {color: Colors.GRAY_THIN, marginBottom: 1},
              ]}>
              Expenses
            </Text>
            <Text style={[Typography.BODY, {color: Colors.ALERT}]}>
              {props.currency} {expenses}
            </Text>
          </View>
        </View>
        {/*  */}
      </View>
      <View style={styles.barContainer}></View>
      <View style={styles.container}>
        {/*  */}
        <View style={styles.blockContainer3}>
          <Icon2
            name="calendar-blank-outline"
            color={Colors.GRAY_LIGHT}
            size={25}
            style={{marginTop: 10, marginRight: 10, marginLeft: -10}}
          />
          <View>
            <Text
              style={[
                Typography.H4,
                {color: Colors.GRAY_THIN, marginBottom: 1},
              ]}>
              Period
            </Text>
            <Text style={[Typography.BODY, {color: Colors.GRAY_LIGHT}]}>
              {date.toDateString()}
            </Text>
          </View>
        </View>
        {/*  */}
        <View style={styles.barContainer1}></View>
        {/*  */}
        <View style={styles.blockContainer4}>
          <Icon
            name="wallet-outline"
            color={Colors.GRAY_THIN}
            size={25}
            style={{marginTop: 10, marginRight: 10, marginLeft: -10}}
          />
          <View>
            <Text
              style={[
                Typography.H4,
                {color: Colors.GRAY_THIN, marginBottom: 1},
              ]}>
              Balance
            </Text>
            <Text style={[Typography.BODY, {color: Colors.GRAY_THIN}]}>
              {props.currency} {balance}
            </Text>
          </View>
        </View>
        {/*  */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  barContainer: {
    height: 1,
    backgroundColor: Colors.WHITE,
  },
  barContainer1: {
    width: 1,
    backgroundColor: Colors.WHITE,
  },
  blockContainer1: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 10,
  },
  blockContainer2: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderTopRightRadius: 10,
  },
  blockContainer3: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 10,
  },
  blockContainer4: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 10,
  },
});

export default BalanceCard;
