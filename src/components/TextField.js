import React from 'react';
import { View } from 'react-native-animatable';
import { Input, Icon } from 'react-native-elements';
export const TextField = () => {
  return (
    <View>
      <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={
          <Icon name="account-circle" type="material" color="#517fa4" />
        }
      />
    </View>
  );
};
