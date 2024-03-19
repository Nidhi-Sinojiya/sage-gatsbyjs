import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

const SimpleContent = ({ module }) => {
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
        className={`simple-content bg-brown-500 bg-opacity-10 pt-50 lgscreen:pt-30${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="w-[794px] lgscreen:w-full lgscreen:px-20 mx-auto text-center"
        >
          {module?.description && (
            <motion.h5
              variants={animFade}
              className="font-primary italic normal-case tracking-[0px]"
            >
              {module.description}
            </motion.h5>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default SimpleContent
export const DestinationSimpleContentFragment = graphql`
  fragment DestinationSimpleContentFragment on WpDestination_Destinationcontent_DestinationContent_SimpleContent {
    extraId
    extraClass
    hideSection
    description
  }
`

export const OfferSimpleContentFragment = graphql`
  fragment OfferSimpleContentFragment on WpOffer_Offercontent_OfferContent_SimpleContent {
    extraId
    extraClass
    hideSection
    description
  }
`
