module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': {
          '100': '#ff9e85',
          '200': '#c77c69',
          '300': '#915c4e',
          '400': '#5f3e35',
          '500': '#31221e',
          'dark-100': '#ff9e85',
          'dark-200': '#ffa992',
          'dark-300': '#ffb49f',
          'dark-400': '#ffbfac',
          'dark-500': '#ffc9ba',
          'dark-600': '#ffd4c7',
        },
        'accent': {
          '100': '#da85ff',
          '200': '#aa69c6',
          '300': '#7d4f91',
          '400': '#53365e',
          '500': '#2b1e30',
          'dark-100': '#da85ff',
          'dark-200': '#df93ff',
          'dark-300': '#e4a1ff',
          'dark-400': '#e9afff',
          'dark-500': '#edbcff',
          'dark-600': '#f1caff',
        },
        'danger': '#b41c2b',
        'success': '#009f42',
        'warning': '#cc8800',
        'info': '#388cfa',
        'surface': {
          '100': '#ffffff',
          '200': '#c6c6c6',
          '300': '#919191',
          '400': '#5e5e5e',
          '500': '#303030',
          '600': '#000000',
          'dark-100': '#1c1c1c',
          'dark-200': '#313131',
          'dark-300': '#474747',
          'dark-400': '#5f5f5f',
          'dark-500': '#777777',
          'dark-600': '#919191',
        },
        'surface-mixed': {
          '100': '#261f1c',
          '200': '#3b3431',
          '300': '#504a47',
          '400': '#67615f',
          '500': '#7e7977',
          '600': '#979391',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      padding: ['first']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
