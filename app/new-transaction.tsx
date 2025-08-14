import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Upload, CreditCard, Shield } from 'lucide-react-native';
import { router } from 'expo-router';
import AnimatedButton from '@/components/AnimatedButton';
import InteractiveCard from '@/components/InteractiveCard';

export default function NewTransactionScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [productLink, setProductLink] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !amount) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    Alert.alert(
      'تأكيد المعاملة',
      `سيتم إيداع مبلغ ${amount} ج.م في التطبيق. هل أنت متأكد؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد الإيداع', 
          onPress: () => {
            Alert.alert('نجح', 'تم إنشاء المعاملة وإيداع المبلغ بنجاح');
            router.back();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>معاملة جديدة</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>تفاصيل المعاملة</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>عنوان المعاملة *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="مثال: بيع هاتف iPhone 14"
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>وصف المنتج أو الخدمة *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="اكتب وصفاً مفصلاً للمنتج أو الخدمة..."
              multiline
              numberOfLines={4}
              textAlign="right"
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>رابط المنتج (اختياري)</Text>
            <TextInput
              style={styles.input}
              value={productLink}
              onChangeText={setProductLink}
              placeholder="https://example.com/product"
              keyboardType="url"
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>المبلغ (بالجنيه المصري) *</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
        </View>

        {/* File Upload */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>المرفقات (اختياري)</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <Upload size={32} color="#A5EEFD" />
            <Text style={styles.uploadText}>اضغط لرفع الصور أو المستندات</Text>
            <Text style={styles.uploadSubtext}>PNG, JPG, PDF - حتى 10 ميجابايت</Text>
          </TouchableOpacity>
        </View>

        {/* Commission Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Shield size={20} color="#A5EEFD" />
            <Text style={styles.infoTitle}>معلومات العمولة</Text>
          </View>
          <Text style={styles.infoText}>
            سيتم خصم عمولة 6% من المبلغ عند إتمام المعاملة بنجاح.
          </Text>
          {amount && (
            <View style={styles.commissionBreakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>المبلغ الأساسي:</Text>
                <Text style={styles.breakdownValue}>{amount} ج.م</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>العمولة (6%):</Text>
                <Text style={styles.breakdownValue}>
                  {(parseFloat(amount || '0') * 0.06).toFixed(0)} ج.م
                </Text>
              </View>
              <View style={[styles.breakdownRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>صافي المبلغ للبائع:</Text>
                <Text style={styles.totalValue}>
                  {(parseFloat(amount || '0') * 0.94).toFixed(0)} ج.م
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <AnimatedButton
            title="الانتقال للدفع"
            onPress={() => router.push('/payment')}
            style={styles.submitButton}
            icon={<CreditCard size={20} color="#FFFFFF" />}
          />
          
          <Text style={styles.submitNote}>
            سيتم حجز المبلغ بأمان في محفظة التطبيق حتى إتمام المعاملة
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 20,
    color: '#001731',
  },
  content: {
    flex: 1,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 18,
    color: '#001731',
    textAlign: 'right',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 14,
    color: '#374151',
    textAlign: 'right',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Tajawal-Regular',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#F0FDFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#001731',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    gap: 8,
  },
  infoTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#001731',
  },
  infoText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#374151',
    textAlign: 'right',
    lineHeight: 20,
    marginBottom: 16,
  },
  commissionBreakdown: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  breakdownValue: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 14,
    color: '#001731',
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontFamily: 'Tajawal-Black',
    fontSize: 14,
    color: '#001731',
  },
  totalValue: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#10B981',
  },
  submitSection: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#001731',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#FFFFFF',
  },
  submitNote: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});