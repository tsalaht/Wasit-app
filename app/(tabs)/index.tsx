import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, CreditCard, Users, Handshake, ArrowDown, Menu, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import InteractiveCard from '@/components/InteractiveCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import AnimatedButton from '@/components/AnimatedButton';
import { scale, getResponsivePadding, getResponsiveFontSize, getCardPadding, isSmallDevice } from '@/components/ResponsiveUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const handleStartTransaction = () => {
    router.push('/new-transaction');
  };

  const testimonials = [
    {
      id: '1',
      name: 'أحمد محمود',
      rating: 5,
      comment: 'تطبيق محترم بجد خلاني أتعامل وأنا مطمئن إني فلوسي في أمان، ومفيش خد هيضحك عليا زي زمان.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'سارة علي',
      rating: 5,
      comment: 'فكرة عبقرية بصراحة، حلت مشاكل كتير من الناس اللي كنت بتتعامل معاهم أونلاين، وكل حاجة بقت موثقة وآمنة.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'محمد عبدالله',
      rating: 5,
      comment: 'من ساعة ما بدأت أستخدم التطبيق وأنا مرتاح، لا توتر ولا قلق على الفلوس، وسيط مضمون بين الطرف التاني.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'مصطفى محمد',
      rating: 5,
      comment: 'التطبيق اتقدني في أكتر من مرة، خصوصاً في شغل الأونلاين، بقى في وسيط يضمن حقي وحق الطرف التاني.',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'كريم أحمد',
      rating: 5,
      comment: 'بعد شكرا على التطبيق ده، وفر عليا وجع دماغ كبير ومنع نصب كتيركنت ممكن أقع فيه.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        color="#FFD700"
        fill={index < rating ? "#FFD700" : "transparent"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FloatingActionButton onPress={handleStartTransaction} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>وسيط مصر</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Partner Section */}
        <View style={styles.partnerSection}>
          <View style={styles.partnerBadge}>
            <Text style={styles.partnerText}>الثقة والأمان في كل معاملة</Text>
          </View>
        </View>

        {/* Main Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>وسيط مصر الوسيط الآمن في التعاملات المالية</Text>
          <Text style={styles.subtitle}>تجنب الإحتيال ومتمتع بحلول دفع آمنة</Text>
        </View>

        {/* Process Steps */}
        <View style={styles.processSection}>
          {/* Step 1 */}
          <InteractiveCard style={styles.stepContainer} onPress={() => {}}>
            <View style={styles.stepIconContainer}>
              <FileText size={40} color="#001731" />
            </View>
            <Text style={styles.stepTitle}>البائع يسجّل تفاصيل المنتج أو الخدمة</Text>
            <View style={styles.arrowContainer}>
              <ArrowDown size={24} color="#001731" />
            </View>
          </InteractiveCard>

          {/* Step 2 */}
          <InteractiveCard style={styles.stepContainer} onPress={() => {}}>
            <View style={styles.stepIconContainer}>
              <CreditCard size={40} color="#001731" />
            </View>
            <Text style={styles.stepTitle}>المشتري يدفع عبر وسيط مصر</Text>
            <View style={styles.arrowContainer}>
              <ArrowDown size={24} color="#001731" />
            </View>
          </InteractiveCard>

          {/* Step 3 */}
          <InteractiveCard style={styles.stepContainer} onPress={() => {}}>
            <View style={styles.stepIconContainer}>
              <Users size={40} color="#001731" />
            </View>
            <Text style={styles.stepTitle}>البائع يسلم المنتج أو الخدمة</Text>
            <View style={styles.arrowContainer}>
              <ArrowDown size={24} color="#001731" />
            </View>
          </InteractiveCard>

          {/* Step 4 */}
          <InteractiveCard style={styles.stepContainer} onPress={() => {}}>
            <View style={styles.stepIconContainer}>
              <View style={styles.checkmarkIcon}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>
            <Text style={styles.stepTitle}>المشتري يوافق على الاستلام</Text>
            <View style={styles.arrowContainer}>
              <ArrowDown size={24} color="#001731" />
            </View>
          </InteractiveCard>

          {/* Step 5 */}
          <InteractiveCard style={styles.stepContainer} onPress={() => {}}>
            <View style={styles.stepIconContainer}>
              <Handshake size={40} color="#001731" />
            </View>
            <Text style={styles.stepTitle}>وسيط مصر يحوّل الفلوس للبائع</Text>
          </InteractiveCard>
        </View>

        {/* Customer Testimonials */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.testimonialsTitle}>ماذا يقول عملاؤنا</Text>
          <Text style={styles.testimonialsSubtitle}>آراء حقيقية من مستخدمي وسيط مصر</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsScroll}>
            {testimonials.map((testimonial) => (
              <InteractiveCard key={testimonial.id} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image source={{ uri: testimonial.avatar }} style={styles.avatar} />
                  <View style={styles.testimonialInfo}>
                    <Text style={styles.customerName}>{testimonial.name}</Text>
                    <View style={styles.starsContainer}>
                      {renderStars(testimonial.rating)}
                    </View>
                  </View>
                </View>
                <Text style={styles.testimonialText}>"{testimonial.comment}"</Text>
              </InteractiveCard>
            ))}
          </ScrollView>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <AnimatedButton
            title="ابدأ معاملة آمنة"
            onPress={handleStartTransaction}
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
          />
          
          <TouchableOpacity 
            style={styles.commissionButton}
            onPress={() => router.push('/commission')}>
            <Text style={styles.commissionButtonText}>اعرف العمولة</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getResponsivePadding(),
    paddingVertical: scale(16),
    backgroundColor: '#001731',
  },
  menuButton: {
    padding: scale(8),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  partnerSection: {
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  partnerBadge: {
    backgroundColor: '#001731',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  partnerText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(14),
    color: '#FFFFFF',
  },
  titleSection: {
    paddingHorizontal: getResponsivePadding(),
    paddingVertical: scale(20),
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#001731',
    textAlign: 'center',
    lineHeight: scale(36),
    marginBottom: scale(12),
  },
  subtitle: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: scale(24),
  },
  processSection: {
    paddingHorizontal: getResponsivePadding(),
    paddingVertical: scale(20),
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: scale(isSmallDevice() ? 30 : 40),
    backgroundColor: '#FFFFFF',
    padding: getCardPadding(),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  stepIconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(16),
    shadowColor: '#001731',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  checkmarkIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#001731',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: scale(24),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepTitle: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(18),
    color: '#001731',
    textAlign: 'center',
    lineHeight: scale(28),
    paddingHorizontal: scale(20),
  },
  arrowContainer: {
    marginTop: scale(20),
  },
  testimonialsSection: {
    paddingVertical: scale(40),
    backgroundColor: '#FFFFFF',
  },
  testimonialsTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(24),
    color: '#001731',
    textAlign: 'center',
    marginBottom: scale(8),
  },
  testimonialsSubtitle: {
    fontFamily: 'Tajawal-Medium',
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: scale(32),
  },
  testimonialsScroll: {
    paddingLeft: getResponsivePadding(),
  },
  testimonialCard: {
    backgroundColor: '#F8FAFC',
    width: SCREEN_WIDTH * 0.75,
    padding: getCardPadding(),
    borderRadius: scale(16),
    marginRight: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: scale(12),
  },
  testimonialInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Tajawal-Bold',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
    textAlign: 'right',
    marginBottom: scale(4),
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(2),
  },
  testimonialText: {
    fontFamily: 'Tajawal-Regular',
    fontSize: getResponsiveFontSize(14),
    color: '#374151',
    textAlign: 'right',
    lineHeight: scale(22),
  },
  ctaSection: {
    paddingHorizontal: getResponsivePadding(),
    paddingVertical: scale(40),
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#001731',
    paddingHorizontal: scale(60),
    height: scale(56),
    borderRadius: scale(25),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#001731',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    elevation: 6,
  },
  commissionButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#001731',
    paddingHorizontal: scale(40),
    height: scale(56) - scale(8),
    borderRadius: scale(25),
    marginTop: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  commissionButtonText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(16),
    color: '#001731',
  },
  ctaButtonText: {
    fontFamily: 'Tajawal-Black',
    fontSize: getResponsiveFontSize(18),
    color: '#FFFFFF',
  },
});