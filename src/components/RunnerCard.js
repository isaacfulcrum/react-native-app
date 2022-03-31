import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, makeStyles } from 'react-native-elements';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginHorizontal: 12,
    height: 90,
    backgroundColor: '#C0C0C0',
    borderColor: '#F7F7F7',
    width: '90%',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 6,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 5,
  },
  badge: {
    backgroundColor: theme.colors.grey3,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 20,
  },
  text: {
    marginLeft: 12,
    fontSize: 22,
  },
}));

export const RunnerCard = ({ avatar, name, placement }) => {
  const styles = useStyles();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{placement}</Text>
      </View>
      <Text style={styles.text}>14.7km</Text>
      <Text style={styles.text}>{name}</Text>
      <Avatar
        rounded
        source={{
          uri: avatar,
        }}
        size="medium"
      />
    </View>
  );
};
