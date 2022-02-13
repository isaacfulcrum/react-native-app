import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { makeStyles } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
});

export const FormView = ({ style, children }) => {
  const styles = useStyles();
  return (
    <SafeAreaView>
      <View style={[styles.root, style]}>
        <KeyboardAvoidingView style={styles.view} behavior="padding" enabled>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
