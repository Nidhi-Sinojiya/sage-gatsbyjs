import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const CallToAction = ({ module, color }) => {
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
        className={`book-table bg-opacity-10 py-70 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
          color?.propertyColor === "blue" ? "blueBg bg-blue-200" : ""
        } ${color?.propertyColor === "green" ? "greenBg" : ""}`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid"
        >
          <motion.div variants={animFade} className="bg-white-100 py-50 px-20">
            <div className="w-[980px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
              {module?.image && (
                <motion.div variants={animFade}>
                  <img
                    src={module.image.mediaItemUrl}
                    width={35}
                    height={30}
                    alt={module.image.altText}
                    className="mx-auto mb-15"
                    loading="lazy "
                  />
                </motion.div>
              )}
              {module?.heading && (
                <div className="title-green">
                  <motion.h4 variants={animFade}>
                    {parse(module.heading)}
                  </motion.h4>
                </div>
              )}
              {module?.shortDescription && (
                <motion.div variants={animFade} className="content pt-15">
                  {parse(module.shortDescription)}
                </motion.div>
              )}
              {module?.button && (
                <motion.div
                  variants={animFade}
                  className="mt-30 flex flex-wrap gap-x-[30px] items-center justify-center"
                >
                  <Link
                    to={module.button.url}
                    className="btn btn-green"
                    target={module.button.target}
                  >
                    {module.button.title}
                  </Link>
                  {module?.buttonTwo && (
                    <Link
                      to={module.buttonTwo.url}
                      className="btn btn-link flex flex-wrap gap-x-2"
                      target={module.buttonTwo.target}
                    >
                      <img
                        src="/../images/open-in-new.svg"
                        width={11}
                        height={11}
                        loading="lazy"
                        alt="Open In New"
                      />
                      {module.buttonTwo.title}
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default CallToAction
export const PropertyCallToActionFragment = graphql`
  fragment PropertyCallToActionFragment on WpProperty_Propertycontent_PropertyContent_CallToAction {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    image {
      altText
      mediaItemUrl
    }
    button {
      target
      title
      url
    }
    buttonTwo {
      target
      title
      url
    }
  }
`
