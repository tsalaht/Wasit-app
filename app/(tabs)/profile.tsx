import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Star, Shield, Settings, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, ChevronRight, Award, TrendingUp, CreditCard, FileText, RefreshCw } from 'lucide-react-native';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedButton from '@/components/AnimatedButton';
import { router } from 'expo-router';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

export default function ProfileScreen() {
  const handleEditProfile = () => {
    Alert.alert('تعديل البروفايل', 'سيتم فتح صفحة تعديل البيانات الشخصية');
  };

  const handleSettings = () => {
    Alert.alert('الإعدادات', 'سيتم فتح صفحة الإعدادات');
  };

  const handleHelp = () => {
    Alert.alert('المساعدة', 'سيتم فتح صفحة المساعدة والأسئلة الشائعة');
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تسجيل الخروج', style: 'destructive', onPress: () => Alert.alert('تم', 'تم تسجيل الخروج بنجاح') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>البروفايل</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Edit size={20} color="#7EE7FC" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <InteractiveCard style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>أ.م</Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>أحمد محمد علي</Text>
                <View style={styles.verifiedBadge}>
                  <Shield size={16} color="#10B981" />
                  <Text style={styles.verifiedText}>موثوق</Text>
                </View>
              </View>
              <Text style={styles.userEmail}>ahmed.mohamed@example.com</Text>
              <Text style={styles.joinDate}>عضو منذ يناير 2024</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              <Star size={24} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingScore}>4.8</Text>
              <Text style={styles.ratingText}>من 5 نجوم</Text>
            </View>
            <Text style={styles.reviewsCount}>47 تقييم</Text>
          </View>
        </InteractiveCard>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>إحصائياتك</Text>
          <View style={styles.statsGrid}>
            <InteractiveCard style={styles.statItem}>
              <View style={styles.statIcon}>
                <TrendingUp size={20} color="#A5EEFD" />
              </View>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>معاملة مكتملة</Text>
            </InteractiveCard>
            
            <InteractiveCard style={styles.statItem}>
              <View style={styles.statIcon}>
                <Award size={20} color="#10B981" />
              </View>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>معدل النجاح</Text>
            </InteractiveCard>
            
            <InteractiveCard style={styles.statItem}>
              <View style={styles.statIcon}>
                <Star size={20} color="#7EE7FC" />
              </View>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>التقييم العام</Text>
            </InteractiveCard>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>إعدادات الحساب</Text>
          
          <InteractiveCard style={styles.menuItem} onPress={handleSettings}>
            <View style={styles.menuItemContent}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الإعدادات العامة</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الأمان والخصوصية</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem} onPress={() => router.push('/privacy-policy')}>
            <View style={styles.menuItemContent}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>سياسة الخصوصية</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem} onPress={() => router.push('/terms-conditions')}>
            <View style={styles.menuItemContent}>
              <FileText size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الشروط والأحكام</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem} onPress={() => router.push('/refund-policy')}>
            <View style={styles.menuItemContent}>
              <RefreshCw size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>سياسة الاسترداد</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem} onPress={() => router.push('/commission')}>
            <View style={styles.menuItemContent}>
              <TrendingUp size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>هيكل العمولة</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <CreditCard size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>طرق الدفع</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>

          <InteractiveCard style={styles.menuItem} onPress={handleHelp}>
            <View style={styles.menuItemContent}>
              <HelpCircle size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>المساعدة والدعم</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </InteractiveCard>
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <AnimatedButton
            title="تسجيل الخروج"
            onPress={handleLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
            icon={<LogOut size={20} color="#EF4444" />}
          />
        </View>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: getResponsivePadding(),
    padding: getCardPadding(),
    borderRadius: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: '#001731',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  avatarText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: scale(4),
  },
  userName: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#001731',
    textAlign: 'right',
    marginRight: scale(8),
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(12),
    gap: scale(4),
  },
  verifiedText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(10),
    color: '#10B981',
  },
  userEmail: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#6B7280',
    textAlign: 'right',
    marginBottom: scale(4),
  },
  joinDate: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  ratingSection: {
    alignItems: 'center',
    paddingTop: scale(20),
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(4),
  },
  ratingScore: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#001731',
  },
  ratingText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
  },
  reviewsCount: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#9CA3AF',
  },
  statsSection: {
    paddingHorizontal: getResponsivePadding(),
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(16),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    padding: scale(16),
    borderRadius: scale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
  },
  statIcon: {
    marginBottom: scale(8),
  },
  statNumber: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#001731',
    marginBottom: scale(4),
  },
  statLabel: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#6B7280',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: getResponsivePadding(),
    marginBottom: scale(24),
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    marginLeft: scale(12),
    textAlign: 'right',
    flex: 1,
  },
  logoutSection: {
    paddingHorizontal: getResponsivePadding(),
    paddingBottom: scale(40),
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(56),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: scale(8),
  },
  logoutText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#EF4444',
  },
});