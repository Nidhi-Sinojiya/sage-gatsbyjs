import { graphql } from "gatsby"

export const seoPageFragment = graphql/* GraphQL */ `
  fragment seoPageFragment on WpPage {
    seo {
      metaDesc
      canonical
      opengraphDescription
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphTitle
      opengraphType
      opengraphUrl
      opengraphSiteName
      title
      twitterDescription
      twitterTitle
      opengraphImage {
        publicUrl
      }
      twitterImage {
        publicUrl
      }
    }
  }
`

export const seoAllFragment = graphql/* GraphQL */ `
  fragment seoAllFragment on WpConnection {
    edges {
      node {
        seo {
          social {
            twitter {
              username
            }
            facebook {
              defaultImage {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 1200, height: 627, layout: FIXED)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
