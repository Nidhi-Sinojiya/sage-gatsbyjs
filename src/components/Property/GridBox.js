import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const GridBox = ({ module, color }) => {
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
        className={`ImgGrid py-80 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
          color?.propertyColor === "blue" ? "blueBg" : ""
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
          <div className="w-[900px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
            {module?.heading && (
              <div className="title-green">
                <motion.h3 variants={animFade}>
                  {parse(module.heading)}
                </motion.h3>
              </div>
            )}
            {module?.shortDescription && (
              <motion.div variants={animFade} className="content pt-15">
                <p>{parse(module.shortDescription)}</p>
              </motion.div>
            )}
          </div>
          {module?.gridBoxes && (
            <div className="flex flex-wrap items-center gap-y-[70px] lgscreen:gap-y-[35px] mt-40">
              {module?.gridBoxes.length > 0 &&
                module.gridBoxes.map((item, i) => {
                  return (
                    <div
                      className="lg:w-6/12 w-full pr-20 lgscreen:pr-0"
                      key={i}
                    >
                      <div className="img-bx">
                        <motion.div
                          variants={animFade}
                          className="img relative"
                        >
                          <Link to={item.buttonTwo.url}>
                            {item?.image && (
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={640}
                                height={369}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                              />
                            )}
                          </Link>
                          {item?.logoImage && (
                            <div className="absolute top-50per left-50per translate-x-minus_50 translate-y-minus_50 w-[162px] h-[162px] bg-white-100 rounded-100">
                              <ImageOpt
                                imgData={item.logoImage.mediaItemUrl}
                                width={162}
                                height={162}
                                imgAlt={item.logoImage.altText}
                                imgLoad="lazy"
                                imgClass="!relative"
                              />
                            </div>
                          )}
                        </motion.div>
                        <div className="pt-25">
                          {item?.heading && (
                            <div className="title-green">
                              <motion.h4 variants={animFade}>
                                {parse(item.heading)}
                              </motion.h4>
                            </div>
                          )}
                          {item?.boxDescription && (
                            <motion.div
                              variants={animFade}
                              className="content w-[530px] xlscreen:w-full xlscreen:pr-20"
                            >
                              <p>{parse(item.boxDescription)}</p>
                            </motion.div>
                          )}
                          <motion.div
                            variants={animFade}
                            className="flex flex-wrap mt-20 gap-x-[10px] gap-y-[10px]"
                          >
                            {item?.buttonOne && (
                              <Link
                                to={item.buttonOne.url}
                                className="btn btn-green"
                                target={item.buttonOne.target}
                              >
                                {item.buttonOne.title}
                              </Link>
                            )}
                            {item?.buttonTwo && (
                              <Link
                                to={item.buttonTwo.url}
                                className="btn btn-green-border"
                                target={item.buttonTwo.target}
                              >
                                {item.buttonTwo.title}
                              </Link>
                            )}
                          </motion.div>
                        </div>
                      </div>
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

export default GridBox
export const PropertyGridBoxFragment = graphql`
  fragment PropertyGridBoxFragment on WpProperty_Propertycontent_PropertyContent_GridBox {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    gridBoxes {
      heading
      boxDescription
      image {
        altText
        mediaItemUrl
      }
      buttonOne {
        target
        title
        url
      }
      buttonTwo {
        target
        title
        url
      }
      logoImage {
        altText
        mediaItemUrl
      }
    }
  }
`
