import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const CareerListing = ({ module }) => {
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

  const careerData = useStaticQuery(graphql`
    query CareerQuery {
      allWpCareers {
        edges {
          node {
            content
            title
            careersContent {
              location
              officeName
              uploadPdf {
                mediaItemUrl
              }
              emailTo
            }
          }
        }
      }
    }
  `)
  const allCareerData = careerData.allWpCareers.edges
  const pageSize = parseInt(4)
  const [itemsToDisplay, setItemsToDisplay] = useState(pageSize)
  const onLoadMore = () => {
    setItemsToDisplay(itemsToDisplay + 4)
  }
  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`job-descrition bg-brown-500 bg-opacity-10 py-80 lgscreen:py-30 ${
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
          <div className="flex flex-wrap items-center gap-y-[55px] lgscreen:gap-y-[30px]">
            {allCareerData.length > 0 &&
              allCareerData.slice(0, itemsToDisplay).map((item, i) => {
                return (
                  <div
                    className="job-detail w-full pt-75 pb-60 lgscreen:pb-30 lgscreen:pt-45 px-90 lgscreen:px-45 smscreen2:px-30 bg-white-100"
                    key={i}
                  >
                    <motion.div
                      variants={animFade}
                      className="text-list md mb-10"
                    >
                      <ul className="flex flex-wrap gap-x-[20px]">
                        {item?.node.careersContent.officeName && (
                          <li>{item.node.careersContent.officeName}</li>
                        )}
                        {item?.node.careersContent.location && (
                          <li>{item.node.careersContent.location}</li>
                        )}
                      </ul>
                    </motion.div>
                    {item?.node.title && (
                      <div className="title-green">
                        <motion.h4 variants={animFade}>
                          {item.node.title}
                        </motion.h4>
                      </div>
                    )}
                    {item?.node.content && (
                      <motion.div
                        variants={animFade}
                        className="content pt-5 w-[900px] xlscreen:w-full"
                      >
                        {parse(item.node.content)}
                      </motion.div>
                    )}
                    <motion.div
                      variants={animFade}
                      className="mt-30 flex flex-wrap justify-between gap-x-[20px] smscreen:gap-y-[10px]"
                    >
                      {item?.node.careersContent?.emailTo && (
                        <Link
                          to={`mailto:${item.node.careersContent.emailTo}`}
                          className="btn btn-green-border flex flex-wrap items-center gap-x-2"
                          target=""
                        >
                          get in touch
                          <img
                            src="../images/mail.svg"
                            width={12}
                            height={12}
                            loading="lazy"
                            alt="Mail"
                          />{" "}
                        </Link>
                      )}
                      {item?.node.careersContent.uploadPdf && (
                        <Link
                          to={item.node.careersContent.uploadPdf.mediaItemUrl}
                          className="btn btn-link flex flex-wrap gap-x-2 items-center"
                          target="_blank"
                        >
                          {" "}
                          <img
                            src="../images/download.svg"
                            width={15}
                            height={15}
                            loading="lazy"
                            alt="Download"
                          />{" "}
                          job description
                        </Link>
                      )}
                    </motion.div>
                  </div>
                )
              })}
          </div>
          {allCareerData.length > 0 &&
            allCareerData?.length > itemsToDisplay && (
              <motion.div
                variants={animFade}
                className="mt-55 flex flex-wrap gap-x-[20px] justify-center"
              >
                <button
                  onClick={onLoadMore}
                  className="btn btn-green-border flex flex-wrap items-center gap-x-2 opacity-40"
                >
                  load more job openings
                </button>
              </motion.div>
            )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default CareerListing
export const PageCareerListingFragment = graphql`
  fragment PageCareerListingFragment on WpPage_Pagecontent_PageContent_CareerListing {
    extraId
    extraClass
    hideSection
  }
`
