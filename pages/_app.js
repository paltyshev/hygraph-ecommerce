import { CartProvider } from 'react-use-cart'
import { ThemeProvider } from 'next-themes'

import 'tailwindcss/tailwind.css'

import { SettingsProvider } from '@/context/settings'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <ThemeProvider>
          <div className='transition-colors duration-500 dark:bg-surface-dark-100'>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
