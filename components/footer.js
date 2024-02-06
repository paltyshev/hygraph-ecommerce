import { useRouter } from 'next/router'
import Link from 'next/link'

import { GitHubIcon, TwitterIcon } from '@/icons'
import {Button} from '@nextui-org/react'
import { currencies, locales } from 'hygraph.config'
import { useSettingsContext } from '@/context/settings'

function Footer({ categories = [], collections = [] }) {
  const router = useRouter()
  const { activeCurrency, switchCurrency } = useSettingsContext()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const updateCurrency = (event) => {
    const currency = currencies.find(
      (currency) => currency.code === event.target.value
    )

    switchCurrency(currency)
  }

  const updateLocale = (event) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'

    router.push(path, path, { locale: event.target.value })
  }

  const currentYear = new Date().getUTCFullYear()
  

  return (
    <footer className="" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-6">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              {categories.length ? (
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase">
                    Категории
                  </h3>
                  <Button color='primary'>Click me</Button>
                  <ul className="mt-4 space-y-4">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/${category.type.toLowerCase()}/${category.slug
                            }`}
                          className="text-base"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {collections.length ? (
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase">
                    Коллекции
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {collections.map((collection) => (
                      <li key={collection.id}>
                        <Link
                          href={`/${collection.type.toLowerCase()}/${collection.slug
                            }`}
                          className="text-base"
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Акции &amp; Подарки
            </h3>
            <ul className="mt-4 space-y-4">
                <li key="1">
                  <Link
                    href="/"
                    className="text-base"
                  >
                    Бесплатная доставка
                  </Link>
                </li>
                <li key="2">
                  <Link
                    href="/"
                    className="text-base"
                  >
                    Подарок от суммы заказа
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="https://twitter.com/hygraphcom">
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="https://github.com/Hygraph">
              <span className="sr-only">GitHub</span>
              <GitHubIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-600 md:mt-0 md:order-1 mb-16 md:mb-0">
            &copy; {currentYear} ToyBeary — интренет-магазин
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
