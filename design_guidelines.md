# Stush Fintech Mobile App - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech leaders (Cash App's vibrant energy, Robinhood's sleek interface, Chime's friendly accessibility) combined with gamification elements from fitness apps like Strava and Peloton that celebrate user progress.

## Core Design Principles
1. **Celebration of Progress**: Every earning milestone should feel rewarding
2. **Living Data**: Numbers and metrics should feel dynamic, not static
3. **Financial Confidence**: Professional enough to trust, human enough to love
4. **Motion with Purpose**: Animations reinforce the feeling of money and time in motion

## Color Palette

**Dark Mode Primary** (App runs in dark mode exclusively):
- **Background Base**: 0 0% 8% (Deep charcoal black)
- **Surface Elevated**: 0 0% 12% (Cards/elevated elements)
- **Primary Gold**: 45 95% 58% (Vibrant gold for accents, balances, CTAs)
- **Success Green**: 145 65% 48% (Earnings, positive states, on-the-clock status)
- **Accent Emerald**: 160 75% 42% (Secondary actions, boosts)
- **Text Primary**: 0 0% 98% (White for main text)
- **Text Secondary**: 0 0% 65% (Gray for supporting text)
- **Glow Gold**: 45 100% 65% with 40% opacity (For glowing effects)
- **Glow Green**: 145 80% 55% with 30% opacity (For status indicators)

## Typography

**Font Stack**: 
- Primary: 'Inter' (Google Fonts) - Clean, modern, excellent for financial data
- Accent: 'Space Grotesk' (Google Fonts) - Bold headings and key metrics

**Type Scale**:
- Display (Balance/Time): 48px / 700 weight / -0.02em tracking / Space Grotesk
- Headline: 32px / 600 weight / -0.01em tracking / Space Grotesk  
- Subheading: 20px / 600 weight / Inter
- Body Large: 16px / 500 weight / Inter
- Body: 14px / 400 weight / Inter
- Caption: 12px / 400 weight / 0.01em tracking / Inter

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Card padding: p-6
- Section spacing: space-y-8
- Component gaps: gap-4
- Icon-to-text: gap-2

**Mobile Container**: 
- Full-width with px-4 (16px side margins)
- Safe area padding for notched devices
- Max width: 100vw (native mobile only)

## Component Library

### Hero Section - Dashboard Top
**Time on Clock Display**:
- Animated circular progress ring (280px diameter) with gold gradient stroke
- Center: Large time display (HH:MM:SS) in Space Grotesk 48px
- Glowing gold ring that pulses subtly (0.8s ease-in-out)
- Green "On the Clock" badge with dot indicator that blinks every 2s
- Semi-transparent background card with backdrop blur

**Stush Balance Card**:
- Large balance number in gold (48px Space Grotesk) with subtle shimmer animation
- Animated coin stack icon with periodic shine effect (sweeping gradient)
- Small growth indicator (+$XXX today) in success green
- Tap to reveal detailed earnings breakdown with slide-up modal

### Navigation - Bottom Tab Bar
- Fixed bottom navigation with glass morphism effect (backdrop-blur-xl)
- 5 icons: Home (filled house), Access Pay (lightning bolt), Boost (rocket), History (clock), Profile (user)
- Active state: Gold underline indicator (4px height) with smooth slide animation
- Icon size: 24px, active state includes gold glow effect
- Labels: 11px Inter, shown only for active tab

### Dashboard Metrics Section
**Pay Period Card**:
- Horizontal progress bar showing days completed in period
- Dates in caption text with current day highlighted in gold
- Hours worked vs. expected hours comparison
- Rate per hour displayed in body large text

### Transaction History List
**Transaction Cards**:
- Company logo in circular container (48px) with subtle shadow
- Transaction details: Company name (16px), date (12px caption)
- Amount in large text (20px) aligned right in gold for credits, white for debits
- Status badges: "Paid" (green), "Pending" (gold), "Processing" (gray)
- Swipe gesture for quick actions (tap and hold reveals delete/view options)

### Micro-Animations Specifications
1. **Balance Update**: Number counts up with spring animation (0.6s duration)
2. **Coin Stack Shine**: Diagonal gradient sweep every 4s
3. **Clock Pulse**: Subtle scale (1.0 to 1.02) with glow intensity increase every 3s
4. **Tab Transition**: Gold indicator slides with cubic-bezier(0.4, 0, 0.2, 1)
5. **Card Entry**: Stagger fade-up on load (each card delays by 100ms)
6. **Status Dot Blink**: Opacity 1.0 to 0.4 every 2s for "on the clock" indicator

### Buttons & CTAs
**Primary Button** (Access Pay, Quick Actions):
- Gold gradient background (45 100% 62% to 45 95% 52%)
- 16px vertical padding, full-width on mobile
- Bold 16px text in black (high contrast)
- Hover: Slight scale increase with enhanced glow
- Disabled state: 50% opacity

**Secondary Button** (Boost features):
- Emerald green background (160 75% 42%)
- Same sizing as primary
- White text

**Ghost Button** (History filters):
- Transparent with gold border (2px)
- Gold text, backdrop blur on press

### Visual Effects
**Glow Implementation**:
- Box shadows with gold/green colors at 40% opacity
- Layered shadows: inner glow (blur 8px) + outer glow (blur 24px)
- Applied to: Balance numbers, active buttons, status indicators

**Glass Morphism Cards**:
- Background: rgba(255, 255, 255, 0.05)
- Backdrop filter: blur(12px) saturate(150%)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Applied to: Main dashboard cards, bottom nav, modals

## Screen Sections (Vertical Flow)

1. **Status Bar Area**: Safe area padding, time/battery in white
2. **Hero Section** (300px height): Time on clock + Stush balance
3. **Quick Stats** (180px): Pay period progress, hours, rate
4. **Action Cards** (120px): Access Pay CTA, Boost options  
5. **Recent Activity** (Scrollable): Transaction history list
6. **Bottom Navigation** (72px + safe area): Fixed tab bar

## Accessibility & Polish
- Minimum touch targets: 44px
- High contrast ratios: Gold on black (4.5:1), White on black (21:1)
- Haptic feedback on balance updates and navigation taps
- Loading states: Skeleton screens with shimmer effect
- Error states: Red accent (0 75% 55%) with icon and clear message
- Empty states: Friendly illustrations with encouraging copy