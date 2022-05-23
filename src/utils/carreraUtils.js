import AsyncStorage from '@react-native-async-storage/async-storage';

const DISPLAY_USERS_NUM = 3;

const formatLeaderboard = async (runners) => {
  // Validate array
  if (!runners || !Array.isArray(runners)) return [];
  const value = await AsyncStorage.getItem('user');
  if (value === null) return runners;
  const user = JSON.parse(value);

  // Promise
  return new Promise((resolve) => {
    const userPlacement = runners.findIndex((runner) => {
      return runner.id === user.id;
    });
    if (userPlacement === -1 || userPlacement < DISPLAY_USERS_NUM)
      resolve(
        runners.length < DISPLAY_USERS_NUM + 1
          ? runners
          : runners.splice(0, DISPLAY_USERS_NUM),
      );

    resolve(
      runners.length < DISPLAY_USERS_NUM + 1
        ? [...runners, runners[userPlacement]]
        : [...runners.slice(0, DISPLAY_USERS_NUM), runners[userPlacement]],
    );
  });
};

const secondsToHours = (number) => (number / 3600).toFixed(2);

const hoursToSeconds = (number) => (number * 3600).toFixed(2);

export { formatLeaderboard, secondsToHours, hoursToSeconds };
