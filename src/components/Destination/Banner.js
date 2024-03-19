import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./../ImageOpt"

const Banner = ({ module }) => {
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
        className={`banner inner-small-banner relative${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="h-full"
        >
          {module?.backgroundImage && (
            <ImageOpt
              imgData={module.mobileBackgroundImage.mediaItemUrl}
              width={1440}
              height={712}
              imgAlt={module.mobileBackgroundImage.altText}
              imgLoad="eager"
              imgClass="w-full h-full object-cover block mdscreen:hidden"
            />
          )}
          {module?.mobileBackgroundImage && (
            <ImageOpt
              imgData={module.mobileBackgroundImage.mediaItemUrl}
              width={1440}
              height={712}
              imgAlt={module.mobileBackgroundImage.altText}
              imgLoad="eager"
              imgClass="w-full h-full object-cover hidden mdscreen:block"
            />
          )}

          <div className="absolute bottom-[40px] left-50per translate-x-minus_50 z-9 w-full text-center max-w-[1100px] smscreen2:max-w-full mx-auto px-20">
            <div className="video">
              <motion.div variants={animFade}>
                {module?.preHeading && (
                  <span className="text-white-100 text-16 tracking-[0.80px] font-390 uppercase">
                    {module.preHeading}
                  </span>
                )}
              </motion.div>
              {module?.heading && (
                <motion.div variants={animFade} className="title-white">
                  <h2 className="text-55 leading-78 lgscreen:text-[48px] lgscreen:leading-[56px] mdscreen:text-40 mdscreen:leading-45 smscreen2:text-[28px] tracking-[1.1px] font-420">
                    {module.heading}
                  </h2>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default Banner
export const DestinationBannerFragment = graphql`
  fragment DestinationBannerFragment on WpDestination_Destinationcontent_DestinationContent_Banner {
    extraId
    extraClass
    hideSection
    backgroundImage {
      altText
      mediaItemUrl
    }
    mobileBackgroundImage {
      altText
      mediaItemUrl
    }
    preHeading
    heading
  }
`
export const OfferBannerFragment = graphql`
  fragment OfferBannerFragment on WpOffer_Offercontent_OfferContent_Banner {
    extraId
    extraClass
    hideSection
    backgroundImage {
      altText
      mediaItemUrl
    }
    mobileBackgroundImage {
      altText
      mediaItemUrl
    }
    preHeading
    heading
  }
`
