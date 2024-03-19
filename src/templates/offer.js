import { graphql } from "gatsby"
import React, { useEffect } from "react"
import Seo from "../components/Seo/Seo"
import Layout from "../components/layout"
import OfferModule from "../modules/Offer"

const Offer = props => {
  const post = props.data.post
  const { location } = props
  useEffect(() => {
    document.body.classList.remove("enquiry-page")
  }, [])

  return (
    <div className="fullPageanimation">
      <Layout props={props}>
        <Seo seo={post.seo} />
        <OfferModule modules={post.offerContent} location={location} />
      </Layout>
    </div>
  )
}

export default Offer
export const offerQuery = graphql/* GraphQL */ `
  query OfferById($id: String!) {
    post: wpOffer(id: { eq: $id }) {
      id
      title
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
      ...OfferFragment
    }
  }
`
