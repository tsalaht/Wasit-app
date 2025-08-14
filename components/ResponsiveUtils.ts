import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12 Pro as reference)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const scale = (size: number) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  const scale = Math.min(scaleWidth, scaleHeight);
  
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const verticalScale = (size: number) => {
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const isSmallDevice = () => SCREEN_WIDTH < 375;
export const isMediumDevice = () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = () => SCREEN_WIDTH >= 414;

export const getResponsivePadding = () => {
  if (isSmallDevice()) return 12;
  if (isMediumDevice()) return 16;
  return 20;
};

export const getResponsiveFontSize = (baseSize: number) => {
  if (isSmallDevice()) return baseSize - 2;
  if (isLargeDevice()) return baseSize + 2;
  return baseSize;
};



export const getCardPadding = () => {
  if (isSmallDevice()) return 16;
  if (isMediumDevice()) return 20;
  return 24;
};