import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const ImageWithContent = ({ module }) => {
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
        } ${module.bgColor ? "bg-brown-500 bg-opacity-10 mt-60" : ""} ${
          module.pattern
            ? "bg-brown-400 addPattern bg-opacity-[0.12] relative"
            : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`container-fluid relative ${
            module?.containerWidth === "full" ? "pr-0 lgscreen:pr-20" : ""
          }`}
        >
          <div className="flex flex-wrap items-center">
            <motion.div
              variants={animFade}
              className={`w-full lg:w-6/12 ${
                module?.imagePosition === "right"
                  ? "order-2 lgscreen:order-1"
                  : ""
              }`}
            >
              {module?.image && (
                <div
                  className={`img  relative ${
                    module?.imageStyle === "landscape" ? "landscape" : "potrait"
                  } `}
                >
                  <ImageOpt
                    imgData={module.image.mediaItemUrl}
                    width={658}
                    height={472}
                    imgAlt={module.image.altText}
                    imgLoad="lazy"
                  />
                </div>
              )}
            </motion.div>
            <div
              className={`w-full lg:w-6/12  ${
                module?.imagePosition === "right"
                  ? "order-1 lgscreen:order-2"
                  : ""
              } `}
            >
              <div className="zigzagcontent pl-90 laptop:px-40 w-full max-w-[600px] lgscreen:max-w-full lgscreen:pl-0 lgscreen:w-full lgscreen:pt-30 lgscreen:px-0">
                {module?.preHeading && (
                  <motion.div variants={animFade} className="pb-10">
                    <span className="uppercase text-green-100 text-11 tracking-[0.55px] font-420 inline-block">{parse(module.preHeading)}</span>
                  </motion.div>
                )}
                {module?.heading && (
                  <motion.div variants={animFade} className="title-green">
                    <h3>{parse(module.heading)}</h3>
                  </motion.div>
                )}
                {module?.shortDescription && (
                  <motion.div variants={animFade} className="content pt-10">
                    <p>{parse(module.shortDescription)}</p>
                  </motion.div>
                )}
                {module?.button && (
                  <motion.div
                    variants={animFade}
                    className="mt-30 flex flex-wrap gap-x-[10px]"
                  >
                    <Link
                      to={module.button.url}
                      className="btn btn-green-border flex flex-wrap gap-x-[10px]"
                      target={module.button.target}
                    >
                      {parse(module.button.title)}
                      {module?.buttonIcon && (
                        <img
                          src="../images/mail.svg"
                          width={12}
                          height={12}
                          loading="lazy"
                          alt="mail"
                        />
                      )}
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

export default ImageWithContent
export const PageImageWithContentFragment = graphql`
  fragment PageImageWithContentFragment on WpPage_Pagecontent_PageContent_ImageWithContent {
    extraId
    extraClass
    hideSection
    imagePosition
    heading
    preHeading
    imageStyle
    bgColor
    containerWidth
    buttonIcon
    shortDescription
    pattern
    image {
      altText
      mediaItemUrl
    }
    button {
      target
      title
      url
    }
  }
`
