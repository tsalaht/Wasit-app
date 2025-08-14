import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Chrome as Home, CreditCard, Wallet, Bell, User } from 'lucide-react-native';
import { scale, getResponsiveFontSize, isSmallDevice } from './ResponsiveUtils';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function AnimatedTabBar({ state, descriptors, navigation }: TabBarProps) {
  const getIcon = (routeName: string, focused: boolean) => {
    const color = focused ? '#001731' : '#9CA3AF';
    const size = isSmallDevice() ? 20 : 22;

    switch (routeName) {
      case 'index':
        return <Home size={size} color={color} />;
      case 'transactions':
        return <CreditCard size={size} color={color} />;
      case 'wallet':
        return <Wallet size={size} color={color} />;
      case 'notifications':
        return <Bell size={size} color={color} />;
      case 'profile':
        return <User size={size} color={color} />;
      default:
        return <Home size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}>
            {getIcon(route.name, isFocused)}
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: scale(60),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
  },
  label: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(10),
    color: '#9CA3AF',
    marginTop: scale(4),
  },
  activeLabel: {
    fontFamily: 'Tajawal-Medium',
    color: '#001731',
  },
});