import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { makeStyles, useTheme } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
  },
});

const defaultPattern = `M0,96L48,112C96,128,192,160,288,
        186.7C384,213,480,235,576,213.3C672,192,768,128,864,
        128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
        176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
        0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
        0,96,0,48,0L0,0Z`;

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

/**
 * @see https://amanhimself.dev/blog/create-custom-headers-with-react-native-svg/
 * @see https://getwaves.io/
 */

export function WavyHeader({
  style,
  height,
  top,
  backgroundColor,
  wavePattern,
}) {
  const styles = useStyles();
  const [dimensions, setDimensions] = useState({ window, screen });
  const { theme } = useTheme();

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });
  return (
    <View style={[styles.root, { width: dimensions.window.width }, style]}>
      <View
        style={{
          backgroundColor: backgroundColor ?? theme.colors.primary,
          height: height ?? 160,
        }}>
        <Svg
          height="60%"
          width={'100%'}
          viewBox="0 0 1440 320"
          style={[styles.root, { top: top ?? 130 }]}>
          <Path
            fill={backgroundColor ?? theme.colors.primary}
            d={wavePattern ?? defaultPattern}
          />
        </Svg>
      </View>
    </View>
  );
}
