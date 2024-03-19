import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const Newsletter = ({ module, color }) => {
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
        className={`imgwith-content ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
          color?.propertyColor === "blue" ? "bg_blue" : ""
        } ${color?.propertyColor === "green" ? "greenBg" : ""}`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="flex lgscreen:flex-wrap-reverse lg:flex-wrap"
        >
          <div className="lg:w-5/12 w-full">
            <div className="left-content text-center px-90 laptop:px-30 lgscreen:px-20 h-full flex flex-col justify-center items-center lgscreen:py-30">
              {module?.heading && (
                <div className="title-white">
                  <motion.h3 variants={animFade}>{parse(module.heading)}</motion.h3>
                </div>
              )}
              {module?.shortDescription && (
                <motion.div variants={animFade} className="content white pt-10 w-[350px] lgscreen:w-full mx-auto text-center">
                  <p>{parse(module.shortDescription)}</p>
                </motion.div>
              )}
              {module?.button && (
                <motion.div variants={animFade} className="mt-30">
                  <Link
                    to={module.button.url}
                    className="btn btn-white flex flex-wrap gap-x-2"
                    target={module.button.target}
                  >
                    {module.button.title}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
          <div className="lg:w-7/12 w-full">
            {module?.bgImage && (
              <motion.div variants={animFade} className="img relative">
                <ImageOpt
                  imgData={module.bgImage.mediaItemUrl}
                  width={840}
                  height={565}
                  imgAlt={module.bgImage.altText}
                  imgLoad="lazy"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default Newsletter
export const PropertyNewsletterFragment = graphql`
  fragment PropertyNewsletterFragment on WpProperty_Propertycontent_PropertyContent_Newsletter {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    button {
      target
      title
      url
    }
    bgImage {
      altText
      mediaItemUrl
    }
  }
`
