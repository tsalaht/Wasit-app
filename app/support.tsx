import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MessageCircle, Phone, Mail, Send, FileText, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedButton from '@/components/AnimatedButton';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  date: string;
  lastUpdate: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'مشكلة في تحويل الأموال',
    status: 'open',
    priority: 'high',
    date: 'اليوم الساعة 10:30 ص',
    lastUpdate: 'منذ ساعة',
  },
  {
    id: 'TKT-002',
    subject: 'استفسار عن العمولة',
    status: 'closed',
    priority: 'low',
    date: 'أمس الساعة 2:15 م',
    lastUpdate: 'أمس الساعة 4:30 م',
  },
];

export default function SupportScreen() {
  const [activeTab, setActiveTab] = useState<'new' | 'tickets'>('new');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmitTicket = () => {
    if (!subject || !message) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    Alert.alert('تم الإرسال', 'تم إرسال تذكرة الدعم بنجاح. سيتم الرد عليك خلال 24 ساعة.');
    setSubject('');
    setMessage('');
    setPriority('medium');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'closed':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'مفتوحة';
      case 'pending':
        return 'قيد المراجعة';
      case 'closed':
        return 'مغلقة';
      default:
        return 'غير محدد';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return 'متوسطة';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الدعم الفني</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}>
          <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
            تذكرة جديدة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tickets' && styles.activeTab]}
          onPress={() => setActiveTab('tickets')}>
          <Text style={[styles.tabText, activeTab === 'tickets' && styles.activeTabText]}>
            تذاكري ({mockTickets.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'new' ? (
          <>
            {/* Contact Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>طرق التواصل السريع</Text>
              <View style={styles.contactOptions}>
                <InteractiveCard style={styles.contactOption}>
                  <MessageCircle size={24} color="#A5EEFD" />
                  <Text style={styles.contactOptionText}>دردشة مباشرة</Text>
                  <Text style={styles.contactOptionSubtext}>متاح على مدار الساعة</Text>
                </InteractiveCard>
                
                <InteractiveCard style={styles.contactOption}>
                  <Phone size={24} color="#10B981" />
                  <Text style={styles.contactOptionText}>اتصال هاتفي</Text>
                  <Text style={styles.contactOptionSubtext}>01234567890</Text>
                </InteractiveCard>
                
                <InteractiveCard style={styles.contactOption}>
                  <Mail size={24} color="#3B82F6" />
                  <Text style={styles.contactOptionText}>البريد الإلكتروني</Text>
                  <Text style={styles.contactOptionSubtext}>support@waset-misr.com</Text>
                </InteractiveCard>
              </View>
            </View>

            {/* New Ticket Form */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>إنشاء تذكرة دعم جديدة</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>موضوع التذكرة *</Text>
                <TextInput
                  style={styles.input}
                  value={subject}
                  onChangeText={setSubject}
                  placeholder="اكتب موضوع مشكلتك أو استفسارك"
                  textAlign="right"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>الأولوية</Text>
                <View style={styles.priorityContainer}>
                  {['low', 'medium', 'high'].map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.priorityButton,
                        priority === p && { backgroundColor: getPriorityColor(p) + '20', borderColor: getPriorityColor(p) }
                      ]}
                      onPress={() => setPriority(p as any)}>
                      <Text style={[
                        styles.priorityButtonText,
                        priority === p && { color: getPriorityColor(p) }
                      ]}>
                        {getPriorityText(p)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>تفاصيل المشكلة *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="اشرح مشكلتك بالتفصيل..."
                  multiline
                  numberOfLines={6}
                  textAlign="right"
                  textAlignVertical="top"
                />
              </View>

              <AnimatedButton
                title="إرسال التذكرة"
                onPress={handleSubmitTicket}
                style={styles.submitButton}
                icon={<Send size={20} color="#FFFFFF" />}
              />
            </View>
          </>
        ) : (
          /* My Tickets */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>تذاكر الدعم الخاصة بي</Text>
            {mockTickets.map((ticket) => (
              <InteractiveCard key={ticket.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketInfo}>
                    <Text style={styles.ticketSubject}>{ticket.subject}</Text>
                    <Text style={styles.ticketId}>#{ticket.id}</Text>
                  </View>
                  <View style={styles.ticketMeta}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
                        {getStatusText(ticket.status)}
                      </Text>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) + '20' }]}>
                      <Text style={[styles.priorityText, { color: getPriorityColor(ticket.priority) }]}>
                        {getPriorityText(ticket.priority)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ticketFooter}>
                  <Text style={styles.ticketDate}>تم الإنشاء: {ticket.date}</Text>
                  <Text style={styles.ticketUpdate}>آخر تحديث: {ticket.lastUpdate}</Text>
                </View>
              </InteractiveCard>
            ))}
          </View>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#001731',
  },
  tabText: {
    fontFamily: 'Tajawal-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
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
  contactOptions: {
    gap: 12,
  },
  contactOption: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactOptionText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#001731',
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },
  contactOptionSubtext: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#6B7280',
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
    height: 120,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  priorityButtonText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 14,
    color: '#6B7280',
  },
  submitButton: {
    backgroundColor: '#001731',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    color: '#FFFFFF',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketSubject: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#001731',
    textAlign: 'right',
    marginBottom: 4,
  },
  ticketId: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  ticketMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 10,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 10,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ticketDate: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  ticketUpdate: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});