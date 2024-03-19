import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const EventsWidget = ({ module, color }) => {
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
        className={`events-block py-35 mt-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""}`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="w-[1100px] px-20 xlscreen:w-full mx-auto text-center text-white-100"
        >
          {module?.image && (
            <motion.div
              variants={animFade}
              className="icon w-[59px] h-[59px] bg-white-100 bg-opacity-20 rounded-100 flex items-center justify-center mx-auto"
            >
              <img
                src={module.image.mediaItemUrl}
                width={28}
                height={26}
                alt={module.image.altText}
                loading="lazy"
              />
            </motion.div>
          )}
          <div className="pt-15">
            {module?.heading && (
              <motion.h4
                variants={animFade}
                className="font-primary italic text-[33px] font-400 !text-white-100 normal-case tracking-[0px]"
              >
                {parse(module.heading)}
              </motion.h4>
            )}
            {module?.shortDescription && (
              <motion.div variants={animFade} className="content">
                <p>{parse(module.shortDescription)}</p>
              </motion.div>
            )}
            {module?.button && (
              <motion.div variants={animFade} className="mt-25">
                <Link
                  to={module.button.url}
                  className="btn btn-white"
                  target={module.button.target}
                >
                  {parse(module.button.title)}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default EventsWidget
export const PropertyEventsWidgetFragment = graphql`
  fragment PropertyEventsWidgetFragment on WpProperty_Propertycontent_PropertyContent_EventsWidget {
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
  }
`
