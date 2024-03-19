import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const ImageWidget = ({ module }) => {
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
        className={`imgwith-content${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
        >
         
            <div className="flex lgscreen:flex-wrap-reverse lg:flex-wrap">
              <motion.div variants={animFade} className="lg:w-5/12 w-full bg_brown">
                <div className="left-content text-center px-90 h-full flex flex-col justify-center items-center lgscreen:py-30">
                  <motion.div variants={animFade} >
                    {module?.logoImage && (
                      <img
                        src={module.logoImage.mediaItemUrl}
                        className="mx-auto"
                        width={298}
                        height={93}
                        loading="lazy"
                        alt={module.logoImage.altText}
                      />
                    )}
                  </motion.div>
                  {module?.shortDescription && (
                    <motion.div
                      variants={animFade}
                      className="content white pt-30 w-[350px] lgscreen:w-full mx-auto text-center"
                    >
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
                        {module.button.title}{" "}
                        <img
                          src="/../images/open-in-new.svg"
                          width={11}
                          height={11}
                          loading="lazy"
                          alt="Open In New"
                        />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
              <div className="lg:w-7/12 w-full">
                <motion.div variants={animFade} className="img relative">
                  {module?.image && (
                    <ImageOpt
                      imgData={module.image.mediaItemUrl}
                      width={840}
                      height={565}
                      imgAlt={module.image.altText}
                      imgLoad="lazy"
                    />
                  )}
                </motion.div>
              </div>
            </div>
         
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default ImageWidget
export const PropertyImageWidgetFragment = graphql`
  fragment PropertyImageWidgetFragment on WpProperty_Propertycontent_PropertyContent_ImageWidget {
    extraId
    extraClass
    hideSection
    shortDescription
    image {
      altText
      mediaItemUrl
    }
    logoImage {
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
