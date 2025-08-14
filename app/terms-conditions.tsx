import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Scale, TriangleAlert as AlertTriangle, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الشروط والأحكام</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color="#001731" />
            <Text style={styles.sectionTitle}>مقدمة</Text>
          </View>
          <Text style={styles.sectionText}>
            مرحباً بك في وسيط مصر. باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا.
          </Text>
        </InteractiveCard>

        {/* Service Description */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Scale size={24} color="#001731" />
            <Text style={styles.sectionTitle}>وصف الخدمة</Text>
          </View>
          <Text style={styles.sectionText}>
            وسيط مصر هو تطبيق وساطة مالية يوفر خدمات آمنة للمعاملات المالية بين الأطراف. نحن نعمل كطرف ثالث محايد لضمان سلامة وأمان المعاملات.
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>حفظ الأموال بشكل آمن حتى إتمام المعاملة</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>التحقق من صحة المعاملات</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>حل النزاعات بين الأطراف</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* User Responsibilities */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color="#001731" />
            <Text style={styles.sectionTitle}>مسؤوليات المستخدم</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>تقديم معلومات صحيحة ودقيقة</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>عدم استخدام التطبيق لأغراض غير قانونية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الالتزام بآداب التعامل مع الأطراف الأخرى</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الحفاظ على سرية بيانات الدخول</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Fees and Commissions */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color="#001731" />
            <Text style={styles.sectionTitle}>الرسوم والعمولات</Text>
          </View>
          <Text style={styles.sectionText}>
            يتقاضى وسيط مصر عمولة قدرها 6% من قيمة المعاملة عند إتمامها بنجاح. هذه العمولة تشمل:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>خدمات الوساطة والحماية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الدعم الفني على مدار الساعة</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>حل النزاعات والمشاكل</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Prohibited Activities */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color="#EF4444" />
            <Text style={styles.sectionTitle}>الأنشطة المحظورة</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>بيع أو شراء المواد غير القانونية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>غسيل الأموال أو التمويل غير المشروع</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>انتحال الشخصية أو تقديم معلومات مزيفة</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>محاولة اختراق أو تعطيل النظام</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Liability */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Scale size={24} color="#001731" />
            <Text style={styles.sectionTitle}>المسؤولية</Text>
          </View>
          <Text style={styles.sectionText}>
            وسيط مصر يعمل كوسيط محايد ولا يتحمل مسؤولية جودة المنتجات أو الخدمات المتداولة. مسؤوليتنا تقتصر على ضمان أمان المعاملة المالية وحل النزاعات وفقاً لسياساتنا.
          </Text>
        </InteractiveCard>

        {/* Updates */}
        <InteractiveCard style={styles.section}>
          <Text style={styles.updateTitle}>تحديث الشروط والأحكام</Text>
          <Text style={styles.updateText}>
            نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر التطبيق أو البريد الإلكتروني.
          </Text>
          <Text style={styles.lastUpdated}>آخر تحديث: يناير 2024</Text>
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
  },
  bottomSpacing: {
    height: 40,
  },
});