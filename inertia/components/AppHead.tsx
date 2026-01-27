import { Head, usePage } from '@inertiajs/react'

interface IAppHeadProps {
  title: string
  description: string
  locale: string
}

const locales = ['de', 'en', 'es', 'fr', 'it', 'kr', 'nl', 'sv']

export const AppHead = ({ title, description, locale }: IAppHeadProps) => {
  const { url } = usePage()
  const pageUrl = new URL(url, 'https://www.esimcandy.com')
  const pagePathname = pageUrl.pathname
  const purePath = pagePathname
    .split('/')
    .slice(2)
    .map((p) => p.toLowerCase())
    .join('/')
  return (
    <Head title={`${title} - App NAME`}>
      <meta head-key="description" name="description" content={description} />

      <meta
        head-key="og:url"
        property="og:url"
        content={`https://www.esimcandy.com/${purePath}`}
      />
      <meta
        head-key="og:title"
        property="og:title"
        content={title}
        key="ogtitle"
      />
      <meta
        head-key="og:description"
        property="og:description"
        content={description}
        key="ogdesc"
      />

      <meta head-key="twitter:title" property="twitter:title" content={title} />
      <meta
        head-key="twitter:description"
        property="twitter:description"
        content={description}
      />
      <meta
        property="twitter:url"
        head-key="twitter:url"
        content={`https://www.esimcandy.com/${purePath}`}
      />

      {/* langs */}
      <meta
        head-key="og:locale"
        property="og:locale"
        content={
          locale !== 'en' ? `${locale}_${locale.toUpperCase()}` : 'en_US'
        }
      />
      {locales
        .filter((l) => l !== locale)
        .map((l) => (
          <meta
            key={l}
            property="og:locale:alternate"
            content={`${l}_${l.toUpperCase()}`}
          />
        ))}

      <link
        head-key="canonical"
        rel="canonical"
        href={`https://www.esimcandy.com/${locale}/${purePath}`}
      />

      {locales.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`https://www.esimcandy.com/${l}/${purePath}`}
        />
      ))}
    </Head>
  )
}
