import { Tabs } from 'expo-router';
import AnimatedTabBar from '@/components/AnimatedTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'الوساطات',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'المحفظة',
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'الإشعارات',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'البروفايل',
        }}
      />
    </Tabs>
  );
}