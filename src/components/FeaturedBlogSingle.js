import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const FeaturedBlogSingle = ({ module }) => {
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
        className={`fullblog bg-brown-500 bg-opacity-10 py-60 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid"
        >
          <motion.div variants={animFade} className="bg-white-100 p-30">
            <div className="flex flex-wrap items-center">
              <div className="lg:w-5/12 w-full">
                {module?.featuredBlog?.featuredImage && (
                  <motion.div variants={animFade} className="img relative">
                    <ImageOpt
                      imgData={
                        module.featuredBlog.featuredImage.node.mediaItemUrl
                      }
                      width={612}
                      height={354}
                      imgAlt={module.featuredBlog.featuredImage.node.altText}
                      imgLoad="lazy"
                    />
                  </motion.div>
                )}
              </div>
              <div className="lg:w-7/12 w-full lgscreen:pt-30">
                <div className="blog-content px-90 lgscreen:px-0">
                  {module?.featuredBlog?.date && (
                    <motion.div variants={animFade}>
                      <span className="font-primary italic font-400 -tracking-[0.3px] text-15">
                        {module.featuredBlog.date}
                      </span>
                    </motion.div>
                  )}
                  {module?.featuredBlog?.title && (
                    <div className="title-green">
                      <motion.h4 variants={animFade}>
                        {parse(module.featuredBlog.title)}
                      </motion.h4>
                    </div>
                  )}
                  {module?.featuredBlog?.excerpt && (
                    <motion.div variants={animFade} className="content pt-10">
                      {parse(module.featuredBlog.excerpt)}
                    </motion.div>
                  )}
                  {module?.featuredBlog?.uri && (
                    <motion.div variants={animFade} className="mt-20">
                      <Link
                        to={`/blog${module.featuredBlog.uri}`}
                        className="btn btn-green-border"
                      >
                        read more
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default FeaturedBlogSingle
export const PageFeaturedBlogSingleFragment = graphql`
  fragment PageFeaturedBlogSingleFragment on WpPage_Pagecontent_PageContent_FeaturedBlogSingle {
    extraId
    extraClass
    hideSection
    featuredBlog {
      ... on WpPost {
        id
        title
        uri
        date(formatString: "DD.MM.YYYY")
        excerpt
        content
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
`
