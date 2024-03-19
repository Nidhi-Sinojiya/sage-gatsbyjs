import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const OurVideo = ({ module }) => {
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
        className={`property-video-grid bg-brown-500 bg-opacity-10 py-70 lgscreen:py-30${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow} className="container-fluid">
          <div className="flex flex-wrap items-center smscreen2:justify-center smscreen2:gap-y-1">
            {module?.icon && (
              <motion.div variants={animFade} className="img mr-15">
                <img
                  src={module.icon.mediaItemUrl}
                  className="mx-auto"
                  width={30}
                  height={19}
                  loading="lazy"
                  alt="video-pin"
                />
              </motion.div>
            )}

            {module?.heading && (
              <motion.div variants={animFade} className="title-green">
                <h3>{module.heading}</h3>
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap gap-y-[35px] lgscreen:gap-y-[20px] mt-40 lgscreen:mt-20">
            {module.grid.map((item, i) => (
              <motion.div variants={animFade}
                className="w-4/12 lgscreen:w-full px-10 lgscreen:px-0"
                key={i}
              >
                <div className="bg-white-100 pt-30 lgscreen:pt-20 pb-60 lgscreen:pb-30 px-30 lgscreen:px-20 property-video">
                  {item?.image && (
                    <div className="img landscape mr-15 relative mb-30">
                      <ImageOpt
                        imgData={item.image.mediaItemUrl}
                        width={364}
                        height={195}
                        imgAlt={item.image.altText}
                        imgLoad="lazy"
                        imgClass={"mx-auto"}
                      />
                    </div>
                  )}
                  {item?.title && (
                    <motion.div variants={animFade} className="title-green">
                      <h5>{item.title}</h5>
                    </motion.div>
                  )}
                  {item?.download && (
                    <motion.div variants={animFade} className="mt-15 flex flex-wrap justify-between gap-x-[20px] smscreen:gap-y-[10px] smscreen2:justify-center">
                      <Link
                        to={item.download.url}
                        className="btn btn-link flex flex-wrap gap-x-2 items-center"
                        target={item.download.target}
                      >
                        {item.download.target === "_blank" ? (
                          <img
                            src="../images/open-in-new.svg"
                            width={15}
                            height={15}
                            loading="lazy"
                            alt="download"
                          />
                        ) : (
                          <img
                            src="../images/download.svg"
                            width={15}
                            height={15}
                            loading="lazy"
                            alt="download"
                          />
                        )}
                        {item.download.title}
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default OurVideo
export const PageOurVideoFragment = graphql`
  fragment PageOurVideoFragment on WpPage_Pagecontent_PageContent_OurVideo {
    extraId
    extraClass
    hideSection
    icon {
      altText
      mediaItemUrl
    }
    heading
    grid {
      title
      download {
        target
        title
        url
      }
      image {
        altText
        mediaItemUrl
      }
    }
  }
`
