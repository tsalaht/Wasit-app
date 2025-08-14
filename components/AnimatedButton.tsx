import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { scale as scaleUtils, getResponsiveFontSize } from './ResponsiveUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  icon?: React.ReactNode;
}

export default function AnimatedButton({ title, onPress, style, textStyle, icon }: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    opacity.value = withSequence(
      withSpring(0.8, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    
    setTimeout(() => {
      runOnJS(onPress)();
    }, 100);
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={1}>
        {icon && <Animated.View style={styles.iconContainer}>{icon}</Animated.View>}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleUtils(56),
    paddingHorizontal: scaleUtils(24),
    borderRadius: scaleUtils(12),
    minWidth: SCREEN_WIDTH * 0.4,
    gap: 8,
  },
  iconContainer: {
    marginRight: scaleUtils(8),
  },
  buttonText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#FFFFFF',
  },
});