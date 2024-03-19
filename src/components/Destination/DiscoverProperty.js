import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./../ImageOpt"

const DiscoverProperty = ({ module }) => {
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
        className={`ImgGrid bg-brown-500 bg-opacity-10 addPattern py-80 lgscreen:py-30 relative${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid relative"
        >
          <div className="w-[900px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
            {module?.heading && (
              <motion.div variants={animFade} className="title-green">
                <h3>{module.heading}</h3>
              </motion.div>
            )}
            {module?.description && (
              <motion.div variants={animFade} className="content pt-15">
                {parse(module.description)}
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-y-[70px] lgscreen:gap-y-[35px] mt-40">
            {module.selectProperty.map((item, i) => (
              <div className="lg:w-6/12 w-full pr-20 lgscreen:pr-0" key={i}>
                <motion.div
                  variants={animFade}
                  className={`img-bx ${item.propertyContent.propertyColor}Border`}
                >
                  <div className="img relative">
                    <Link to={item.uri}>
                      {item?.featuredImage?.node && (
                        <ImageOpt
                          imgData={item.featuredImage.node.mediaItemUrl}
                          width={640}
                          height={369}
                          imgAlt={item.featuredImage.node.altText}
                          imgLoad="lazy"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="pt-25">
                    <motion.div variants={animFade}>
                      <span className="text-15 font-primary italic font-400 -tracking-[0.3px] text-green-100">
                        {item.propertyContent.destination}
                      </span>
                    </motion.div>
                    <motion.div variants={animFade} className="title-green">
                      <h4>{item.title}</h4>
                    </motion.div>
                    <motion.div
                      variants={animFade}
                      className="content w-[530px] xlscreen:w-full xlscreen:pr-20"
                    >
                      {parse(item.excerpt)}
                    </motion.div>
                    <motion.div
                      variants={animFade}
                      className="flex flex-wrap mt-20 gap-x-[20px]"
                    >
                      <Link to={item.uri} className="btn btn-green-border">
                        explore PROPERTY
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default DiscoverProperty
export const DestinationDiscoverPropertyFragment = graphql`
  fragment DestinationDiscoverPropertyFragment on WpDestination_Destinationcontent_DestinationContent_DiscoverProperty {
    extraId
    extraClass
    hideSection
    heading
    description
    selectProperty {
      ... on WpProperty {
        excerpt
        title
        uri
        propertyContent {
          destination
          propertyColor
        }
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
`
