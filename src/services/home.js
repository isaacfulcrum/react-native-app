const axios = require('axios');

const userCount = () => {
  return axios.get(`home.php`);
};

export { userCount };
