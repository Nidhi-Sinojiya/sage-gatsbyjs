import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const SinglePropertyList = ({ module, color }) => {
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
        className={`zigzag py-80 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""} ${
          color?.propertyColor === "blue" ? "blueBg bg_blue" : ""
        } ${color?.propertyColor === "green" ? "greenBg bg_brown" : ""}`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid pl-0 lgscreen:pl-20"
        >
          <div className="w-[899px] mx-auto text-center mb-40 lgscreen:w-full lgscreen:px-20">
            {module?.heading && (
              <div className="title-green">
                <motion.h4 variants={animFade}>
                  {parse(module.heading)}
                </motion.h4>
              </div>
            )}
            {module?.shortDescription && (
              <motion.div variants={animFade} className="content">
                {parse(module.shortDescription)}
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap items-center">
            <div className="lg:w-6/12 w-full">
              {module?.selectSingleProperty?.featuredImage && (
                <motion.div
                  variants={animFade}
                  className="img landscape relative"
                >
                  <ImageOpt
                    imgData={
                      module.selectSingleProperty.featuredImage.node
                        .mediaItemUrl
                    }
                    width={658}
                    height={472}
                    imgAlt={
                      module.selectSingleProperty.featuredImage.node.altText
                    }
                    imgLoad="lazy"
                  />
                </motion.div>
              )}
            </div>
            <div className="lg:w-6/12 w-full lgscreen:pt-30">
              <div className="zigzagcontent pl-90  w-full max-w-[600px] lgscreen:pl-0">
                {module?.selectSingleProperty?.propertyContent?.destination && (
                  <motion.div variants={animFade}>
                    <span className="text-15 font-primary italic font-400 -tracking-[0.3px] text-green-100 pb-10 inline-block">
                      {module.selectSingleProperty.propertyContent.destination}
                    </span>
                  </motion.div>
                )}
                {module?.selectSingleProperty?.title && (
                  <div className="title-green">
                    <motion.h3 variants={animFade}>
                      {parse(module.selectSingleProperty.title)}
                    </motion.h3>
                  </div>
                )}
                {module?.selectSingleProperty?.excerpt && (
                  <motion.div
                    variants={animFade}
                    className="content global-list pt-10"
                  >
                    {parse(module.selectSingleProperty.excerpt)}
                  </motion.div>
                )}
                {module?.selectSingleProperty?.uri && (
                  <motion.div
                    variants={animFade}
                    className="mt-30 flex flex-wrap gap-x-[20px]"
                  >
                    <Link
                      to={module.selectSingleProperty.uri}
                      className="btn btn-green-border flex flex-wrap gap-x-2"
                    >
                      explore Property
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default SinglePropertyList
export const PropertySinglePropertyListFragment = graphql`
  fragment PropertySinglePropertyListFragment on WpProperty_Propertycontent_PropertyContent_SinglePropertyList {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    selectSingleProperty {
      ... on WpProperty {
        id
        title
        uri
        content
        excerpt
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        propertyContent {
          destination
        }
      }
    }
  }
`
