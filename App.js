import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

const Home = ({ navigation }) => {
  const [counter, setCounter] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Increment"
          onPress={() => setCounter((prev) => prev + 1)}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <CustomHeader /> */}
      <Text>Home Screen</Text>
      <Text>This is the home page</Text>
      <Button
        title="Go to Article 1"
        onPress={() =>
          navigation.navigate('Article', {
            body: 'This is the body of the article',
            title: 'Article Title 1',
          })
        }
      />
      <Button
        title="Go to Article 2"
        onPress={() => navigation.navigate('Article')}
      />
      <CustomButton />
      <Text>{counter}</Text>
    </View>
  );
};

const CustomButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Navigate to Article using Hook"
      onPress={() => navigation.navigate('Article')}
    />
  );
};

const Article = ({ navigation, route }) => {
  const { body } = route.params;
  return (
    <View style={{ ...styles.container, backgroundColor: 'orange' }}>
      <Text>Article Screen</Text>
      <Text>{body}</Text>
      <Text>This is an article</Text>
      <Button
        title="Go to Article"
        onPress={() => navigation.push('Article')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Set body"
        onPress={() => navigation.setParams({ body: 'This is the new body' })}
      />
      <Button
        title="Set Options"
        onPress={() =>
          navigation.setOptions({ headerStyle: { backgroundColor: 'yellow' } })
        }
      />
    </View>
  );
};

const logoImage = require('./assets/favicon.png');

const CustomHeader = () => {
  return (
    <View style={styles.customHeader}>
      <Image source={logoImage} style={styles.logo} />
      <Text>Header</Text>
    </View>
  );
};

const Stack = createStackNavigator();
// console.log('stack: ', Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: 'orange' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'First Screen',
            // headerStyle: styles.header,
            headerRight: () => (
              <Button
                title="Press me"
                onPress={() => console.log('Button was pressed')}
              />
            ),
            // headerTitle: <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          initialParams={{ body: 'An empty body', title: 'Default Title' }}
          options={({ route, navigation }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    backgroundColor: 'yellow',
  },

  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
  },
});
