# Responsive Dashboard App — Technical Documentation

## Student Information
- **Name:** Temirkhan Iodkovskiy
- **Student ID:** n01681933
- **Date Submitted:** October 23, 2025
- **Lab:** CPAN 213 — Lab 4

---

## Responsive Design Implementation

### Breakpoint Strategy
Breakpoints target typical device widths: <350 (small), 350–400 (medium), 400–500 (large), 768 (tablet), 1024+ (desktop/large tablet). This ensures sensible column counts and spacing on phones and tablets.

**Defined:**
- Small: < 350 → 1 column
- Medium: 350–400 → 2 columns
- Large: 400–500 → 2 columns
- Tablet: 500–768 → 3 columns
- >768 → 4 columns

### Grid System
`ResponsiveGrid` groups data into rows based on current column count. On orientation change, it recomputes `getGridColumns()` and rebuilds rows with placeholders to keep consistent spacing.

### Orientation Handling
`listenForOrientationChange` subscribes to `Dimensions` updates and toggles internal `orientation` state (`portrait`/`landscape`). The dashboard recalculates columns (e.g., tablets in landscape → 4).

### Typography Scaling
`rf()` scales font sizes relative to 320-px baseline using screen width, then rounds via `PixelRatio`. Android subtracts 2 px for parity.

### Spacing System
Spacing uses `wp('%')` so paddings/margins scale with screen width: `xs≈1%`, `sm≈2%`, `md≈4%`, `lg≈6%`, `xl≈8%`.

---

## Platform-Specific Implementations

### iOS
- Shadows via `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
- Larger safe area top padding for StatusBar

### Android
- Elevation for shadow effect
- StatusBar translucent handling

---

## Component Architecture

- **DashboardHeader**: menu + title/subtitle + notification/profile.
- **ResponsiveGrid**: data → rows/columns, placeholders for uneven rows.
- **BaseWidget**: shared card layout, header (icon/title), optional arrow.
- **StatisticWidget**: value + subtitle + up/down trend.
- **DashboardScreen**: composes header, grid, quick actions.

---

## Performance Optimizations

- `StyleSheet.create` for all styles (referential stability)
- Minimal inline styles; calculated once where possible
- Lightweight widgets and static icons
- Pull-to-refresh uses short async & setState batch

**Observed:** Smooth scrolling and interactions at ~60 FPS on simulators.

---

## Challenges & Solutions

1) **Icons not rendering on Android**  
**Solution:** `npx react-native link react-native-vector-icons`; ensure font files bundled; re-build app.

2) **Orientation flicker**  
**Solution:** Use `Dimensions` listener and recalc columns; avoid heavy reflow in render.

3) **Inconsistent font sizing across devices**  
**Solution:** `rf()` + `PixelRatio` rounding + small Android offset.

---

## Testing Results

| Device         | Size      | Orientation | Columns | Result |
|----------------|-----------|-------------|---------|--------|
| Pixel 7        | 393×852   | Portrait    | 2       | Pass   |
| Pixel Tablet   | 852×393   | Landscape   | 2       | Failed |

**Functionality:** grid adapts; pull-to-refresh works; header buttons accessible; performance monitor ~60 FPS.

---

## Reflection
(Write 150–200 words on what you learned, responsive RN patterns, Flexbox, platform nuances, and how you’ll apply to future projects.)