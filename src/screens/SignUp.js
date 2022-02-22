import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, makeStyles } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from 'app/components/DateTimePicker';

const useStyles = makeStyles({
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
    paddingTop: 16,
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
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const requiredMessage = 'Este campo es requerido';

const signupSchema = Yup.object().shape({
  code: Yup.number('Este campo debe ser código válido').required(
    requiredMessage,
  ),
  name: Yup.string().required(requiredMessage),
  password: Yup.string().required(requiredMessage),
  birthdate: Yup.string().required(requiredMessage),
  campus: Yup.string().required(requiredMessage),
  grade: Yup.number().required(requiredMessage),
  cellphone: Yup.string().required(requiredMessage),
});

export const SignUp = ({ navigation }) => {
  const styles = useStyles();

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      password: '',
      birthdate: '',
      campus: '',
      grade: '',
      cellphone: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <FormView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <TextInput
              label={'Nombre'}
              iconName="face"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <TextInput
              label={'Código'}
              iconName="badge"
              value={formik.values.code}
              onChangeText={formik.handleChange('code')}
              onBlur={formik.handleBlur('code')}
              errorMessage={formik.touched.code && formik.errors.code}
              keyboardType="numeric"
            />
            <TextInput
              label={'Contraseña'}
              iconName="lock"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              errorMessage={formik.touched.password && formik.errors.password}
              password
            />
            <DateTimePicker
              label={'Fecha de nacimiento'}
              value={formik.values.birthdate}
              onChangeText={formik.handleChange('birthdate')}
              onBlur={formik.handleBlur('birthdate')}
              errorMessage={formik.touched.birthdate && formik.errors.birthdate}
            />
            <TextInput
              label={'Escuela'}
              iconName="school"
              value={formik.values.campus}
              onChangeText={formik.handleChange('campus')}
              onBlur={formik.handleBlur('campus')}
              errorMessage={formik.touched.campus && formik.errors.campus}
            />
            <TextInput
              label={'Grado'}
              iconName="grade"
              value={formik.values.grade}
              onChangeText={formik.handleChange('grade')}
              onBlur={formik.handleBlur('grade')}
              errorMessage={formik.touched.grade && formik.errors.grade}
            />
            <TextInput
              label={'Celular'}
              iconName="phone"
              keyboardType="numeric"
              value={formik.values.cellphone}
              onChangeText={formik.handleChange('cellphone')}
              onBlur={formik.handleBlur('cellphone')}
              errorMessage={formik.touched.cellphone && formik.errors.cellphone}
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
      </ScrollView>
    </FormView>
  );
};
