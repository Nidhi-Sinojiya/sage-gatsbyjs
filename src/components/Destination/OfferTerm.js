import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const OfferTerm = ({ module }) => {
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
        className={`tc-content bg-brown-500 bg-opacity-10 py-80 lgscreen:py-30${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid">
          <motion.div variants={animFade} className="bg-white-100 py-65 px-90 lgscreen:px-30 lgscreen:py-30">
            <div className="w-[899px] lgscreen:w-full">
              {module?.heading && (
                <div className="title-green">
                  <motion.h4 variants={animFade}>{module.heading}</motion.h4>
                </div>
              )}
              {module?.description && (
                <motion.div variants={animFade} className="content global-list pt-10">
                  {parse(module.description)}
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

export default OfferTerm
export const OfferTermFragment = graphql`
  fragment OfferTermFragment on WpOffer_Offercontent_OfferContent_OfferTerm {
    extraId
    extraClass
    hideSection
    heading
    description
  }
`
