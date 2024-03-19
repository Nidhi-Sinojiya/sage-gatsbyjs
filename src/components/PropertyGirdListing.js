import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const PropertyGirdListing = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const exdata = useStaticQuery(graphql/* GraphQL */ `
    query ExpQuery {
      allWpPropertyCategory(sort: { id: ASC }) {
        edges {
          node {
            id
            link
            name
            slug
          }
        }
      }
      allWpProperty(sort: { id: DESC }, filter: { parentId: { eq: null } }) {
        nodes {
          title
          content
          propertyContent {
            destination
            propertyColor
            mapImage {
              altText
              mediaItemUrl
            }
          }
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          propertyCategory {
            nodes {
              name
              slug
              id
            }
          }
        }
      }
    }
  `)

  const exFixLimit = 25
  const experience_data = exdata.allWpProperty.nodes
  const categories = exdata.allWpPropertyCategory.edges
  const [experienceLimit, setExLimit] = useState(exFixLimit)
  const [tabDetails, setTabDetails] = useState(
    experience_data.slice(0, exFixLimit)
  )
  const [tabOption, setTabOption] = useState("all")
  const [viewOption, setViewOption] = useState("gridview")

  const [showImage, setShowImage] = useState([])
  const toggleImage = index => {
    if (showImage.includes(index)) {
      setShowImage([])
    } else {
      setShowImage([index])
    }
  }

  const [showImageNew, setShowImageNew] = useState([])
  const toggleImageNew = index => {
    if (showImageNew.includes(index)) {
      setShowImageNew([])
    } else {
      setShowImageNew([index])
    }
  }

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

  useEffect(() => {
    if (tabOption !== "all") {
      const data = []
      for (var i = 0; i < experience_data.length; i++) {
        for (
          var j = 0;
          j < experience_data[i].propertyCategory.nodes.length;
          j++
        ) {
          if (experience_data[i].propertyCategory.nodes[j].name === tabOption) {
            data.push(experience_data[i])
          }
        }
      }
      setTabDetails(data.slice(0, experienceLimit))
      if (data.length === 1) {
        setViewOption("listview")
      } else {
        setViewOption("gridview")
      }
    } else {
      setTabDetails(experience_data.slice(0, experienceLimit))
      if (experience_data.length === 1) {
        setViewOption("listview")
      } else {
        setViewOption("gridview")
      }
    }
  }, [tabOption, experienceLimit, experience_data])

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`tabs-view py-70 lgscreen:py-30 ${
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
          <motion.div
            variants={animFade}
            className="flex flex-wrap justify-between gap-y-8 gap-x-5 ipad:justify-center"
          >
            <div className="tabs-horizontal">
              <ul className="tabs w-full flex flex-wrap gap-y-5 gap-x-[30px]">
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
                  All Properties
                </li>
                {categories.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setTabOption(item.node.name)
                      setExLimit(exFixLimit)
                    }}
                    className={`tab-link cursor-pointer text-green-100 text-13 font-600 tracking-[1.04px] uppercase opacity-[0.65] ${
                      tabOption === item.node.name ? "tab-current" : ""
                    }`}
                    onKeyDown={() => {
                      setTabOption(item.node.name)
                      setExLimit(exFixLimit)
                    }}
                    aria-hidden="true"
                  >
                    {item.node.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tabs-grid gridIcon ipad:w-full">
              <ul className="tabs w-full flex flex-wrap gap-y-5 gap-x-[10px] ipad:justify-center lgscreen:hidden">
                <li
                  onClick={() => {
                    setViewOption("gridview")
                  }}
                  className={`tab-link cursor-pointer opacity-[0.65] px-5  ${
                    viewOption === "gridview" ? "tab-current" : ""
                  }`}
                  onKeyDown={() => {
                    setViewOption("gridview")
                  }}
                  aria-hidden="true"
                >
                  <img src="/../images/grid-view.svg" alt="" />
                </li>
                <li
                  onClick={() => {
                    setViewOption("listview")
                  }}
                  className={`tab-link cursor-pointer opacity-[0.65] px-5 ${
                    viewOption === "listview" ? "tab-current" : ""
                  }`}
                  onKeyDown={() => {
                    setViewOption("listview")
                  }}
                  aria-hidden="true"
                >
                  <img src="/../images/list-view.svg" alt="" />
                </li>
              </ul>
            </div>
          </motion.div>
          {viewOption === "gridview" && (
            <React.Fragment>
              <div className="flex flex-wrap -mx-20 lgscreen:mx-0 mt-50 lgscreen:mt-25 gap-y-[90px] lgscreen:gap-y-[45px]">
                {tabDetails.length > 0 &&
                  tabDetails.map((item, i) => {
                    return (
                      <motion.div
                        variants={animFade}
                        className="lg:w-6/12 w-full px-10 lgscreen:px-0"
                        key={i}
                      >
                        <div
                          className={`img-bx ${item.propertyContent.propertyColor}Border`}
                        >
                          {showImage.includes(i) ? (
                            <div className="img relative">
                              {item?.propertyContent?.mapImage && (
                                <ImageOpt
                                  imgData={
                                    item.propertyContent.mapImage.mediaItemUrl
                                  }
                                  width={640}
                                  height={369}
                                  imgAlt={item.propertyContent.mapImage.altText}
                                  imgLoad="lazy"
                                />
                              )}
                            </div>
                          ) : (
                            <div className="img relative">
                              {item?.featuredImage?.node && (
                                <ImageOpt
                                  imgData={item.featuredImage.node.mediaItemUrl}
                                  width={640}
                                  height={369}
                                  imgAlt={item.featuredImage.node.altText}
                                  imgLoad="lazy"
                                />
                              )}
                            </div>
                          )}
                          <div className="pt-25">
                            {item?.propertyContent?.destination && (
                              <span className="text-15 font-primary italic font-400 -tracking-[0.3px] text-green-100">
                                {item.propertyContent.destination}
                              </span>
                            )}
                            {item?.title && (
                              <div className="title-green">
                                <h4>{item.title}</h4>
                              </div>
                            )}
                            {item?.content && (
                              <div className="content w-[530px] xlscreen:w-full xlscreen:pr-20">
                                {parse(item.content)}
                              </div>
                            )}
                            <div className="flex flex-wrap mt-20 gap-x-[20px]">
                              {item?.uri && (
                                <Link
                                  to={item.uri}
                                  className="btn btn-green-border"
                                >
                                  explore PROPERTY
                                </Link>
                              )}
                              <button
                                to="/"
                                className="btn btn-link flex flex-wrap gap-x-2 items-center outline-none"
                                onClick={() => toggleImage(i)}
                                onKeyDown={() => toggleImage(i)}
                              >
                                {showImage.includes(i) ? (
                                  <span className="flex flex-wrap gap-x-2 items-center">
                                    <img
                                      src="/../images/map-icon.svg"
                                      width={15}
                                      height={15}
                                      loading="lazy"
                                      alt="Map"
                                    />{" "}
                                    View on image
                                  </span>
                                ) : (
                                  <span className="flex flex-wrap gap-x-2 items-center">
                                    <img
                                      src="/../images/map-icon.svg"
                                      width={15}
                                      height={15}
                                      loading="lazy"
                                      alt="Map"
                                    />{" "}
                                    View on map
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
              </div>
            </React.Fragment>
          )}

          {viewOption === "listview" && (
            <React.Fragment>
              {tabDetails.length > 0 &&
                tabDetails.map((item, i) => {
                  return (
                    <div className="flex flex-wrap items-center mt-50" key={i}>
                      <div
                        className={`lg:w-6/12 w-full pr-20 lgscreen:pr-0 ${
                          i % 2 === 0
                            ? "order-1 lgscreen:order-1"
                            : "order-2 lgscreen:order-1"
                        }`}
                      >
                        <div
                          className={`img-bx ${item.propertyContent.propertyColor}Border`}
                        >
                          {showImageNew.includes(i) ? (
                            <div className="img relative">
                              {item?.propertyContent?.mapImage && (
                                <ImageOpt
                                  imgData={
                                    item.propertyContent.mapImage.mediaItemUrl
                                  }
                                  width={640}
                                  height={369}
                                  imgAlt={item.propertyContent.mapImage.altText}
                                  imgLoad="lazy"
                                />
                              )}
                            </div>
                          ) : (
                            <div className="img relative">
                              {item?.featuredImage?.node && (
                                <ImageOpt
                                  imgData={item.featuredImage.node.mediaItemUrl}
                                  width={640}
                                  height={369}
                                  imgAlt={item.featuredImage.node.altText}
                                  imgLoad="lazy"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`lg:w-6/12 w-full lgscreen:pt-30 ${
                          i % 2 === 0
                            ? "order-2 lgscreen:order-2"
                            : "order-1 lgscreen:order-2"
                        }`}
                      >
                        <div className="pl-95 lgscreen:pl-0">
                          {item?.propertyContent?.destination && (
                            <span className="text-15 font-primary italic font-400 -tracking-[0.3px] text-green-100">
                              {item.propertyContent.destination}
                            </span>
                          )}
                          {item?.title && (
                            <div className="title-green">
                              <h4>{item.title}</h4>
                            </div>
                          )}
                          {item?.content && (
                            <div className="content w-[530px] xlscreen:w-full xlscreen:pr-20">
                              {parse(item.content)}
                            </div>
                          )}
                          <div className="flex flex-wrap mt-20 gap-x-[20px]">
                            {item?.uri && (
                              <Link
                                to={item.uri}
                                className="btn btn-green-border"
                              >
                                explore PROPERTY
                              </Link>
                            )}
                            <button
                              to="/"
                              className="btn btn-link flex flex-wrap gap-x-2 items-center outline-none"
                              onClick={() => toggleImageNew(i)}
                              onKeyDown={() => toggleImageNew(i)}
                            >
                              {showImageNew.includes(i) ? (
                                <span className="flex flex-wrap gap-x-2 items-center">
                                  <img
                                    src="/../images/map-icon.svg"
                                    width={15}
                                    height={15}
                                    loading="lazy"
                                    alt="Map"
                                  />{" "}
                                  View on image
                                </span>
                              ) : (
                                <span className="flex flex-wrap gap-x-2 items-center">
                                  <img
                                    src="/../images/map-icon.svg"
                                    width={15}
                                    height={15}
                                    loading="lazy"
                                    alt="Map"
                                  />{" "}
                                  View on map
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </React.Fragment>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default PropertyGirdListing
export const PagePropertyGirdListingFragment = graphql`
  fragment PagePropertyGirdListingFragment on WpPage_Pagecontent_PageContent_PropertyGirdListing {
    extraId
    extraClass
    hideSection
  }
`
