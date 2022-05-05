const { PermissionsAndroid, DevSettings } = require('react-native');

const location = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Permiso de ubicación',
      message:
        'Esta app requiere acceso a tu ubicación en tiempo real para desplegarla el mapa correctamente',
      buttonNeutral: 'Preguntarme más tarde',
      buttonNegative: 'Cancelar',
      buttonPositive: 'Aceptar',
    },
  )
    .then((granted) => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DevSettings.reload();
      }
    })
    .catch(console.e);
};

export { location };
