import React, { useState } from 'react';
import { View } from 'react-native-animatable';
import { Input, Icon, makeStyles } from 'react-native-elements';

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
  label: {},
  inputContainer: {},
});

export const TextInput = ({
  label,
  value,
  onChange,
  containerStyle,
  inputStyle,
  iconName,
  password,
  keyboardType,
  ...props
}) => {
  const styles = useStyles();
  const [visible, setVisible] = useState(!password);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Input
        placeholder={label}
        value={value}
        onChange={onChange}
        style={[styles.textInput, inputStyle]}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputContainer}
        keyboardType={keyboardType ?? 'default'}
        leftIcon={
          iconName ? (
            <Icon name={iconName} type="material" color="#517fa4" />
          ) : undefined
        }
        rightIcon={
          password ? (
            <Icon
              onPress={toggleVisible}
              name={visible ? 'visibility-off' : 'visibility'}
              type="material"
              color="#517fa4"
            />
          ) : undefined
        }
        secureTextEntry={!visible}
        {...props}
      />
    </View>
  );
};
