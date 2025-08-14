import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Download, Plus } from 'lucide-react-native';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedButton from '@/components/AnimatedButton';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'commission' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockWalletTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 8000,
    description: 'إيداع لمعاملة iPhone 14',
    date: 'اليوم الساعة 2:15 م',
    status: 'completed',
  },
  {
    id: '2',
    type: 'commission',
    amount: -425,
    description: 'عمولة بيع هاتف iPhone 14',
    date: 'أمس الساعة 3:45 م',
    status: 'completed',
  },
  {
    id: '3',
    type: 'withdrawal',
    amount: -2000,
    description: 'سحب إلى حساب البنك الأهلي',
    date: 'أمس الساعة 1:20 م',
    status: 'pending',
  },
  {
    id: '4',
    type: 'refund',
    amount: 3200,
    description: 'استرداد من معاملة ملغية',
    date: '2024-01-15 الساعة 9:30 ص',
    status: 'completed',
  },
];

export default function WalletScreen() {
  const [activeBalance] = useState(2450);
  const [pendingBalance] = useState(8000);

  const handleDeposit = () => {
    Alert.alert('إيداع أموال', 'سيتم توجيهك لاختيار طريقة الدفع');
  };

  const handleWithdraw = () => {
    Alert.alert('سحب أموال', 'سيتم توجيهك لاختيار طريقة السحب');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft size={20} color="#10B981" />;
      case 'withdrawal':
        return <ArrowUpRight size={20} color="#EF4444" />;
      case 'commission':
        return <CreditCard size={20} color="#F59E0B" />;
      case 'refund':
        return <Download size={20} color="#3B82F6" />;
      default:
        return <CreditCard size={20} color="#6B7280" />;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return '#10B981';
    return '#EF4444';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'قيد المعالجة';
      case 'failed':
        return 'فاشل';
      default:
        return 'غير محدد';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>المحفظة</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Cards */}
        <View style={styles.balanceSection}>
          <InteractiveCard style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>الرصيد المتاح</Text>
            <Text style={styles.balanceAmount}>{activeBalance.toLocaleString()} ج.م</Text>
            <Text style={styles.balanceDescription}>متاح للسحب فوراً</Text>
          </InteractiveCard>
          
          <InteractiveCard style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>الرصيد المعلق</Text>
            <Text style={[styles.balanceAmount, { color: '#F59E0B' }]}>{pendingBalance.toLocaleString()} ج.م</Text>
            <Text style={styles.balanceDescription}>في معاملات قيد التنفيذ</Text>
          </InteractiveCard>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <AnimatedButton
            title="إيداع أموال"
            onPress={handleDeposit}
            style={styles.actionButton}
            icon={<Plus size={20} color="#FFFFFF" />}
          />
          
          <AnimatedButton
            title="سحب أموال"
            onPress={handleWithdraw}
            style={[styles.actionButton, styles.withdrawButton]}
            textStyle={{ color: '#7EE7FC' }}
            icon={<ArrowUpRight size={20} color="#7EE7FC" />}
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>طرق الدفع والسحب</Text>
          <View style={styles.paymentMethods}>
            <View style={styles.paymentMethod}>
              <CreditCard size={24} color="#A5EEFD" />
              <Text style={styles.paymentMethodText}>فيزا / ماستركارد</Text>
            </View>
            <View style={styles.paymentMethod}>
              <CreditCard size={24} color="#E60012" />
              <Text style={styles.paymentMethodText}>فودافون كاش</Text>
            </View>
            <View style={styles.paymentMethod}>
              <CreditCard size={24} color="#00B04F" />
              <Text style={styles.paymentMethodText}>فوري</Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>سجل المعاملات</Text>
          {mockWalletTransactions.map((transaction) => (
            <InteractiveCard key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionIcon}>
                  {getTransactionIcon(transaction.type)}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                        {getStatusText(transaction.status)}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: getTransactionColor(transaction.type, transaction.amount) }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} ج.م
                </Text>
              </View>
            </InteractiveCard>
          ))}
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
  balanceSection: {
    paddingHorizontal: getResponsivePadding(),
    paddingTop: scale(20),
    gap: scale(16),
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: getCardPadding(),
    borderRadius: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  balanceLabel: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#6B7280',
    textAlign: 'right',
    marginBottom: scale(8),
  },
  balanceAmount: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(28),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(4),
  },
  balanceDescription: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  actionsSection: {
    flexDirection: 'row',
    paddingHorizontal: getResponsivePadding(),
    paddingTop: scale(20),
    gap: scale(12),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#001731',
    height: scale(56),
    paddingHorizontal: scale(20),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
  },
  withdrawButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#001731',
  },
  actionButtonText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: getResponsivePadding(),
    paddingTop: scale(24),
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(16),
  },
  paymentMethods: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  paymentMethodText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    marginLeft: scale(12),
    textAlign: 'right',
    flex: 1,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  transactionIcon: {
    marginRight: scale(12),
    marginTop: scale(2),
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(8),
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(4),
  },
  statusText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(10),
  },
  transactionAmount: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    textAlign: 'left',
  },
});