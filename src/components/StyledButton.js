import React from 'react';
import { Button, makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  mainContainer: {
    marginVertical: 10,
    width: '90%',
    borderRadius: 12,
  },
  button: {
    height: 50,
    borderRadius: 12,
  },
});

export const StyledButton = ({ title, containerStyle, style, ...props }) => {
  const styles = useStyles();
  return (
    <Button
      containerStyle={[styles.mainContainer, containerStyle]}
      buttonStyle={[styles.button, style]}
      title={title}
      raised
      {...props}
    />
  );
};
