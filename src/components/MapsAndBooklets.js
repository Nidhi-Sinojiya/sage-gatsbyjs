import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

const MapsAndBooklets = ({ module }) => {
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
        className={`map-directions py-150 lgscreen:py-70${
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
          <div className="flex flex-wrap items-center smscreen2:justify-center smscreen2:gap-y-1">
            {module?.icon && (
              <motion.div variants={animFade} className="img mr-15">
                <img
                  src={module.icon.mediaItemUrl}
                  className="mx-auto"
                  width={30}
                  height={19}
                  loading="lazy"
                  alt="map-pin"
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
              <motion.div
                variants={animFade}
                className="w-6/12 lgscreen:w-full px-10 lgscreen:px-0"
                key={i}
              >
                <div className="map-direction-details">
                  <div className="flex flex-col">
                    {item?.destination && (
                      <motion.div variants={animFade}>
                        <span className="text-green-100 font-primary text-15 italic font-400 tracking-[-0.3px] pb-10">
                          {item.destination}
                        </span>
                      </motion.div>
                    )}
                    {item?.title && (
                      <motion.div variants={animFade} className="title-green">

                        <h5>{item.title}</h5>
                      </motion.div>
                    )}
                  </div>
                  {item?.download && (
                    <motion.div
                      variants={animFade}
                      className="flex flex-wrap items-end smscreen2:justify-center"
                    >
                      <Link
                        to={item.download.mediaItemUrl}
                        className="btn btn-icon-link flex flex-wrap gap-x-2 items-center !pb-5 !px-0"
                        target="_blank"
                      >
                        {" "}
                        <img
                          src="../images/download.svg"
                          width={15}
                          height={15}
                          loading="lazy"
                          alt="download"
                        />
                        download
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

export default MapsAndBooklets
export const PageMapsAndBookletsFragment = graphql`
  fragment PageMapsAndBookletsFragment on WpPage_Pagecontent_PageContent_MapsAndBooklets {
    extraId
    extraClass
    hideSection
    heading
    icon {
      altText
      mediaItemUrl
    }
    grid {
      destination
      title
      download {
        altText
        mediaItemUrl
      }
    }
  }
`
