import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'
import {NextUIProvider} from '@nextui-org/react'
import { SettingsProvider } from '@/context/settings'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <NextUIProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
