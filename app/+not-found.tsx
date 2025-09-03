import { Link, Redirect, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {

  // const RedirectFunc = async () => {
  //   if (true) {
  //     return Redirect({href:"/(auth)/login"});
  //   } else {
  //     return Redirect({href: "/(app)/(tabs)"});;
  //   }
  // }

  return (
    Redirect({href:"/(auth)/login"})
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
