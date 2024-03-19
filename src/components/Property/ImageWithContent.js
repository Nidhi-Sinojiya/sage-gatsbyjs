import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const ImageWithContent = ({ module, color }) => {
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
      <>
        {color?.propertyColor === "brown" ||
        color?.propertyColor === "green" ? (
          <motion.section
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className={`zigzag py-80 lgscreen:py-30 ${
              module.extraClass ? ` ${module.extraClass}` : ""
            } ${
              module?.backgroundType === "with_bg"
                ? "bg-opacity-[0.08] bg_brown"
                : ""
            } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
              color?.propertyColor === "blue" ? "blueBg" : ""
            } ${color?.propertyColor === "green" ? "greenBg" : ""}`}
            id={module.extraId}
          >
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView || hasPlayed ? "show" : "hidden"}
              variants={sectionShow}
              className="container-fluid pl-0 lgscreen:pl-20"
            >
              <div className="flex flex-wrap items-center">
                <motion.div variants={animFade} className="lg:w-6/12 w-full">
                  <div className="img landscape relative">
                    {module?.image && (
                      <ImageOpt
                        imgData={module.image.mediaItemUrl}
                        width={658}
                        height={472}
                        imgAlt={module.image.altText}
                        imgLoad="lazy"
                      />
                    )}
                  </div>
                </motion.div>
                <div className="lg:w-6/12 w-full">
                  <div className="zigzagcontent pl-90 laptop:px-40 w-full max-w-[600px] lgscreen:max-w-full lgscreen:pl-0 lgscreen:w-full lgscreen:pt-30 lgscreen:px-0">
                    {module?.heading && (
                      <motion.div variants={animFade} className="title-green">
                        <h3>{parse(module.heading)}</h3>
                      </motion.div>
                    )}
                    {module?.shortDescription && (
                      <motion.div
                        variants={animFade}
                        className="content pt-10 global-list"
                      >
                        <p>{parse(module.shortDescription)}</p>
                        {module?.bulletsPoint && (
                          <ul>
                            {module?.bulletsPoint.length > 0 &&
                              module.bulletsPoint.map((item, i) => {
                                return <li key={i}>{item.point}</li>
                              })}
                          </ul>
                        )}
                      </motion.div>
                    )}
                    {module?.buttons && (
                      <motion.div
                        variants={animFade}
                        className="mt-30 flex flex-wrap gap-x-[5px] gap-y-[10px]"
                      >
                        {module?.buttons.length > 0 &&
                          module.buttons.map((itemBtn, k) => {
                            if (itemBtn.buttonType === "with_bg") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "without_bg") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green-border"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "map") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green-border flex flex-wrap gap-x-2"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}{" "}
                                  <img
                                    src="/../images/open-in-new.svg"
                                    width={11}
                                    height={11}
                                    loading="lazy"
                                    alt="Open In New"
                                  />
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "direction") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-link flex flex-wrap gap-x-2 items-center ml-10 smscreen:ml-0"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  <img
                                    src="/../images/download.svg"
                                    width={15}
                                    height={15}
                                    loading="lazy"
                                    alt="get directions"
                                  />{" "}
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            return null
                          })}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className={`zigzag py-80 lgscreen:py-30 ${
              module.extraClass ? ` ${module.extraClass}` : ""
            } ${
              module?.backgroundType === "with_bg"
                ? "bg-opacity-[0.08] bg_blue"
                : ""
            } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
              color?.propertyColor === "blue" ? "blueBg" : ""
            } ${color?.propertyColor === "green" ? "greenBg" : ""}`}
            id={module.extraId}
          >
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView || hasPlayed ? "show" : "hidden"}
              className="container-fluid pl-0 lgscreen:pl-20"
            >
              <div className="flex flex-wrap items-center">
                <motion.div variants={animFade} className="lg:w-6/12 w-full">
                  <div className="img landscape relative">
                    {module?.image && (
                      <ImageOpt
                        imgData={module.image.mediaItemUrl}
                        width={658}
                        height={472}
                        imgAlt={module.image.altText}
                        imgLoad="lazy"
                      />
                    )}
                  </div>
                </motion.div>
                <motion.div variants={animFade} className="lg:w-6/12 w-full">
                  <div className="zigzagcontent pl-90 laptop:px-40 w-full max-w-[600px] lgscreen:max-w-full lgscreen:pl-0 lgscreen:w-full lgscreen:pt-30 lgscreen:px-0">
                    {module?.heading && (
                      <motion.div variants={animFade} className="title-green">
                        <h3>{parse(module.heading)}</h3>
                      </motion.div>
                    )}
                    {module?.shortDescription && (
                      <motion.div
                        variants={animFade}
                        className={`content pt-10 ${
                          module?.addBulletsPoint === "true"
                            ? "global-list"
                            : ""
                        }`}
                      >
                        <p>{parse(module.shortDescription)}</p>
                        {module?.bulletsPoint && (
                          <ul>
                            {module?.bulletsPoint.length > 0 &&
                              module.bulletsPoint.map((item, i) => {
                                return <li key={i}>{item.point}</li>
                              })}
                          </ul>
                        )}
                      </motion.div>
                    )}
                    {module?.buttons && (
                      <motion.div
                        variants={animFade}
                        className="mt-30 flex flex-wrap gap-x-[5px] gap-y-[10px]"
                      >
                        {module?.buttons.length > 0 &&
                          module.buttons.map((itemBtn, k) => {
                            if (itemBtn.buttonType === "with_bg") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "without_bg") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green-border"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "map") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-green-border flex flex-wrap gap-x-2"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  {itemBtn.buttonLink.title}{" "}
                                  <img
                                    src="/../images/open-in-new.svg"
                                    width={11}
                                    height={11}
                                    loading="lazy"
                                    alt="Open In New"
                                  />
                                </Link>
                              )
                            }
                            if (itemBtn.buttonType === "direction") {
                              return (
                                <Link
                                  to={itemBtn.buttonLink.url}
                                  className="btn btn-link flex flex-wrap gap-x-2 items-center ml-10 smscreen:ml-0"
                                  key={k}
                                  target={itemBtn.buttonLink.target}
                                >
                                  <img
                                    src="/../images/download.svg"
                                    width={15}
                                    height={15}
                                    loading="lazy"
                                    alt="get directions"
                                  />{" "}
                                  {itemBtn.buttonLink.title}
                                </Link>
                              )
                            }
                            return null
                          })}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        )}
      </>
    )
  }
  return null
}

export default ImageWithContent
export const PropertyImageWithContentFragment = graphql`
  fragment PropertyImageWithContentFragment on WpProperty_Propertycontent_PropertyContent_ImageWithContent {
    extraId
    extraClass
    hideSection
    addBulletsPoint
    backgroundType
    shortDescription
    preHeading
    imagePosition
    heading
    image {
      altText
      mediaItemUrl
    }
    bulletsPoint {
      point
    }
    buttons {
      buttonType
      buttonLink {
        target
        title
        url
      }
    }
  }
`
