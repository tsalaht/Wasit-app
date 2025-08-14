import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>سياسة الخصوصية</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#001731" />
            <Text style={styles.sectionTitle}>مقدمة</Text>
          </View>
          <Text style={styles.sectionText}>
            نحن في وسيط مصر نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيقنا.
          </Text>
        </InteractiveCard>

        {/* Data Collection */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database size={24} color="#001731" />
            <Text style={styles.sectionTitle}>البيانات التي نجمعها</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>معلومات المعاملات المالية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>بيانات الاستخدام والتفاعل مع التطبيق</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>معلومات الجهاز وعنوان IP</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Data Usage */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Eye size={24} color="#001731" />
            <Text style={styles.sectionTitle}>كيف نستخدم بياناتك</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>تسهيل وتأمين المعاملات المالية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>التحقق من هوية المستخدمين</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>تحسين خدماتنا وتجربة المستخدم</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>إرسال الإشعارات المهمة والتحديثات</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Data Protection */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={24} color="#001731" />
            <Text style={styles.sectionTitle}>حماية البيانات</Text>
          </View>
          <Text style={styles.sectionText}>
            نستخدم أحدث تقنيات التشفير والأمان لحماية بياناتك. جميع المعاملات المالية محمية بتشفير SSL 256-bit، ولا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة.
          </Text>
        </InteractiveCard>

        {/* User Rights */}
        <InteractiveCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#001731" />
            <Text style={styles.sectionTitle}>حقوقك</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الحق في الوصول إلى بياناتك الشخصية</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الحق في تصحيح أو تحديث معلوماتك</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الحق في حذف حسابك وبياناتك</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>الحق في سحب الموافقة في أي وقت</Text>
            </View>
          </View>
        </InteractiveCard>

        {/* Contact */}
        <InteractiveCard style={styles.section}>
          <Text style={styles.contactTitle}>للاستفسارات حول سياسة الخصوصية</Text>
          <Text style={styles.contactText}>
            يمكنك التواصل معنا عبر البريد الإلكتروني: privacy@waset-misr.com
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