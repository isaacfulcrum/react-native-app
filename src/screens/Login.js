import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { BRAND } from 'app/assets/images';
import { Divider, makeStyles } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { WavyHeader } from 'app/components/WavyHeader';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';

const useStyles = makeStyles({
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 400,
  },
  logo: {
    height: 300,
    resizeMode: 'contain',
  },
  formContainer: {
    height: Dimensions.get('window').height - 400,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
});

export const Login = () => {
  const styles = useStyles();
  const formHeight = Dimensions.get('window').height - 400;
  return (
    <FormView>
      <View style={styles.mainContainer}>
        <WavyHeader height={350} top={270} backgroundColor={'#04cdfe'} />
        <View style={styles.headerContainer}>
          <Image source={BRAND} style={styles.logo} />
        </View>
        <View style={[styles.formContainer, { height: formHeight }]}>
          <TextInput label={'Usuario'} iconName="account-circle" />
          <TextInput label={'Contraseña'} iconName="lock" password />
          <StyledButton title={'INICIAR SESIÓN'} />
          <Divider orientation="horizontal" subHeader="o" />
          <StyledButton title={'REGÍSTRATE'} />
        </View>
      </View>
    </FormView>
  );
};
