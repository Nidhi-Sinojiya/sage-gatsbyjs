import { graphql } from "gatsby"
import React, { useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import Main from "../modules/Main"

const Page = props => {
  const post = props.data.post
  const { location } = props
  useEffect(() => {
    document.body.classList.remove("menu-open")
    document.body.classList.remove("enquiry-page")
  }, [])

  return (
    <div className="fullPageanimation">
      <Layout props={props}>
        <Seo seo={post.seo} />
        <Main modules={post.pageContent} location={location} />
      </Layout>
    </div>
  )
}

export default Page
export const pageQuery = graphql/* GraphQL */ `
  query PageById($id: String!) {
    post: wpPage(id: { eq: $id }) {
      id
      title
      ...MainFragment
      ...seoPageFragment
    }
  }
`
