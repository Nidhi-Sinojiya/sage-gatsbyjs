import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const PressCards = ({ module }) => {
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
        className={`award-list py-60 pb-120 lgscreen:py-30 lgscreen:pb-60 bg-brown-500 bg-opacity-10 ${
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
          {module?.cards && (
            <div className="flex flex-wrap gap-y-[32px] lgscreen:gap-y-[15px]">
              {module?.cards.length > 0 &&
                module.cards.map((item, i) => {
                  return (
                    <div
                      className="w-4/12 xlscreen:w-6/12 lgscreen:w-full px-10 lgscreen:px-0"
                      key={i}
                    >
                      <motion.div
                        variants={animFade}
                        className="bg-white-100 p-35 lgscreen:p-20"
                      >
                        {item?.logo && (
                          <motion.div
                            variants={animFade}
                            className="award-img pt-55 lgscreen:pt-35 pb-90 lgscreen:pb-45"
                          >
                            <ImageOpt
                              imgData={item.logo.mediaItemUrl}
                              width={""}
                              height={""}
                              imgAlt={item.logo.altText}
                              imgLoad="lazy"
                              imgClass="mx-auto"
                            />
                          </motion.div>
                        )}
                        <div className="award-detail">
                          {item?.preHeading && (
                            <motion.div variants={animFade}>
                              <span className="text-12 font-420 tracking-[0.6px] uppercase text-green-100">
                                {parse(item.preHeading)}
                              </span>
                            </motion.div>
                          )}
                          {item?.heading && (
                            <div className="title-green pt-10">
                              <motion.h5 variants={animFade}>
                                {parse(item.heading)}
                              </motion.h5>
                            </div>
                          )}
                          {item?.button && (
                            <motion.div
                              variants={animFade}
                              className="mt-30 flex flex-wrap justify-between gap-x-[20px] smscreen:gap-y-[10px]"
                            >
                              <Link
                                to={item.button.url}
                                className="btn btn-link flex flex-wrap gap-x-2 items-center"
                                target={item.button.target}
                              >
                                {" "}
                                <img
                                  src="/../images/open-in-new.svg"
                                  width={15}
                                  height={15}
                                  loading="lazy"
                                  alt="read more"
                                />{" "}
                                {item.button.title}
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
            </div>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default PressCards
export const PagePressCardsFragment = graphql`
  fragment PagePressCardsFragment on WpPage_Pagecontent_PageContent_PressCards {
    extraId
    extraClass
    hideSection
    cards {
      heading
      preHeading
      button {
        target
        title
        url
      }
      logo {
        altText
        mediaItemUrl
      }
    }
  }
`
