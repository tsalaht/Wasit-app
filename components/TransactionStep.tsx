import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface TransactionStepProps {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'error';
  stepNumber: number;
}

export default function TransactionStep({ title, description, status, stepNumber }: TransactionStepProps) {
  const getStepIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={24} color="#10B981" />;
      case 'current':
        return (
          <View style={styles.currentStepIcon}>
            <Text style={styles.stepNumber}>{stepNumber}</Text>
          </View>
        );
      case 'error':
        return <AlertTriangle size={24} color="#EF4444" />;
      default:
        return (
          <View style={styles.pendingStepIcon}>
            <Text style={styles.pendingStepNumber}>{stepNumber}</Text>
          </View>
        );
    }
  };

  const getStepColor = () => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'current':
        return '#A5EEFD';
      case 'error':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIconContainer}>
        {getStepIcon()}
      </View>
      <View style={styles.stepContent}>
        <Text style={[styles.stepTitle, { color: getStepColor() }]}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  stepIconContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentStepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#001731',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingStepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontFamily: 'Tajawal-Black',
    fontSize: 12,
    color: '#FFFFFF',
  },
  pendingStepNumber: {
    fontFamily: 'Tajawal-Black',
    fontSize: 12,
    color: '#9CA3AF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Tajawal-Black',
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
    lineHeight: 20,
  },
});