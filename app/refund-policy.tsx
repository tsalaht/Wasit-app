import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, RefreshCw, Clock, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';

export default function RefundPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>سياسة استرداد الأموال</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <RefreshCw size={24} color="#001731" />
            <Text style={styles.sectionTitle}>مقدمة</Text>
          </View>
          <Text style={styles.sectionText}>
            نحن في وسيط مصر نلتزم بحماية حقوق جميع المستخدمين. هذه السياسة توضح الحالات التي يمكن فيها استرداد الأموال والإجراءات المطلوبة.
          </Text>
        </InteractiveCard>

        {/* Refund Cases */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={styles.sectionTitle}>حالات الاسترداد المؤهلة</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>عدم تسليم المنتج أو الخدمة من قبل البائع</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>المنتج لا يطابق الوصف المذكور</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>المنتج معيب أو تالف</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>إلغاء المعاملة من قبل البائع قبل التسليم</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>خطأ تقني في النظام أدى لخصم مضاعف</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Refund Process */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#001731" />
            <Text style={styles.sectionTitle}>إجراءات الاسترداد</Text>
          </View>
          <View style={styles.processSteps}>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.processText}>تقديم طلب استرداد عبر التطبيق</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.processText}>مراجعة الطلب من قبل فريق الدعم</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.processText}>التحقق من صحة المطالبة</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.processText}>إعادة المبلغ إلى محفظة المستخدم</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Timeframes */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#001731" />
            <Text style={styles.sectionTitle}>المدد الزمنية</Text>
          </View>
          <View style={styles.timeframeContainer}>
            <View style={styles.timeframeItem}>
              <Text style={styles.timeframeTitle}>تقديم طلب الاسترداد</Text>
              <Text style={styles.timeframeText}>خلال 7 أيام من تاريخ المعاملة</Text>
            </View>
            <View style={styles.timeframeItem}>
              <Text style={styles.timeframeTitle}>مراجعة الطلب</Text>
              <Text style={styles.timeframeText}>من 1-3 أيام عمل</Text>
            </View>
            <View style={styles.timeframeItem}>
              <Text style={styles.timeframeTitle}>تنفيذ الاسترداد</Text>
              <Text style={styles.timeframeText}>من 3-5 أيام عمل</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Non-Refundable Cases */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <XCircle size={24} color="#EF4444" />
            <Text style={styles.sectionTitle}>حالات عدم الاسترداد</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>تأكيد المشتري على استلام المنتج/الخدمة</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>انتهاء المدة المحددة لطلب الاسترداد</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الخدمات الرقمية التي تم تسليمها بالكامل</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>المنتجات المخصصة أو المصنوعة حسب الطلب</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Commission Refund */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>استرداد العمولة</Text>
          </View>
          <Text style={styles.sectionText}>
            في حالة إلغاء المعاملة قبل التسليم أو في حالة وجود خطأ من جانبنا، سيتم استرداد العمولة المدفوعة بالكامل. أما في حالة النزاعات التي يتم حلها لصالح المشتري، فسيتم استرداد 50% من العمولة.
          </Text>
        </InteractiveCard>

        {/* Contact */}
        <InteractiveCard style={styles.section}>
          <Text style={styles.contactTitle}>للاستفسارات حول سياسة الاسترداد</Text>
          <Text style={styles.contactText}>
            يمكنك التواصل معنا عبر البريد الإلكتروني: refunds@waset-misr.com
          </Text>
          <Text style={styles.contactText}>
            أو عبر الدعم الفني في التطبيق
          </Text>
        </InteractiveCard>

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
    padding: 20,
    backgroundColor: '#001731',
  },
  headerTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 18,
    color: '#001731',
  },
  sectionText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 16,
    color: '#374151',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  bullet: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#001731',
    marginLeft: 8,
  },
  listText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 16,
    color: '#374151',
    textAlign: 'right',
    lineHeight: 24,
    flex: 1,
  },
  processSteps: {
    gap: 16,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#001731',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  stepNumberText: {
    fontFamily: 'Tajawal-Black',
    fontSize: 14,
    color: '#FFFFFF',
  },
  processText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#374151',
    textAlign: 'right',
    flex: 1,
  },
  timeframeContainer: {
    gap: 16,
  },
  timeframeItem: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderRightWidth: 4,
    borderRightColor: '#001731',
  },
  timeframeTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#001731',
    textAlign: 'right',
    marginBottom: 4,
  },
  timeframeText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  contactTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#001731',
    textAlign: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  updateTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#001731',
    textAlign: 'center',
    marginBottom: 8,
  },
  updateText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  lastUpdated: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});