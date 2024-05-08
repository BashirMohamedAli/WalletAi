import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Colors, Typography} from '../../styles';
import Button from '../../components/Button';

import {
  insertTransaction,
  updateTransaction,
} from '../../dbHelpers/transactionHelper';

import {categories} from '../../utils/categories';

import BackHeader from '../../components/Headers/BackHeader';

const AddExpense = ({navigation, route}) => {
  const [category, setCategory] = useState();
  const [income, setIncome] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (route.params?.item) {
      const itemCategory = categories.find(
        category => category.name === route.params.item.category,
      );
      setCategory(itemCategory);
      setDescription(route.params.item.description);
      setDate(new Date(route.params.item.transaction_date));
      setAmount(route.params.item.amount.toString());
      setIncome(route.params.item.type === 'income' ? false : true);
    } else {
      setCategory(categories[0]); // Set the first category as the default category
    }
  }, [route.params?.item]);

  // Toggle Income / Expense Switch
  const toggleIncomeSwitch = () => setIncome(previousState => !previousState);

  // Change Date
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Insert Transaction
  const __insert = () => {
    const stringDate = date.toLocaleDateString();
    insertTransaction({
      category: category.name,
      description: description,
      icon: category.icon,
      date: stringDate,
      amount: parseFloat(amount),
      type: income ? 'expense' : 'income',
    });
  };

  // Update Transaction
  const __update = () => {
    const stringDate = date.toLocaleDateString();
    updateTransaction({
      id: route.params.item.id,
      category: category.name,
      description: description,
      icon: category.icon,
      date: stringDate,
      amount: parseFloat(amount),
      type: income ? 'expense' : 'income',
    });
  };

  // Save Transaction
  const __save = () => {
    if (!category) {
      Alert.alert('Warning', 'Please select a category.');
      return;
    }

    if (!amount) {
      Alert.alert('Warning', 'Please enter the amount.');
      return;
    }

    if (isNaN(parseFloat(amount))) {
      Alert.alert('Warning', 'Please enter a valid amount.');
      return;
    }

    if (!date) {
      Alert.alert('Warning', 'Please select a date.');
      return;
    }
    if (route.params?.item) {
      __update();
    } else {
      __insert();
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title={route.params?.item ? 'Edit Expense' : 'Add Expense'} />

      {/* Body */}
      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>
            Category
          </Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            style={styles.input}
            dropdownIconColor={Colors.GRAY_DARK}
            itemStyle={[Typography.BODY, {color: Colors.GRAY_DARK}]}>
            {income
              ? categories
                  .slice(7, 22)
                  .map((category, index) => (
                    <Picker.Item
                      key={index}
                      label={category.name}
                      value={category}
                    />
                  ))
              : categories
                  .slice(0, 7)
                  .map((category, index) => (
                    <Picker.Item
                      key={index}
                      label={category.name}
                      value={category}
                    />
                  ))}
          </Picker>
        </View>

        {/* Transaction type */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>
            Transaction type
          </Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.typeButton, !income && styles.typeButtonSelected]}
              onPress={() => setIncome(false)}>
              <Text
                style={[
                  Typography.BODY,
                  !income ? {color: Colors.WHITE} : {color: Colors.GRAY_DARK},
                ]}>
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, income && styles.typeButtonSelected]}
              onPress={() => setIncome(true)}>
              <Text
                style={[
                  Typography.BODY,
                  income ? {color: Colors.WHITE} : {color: Colors.GRAY_DARK},
                ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>
            Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={[styles.input, {paddingTop: 15, paddingBottom: 15}]}>
            <Text style={[Typography.BODY, {color: Colors.WHITE}]}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="clock"
              onChange={onChangeDate}
            />
          )}
        </View>

        {/* Amount */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>
            Amount
          </Text>
          <TextInput
            value={amount}
            placeholder="$10"
            keyboardType="numeric"
            onChangeText={text => setAmount(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]}
            theme={{
              colors: {
                primary: Colors.BLACK,
                underlineColor: 'transparent',
                placeholder: Colors.GRAY_DARK,
                text: Colors.WHITE,
              },
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>
            Notes (optional)
          </Text>
          <TextInput
            value={description}
            numberOfLines={6}
            underlineColor="transparent"
            multiline
            placeholder="Notes"
            onChangeText={text => setDescription(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]}
            theme={{
              colors: {
                primary: Colors.BLACK,
                underlineColor: 'transparent',
                placeholder: Colors.GRAY_DARK,
                text: Colors.WHITE,
              },
            }}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button title="save" onPress={() => __save()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 1,
    marginTop: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  typeButtonSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
});

export default AddExpense;
