const description =
  'ToyBeary - это интернет-магазин детских развивающих игрушек, который предлагает широкий ассортимент игрушек для детей всех возрастов. У нас вы найдете игрушки, которые помогут вашему ребенку развиваться и учиться весело и интересно.'
const title = 'ToyBeary - интернет-магазин детских развивающих игрушек'
const url = 'https://toybeary.ru'

const seo = {
  title,
  titleTemplate: '%s | ToyBeary',
  description,
  themeColor: '#FF9E85',
  openGraph: {
    description,
    title,
    locale: 'ru_RU',
    type: 'website',
    url,
    title,
    description
  },
  twitter: {
    handle: '@Hygraphcom',
    site: '@Hygraphcom'
  }
}

export { seo as defaultSeo, url as defaultUrl }
