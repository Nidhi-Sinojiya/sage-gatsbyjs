import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const PropertyBooking = ({ module }) => {
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

  const propertyData = useStaticQuery(graphql`
    query propertyQuery {
      allWpProperty(sort: { id: DESC }, filter: { parentId: { eq: null } }) {
        nodes {
          title
          content
          propertyContent {
            destination
            bookNow {
              target
              title
              url
            }
          }
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  `)
  const allProperties = propertyData.allWpProperty.nodes

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`bloggrid bg-brown-500 bg-opacity-10 py-60 mt-60 lgscreen:mt-40 ${
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
          <div className="flex flex-wrap gap-y-[40px] -mx-10 lgscreen:mx-0">
            {allProperties.length > 0 &&
              allProperties.map((item, i) => {
                const stringWithDashes = item.title.replace(/[’\s]/g, "-")

                return (
                  <div className="lg:w-4/12 w-full px-10 lgscreen:px-0" key={i}>
                    <motion.div
                      variants={animFade}
                      className="bg-white-100 p-25"
                    >
                      <motion.div variants={animFade} className="img relative">
                        {item?.featuredImage?.node && (
                          <ImageOpt
                            imgData={item.featuredImage.node.mediaItemUrl}
                            width={364}
                            height={195}
                            imgAlt={item.featuredImage.node.altText}
                            imgLoad="lazy"
                          />
                        )}
                      </motion.div>
                      <div className="pt-30">
                        {item?.propertyContent?.destination && (
                          <motion.div variants={animFade}>
                            <span className="font-primary italic font-400 -tracking-[0.3px] text-12 mb-10 inline-block">
                              {item.propertyContent.destination}
                            </span>
                          </motion.div>
                        )}
                        {item?.title && (
                          <div className="title-green">
                            <motion.h5 variants={animFade}>
                              {item.title}
                            </motion.h5>
                          </div>
                        )}
                        {item?.content && (
                          <motion.div
                            variants={animFade}
                            className="content pt-10"
                          >
                            {parse(item.content)}
                          </motion.div>
                        )}
                        <motion.div
                          variants={animFade}
                          className="mt-20 flex flex-wrap gap-x-[10px] gap-y-[10px]"
                        >
                          {item?.propertyContent?.bookNow && (
                            <Link
                              to={item.propertyContent.bookNow.url}
                              className="btn btn-green"
                              target={item.propertyContent.bookNow.target}
                            >
                              {item.propertyContent.bookNow.title}
                            </Link>
                          )}
                          {item?.propertyContent?.bookNow && (
                            <Link
                              to={
                                `/guest-enquiry/?property=` + stringWithDashes
                              }
                              className="btn btn-green-border"
                            >
                              make an enquiry
                            </Link>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default PropertyBooking
export const PagePropertyBookingFragment = graphql`
  fragment PagePropertyBookingFragment on WpPage_Pagecontent_PageContent_PropertyBooking {
    extraId
    extraClass
    hideSection
  }
`
