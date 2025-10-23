import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { getGridColumns, listenForOrientationChange, getAdaptivePadding } from '../utils/responsive';
import {theme} from '../styles/theme';

const ResponsiveGrid = ({ data = [], renderItem, numColumns, spacing = theme.spacing.sm, contentContainerStyle }) => {
  const [columns, setColumns] = useState(numColumns || getGridColumns());

  useEffect(() => {
    const subscription = listenForOrientationChange(() => {
      setColumns(numColumns || getGridColumns());
    });
    return () => subscription?.remove();
  }, [numColumns]);

  const renderRow = (rowData, rowIndex) => (
    <View key={rowIndex} style={[styles.row, {marginHorizontal: -spacing/2}]}>
      {rowData.map((item, itemIndex) => {
        if (!item) return <View key={itemIndex} style={[styles.item, {flex: 1}]} />;
        return (
          <View key={item.id || itemIndex} style={[styles.item, { flex: 1, marginHorizontal: spacing/2, marginBottom: spacing }]}>
            {renderItem(item, itemIndex)}
          </View>
        );
      })}
    </View>
  );

  const grouped = [];
  for (let i = 0; i < data.length; i += columns) {
    const row = data.slice(i, i + columns);
    while (row.length < columns) row.push(null);
    grouped.push(row);
  }

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {grouped.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: getAdaptivePadding() },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  item: {},
});

export default ResponsiveGrid;