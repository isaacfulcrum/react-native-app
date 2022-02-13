import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { BRAND_HORIZONTAL } from 'app/assets/images';
import { Divider, makeStyles } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { WavyHeader } from 'app/components/WavyHeader';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    height: 200,
  },
  logo: {
    height: 120,
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

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Se requiere un usuario'),
  password: Yup.string().required('Se requiere una contraseña'),
});

export const SignUp = ({ navigation }) => {
  const styles = useStyles();
  const formHeight = Dimensions.get('window').height - 200;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <FormView>
      <View style={styles.mainContainer}>
        <WavyHeader height={180} top={150} backgroundColor={'#254559'} />
        <View style={styles.headerContainer}>
          <Image source={BRAND_HORIZONTAL} style={styles.logo} />
        </View>
        <View style={[styles.formContainer, { height: formHeight }]}>
          <TextInput
            label={'Usuario'}
            iconName="account-circle"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            errorMessage={formik.errors.username}
          />
          <TextInput
            label={'Contraseña'}
            iconName="lock"
            password
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            errorMessage={formik.errors.password}
          />
          <StyledButton title={'REGÍSTRATE'} onPress={formik.handleSubmit} />
          <Divider orientation="horizontal" subHeader="o" />
          <StyledButton
            title={'INICIAR SESIÓN'}
            type="outline"
            onPress={navigateLogin}
          />
        </View>
      </View>
    </FormView>
  );
};
