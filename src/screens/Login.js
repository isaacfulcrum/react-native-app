import React from 'react';
import { FullView } from 'app/layouts/FullView';
import { Text } from 'react-native';
import { AHSOKA } from 'app/assets/images';
import { TextField } from 'app/components/TextField';

export const Login = () => {
  return (
    <FullView backgroundImage={AHSOKA}>
      <Text>This is me</Text>
      <TextField />
    </FullView>
  );
};
