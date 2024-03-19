import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const SEO = ({ description, lang, title, seo, seoData, acfSEO }) => {
  const { wp } = useStaticQuery(graphql/* GraphQL */ `
    query {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  // use values or set some defaults
  let meta = []
  const metaDescription =
    seo?.description || seo?.metaDesc || wp.generalSettings?.description
  const defaultTitle = seo?.title
    ? seo.title
    : wp.generalSettings?.title
    ? wp.generalSettings?.title
    : title

  // set up robots meta
  let robots = []
  seo?.metaRobotsNoindex
    ? robots.push(seo?.metaRobotsNoindex)
    : robots.push("index")
  seo?.metaRobotsNofollow
    ? robots.push(seo?.metaRobotsNofollow)
    : robots.push("follow")

  if (robots.length) {
    meta.push({
      name: "robots",
      content: robots.join(", ").replace(/^,|,$/g, "").trim(),
    })
  }

  // return the seo stuff
  return (
    <>
      {defaultTitle && <title>{defaultTitle}</title>}

      {metaDescription && <meta name="description" content={metaDescription} />}

      {seo.image && <meta name="image" content={seo.image} />}

      {defaultTitle && <meta property="og:title" content={defaultTitle} />}

      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {seo.twitterUsername && (
        <meta name="twitter:creator" content={seo.twitterUsername} />
      )}

      {defaultTitle && <meta name="twitter:title" content={defaultTitle} />}

      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {seoData && <script type="application/ld+json">{seoData}</script>}
    </>
  )
}
export default SEO
