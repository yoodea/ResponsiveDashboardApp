import React, {useState, useEffect} from 'react';
import { ScrollView, View, RefreshControl, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Text } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardHeader from '../components/DashboardHeader';
import ResponsiveGrid from '../components/ResponsiveGrid';
import StatisticWidget from '../components/widgets/StatisticWidget';
import BaseWidget from '../components/widgets/BaseWidget';
import {theme} from '../styles/theme';
import {isTablet, listenForOrientationChange} from '../utils/responsive';

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  const [dashboardData, setDashboardData] = useState({
    statistics: [
      { id: 1, title: 'Total Sales', value: '$24.5K', subtitle: 'This month', icon: 'trending-up', iconColor: theme.colors.semantic.success, trend: 'up', trendValue: '+12%' },
      { id: 2, title: 'New Users', value: '1,234', subtitle: 'This week', icon: 'people', iconColor: theme.colors.primary.main, trend: 'up', trendValue: '+8%' },
      { id: 3, title: 'Orders', value: '456', subtitle: 'Today', icon: 'shopping-cart', iconColor: theme.colors.secondary.main, trend: 'down', trendValue: '-3%' },
      { id: 4, title: 'Revenue', value: '$12.3K', subtitle: 'This week', icon: 'attach-money', iconColor: theme.colors.accent.main, trend: 'up', trendValue: '+15%' },
    ],
  });

  useEffect(() => {
    const subscription = listenForOrientationChange(() => {
      setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'));
    });

    Orientation.getOrientation((o) => { setOrientation(o); });

    return () => { subscription?.remove(); };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setDashboardData(prev => ({
        ...prev,
        statistics: prev.statistics.map(stat => ({ ...stat, value: stat.id === 1 ? '$25.2K' : stat.value })),
      }));
      setRefreshing(false);
    }, 1200);
  };

  const renderStatistic = (item) => (
    <StatisticWidget
      title={item.title}
      value={item.value}
      subtitle={item.subtitle}
      icon={item.icon}
      iconColor={item.iconColor}
      trend={item.trend}
      trendValue={item.trendValue}
      onPress={() => Alert.alert(item.title, `Detailed view for ${item.title}`)}
    />
  );

  const isTab = isTablet();
  const isLandscape = orientation === 'landscape';

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader
        title="Dashboard"
        subtitle={`Welcome back, ${isTab ? 'tablet' : 'mobile'} user!`}
        onMenuPress={() => Alert.alert('Menu', 'Menu opened')}
        onNotificationPress={() => Alert.alert('Notifications', 'You have 3 notifications')}
        onProfilePress={() => Alert.alert('Profile', 'Profile opened')}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[theme.colors.primary.main]} tintColor={theme.colors.primary.main} />}>
        
        <ResponsiveGrid
          data={dashboardData.statistics}
          renderItem={renderStatistic}
          numColumns={isLandscape && isTab ? 4 : isLandscape ? 2 : isTab ? 2 : 1}
        />

        <View style={styles.widgetsContainer}>
          <BaseWidget title="Quick Actions" icon="flash-on" iconColor={theme.colors.semantic.warning}>
            <View style={styles.quickActions}>
              {[
                {title: 'Add Product', icon: 'add-box', color: theme.colors.primary.main},
                {title: 'View Reports', icon: 'assessment', color: theme.colors.secondary.main},
                {title: 'Manage Users', icon: 'group', color: theme.colors.accent.main},
                {title: 'Settings', icon: 'settings', color: theme.colors.neutral.gray600},
              ].map((action, idx) => (
                <TouchableOpacity key={idx} style={styles.quickAction} onPress={() => Alert.alert(action.title, `${action.title} pressed`)}>
                  <View style={[styles.quickActionIcon, {backgroundColor: `${action.color}20`}]}>
                    <Icon name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </BaseWidget>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.secondary },
  scrollContainer: { flex: 1 },
  contentContainer: { paddingBottom: theme.spacing.xl },
  widgetsContainer: { paddingHorizontal: theme.spacing.md },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickAction: { alignItems: 'center', width: '22%', paddingVertical: theme.spacing.md },
  quickActionIcon: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.xs },
  quickActionText: { marginTop: theme.spacing.xs, fontSize: theme.typography.small, textAlign: 'center', color: theme.colors.neutral.gray700 },
});

export default DashboardScreen;