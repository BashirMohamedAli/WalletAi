import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors} from '../styles';

const QuickActions = (item, updateItem, deleteItem) => {
  return (
    <View style={styles.container}>
      <>
        <Pressable
          onPress={() => updateItem(item)}
          style={[
            styles.button,
            {marginLeft: 10, backgroundColor: Colors.SUCESS},
          ]}>
          <Icon name="pen" color={Colors.WHITE} size={15} />
        </Pressable>
      </>
      <>
        <Pressable
          onPress={() => deleteItem(item.id)}
          style={[
            styles.button,
            {backgroundColor: Colors.ALERT, marginLeft: 10},
          ]}>
          <Icon name="trash" color={Colors.WHITE} size={15} />
        </Pressable>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuickActions;
