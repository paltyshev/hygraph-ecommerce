import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SettingsProvider } from '@/context/settings'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </NextThemesProvider>
        </NextUIProvider>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
