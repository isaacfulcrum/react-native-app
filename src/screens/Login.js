import React, { useContext } from 'react';
import { Image, View, Dimensions, Alert } from 'react-native';
import { BRAND } from 'app/assets/images';
import { Divider, makeStyles, useTheme } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { WavyHeader } from 'app/components/WavyHeader';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';
import { useFormik } from 'formik';
import { login } from 'app/services/auth';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes, MarathonContext } from 'app/context';

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
    height: 390,
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

export const Login = ({ navigation }) => {
  const styles = useStyles();
  const formHeight = Dimensions.get('window').height - 400;
  const { theme } = useTheme();
  const { dispatch } = useContext(MarathonContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await login(values.username, values.password)
        .then(async ({ data }) => {
          if (data?.codigo) {
            const jsonValues = JSON.stringify(data);
            await AsyncStorage.setItem('user', jsonValues);
            navigateHome();
          } else if (data === 2) {
            Alert.alert('Oops...', 'Credenciales incorrectas');
          } else if (data === 0) {
            Alert.alert('Oops...', 'Presiona continuar para registrarte', [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Continuar',
                onPress: navigateSignUp,
              },
            ]);
          }
        })
        .catch(console.error);
    },
  });

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateHome = () => {
    dispatch({ type: actionTypes.login });
  };

  return (
    <FormView>
      <View style={styles.mainContainer}>
        <WavyHeader
          height={350}
          top={270}
          backgroundColor={theme.colors.secondary}
        />
        <View style={styles.headerContainer}>
          <Image source={BRAND} style={styles.logo} />
        </View>
        <View style={[styles.formContainer, { height: formHeight }]}>
          <TextInput
            label="Código"
            iconName="badge"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            errorMessage={formik.touched.username && formik.errors.username}
            keyboardType="numeric"
          />
          <TextInput
            label="Contraseña"
            iconName="lock"
            password
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <StyledButton
            title={'INICIAR SESIÓN'}
            onPress={formik.handleSubmit}
          />
          <Divider orientation="horizontal" subHeader="o" />
          <StyledButton
            title={'REGÍSTRATE'}
            onPress={navigateSignUp}
            type="outline"
          />
        </View>
      </View>
    </FormView>
  );
};
