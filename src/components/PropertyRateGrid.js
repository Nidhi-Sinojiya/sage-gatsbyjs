import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const PropertyRateGrid = ({ module }) => {
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
        className={`property-rates-grid bg-brown-500 bg-opacity-10 py-70 lgscreen:py-30${
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
          {module?.heading && (
            <div className="flex flex-wrap items-center smscreen2:justify-center smscreen2:gap-y-1">
              <motion.div variants={animFade} className="img mr-15">
                <img
                  src="../images/atm-card.svg"
                  className="mx-auto"
                  width={30}
                  height={19}
                  loading="lazy"
                  alt="atm-card"
                />
              </motion.div>
              <motion.div variants={animFade} className="title-green">
                <h3>{module.heading}</h3>
              </motion.div>
            </div>
          )}
          {module?.grid && (
            <div className="flex flex-wrap gap-y-[35px] lgscreen:gap-y-[20px] mt-40 lgscreen:mt-20">
              {module.grid.map((item, i) => (
                <motion.div
                  variants={animFade}
                  className="w-4/12 lgscreen:w-full px-10 lgscreen:px-0"
                  key={i}
                >
                  <div className="bg-white-100 py-60 lgscreen:py-30 px-30 lgscreen:px-20 smscreen2:text-center">
                    {item?.destination && (
                      <motion.div variants={animFade}>
                        <span className="text-green-100 font-primary text-15 font-400 tracking-[-0.3px] pb-10">
                          {item.destination}
                        </span>
                      </motion.div>
                    )}
                    {item?.title && (
                      <motion.div variants={animFade} className="title-green">
                        <h5>{item.title}</h5>
                      </motion.div>
                    )}
                    {item?.description && (
                      <motion.div variants={animFade} className="content pt-5">
                        {parse(item.description)}
                      </motion.div>
                    )}
                    {item?.yearPdf && (
                      <div
                        variants={animFade}
                        className="mt-20 flex flex-wrap gap-x-[20px] smscreen:gap-y-[10px] smscreen2:justify-center"
                      >
                        {item.yearPdf.map((doc, j) => (
                          <motion.div variants={animFade} key={j}>
                            <Link
                              to={doc.pdfFile.mediaItemUrl}
                              className="btn btn-link flex flex-wrap gap-x-2 items-center"
                              target={"_blank"}
                            >
                              {" "}
                              <img
                                src="../images/download.svg"
                                width={15}
                                height={15}
                                loading="lazy"
                                alt="download"
                              />
                              {doc.yearName}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default PropertyRateGrid
export const PagePropertyRateGridFragment = graphql`
  fragment PagePropertyRateGridFragment on WpPage_Pagecontent_PageContent_PropertyRateGrid {
    extraId
    extraClass
    hideSection
    heading
    grid {
      title
      destination
      description
      yearPdf {
        yearName
        pdfFile {
          altText
          mediaItemUrl
        }
      }
    }
  }
`
