import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const ContactInformation = ({ module }) => {
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
        className={`contact-info bg-brown-500 bg-opacity-10 py-70 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid"
        >
          <motion.div
                  variants={animFade} className="bg-white-100 py-50 px-20">
            <div className="w-[940px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
              {module?.icon && (
                <img
                  src={module.icon.mediaItemUrl}
                  className="mx-auto mb-15"
                  width={35}
                  height={30}
                  loading="lazy"
                  alt="Book Table"
                />
              )}
              {module?.heading && (
                <div className="title-green">
                  <motion.h4
                  variants={animFade}>{module.heading}</motion.h4>
                </div>
              )}
              {module?.description && (
                <motion.div
                variants={animFade} className="content pt-15">{parse(module.description)}</motion.div>
              )}
              {module?.button && (
                <motion.div
                variants={animFade} className="mt-30">
                  <Link
                    to={module.button.url}
                    className="btn btn-green-border"
                    target={module.button.target}
                  >
                    {module.button.title}
                  </Link>
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

export default ContactInformation
export const PageContactInformationFragment = graphql`
  fragment PageContactInformationFragment on WpPage_Pagecontent_PageContent_ContactInformation {
    extraId
    extraClass
    hideSection
    description
    heading
    icon {
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
