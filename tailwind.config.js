// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths to include your React components
  ],
  theme: {
    extend: {
      colors: {
        // Background and Neutral Colors
        background: '#F5F7FA', // Light gray background
        cardBackground: '#FFFFFF', // White for cards
        accent: '#1A3C40', // Dark teal for headers
        borderGray: '#E0E6ED', // Light gray for borders

        // Primary Colors
        primaryGreen: '#32A071', // Green shade for success/positive actions
        primaryRed: '#D9534F', // Red shade for error/negative indicators
        secondaryGreen: '#A8DAB5', // Light green for secondary elements

        // Text Colors
        textPrimary: '#2A2F36', // Dark color for primary text
        textSecondary: '#6C757D', // Muted gray for secondary text
        textHighlight: '#5CA595', // Greenish highlight text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, modern sans-serif font
      },
      fontSize: {
        xs: '0.75rem', // Small text
        sm: '0.875rem', // Standard secondary text
        base: '1rem', // Base body text
        lg: '1.125rem', // Large text for card headings
        xl: '1.25rem', // Section headers
      },
      spacing: {
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
      },
      borderRadius: {
        DEFAULT: '0.75rem', // Rounded corners for a smooth look
        md: '1rem',
        lg: '1.25rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)', // Subtle shadow for card elevation
      },
    },
  },
};
