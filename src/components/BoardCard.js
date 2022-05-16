/* eslint-disable react-native/no-raw-text */
import React, { useMemo } from 'react';
import { ListItem, Avatar, makeStyles } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '90%',
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: theme.colors.grey3,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
}));

export const BoardCard = ({ avatar, name, placement, vel }) => {
  const styles = useStyles();
  const color = useMemo(() => {
    switch (placement) {
      case 1:
        return ['#8C5E08', '#F2C029'];
      case 2:
        return ['#808080', '#D3D3D3'];
      case 3:
        return ['#733b03', '#CD7F32'];
      default:
        return ['#254559', '#ADD8E6'];
    }
  }, []);

  return (
    <ListItem
      containerStyle={styles.mainContainer}
      Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} //
      linearGradientProps={{
        colors: color,
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient} // Only if no expo
    >
      <Avatar rounded size="medium" source={{ uri: avatar }} />
      <ListItem.Content>
        <ListItem.Title style={styles.text}>
          {placement + '° '}
          {name}
        </ListItem.Title>
        {!isNaN(vel) && (
          <ListItem.Subtitle style={styles.subtitle}>{`${vel.toFixed(
            2,
          )}`}</ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};
