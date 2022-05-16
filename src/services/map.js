const axios = require('axios');

const userKm = (codigo) => {
  return axios.get(`avance.php?codigo=${codigo}`);
};

export { userKm };
