import React, { useState } from 'react';
import { View } from 'react-native-animatable';
import { Input, Icon, makeStyles, useTheme } from 'react-native-elements';

const useStyles = makeStyles({
  fieldContainer: {
    flex: 0,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 16,
    fontSize: 16,
  },
});

export const TextInput = ({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  iconName,
  password,
  ...props
}) => {
  const styles = useStyles();
  const [visible, setVisible] = useState(!password);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const { theme } = useTheme();

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Input
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, inputStyle]}
        labelStyle={styles.label}
        leftIcon={
          iconName ? (
            <Icon
              name={iconName}
              type="material"
              color={theme.colors.secondary}
            />
          ) : undefined
        }
        rightIcon={
          password ? (
            <Icon
              onPress={toggleVisible}
              name={visible ? 'visibility-off' : 'visibility'}
              type="material"
              color={theme.colors.secondary}
            />
          ) : undefined
        }
        secureTextEntry={!visible}
        {...props}
      />
    </View>
  );
};
