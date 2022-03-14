import { userCount } from 'app/services/home';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const Home = () => {
  const [count, setCount] = useState(0);

  const get = async () => {
    await userCount().then(({ data }) => {
      setCount(data);
    });
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};
