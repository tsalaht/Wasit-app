import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
import { scale } from './ResponsiveUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FloatingActionButtonProps {
  onPress: () => void;
}

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.8, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    rotation.value = withSequence(
      withTiming(15, { duration: 100 }),
      withTiming(-15, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
    onPress();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
        <Plus size={28} color="#FFFFFF" strokeWidth={3} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: scale(90),
    right: scale(20),
    zIndex: 1000,
  },
  button: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#001731',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#001731',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.4,
    shadowRadius: scale(12),
    elevation: 8,
  },
});