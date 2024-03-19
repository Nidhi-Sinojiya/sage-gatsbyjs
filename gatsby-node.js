const path = require(`path`)

exports.createPages = async gatsbyUtilities => {
  const allData = await getPosts(gatsbyUtilities)

  if (!allData && !allData.pages.length) {
    return
  }

  await makePages({ posts: allData.pages, gatsbyUtilities }, "page")
  await makePages({ posts: allData.propertys, gatsbyUtilities }, "property")
  await makePages(
    { posts: allData.destinations, gatsbyUtilities },
    "destination"
  )
  await makePages({ posts: allData.offers, gatsbyUtilities }, "offer")
  await makeBlogs({ posts: allData.blogs, gatsbyUtilities }, "blog")
  await makePages({ posts: allData.formPages, gatsbyUtilities }, "enquiry")
  await makePages({ posts: allData.thankyouPages, gatsbyUtilities }, "thankyou")
}

/**
 * Create all the site's pages
 */
const makePages = async ({ posts, gatsbyUtilities }, template = "page") => {
  Promise.all(
    posts.map(post => {
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          id: post.id,
          slug: post.slug,
        },
      })
    })
  )
}

const makeBlogs = async ({ posts, gatsbyUtilities }, template = "post") => {
  Promise.all(
    posts.map(({ post }) => {
      const postSlug = `/blog/${post.slug}`
      gatsbyUtilities.actions.createPage({
        //path: post.uri,
        path: postSlug,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          id: post.id,
          posts: posts,
        },
      })
    })
  )
}

/**
 * Get the data via graphql (or throw error if error)
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      pages: allWpPage {
        posts: nodes {
          id
          uri
          slug
        }
      }
      propertys: allWpProperty {
        posts: nodes {
          id
          uri
          slug
        }
      }
      destinations: allWpDestination {
        posts: nodes {
          id
          uri
          slug
        }
      }
      offers: allWpOffer {
        posts: nodes {
          id
          uri
          slug
        }
      }
      blogs: allWpPost {
        edges {
          post: node {
            id
            uri
            slug
          }
        }
      }
      formPages: allWpPage(filter: { slug: { eq: "guest-enquiry" } }) {
        posts: nodes {
          id
          title
          uri
        }
      }
      thankyouPages: allWpPage(filter: { slug: { eq: "thank-you" } }) {
        posts: nodes {
          id
          title
          uri
        }
      }
    }
  `)
  // error if there are errors
  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  // send the posts graphql found in wp
  return {
    pages: graphqlResult.data.pages.posts,
    propertys: graphqlResult.data.propertys.posts,
    destinations: graphqlResult.data.destinations.posts,
    offers: graphqlResult.data.offers.posts,
    formPages: graphqlResult.data.formPages.posts,
    thankyouPages: graphqlResult.data.thankyouPages.posts,
    blogs: graphqlResult.data.blogs.edges,
  }
}
