const axios = require('axios');

const login = (username, password) => {
  return axios.get(
    `https://ablatival-pools.000webhostapp.com/Temporal.php?login=${username}&password=${password}`,
  );
};

export { login };
