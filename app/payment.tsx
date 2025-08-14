import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Smartphone, Building, Shield, Lock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedButton from '@/components/AnimatedButton';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding } from '@/components/ResponsiveUtils';

type PaymentMethod = 'card' | 'vodafone' | 'fawry' | 'bank';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [amount] = useState(8500);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cardScale = useSharedValue(1);
  const vodafoneScale = useSharedValue(1);
  const fawryScale = useSharedValue(1);
  const bankScale = useSharedValue(1);

  const getScaleForMethod = (method: PaymentMethod) => {
    switch (method) {
      case 'card': return cardScale;
      case 'vodafone': return vodafoneScale;
      case 'fawry': return fawryScale;
      case 'bank': return bankScale;
    }
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const animatedVodafoneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: vodafoneScale.value }],
  }));

  const animatedFawryStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fawryScale.value }],
  }));

  const animatedBankStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bankScale.value }],
  }));

  const selectPaymentMethod = (method: PaymentMethod) => {
    // Reset all scales
    cardScale.value = withSpring(1);
    vodafoneScale.value = withSpring(1);
    fawryScale.value = withSpring(1);
    bankScale.value = withSpring(1);

    // Scale selected method
    const selectedScale = getScaleForMethod(method);
    selectedScale.value = withSpring(1.05);

    setSelectedMethod(method);
  };

  const handlePayment = () => {
    if (selectedMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      Alert.alert('خطأ', 'يرجى ملء جميع بيانات البطاقة');
      return;
    }
    if ((selectedMethod === 'vodafone' || selectedMethod === 'fawry') && !phoneNumber) {
      Alert.alert('خطأ', 'يرجى إدخال رقم الهاتف');
      return;
    }

    Alert.alert(
      'تأكيد الدفع',
      `سيتم خصم مبلغ ${amount.toLocaleString()} ج.م من ${getPaymentMethodName(selectedMethod)}`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد الدفع', 
          onPress: () => {
            Alert.alert('نجح الدفع', 'تم الدفع بنجاح وتم إيداع المبلغ في محفظة التطبيق');
            router.back();
          }
        }
      ]
    );
  };

  const getPaymentMethodName = (method: PaymentMethod) => {
    switch (method) {
      case 'card': return 'البطاقة الائتمانية';
      case 'vodafone': return 'فودافون كاش';
      case 'fawry': return 'فوري';
      case 'bank': return 'التحويل البنكي';
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الدفع الآمن</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Summary */}
        <InteractiveCard style={styles.amountCard}>
          <View style={styles.amountHeader}>
            <Shield size={24} color="#10B981" />
            <Text style={styles.amountTitle}>ملخص المبلغ</Text>
          </View>
          <Text style={styles.amountValue}>{amount.toLocaleString()} ج.م</Text>
          <Text style={styles.amountDescription}>سيتم حفظ المبلغ بأمان حتى إتمام المعاملة</Text>
        </InteractiveCard>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر طريقة الدفع</Text>
          
          {/* Credit Card */}
          <Animated.View style={animatedCardStyle}>
            <TouchableOpacity
              style={[styles.paymentMethod, selectedMethod === 'card' && styles.selectedMethod]}
              onPress={() => selectPaymentMethod('card')}>
              <View style={styles.methodInfo}>
                <CreditCard size={24} color={selectedMethod === 'card' ? '#001731' : '#6B7280'} />
                <Text style={[styles.methodText, selectedMethod === 'card' && styles.selectedMethodText]}>
                  بطاقة ائتمانية / مدينة
                </Text>
              </View>
              {selectedMethod === 'card' && (
                <CheckCircle size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Vodafone Cash */}
          <Animated.View style={animatedVodafoneStyle}>
            <TouchableOpacity
              style={[styles.paymentMethod, selectedMethod === 'vodafone' && styles.selectedMethod]}
              onPress={() => selectPaymentMethod('vodafone')}>
              <View style={styles.methodInfo}>
                <Smartphone size={24} color={selectedMethod === 'vodafone' ? '#001731' : '#6B7280'} />
                <Text style={[styles.methodText, selectedMethod === 'vodafone' && styles.selectedMethodText]}>
                  فودافون كاش
                </Text>
              </View>
              {selectedMethod === 'vodafone' && (
                <CheckCircle size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Fawry */}
          <Animated.View style={animatedFawryStyle}>
            <TouchableOpacity
              style={[styles.paymentMethod, selectedMethod === 'fawry' && styles.selectedMethod]}
              onPress={() => selectPaymentMethod('fawry')}>
              <View style={styles.methodInfo}>
                <Smartphone size={24} color={selectedMethod === 'fawry' ? '#001731' : '#6B7280'} />
                <Text style={[styles.methodText, selectedMethod === 'fawry' && styles.selectedMethodText]}>
                  فوري
                </Text>
              </View>
              {selectedMethod === 'fawry' && (
                <CheckCircle size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Bank Transfer */}
          <Animated.View style={animatedBankStyle}>
            <TouchableOpacity
              style={[styles.paymentMethod, selectedMethod === 'bank' && styles.selectedMethod]}
              onPress={() => selectPaymentMethod('bank')}>
              <View style={styles.methodInfo}>
                <Building size={24} color={selectedMethod === 'bank' ? '#001731' : '#6B7280'} />
                <Text style={[styles.methodText, selectedMethod === 'bank' && styles.selectedMethodText]}>
                  تحويل بنكي
                </Text>
              </View>
              {selectedMethod === 'bank' && (
                <CheckCircle size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Payment Form */}
        <InteractiveCard style={styles.formSection}>
          <Text style={styles.formTitle}>بيانات الدفع</Text>
          
          {selectedMethod === 'card' && (
            <View style={styles.cardForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>رقم البطاقة</Text>
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
              
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>تاريخ الانتهاء</Text>
                  <TextInput
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
            </View>
          )}

          {(selectedMethod === 'vodafone' || selectedMethod === 'fawry') && (
            <View style={styles.mobileForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>رقم الهاتف</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="01234567890"
                  keyboardType="phone-pad"
                  maxLength={11}
                />
              </View>
            </View>
          )}

          {selectedMethod === 'bank' && (
            <View style={styles.bankInfo}>
              <Text style={styles.bankTitle}>بيانات التحويل البنكي</Text>
              <View style={styles.bankDetails}>
                <Text style={styles.bankDetailText}>اسم البنك: البنك الأهلي المصري</Text>
                <Text style={styles.bankDetailText}>رقم الحساب: 1234567890123456</Text>
                <Text style={styles.bankDetailText}>اسم المستفيد: وسيط مصر للخدمات المالية</Text>
              </View>
              <Text style={styles.bankNote}>
                يرجى إرسال إيصال التحويل عبر الدعم الفني بعد إتمام التحويل
              </Text>
            </View>
          )}
        </InteractiveCard>

        {/* Security Notice */}
        <InteractiveCard style={styles.securitySection}>
          <View style={styles.securityHeader}>
            <Lock size={24} color="#10B981" />
            <Text style={styles.securityTitle}>الأمان والحماية</Text>
          </View>
          <View style={styles.securityFeatures}>
            <View style={styles.securityFeature}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.securityText}>تشفير SSL 256-bit</Text>
            </View>
            <View style={styles.securityFeature}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.securityText}>حماية بيانات البطاقات</Text>
            </View>
            <View style={styles.securityFeature}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.securityText}>مراقبة المعاملات على مدار الساعة</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Payment Button */}
        <View style={styles.paymentSection}>
          <AnimatedButton
            title={`دفع ${amount.toLocaleString()} ج.م`}
            onPress={handlePayment}
            style={styles.paymentButton}
            icon={<Lock size={20} color="#FFFFFF" />}
          />
          
          <Text style={styles.paymentNote}>
            بالضغط على "دفع" فإنك توافق على شروط وأحكام الخدمة
          </Text>
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
  amountCard: {
    backgroundColor: '#001731',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(20),
    alignItems: 'center',
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(16),
  },
  amountTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#FFFFFF',
  },
  amountValue: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(36),
    color: '#FFFFFF',
    marginBottom: scale(8),
  },
  amountDescription: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#E5E7EB',
    textAlign: 'center',
  },
  section: {
    margin: scale(16),
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(16),
  },
  paymentMethod: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
    borderRadius: scale(16),
    marginBottom: scale(12),
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  selectedMethod: {
    borderColor: '#001731',
    backgroundColor: '#F8FAFC',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  methodText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
  },
  selectedMethodText: {
    color: '#001731',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  formTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(20),
  },
  cardForm: {
    gap: scale(16),
  },
  inputGroup: {
    marginBottom: scale(16),
  },
  inputLabel: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(14),
    color: '#374151',
    textAlign: 'right',
    marginBottom: scale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: scale(12),
    padding: scale(16),
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(16),
    backgroundColor: '#FFFFFF',
    textAlign: 'right',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  mobileForm: {
    gap: scale(16),
  },
  bankInfo: {
    backgroundColor: '#F8FAFC',
    padding: scale(20),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#001731',
  },
  bankTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'center',
    marginBottom: scale(16),
  },
  bankDetails: {
    gap: scale(8),
    marginBottom: scale(16),
  },
  bankDetailText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(14),
    color: '#374151',
    textAlign: 'right',
  },
  bankNote: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  securitySection: {
    backgroundColor: '#F0FDF4',
    margin: scale(16),
    padding: getCardPadding(),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#10B981',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    marginBottom: scale(16),
  },
  securityTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#10B981',
  },
  securityFeatures: {
    gap: scale(12),
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: scale(8),
  },
  securityText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(14),
    color: '#10B981',
    textAlign: 'right',
  },
  paymentSection: {
    padding: getResponsivePadding(),
  },
  paymentButton: {
    backgroundColor: '#001731',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
            height: scale(56) + scale(8),
    paddingHorizontal: scale(24),
    borderRadius: scale(16),
    gap: scale(8),
    marginBottom: scale(12),
    shadowColor: '#001731',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    elevation: 6,
  },
  paymentNote: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(12),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: scale(18),
  },
});