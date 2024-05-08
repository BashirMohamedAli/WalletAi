import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import {FAB} from 'react-native-paper';

import routes from '../../config/routes';
import {Colors, Typography} from '../../styles';
import {getCurrency} from '../../utils/currency';
import {
  getExpenses,
  deleteTransaction,
} from '../../dbHelpers/transactionHelper';

import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const Expense = ({navigation}) => {
  const focused = useIsFocused();

  const [currency, setCurrency] = useState({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getCurrency(setCurrency);
    getExpenses(setExpenses);
  }, [focused]);

  // Delete Item
  const __delete = id => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete this expense transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(id);
            getExpenses(setExpenses);
          },
        },
      ],
    );
  };

  // Update Item
  const __update = item => {
    navigation.navigate(routes.AddExpense, {item: item});
  };

  return (
    <View style={styles.container}>
      {expenses.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[Typography.H3, {color: Colors.WHITE, textAlign: 'center'}]}>
            You haven't any expense!
          </Text>
        </View>
      ) : (
        <SwipeableFlatList
          data={expenses}
          maxSwipeDistance={140}
          shouldBounceOnMount={true}
          keyExtractor={(item, index) => index.toString()}
          renderQuickActions={({index, item}) =>
            QuickActions(item, __update, __delete)
          }
          renderItem={({item, index}) => {
            return (
              <TransactionCard
                currency={currency.symbol}
                key={index}
                transaction={item}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FAB
        icon="plus"
        color={Colors.WHITE}
        style={styles.fab}
        onPress={() => navigation.navigate(routes.AddExpense)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: Colors.BLACK,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.PRIMARY,
  },
});

export default Expense;
