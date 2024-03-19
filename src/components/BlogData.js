import { graphql, useStaticQuery } from 'gatsby';

export const BlogData = () => {
  const data = useStaticQuery(graphql/* GraphQL */ `
    query wpPost {
      allWpPost(
        sort: { date: DESC }
        filter: {postContent: {featuredPost: {nin: true}}}
        ) {
        nodes {
          title
          uri
          date(formatString: "DD.MM.YYYY")
          categories {
            nodes {
              name
              uri
              slug
            }
          }
          author {
            node {
              name
              lastName
              firstName
            }
          }
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          excerpt
          content
        }
      }
      category: allWpCategory {
        nodes {
          id
          name
          link
          slug
          uri
        }
      }
    }
  `);
  return data;
};
