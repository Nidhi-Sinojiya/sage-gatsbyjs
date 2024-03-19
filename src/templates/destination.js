import { graphql } from "gatsby"
import React, { useEffect } from "react"
import Seo from "../components/Seo/Seo"
import Layout from "../components/layout"
import DestinationModule from "../modules/Destination"

const Destination = props => {
  const post = props.data.post
  const { location } = props
  useEffect(() => {
    document.body.classList.remove("enquiry-page")
  }, [])
  return (
    <div className="fullPageanimation">
      <Layout props={props}>
        <Seo seo={post.seo} />
        <DestinationModule
          modules={post.destinationContent}
          location={location}
        />
      </Layout>
    </div>
  )
}

export default Destination
export const destinationQuery = graphql/* GraphQL */ `
  query DestinationById($id: String!) {
    post: wpDestination(id: { eq: $id }) {
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
      ...DestinationFragment
    }
  }
`
