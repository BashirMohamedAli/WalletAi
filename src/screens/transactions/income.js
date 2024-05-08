import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import {FAB} from 'react-native-paper';

import routes from '../../config/routes';
import {Colors, Typography} from '../../styles';
import {getCurrency} from '../../utils/currency';
import {getIncomes, deleteTransaction} from '../../dbHelpers/transactionHelper';

import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const Income = ({navigation, route}) => {
  const focused = useIsFocused();

  const [currency, setCurrency] = useState({});
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    getCurrency(setCurrency);
    getIncomes(setIncomes);
  }, [focused]);

  // Delete Item
  const __delete = id => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete this income transaction?',
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
            getIncomes(setIncomes);
          },
        },
      ],
    );
  };

  // Update Item
  const __update = item => {
    navigation.navigate(routes.AddIcome, {item: item});
  };

  return (
    <View style={styles.container}>
      {incomes.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[Typography.H3, {color: Colors.WHITE, textAlign: 'center'}]}>
            You haven't any income!
          </Text>
        </View>
      ) : (
        <SwipeableFlatList
          data={incomes}
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
        onPress={() => navigation.navigate(routes.AddIcome)}
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

export default Income;
