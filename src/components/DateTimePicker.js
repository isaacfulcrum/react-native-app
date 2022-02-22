import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from './TextInput';
import { format } from 'date-fns';
import { View } from 'react-native-animatable';

import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  mainContainer: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  fieldContainer: {
    width: '100%',
  },
});

const DateTimePicker = ({
  label,
  value,
  onChangeText,
  errorMessage,
  mode,
  ...props
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (onChangeText) {
      onChangeText(format(date, 'dd/MM/yyyy'));
    }
  }, [date]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <TextInput
          label={label}
          iconName="event"
          value={value}
          errorMessage={errorMessage}
          containerStyle={styles.fieldContainer}
          containerProps={{ pointerEvents: 'none' }}
          {...props}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        title={label}
        locale="es"
        mode={mode ?? 'date'}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DateTimePicker;
