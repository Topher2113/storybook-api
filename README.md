# Storybook API

A choose-your-own-adventure React Native app built with Expo. The app connects to a REST API to fetch story scenes, lets the player make choices that branch the narrative, and supports six visually distinct themes.

## Screens

- **Home** — app title, Begin Adventure button, and a settings gear icon in the top-right corner
- **Story** — scene text and choice buttons fetched from the API; handles loading (skeleton), error (retry), and ending states
- **Themes** — preview and switch between all 6 themes; selection persists across restarts

## Themes

| Theme | Mode | Heading Font | Body Font |
|-------|------|-------------|-----------|
| Parchment | Light | Playfair Display | Lora |
| Candlelight | Light | Cinzel | EB Garamond |
| Morning Mist | Light | Nunito | Nunito |
| Midnight Tome | Dark | Cinzel Decorative | Crimson Text |
| Forest Shadow | Dark | Oswald | Merriweather |
| Gothic | Dark | IM Fell English | Crimson Text |

## HIG & Material Design

- **Color System:** Each theme in `constants/themes.ts` uses five named color roles (`background`, `surface`, `primary`, `text`, `accent`) borrowed from [Material Design 3](https://m3.material.io/styles/color/roles). Nothing in the app has a hardcoded color — every component reads from `useTheme()`, so swapping themes just works everywhere at once.

- **Safe Areas:** Every screen uses `<SafeAreaView>` from `react-native-safe-area-context` so content doesn't end up under the notch or home indicator. Following [Apple's HIG layout guidelines](https://developer.apple.com/design/human-interface-guidelines/layout#Safe-areas), the story screen covers both top and bottom edges since it hides the navigation header.

- **Skeleton Loading:** Instead of a spinner, the app shows a skeleton loader while waiting on the API — a pattern from [Material Design's progress indicators](https://m3.material.io/components/progress-indicators/overview). It pulses and matches each theme's surface color so it feels like part of the UI rather than a generic placeholder.
