import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const IconGrid = ({ module, color }) => {
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
        className={`icongrid py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""} ${
          color?.propertyColor === "blue" ? "blueBg bg_blue" : ""
        } ${color?.propertyColor === "green" ? "greenBg bg_green" : ""}`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          className="px-20"
        >
          {module?.iconGrid && (
            <motion.div
              variants={animFade}
              className="flex flex-wrap justify-center gap-x-[30px] gap-y-[30px]"
            >
              {module?.iconGrid.length > 0 &&
                module.iconGrid.map((item, i) => {
                  return (
                    <div className="flex flex-col" key={i}>
                      <div className="icon w-[64px] h-[64px] bg-white-100 bg-opacity-20 rounded-100 flex items-center justify-center mx-auto mb-10">
                        {item?.icon && (
                          <img
                            src={item.icon.mediaItemUrl}
                            width={27}
                            height={27}
                            alt={item.icon.altText}
                            className=""
                            loading="lazy"
                          />
                        )}
                      </div>
                      {item?.iconCaption && (
                        <span className="text-white-100 uppercase text-12 tracking-[0.569px] font-390 w-[120px] text-center mx-auto">
                          {parse(item.iconCaption)}
                        </span>
                      )}
                    </div>
                  )
                })}
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default IconGrid
export const PropertyIconGridFragment = graphql`
  fragment PropertyIconGridFragment on WpProperty_Propertycontent_PropertyContent_IconGrid {
    extraId
    extraClass
    hideSection
    iconGrid {
      iconCaption
      icon {
        altText
        mediaItemUrl
      }
    }
  }
`
