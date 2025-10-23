import {Dimensions, PixelRatio, Platform} from 'react-native';

let screenData = Dimensions.get('window');

export const breakpoints = {
  small: 350,
  medium: 400,
  large: 500,
  tablet: 768,
  desktop: 1024,
};

export const getDeviceType = () => {
  const {width} = screenData;
  if (width < breakpoints.small) return 'small';
  if (width < breakpoints.medium) return 'medium';
  if (width < breakpoints.large) return 'large';
  if (width < breakpoints.tablet) return 'tablet';
  return 'desktop';
};

export const wp = (percentage) => {
  const value = (percentage * screenData.width) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const hp = (percentage) => {
  const value = (percentage * screenData.height) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const rf = (size) => {
  const scale = screenData.width / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const getGridColumns = () => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'small': return 1;
    case 'medium': return 2;
    case 'large': return 2;
    case 'tablet': return 3;
    default: return 4;
  }
};

export const updateScreenData = () => {
  screenData = Dimensions.get('window');
};

export const listenForOrientationChange = (callback) => {
  const subscription = Dimensions.addEventListener('change', () => {
    updateScreenData();
    callback();
  });
  return subscription;
};

export const spacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('4%'),
  lg: wp('6%'),
  xl: wp('8%'),
};

export const typography = {
  h1: rf(28),
  h2: rf(24),
  h3: rf(20),
  h4: rf(18),
  body: rf(16),
  caption: rf(14),
  small: rf(12),
};

export const isTablet = () => {
  return getDeviceType() === 'tablet' || getDeviceType() === 'desktop';
};

export const getAdaptivePadding = () => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'small': return spacing.md;
    case 'medium': return spacing.md;
    case 'large': return spacing.lg;
    default: return spacing.xl;
  }
};