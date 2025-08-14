import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calculator, CreditCard, TrendingUp, CircleCheck as CheckCircle, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedButton from '@/components/AnimatedButton';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

export default function CommissionScreen() {
  const [amount, setAmount] = useState('');
  const [calculatedCommission, setCalculatedCommission] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  const calculateCommission = (value: string) => {
    const numValue = parseFloat(value) || 0;
    let commission = 0;
    
    if (numValue < 600) {
      commission = 50;
    } else {
      commission = numValue * 0.10;
    }
    
    setCalculatedCommission(commission);
    setNetAmount(numValue - commission);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    calculateCommission(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>هيكل العمولة</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <InteractiveCard style={styles.introCard}>
          <View style={styles.introHeader}>
            <TrendingUp size={32} color="#001731" />
            <Text style={styles.introTitle}>عمولة وسيط مصر</Text>
          </View>
          <Text style={styles.introText}>
            نحن نتقاضى عمولة بسيطة مقابل ضمان أمان معاملاتك وحماية أموالك
          </Text>
        </InteractiveCard>

        {/* Commission Structure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>هيكل العمولة</Text>
          
          {/* Under 600 EGP */}
          <InteractiveCard style={styles.commissionCard}>
            <View style={styles.commissionHeader}>
              <View style={styles.amountRange}>
                <Text style={styles.rangeText}>أقل من 600 ج.م</Text>
              </View>
              <View style={styles.commissionBadge}>
                <Text style={styles.commissionText}>50 ج.م فقط</Text>
              </View>
            </View>
            <View style={styles.commissionDetails}>
              <View style={styles.detailRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.detailText}>عمولة ثابتة للمعاملات الصغيرة</Text>
              </View>
              <View style={styles.detailRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.detailText}>مناسبة للمنتجات منخفضة القيمة</Text>
              </View>
            </View>
          </InteractiveCard>

          {/* Over 600 EGP */}
          <InteractiveCard style={styles.commissionCard}>
            <View style={styles.commissionHeader}>
              <View style={styles.amountRange}>
                <Text style={styles.rangeText}>600 ج.م فأكثر</Text>
              </View>
              <View style={[styles.commissionBadge, styles.percentageBadge]}>
                <Text style={styles.commissionText}>10% من المبلغ</Text>
              </View>
            </View>
            <View style={styles.commissionDetails}>
              <View style={styles.detailRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.detailText}>عمولة متناسبة مع قيمة المعاملة</Text>
              </View>
              <View style={styles.detailRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.detailText}>حماية أكبر للمعاملات الكبيرة</Text>
              </View>
            </View>
          </InteractiveCard>
        </View>

        {/* Calculator */}
        <InteractiveCard style={styles.calculatorSection}>
          <View style={styles.calculatorHeader}>
            <Calculator size={24} color="#001731" />
            <Text style={styles.calculatorTitle}>احسب العمولة</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>مبلغ المعاملة (بالجنيه المصري)</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="أدخل المبلغ"
              keyboardType="numeric"
              textAlign="center"
            />
          </View>

          {amount && parseFloat(amount) > 0 && (
            <View style={styles.calculationResult}>
              <View style={styles.resultCard}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>المبلغ الأساسي:</Text>
                  <Text style={styles.resultValue}>{parseFloat(amount).toLocaleString()} ج.م</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>العمولة:</Text>
                  <Text style={[styles.resultValue, styles.commissionValue]}>
                    {calculatedCommission.toLocaleString()} ج.م
                  </Text>
                </View>
                <View style={[styles.resultRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>صافي المبلغ للبائع:</Text>
                  <Text style={styles.totalValue}>
                    {netAmount.toLocaleString()} ج.م
                  </Text>
                </View>
              </View>
            </View>
          )}
        </InteractiveCard>

        {/* What's Included */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={24} color="#001731" />
            <Text style={styles.sectionTitle}>ماذا تشمل العمولة؟</Text>
          </View>
          <View style={styles.includesList}>
            <View style={styles.includeItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.includeText}>حفظ الأموال بأمان حتى إتمام المعاملة</Text>
            </View>
            <View style={styles.includeItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.includeText}>التحقق من صحة المعاملات</Text>
            </View>
            <View style={styles.includeItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.includeText}>حل النزاعات والمشاكل</Text>
            </View>
            <View style={styles.includeItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.includeText}>الدعم الفني على مدار الساعة</Text>
            </View>
            <View style={styles.includeItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.includeText}>ضمان استرداد الأموال في حالة النصب</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Important Notes */}
        <InteractiveCard style={styles.notesSection}>
          <View style={styles.notesHeader}>
            <Info size={24} color="#F59E0B" />
            <Text style={styles.notesTitle}>ملاحظات مهمة</Text>
          </View>
          <View style={styles.notesList}>
            <Text style={styles.noteText}>
              • يتم خصم العمولة فقط عند إتمام المعاملة بنجاح
            </Text>
            <Text style={styles.noteText}>
              • في حالة إلغاء المعاملة، لا يتم خصم أي عمولة
            </Text>
            <Text style={styles.noteText}>
              • العمولة تشمل جميع الخدمات والضمانات المذكورة
            </Text>
            <Text style={styles.noteText}>
              • لا توجد رسوم خفية أو إضافية
            </Text>
          </View>
        </InteractiveCard>

        {/* Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أمثلة توضيحية</Text>
          
          <InteractiveCard style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>مثال 1: بيع هاتف بقيمة 400 ج.م</Text>
            <View style={styles.exampleCalculation}>
              <Text style={styles.exampleText}>المبلغ: 400 ج.م</Text>
              <Text style={styles.exampleText}>العمولة: 50 ج.م (ثابتة)</Text>
              <Text style={styles.exampleResult}>صافي المبلغ: 350 ج.م</Text>
            </View>
          </InteractiveCard>

          <InteractiveCard style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>مثال 2: بيع لابتوب بقيمة 8000 ج.م</Text>
            <View style={styles.exampleCalculation}>
              <Text style={styles.exampleText}>المبلغ: 8000 ج.م</Text>
              <Text style={styles.exampleText}>العمولة: 800 ج.م (10%)</Text>
              <Text style={styles.exampleResult}>صافي المبلغ: 7200 ج.م</Text>
            </View>
          </InteractiveCard>
        </View>

        <View style={styles.bottomSpacing} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: getResponsivePadding(),
    backgroundColor: '#001731',
  },
  headerTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  introCard: {
    backgroundColor: '#001731',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(20),
    alignItems: 'center',
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: scale(16),
    gap: scale(12),
  },
  introTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#FFFFFF',
  },
  introText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(16),
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: scale(24),
  },
  section: {
    margin: scale(16),
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#001731',
    textAlign: 'center',
    marginBottom: scale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    gap: scale(8),
  },
  commissionCard: {
    backgroundColor: '#FFFFFF',
    padding: getCardPadding(),
    borderRadius: scale(16),
    marginBottom: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
    borderWidth: 2,
    borderColor: '#001731',
  },
  commissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  amountRange: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  rangeText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
  },
  commissionBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  percentageBadge: {
    backgroundColor: '#F59E0B',
  },
  commissionText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(14),
    color: '#FFFFFF',
  },
  commissionDetails: {
    gap: scale(8),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: scale(8),
  },
  detailText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(14),
    color: '#374151',
    textAlign: 'right',
    flex: 1,
  },
  calculatorSection: {
    backgroundColor: '#F8FAFC',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: '#001731',
  },
  calculatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(20),
    gap: scale(8),
  },
  calculatorTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#001731',
  },
  inputGroup: {
    marginBottom: scale(20),
  },
  inputLabel: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#374151',
    textAlign: 'center',
    marginBottom: scale(12),
  },
  amountInput: {
    borderWidth: 2,
    borderColor: '#001731',
    borderRadius: scale(16),
    padding: scale(20),
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    color: '#001731',
  },
  calculationResult: {
    marginTop: scale(20),
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: scale(20),
    borderRadius: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  resultLabel: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
  },
  resultValue: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
  },
  commissionValue: {
    color: '#EF4444',
  },
  totalRow: {
    paddingTop: scale(12),
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    marginTop: scale(8),
  },
  totalLabel: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
  },
  totalValue: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(20),
    color: '#10B981',
  },
  includesList: {
    gap: scale(16),
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: scale(12),
  },
  includeText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(16),
    color: '#374151',
    textAlign: 'right',
    flex: 1,
    lineHeight: scale(24),
  },
  notesSection: {
    backgroundColor: '#FEF3C7',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(16),
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    gap: scale(8),
  },
  notesTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#F59E0B',
  },
  notesList: {
    gap: scale(12),
  },
  noteText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(14),
    color: '#92400E',
    textAlign: 'right',
    lineHeight: scale(22),
  },
  exampleCard: {
    backgroundColor: '#FFFFFF',
    padding: getCardPadding(),
    borderRadius: scale(16),
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 2,
    borderRightWidth: 4,
    borderRightColor: '#001731',
  },
  exampleTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(12),
  },
  exampleCalculation: {
    gap: scale(8),
  },
  exampleText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(14),
    color: '#6B7280',
    textAlign: 'right',
  },
  exampleResult: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#10B981',
    textAlign: 'right',
    marginTop: scale(8),
  },
  bottomSpacing: {
    height: scale(40),
  },
});