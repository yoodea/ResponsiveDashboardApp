import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseWidget from './BaseWidget';
import {theme} from '../../styles/theme';
import {isTablet} from '../../utils/responsive';

const StatisticWidget = ({ title, value, subtitle, icon, iconColor, trend, trendValue, onPress }) => {
  const isTab = isTablet();
  const isPositive = trend === 'up';
  const trendColor = isPositive ? theme.colors.semantic.success : theme.colors.semantic.error;

  return (
    <BaseWidget title={title} icon={icon} iconColor={iconColor} onPress={onPress} showArrow={!!onPress}>
      <View style={styles.statisticContainer}>
        <Text style={[styles.value, isTab && styles.tabletValue]}>{value}</Text>
        {subtitle && <Text style={[styles.subtitle, isTab && styles.tabletSubtitle]}>{subtitle}</Text>}
        {trend && trendValue && (
          <View style={styles.trendContainer}>
            <Icon name={isPositive ? 'trending-up' : 'trending-down'} size={isTab ? 18 : 16} color={trendColor} style={styles.trendIcon} />
            <Text style={[styles.trendValue, {color: trendColor}]}>{trendValue}</Text>
          </View>
        )}
      </View>
    </BaseWidget>
  );
};

const styles = StyleSheet.create({
  statisticContainer: { alignItems: 'center' },
  value: { fontSize: theme.typography.h1, fontWeight: 'bold', color: theme.colors.neutral.gray800, marginBottom: theme.spacing.xs },
  tabletValue: { fontSize: theme.typography.h1 * 1.2 },
  subtitle: { fontSize: theme.typography.caption, color: theme.colors.neutral.gray600, textAlign: 'center', marginBottom: theme.spacing.sm },
  tabletSubtitle: { fontSize: theme.typography.body },
  trendContainer: { flexDirection: 'row', alignItems: 'center' },
  trendIcon: { marginRight: theme.spacing.xs },
  trendValue: { fontSize: theme.typography.caption, fontWeight: 'bold' },
});

export default StatisticWidget;