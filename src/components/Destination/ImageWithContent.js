import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./../ImageOpt"

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
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`zigzag py-80 lgscreen:py-30 ${
          module.enableBackground ? "bg-brown-500 bg-opacity-10" : ""
        } ${module.extraClass ? ` ${module.extraClass}` : ""}`}
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
            <motion.div
              variants={animFade}
              className={`lg:w-6/12 w-full ${
                module.imagePosition === "right"
                  ? "order-2 lgscreen:order-2"
                  : "order-1 lgscreen:order-1"
              } `}
            >
              {module?.image && (
                <div className="img landscape relative">
                  <ImageOpt
                    imgData={module.image.mediaItemUrl}
                    width={658}
                    height={472}
                    imgAlt={module.image.altText}
                    imgLoad="lazy"
                    imgClass=""
                  />
                </div>
              )}
            </motion.div>
            <div
              className={`lg:w-6/12 w-full ${
                module.imagePosition === "right"
                  ? "order-1 lgscreen:order-2"
                  : "order-2 lgscreen:order-1"
              }`}
            >
              <div className="zigzagcontent pl-90 laptop:px-40 w-full max-w-[600px] lgscreen:max-w-full lgscreen:pl-0 lgscreen:w-full lgscreen:pt-30 lgscreen:px-0">
                <motion.div variants={animFade} className="pb-10">
                  {module?.preHeading && (
                    <span className="uppercase text-green-100 text-11 tracking-[0.55px] font-420 pb-10 inline-block">
                      {module.preHeading}
                    </span>
                  )}
                </motion.div>
                {module?.heading && (
                  <motion.div variants={animFade} className="title-green">
                    <h3>{module.heading}</h3>
                  </motion.div>
                )}
                {module?.description && (
                  <motion.div variants={animFade} className="content pt-10">
                    {parse(module.description)}
                  </motion.div>
                )}
                {module.info.length > 0 && (
                  <motion.div
                    variants={animFade}
                    className="text-list lg mt-25 lgscreen:mt-15"
                  >
                    <ul className="flex flex-wrap gap-x-[20px]">
                      {module.info.map((item, i) => (
                        <li key={i}>{item.text}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {module?.button && (
                  <motion.div
                    variants={animFade}
                    className="mt-30 flex flex-wrap gap-x-[15px] gap-y-[10px]"
                  >
                    <Link
                      to={module.button.url}
                      className={`btn ${
                        color === "gray" ? "btn-green" : "btn-green-border"
                      }   `}
                      target={module.button.target}
                    >
                      {module.button.title}
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
export const DestinationImageWithContentFragment = graphql`
  fragment DestinationImageWithContentFragment on WpDestination_Destinationcontent_DestinationContent_ImageWithContent {
    extraId
    extraClass
    hideSection
    imagePosition
    image {
      altText
      mediaItemUrl
    }
    enableBackground
    preHeading
    heading
    description
    info {
      text
    }
    button {
      target
      title
      url
    }
  }
`
export const OfferImageWithContentFragment = graphql`
  fragment OfferImageWithContentFragment on WpOffer_Offercontent_OfferContent_ImageWithContent {
    extraId
    extraClass
    hideSection
    imagePosition
    image {
      altText
      mediaItemUrl
    }
    enableBackground
    preHeading
    heading
    description
    info {
      text
    }
    button {
      target
      title
      url
    }
  }
`
