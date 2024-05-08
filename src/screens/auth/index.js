import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

import routes from '../../config/routes';
import {Colors, Typography} from '../../styles';

import Button from '../../components/Button';

const GetStarted = ({navigation, route}) => {
  const handleLogin = () => {
    navigation.navigate(routes.Login);
  };
  const handleSignIn = () => {
    navigation.navigate(routes.SignIn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={[Typography.H3, styles.title]}>Hey! Welcome</Text>
        <Text style={[Typography.TAGLINE, styles.description]}>
          Wallet Ai is a powerful and easy-to-use app that helps you manage your
          finances with the help of artificial intelligence. With Wallet Ai.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={handleSignIn} />
        <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
          <Text style={styles.signInText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: Colors.WHITE,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: Colors.WHITE,
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  signInButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default GetStarted;
