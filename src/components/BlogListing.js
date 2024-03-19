import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { BlogData } from "../components/BlogData"
import ImageOpt from "./ImageOpt"

const BlogListing = ({ module }) => {
  const data = BlogData()
  const exFixLimit = 9
  const blog_data = data.allWpPost.nodes
  const categories = data.category.nodes
  const [experinceLimit, setExLimit] = useState(exFixLimit)
  const [cExLimit, setCexLimit] = useState(exFixLimit)
  const [tabDetails, setTabDetails] = useState(blog_data.slice(0, exFixLimit))
  const [tabOption, setTabOption] = useState("all")

  useEffect(() => {
    if (tabOption !== "all") {
      const data = []
      for (var i = 0; i < blog_data.length; i++) {
        for (var j = 0; j < blog_data[i].categories.nodes.length; j++) {
          if (blog_data[i].categories.nodes[j].name === tabOption) {
            data.push(blog_data[i])
          }
        }
      }
      setCexLimit(data.length)
      setTabDetails(data.slice(0, experinceLimit))
    } else {
      setCexLimit(blog_data.length)
      setTabDetails(blog_data.slice(0, experinceLimit))
    }
  }, [tabOption, experinceLimit, blog_data])

  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)

  const sectionShow = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  }
  const animFade = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  }
  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed, setHasPlayed])

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className="bloggrid bg-brown-500 bg-opacity-10 pb-60"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid"
        >
          <motion.div variants={animFade} className="tabs-horizontal px-20">
            <ul className="tabs w-full flex flex-wrap justify-center gap-y-5 gap-x-[30px]">
              <li
                onClick={() => {
                  setTabOption("all")
                  setExLimit(exFixLimit)
                }}
                className={`tab-link cursor-pointer text-green-100 text-13 font-600 tracking-[1.04px] uppercase opacity-[0.65] ${
                  tabOption === "all" ? "tab-current" : ""
                }`}
                onKeyDown={() => {
                  setTabOption("all")
                  setExLimit(exFixLimit)
                }}
                aria-hidden="true"
              >
                all blogs
              </li>
              {categories.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setTabOption(item.name)
                    setExLimit(exFixLimit)
                  }}
                  className={`tab-link cursor-pointer text-green-100 text-13 font-600 tracking-[1.04px] uppercase opacity-[0.65] ${
                    tabOption === item.name ? "tab-current" : ""
                  }`}
                  onKeyDown={() => {
                    setTabOption(item.name)
                    setExLimit(exFixLimit)
                  }}
                  aria-hidden="true"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="mt-30">
            <div className="flex flex-wrap gap-y-[40px] -mx-10 lgscreen:mx-0">
              {tabDetails.length > 0 &&
                tabDetails.map((item, i) => {
                  const content = item.excerpt
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, "")
                  const shortenedContent = content.substr(0, 200)
                  return (
                    <div
                      className="lg:w-4/12 w-full px-10 lgscreen:px-0"
                      key={i}
                    >
                      <motion.div
                        variants={animFade}
                        className="bg-white-100 p-25"
                      >
                        {item?.featuredImage && (
                          <motion.div
                            variants={animFade}
                            className="img relative"
                          >
                            <Link to={`/blog${item.uri}`}>
                              <ImageOpt
                                imgData={item.featuredImage.node.mediaItemUrl}
                                width={364}
                                height={195}
                                imgAlt={item.featuredImage.node.altText}
                                imgLoad="lazy"
                              />
                            </Link>
                          </motion.div>
                        )}
                        <div className="pt-30">
                          {item?.date && (
                            <motion.div variants={animFade}>
                              <span className="font-primary italic font-400 -tracking-[0.3px] text-12 mb-10 inline-block">
                                {item.date}
                              </span>
                            </motion.div>
                          )}
                          {item?.title && (
                            <motion.div
                              variants={animFade}
                              className="title-green"
                            >
                              <Link to={`/blog${item.uri}`}>
                                {" "}
                                <h5>{item.title}</h5>
                              </Link>
                            </motion.div>
                          )}
                          {item?.excerpt && (
                            <motion.div
                              variants={animFade}
                              className="content pt-10"
                            >
                              <p>{shortenedContent}</p>
                            </motion.div>
                          )}
                          {item?.uri && (
                            <motion.div variants={animFade} className="mt-20">
                              <Link
                                to={`/blog${item.uri}`}
                                className="btn btn-green-border"
                              >
                                read more
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
            </div>
            <motion.div
              variants={animFade}
              className="flex flex-wrap justify-center px-20 mt-55"
            >
              {experinceLimit < blog_data.length &&
                cExLimit !== tabDetails.length &&
                tabDetails.length > 0 && (
                  <button
                    className="btn btn-green-border opacity-40"
                    onClick={() => {
                      setExLimit(experinceLimit => experinceLimit + exFixLimit)
                    }}
                  >
                    load more blog posts
                  </button>
                )}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default BlogListing
export const PageBlogListingFragment = graphql`
  fragment PageBlogListingFragment on WpPage_Pagecontent_PageContent_BlogListing {
    extraId
    extraClass
    hideSection
  }
`
