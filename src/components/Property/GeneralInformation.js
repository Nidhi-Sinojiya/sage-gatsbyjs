import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const GeneralInformation = ({ module, color }) => {
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
        className={`zigzag bg-opacity-10 py-80 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""} ${
          color?.propertyColor === "blue" ? "blueBg bg-blue-300" : ""
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
          <div className="flex flex-wrap items-center">
            <motion.div variants={animFade} className="lg:w-6/12 w-full">
              {module?.image && (
                <div className="img landscape relative">
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
            <div className="lg:w-6/12 w-full lgscreen:pt-30">
              <div className="zigzagcontent pl-90 laptop:pl-30 w-[full] max-w-[600px] lgscreen:pl-0">
                {module?.heading && (
                  <div className="title-green">
                    <motion.h3 variants={animFade}>
                      {parse(module.heading)}
                    </motion.h3>
                  </div>
                )}
                {module?.description && (
                  <motion.div variants={animFade} className="content pt-10">
                    {parse(module.description)}
                  </motion.div>
                )}
                {module?.buttonLink && (
                  <motion.div
                    variants={animFade}
                    className="mt-20 flex flex-wrap gap-x-[12px] gap-y-[10px]"
                  >
                    {module?.buttonLink.length > 0 &&
                      module.buttonLink.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            {item?.button && (
                              <Link
                                to={item.button.url}
                                className="btn btn-link flex flex-wrap gap-x-2"
                                target={item.button.target}
                              >
                                <img
                                  src="/../images/open-in-new.svg"
                                  width={15}
                                  height={15}
                                  loading="lazy"
                                  alt="Open In New"
                                />
                                {item.button.title}
                              </Link>
                            )}
                          </React.Fragment>
                        )
                      })}
                  </motion.div>
                )}
                {module?.bookingButton && (
                  <motion.div variants={animFade} className="mt-40">
                    <Link
                      to={module.bookingButton.url}
                      className="btn btn-green"
                      target={module.bookingButton.target}
                    >
                      {module.bookingButton.title}
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

export default GeneralInformation
export const PropertyGeneralInformationFragment = graphql`
  fragment PropertyGeneralInformationFragment on WpProperty_Propertycontent_PropertyContent_GeneralInformation {
    extraId
    extraClass
    hideSection
    heading
    description
    image {
      altText
      mediaItemUrl
    }
    bookingButton {
      target
      title
      url
    }
    buttonLink {
      button {
        target
        title
        url
      }
    }
  }
`
