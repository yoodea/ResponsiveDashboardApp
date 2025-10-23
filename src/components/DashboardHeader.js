import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../styles/theme';
import {hp, isTablet, getAdaptivePadding} from '../utils/responsive';

const DashboardHeader = ({
  title = 'Dashboard',
  subtitle,
  showMenu = true,
  showNotifications = true,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const isTab = isTablet();
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary.main} barStyle="light-content" translucent={Platform.OS === 'android'} />
      <View style={[styles.container, isTab && styles.tabletContainer]}>
        <View style={styles.leftSection}>
          {showMenu && (
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress} accessible accessibilityRole="button" accessibilityLabel="Open menu">
              <Icon name="menu" size={isTab ? 28 : 24} color={theme.colors.primary.contrast} />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, isTab && styles.tabletTitle]}>{title}</Text>
            {subtitle && <Text style={[styles.subtitle, isTab && styles.tabletSubtitle]}>{subtitle}</Text>}
          </View>
        </View>

        <View style={styles.rightSection}>
          {showNotifications && (
            <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress} accessible accessibilityRole="button" accessibilityLabel="View notifications">
              <Icon name="notifications" size={isTab ? 28 : 24} color={theme.colors.primary.contrast} />
              <View style={styles.notificationBadge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress} accessible accessibilityRole="button" accessibilityLabel="Open profile">
            <View style={styles.profileAvatar}>
              <Icon name="person" size={isTab ? 24 : 20} color={theme.colors.primary.main} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: getAdaptivePadding(),
    paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('4%'),
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.medium,
  },
  tabletContainer: { paddingHorizontal: theme.spacing.xl, paddingTop: hp('4%') },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: theme.spacing.sm, marginRight: theme.spacing.sm, position: 'relative' },
  titleContainer: { marginLeft: theme.spacing.sm },
  title: { fontSize: theme.typography.h3, fontWeight: 'bold', color: theme.colors.primary.contrast },
  tabletTitle: { fontSize: theme.typography.h2 },
  subtitle: { fontSize: theme.typography.caption, color: theme.colors.primary.contrast, opacity: 0.8, marginTop: 2 },
  tabletSubtitle: { fontSize: theme.typography.body },
  profileButton: { marginLeft: theme.spacing.sm },
  profileAvatar: {
    width: isTablet() ? 44 : 40, height: isTablet() ? 44 : 40, borderRadius: isTablet() ? 22 : 20,
    backgroundColor: theme.colors.primary.contrast, alignItems: 'center', justifyContent: 'center', ...theme.shadows.small,
  },
  notificationBadge: {
    position: 'absolute', top: 4, right: 4, backgroundColor: theme.colors.accent.main,
    borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: theme.colors.primary.main,
  },
  badgeText: { fontSize: 10, color: theme.colors.accent.contrast, fontWeight: 'bold' },
});

export default DashboardHeader;