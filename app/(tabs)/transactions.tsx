import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Package, CreditCard } from 'lucide-react-native';
import InteractiveCard from '@/components/InteractiveCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

type TransactionStatus = 'pending' | 'delivered' | 'confirmed' | 'completed' | 'dispute';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  type: 'buy' | 'sell';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'بيع هاتف iPhone 14',
    amount: 8500,
    status: 'completed',
    date: 'أمس الساعة 3:45 م',
    type: 'sell',
  },
  {
    id: '2',
    title: 'شراء لابتوب Dell',
    amount: 12000,
    status: 'delivered',
    date: 'اليوم الساعة 10:30 ص',
    type: 'buy',
  },
  {
    id: '3',
    title: 'خدمة تصميم موقع',
    amount: 3200,
    status: 'dispute',
    date: 'أمس الساعة 11:20 ص',
    type: 'buy',
  },
  {
    id: '4',
    title: 'بيع ساعة Apple Watch',
    amount: 4500,
    status: 'pending',
    date: 'اليوم الساعة 2:15 م',
    type: 'sell',
  },
];

export default function TransactionsScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'buying' | 'selling'>('all');

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color="#F59E0B" />;
      case 'delivered':
        return <Package size={20} color="#3B82F6" />;
      case 'confirmed':
      case 'completed':
        return <CheckCircle size={20} color="#10B981" />;
      case 'dispute':
        return <AlertTriangle size={20} color="#EF4444" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  const getStatusText = (status: TransactionStatus) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'delivered':
        return 'تم التسليم - بانتظار التأكيد';
      case 'confirmed':
        return 'تم التأكيد';
      case 'completed':
        return 'تم إتمام الصفقة';
      case 'dispute':
        return 'في نزاع - جاري المراجعة';
      default:
        return 'غير محدد';
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'delivered':
        return '#3B82F6';
      case 'confirmed':
      case 'completed':
        return '#10B981';
      case 'dispute':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'buying') return transaction.type === 'buy';
    if (activeTab === 'selling') return transaction.type === 'sell';
    return true;
  });

  const handleTransactionAction = (transaction: Transaction) => {
    if (transaction.status === 'delivered' && transaction.type === 'buy') {
      Alert.alert(
        'تأكيد الاستلام',
        'هل تؤكد أنك استلمت المنتج/الخدمة وأنك راضٍ عنها؟',
        [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'تأكيد الاستلام', onPress: () => Alert.alert('تم', 'تم تأكيد الاستلام بنجاح') }
        ]
      );
    } else if (transaction.status === 'pending' && transaction.type === 'sell') {
      Alert.alert('تسليم المنتج', 'يرجى رفع الملفات أو تحديد طريقة التسليم');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FloatingActionButton onPress={() => {}} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>وساطاتي</Text>
        <TouchableOpacity style={styles.newButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}>
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            الكل
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'buying' && styles.activeTab]}
          onPress={() => setActiveTab('buying')}>
          <Text style={[styles.tabText, activeTab === 'buying' && styles.activeTabText]}>
            مشترياتي
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'selling' && styles.activeTab]}
          onPress={() => setActiveTab('selling')}>
          <Text style={[styles.tabText, activeTab === 'selling' && styles.activeTabText]}>
            مبيعاتي
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {filteredTransactions.map((transaction) => (
          <InteractiveCard
            key={transaction.id}
            onPress={() => handleTransactionAction(transaction)}>
            <View style={[styles.transactionCard, styles.transactionHeader]}>
              <View style={styles.statusIcon}>
                {getStatusIcon(transaction.status)}
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={[styles.transactionStatus, { color: getStatusColor(transaction.status) }]}>
                  {getStatusText(transaction.status)}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.amountText}>{transaction.amount.toLocaleString()} ج.م</Text>
                <View style={[styles.typeIndicator, transaction.type === 'buy' ? styles.buyIndicator : styles.sellIndicator]}>
                  <Text style={styles.typeText}>
                    {transaction.type === 'buy' ? 'شراء' : 'بيع'}
                  </Text>
                </View>
              </View>
            </View>
          </InteractiveCard>
        ))}
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
  newButton: {
    backgroundColor: '#001731',
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
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
  transactionsList: {
    flex: 1,
    paddingHorizontal: getResponsivePadding(),
    paddingTop: scale(16),
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
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusIcon: {
    marginRight: scale(12),
    marginTop: scale(2),
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(4),
  },
  transactionStatus: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    textAlign: 'right',
    marginBottom: scale(4),
  },
  transactionDate: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#9CA3AF',
    textAlign: 'right',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    marginBottom: scale(4),
  },
  typeIndicator: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(4),
  },
  buyIndicator: {
    backgroundColor: '#FEF3C7',
  },
  sellIndicator: {
    backgroundColor: '#D1FAE5',
  },
  typeText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(10),
    color: '#001731',
  },
});