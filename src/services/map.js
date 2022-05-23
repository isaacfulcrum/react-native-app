const axios = require('axios');

const userKm = (codigo) => {
  return axios.get(`avance.php?codigo=${codigo}`);
};

const save = (codigo, km, hours) => {
  return axios.get(
    `guardar.php?codigo=${codigo}&kilometros=${km}&horas=${hours}`,
  );
};

export { userKm, save };
