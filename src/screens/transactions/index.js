import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import routes from '../../config/routes';
import {Colors, Typography} from '../../styles';
import {
  getTransactions,
  deleteTransaction,
} from '../../dbHelpers/transactionHelper';

import Income from './income';
import Expense from './expense';

// Top Tabs
const Tab = createMaterialTopTabNavigator();

function TopTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: [Typography.TAGLINE, {color: Colors.WHITE}],
        tabBarStyle: {
          backgroundColor: Colors.BLACK,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        swipeEnabled: false,
        animationEnabled: true,
      }}>
      <Tab.Screen
        name={routes.Income}
        options={{tabBarLabel: 'Income'}}
        component={Income}
      />
      <Tab.Screen
        name={routes.Expense}
        options={{tabBarLabel: 'Expense'}}
        component={Expense}
      />
    </Tab.Navigator>
  );
}

const Transactions = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[Typography.H1, {color: Colors.WHITE, marginBottom: 10}]}>
          Transactions
        </Text>
      </View>

      {/* Body */}
      <View style={{flex: 1}}>
        <TopTabs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  // Header
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK,
  },
});

export default Transactions;
