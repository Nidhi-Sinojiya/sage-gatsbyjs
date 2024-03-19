import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const OfferListing = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const offerData = useStaticQuery(graphql`
    query offerQuery {
      allWpOffer(sort: { id: ASC }) {
        nodes {
          title
          uri
          excerpt
          offerCategory {
            nodes {
              name
            }
          }
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
  const allOffers = offerData.allWpOffer

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
        className={`ImgGrid py-80 lgscreen:py-30${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow} className="container-fluid">
          <div className="flex flex-wrap items-center gap-y-[70px] lgscreen:gap-y-[35px]">
            {allOffers?.nodes.length > 0 &&
              allOffers.nodes.map((item, i) => (
                <div className="lg:w-6/12 w-full pr-20 lgscreen:pr-0" key={i}>
                  <div className="img-bx">
                    {item?.featuredImage && (
                      <motion.div variants={animFade} className="img relative">
                        <Link to={item.uri}>
                          <ImageOpt
                            imgData={item.featuredImage.node.mediaItemUrl}
                            width={640}
                            height={369}
                            imgAlt={item.featuredImage.node.altText}
                            imgLoad="lazy"
                            imgClass=""
                          />
                        </Link>
                      </motion.div>
                    )}
                    <motion.div variants={animFade} className="pt-25 text-list md mb-10">
                      <ul className="flex flex-wrap gap-x-[20px]">
                        {item?.offerCategory?.nodes.length > 0 &&
                          item.offerCategory.nodes.map((cat, j) => (
                            <li
                              className=""
                              key={j}
                            >
                              {cat.name}
                            </li>
                          ))}
                      </ul>
                    </motion.div>
                    <motion.div variants={animFade} className="title-green">
                      {item?.title && <h4>{item.title}</h4>}
                    </motion.div>
                    {item?.excerpt && (
                      <motion.div variants={animFade} className="content w-[530px] xlscreen:w-full xlscreen:pr-20">
                        {parse(item.excerpt)}
                      </motion.div>
                    )}
                    <motion.div variants={animFade} className="flex flex-wrap mt-20 gap-x-[20px]">
                      <Link to={item.uri} className="btn btn-green-border">
                        explore Offer
                      </Link>
                    </motion.div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default OfferListing
export const PageOfferListingFragment = graphql`
  fragment PageOfferListingFragment on WpPage_Pagecontent_PageContent_OfferListing {
    extraId
    extraClass
    hideSection
  }
`
