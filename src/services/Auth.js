import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

const login = (username, password) => {
  return axios.get(`login.php?codigo=${username}&password=${password}`);
};

const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const signup = (data) => {
  const { name, code, email, password, campus, grade, cellphone } = data;

  let url = `registro.php?`;
  url += `nombre=${name}&`;
  url += `codigo=${code}&`;
  url += `correo=${email}&`;
  url += `password=${password}&`;
  url += `centro=${campus}&`;
  url += `semestre=${grade}&`;
  url += `telefono=${cellphone}`;

  return axios.get(url);
};

export { login, logout, signup };
