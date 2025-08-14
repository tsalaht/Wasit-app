import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, CreditCard, Package, Filter } from 'lucide-react-native';
import InteractiveCard from '@/components/InteractiveCard';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

interface Notification {
  id: string;
  type: 'transaction' | 'payment' | 'dispute' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'تأكيد استلام مطلوب',
    message: 'قام البائع بتسليم المنتج "لابتوب Dell". يرجى مراجعة المنتج وتأكيد الاستلام.',
    time: 'منذ 5 دقائق',
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'payment',
    title: 'تم إيداع المبلغ',
    message: 'تم إيداع مبلغ 8,500 ج.م بنجاح في محفظتك.',
    time: 'منذ ساعة',
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'transaction',
    title: 'معاملة جديدة',
    message: 'تم بدء معاملة جديدة من المشتري محمد علي لشراء هاتف iPhone 14.',
    time: 'منذ 3 ساعات',
    read: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'dispute',
    title: 'نزاع قيد المراجعة',
    message: 'تم فتح نزاع على معاملة "خدمة تصميم موقع". فريق الدعم سيقوم بالمراجعة خلال 24 ساعة.',
    time: 'أمس',
    read: true,
    priority: 'high',
  },
  {
    id: '5',
    type: 'system',
    title: 'تحديث التطبيق',
    message: 'يتوفر إصدار جديد من التطبيق مع ميزات محسنة وإصلاحات أمنية.',
    time: 'أمس',
    read: true,
    priority: 'low',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string, priority: string) => {
    const color = priority === 'high' ? '#EF4444' : priority === 'medium' ? '#F59E0B' : '#A5EEFD';
    
    switch (type) {
      case 'transaction':
        return <Package size={20} color={color} />;
      case 'payment':
        return <CreditCard size={20} color={color} />;
      case 'dispute':
        return <AlertTriangle size={20} color={color} />;
      case 'system':
        return <Bell size={20} color={color} />;
      default:
        return <Bell size={20} color={color} />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الإشعارات</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter(filter === 'all' ? 'unread' : 'all')}>
            <Filter size={20} color="#A5EEFD" />
          </TouchableOpacity>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markAllText}>قراءة الكل</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, filter === 'all' && styles.activeTab]}
          onPress={() => setFilter('all')}>
          <Text style={[styles.tabText, filter === 'all' && styles.activeTabText]}>
            جميع الإشعارات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filter === 'unread' && styles.activeTab]}
          onPress={() => setFilter('unread')}>
          <Text style={[styles.tabText, filter === 'unread' && styles.activeTabText]}>
            غير مقروءة ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>لا توجد إشعارات</Text>
          </View>
        ) : (
          filteredNotifications.map((notification) => (
            <InteractiveCard
              key={notification.id}
              onPress={() => markAsRead(notification.id)}>
              <View style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard,
                styles.notificationHeader
              ]}>
                <View style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type, notification.priority)}
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
              </View>
            </InteractiveCard>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsivePadding(),
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#001731',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
  },
  filterButton: {
    padding: scale(8),
  },
  markAllText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(14),
    color: '#001731',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: getResponsivePadding(),
    paddingBottom: scale(16),
  },
  tab: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginHorizontal: scale(4),
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#001731',
  },
  tabText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(14),
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: getResponsivePadding(),
    paddingTop: scale(16),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
  },
  emptyStateText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(16),
    color: '#9CA3AF',
    marginTop: scale(16),
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
  },
  unreadCard: {
    borderRightWidth: 4,
    borderRightColor: '#001731',
  },
  notificationHeader: {
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'flex-start',
  },
  notificationIcon: {
    marginRight: scale(12),
    marginTop: scale(2),
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(4),
  },
  notificationMessage: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#4B5563',
    textAlign: 'right',
    lineHeight: scale(20),
    marginBottom: scale(8),
  },
  notificationTime: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  unreadDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#001731',
    marginLeft: scale(8),
    marginTop: scale(8),
  },
});