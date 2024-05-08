import React from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TextInput, Provider as PaperProvider} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import {Colors, Typography} from '../../styles';
import AuthContext from '../../context/AuthContext';

import Button from '../../components/Button';

const SignIn = ({navigation}) => {
  const {authContext} = React.useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      joined: new Date(),
    };
    authContext.signIn(user);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Body */}
        <View style={styles.bodyContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" color={Colors.WHITE} size={25} />
            </TouchableOpacity>
            <Text
              style={[Typography.H1, {marginLeft: 10, color: Colors.WHITE}]}>
              Login
            </Text>
          </View>
          {/* TextInput */}
          <View style={{marginTop: 20}}>
            <Controller
              control={control}
              rules={{
                required: 'First name is required',
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  label="Firstname"
                  placeholder="Firstname"
                  value={value}
                  mode="outlined"
                  onChangeText={text => onChange(text)}
                  theme={{
                    colors: {
                      primary: Colors.PRIMARY,
                      underlineColor: 'transparent',
                      placeholder: Colors.GRAY_DARK,
                      text: Colors.WHITE,
                    },
                  }}
                  style={[styles.input, Typography.BODY]}
                  error={errors.firstName?.message}
                />
              )}
              name="firstName"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{
                required: 'Last name is required',
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  label="Lastname"
                  placeholder="Lastname"
                  value={value}
                  mode="outlined"
                  onChangeText={text => onChange(text)}
                  theme={{
                    colors: {
                      primary: Colors.PRIMARY,
                      underlineColor: 'transparent',
                      placeholder: Colors.GRAY_DARK,
                      text: Colors.WHITE,
                    },
                  }}
                  style={[styles.input, Typography.BODY]}
                  error={errors.lastName?.message}
                />
              )}
              name="lastName"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{
                required: 'Password is required',
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={text => onChange(text)}
                  secureTextEntry
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: Colors.PRIMARY,
                      underlineColor: 'transparent',
                      placeholder: Colors.GRAY_DARK,
                      text: Colors.WHITE,
                    },
                  }}
                  error={errors.password?.message}
                />
              )}
              name="password"
              defaultValue=""
            />
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </PaperProvider>
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
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
});

export default SignIn;
