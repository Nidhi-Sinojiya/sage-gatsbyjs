import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import Modal from "react-modal"
import ImageOpt from "./ImageOpt"

const InformationContent = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [modalIsOpenMap, setIsOpenMap] = React.useState(false)
  function openModalMap(data) {
    document.body.classList.add("modal-open")
    setIsOpenMap(true)
  }
  function closeModalMap() {
    document.body.classList.remove("modal-open")
    setIsOpenMap(false)
  }
  const mapmodal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      border: "0",
      borderRadius: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "#182424",
    },
    overlay: {
      zIndex: "9999",
    },
  }

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
        className={`zigzag bg-brown-500 bg-opacity-10 py-80 lgscreen:py-40 ${
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
          <div className="flex flex-wrap items-center">
            <motion.div variants={animFade} className="lg:w-6/12 w-full">
              {module?.image && (
                <div className="img landscape relative">
                  <ImageOpt
                    imgData={module.image.mediaItemUrl}
                    width={658}
                    height={472}
                    imgAlt={module.image.altText}
                    imgLoad="lazy"
                  />
                </div>
              )}
            </motion.div>
            <div className="lg:w-6/12 w-full lgscreen:pt-30">
              <div className="zigzagcontent pl-90 xlscreen:pl-30 w-full lgscreen:pl-0 max-w-[600px]">
                {module?.heading && (
                  <motion.div variants={animFade} className="title-green">
                    <h3>{parse(module.heading)}</h3>
                  </motion.div>
                )}
                <motion.div variants={animFade} className="content-list pt-10">
                  <ul className="flex flex-wrap gap-x-[30px]">
                    {module?.points.length > 0 &&
                      module.points.map((item, i) => {
                        return (
                          <li key={i}>
                            {" "}
                            <Link className="hover:opacity-50" to={item.link.url} targte={item.link.target}>
                              {item.singlePoint}
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </motion.div>
                {module?.shortDescription && (
                  <motion.div variants={animFade} className="content pt-10">
                    <p>{parse(module.shortDescription)}</p>
                  </motion.div>
                )}
                <motion.div
                  variants={animFade}
                  className="mt-30 flex flex-wrap gap-x-[20px]"
                >
                  {module?.button && (
                    <Link
                      to={module.button.url}
                      className="btn btn-green-border"
                      targte={module.button.target}
                    >
                      {module.button.title}
                    </Link>
                  )}
                  {module?.mapImage && (
                    <button
                      to="/"
                      className="btn btn-link flex flex-wrap gap-x-2 items-center"
                      onClick={() => {
                        openModalMap()
                      }}
                    >
                      {module?.mapButton && (
                        <img
                          src="images/map-icon.svg"
                          width={15}
                          height={15}
                          loading="lazy"
                          alt="Map"
                        />
                      )}
                      {module?.mapButton && <div>{module.mapButton}</div>}
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        {module?.mapImage && (
          <Modal
            isOpen={modalIsOpenMap}
            style={mapmodal}
            onRequestClose={closeModalMap}
            contentLabel="Info Modal"
            ariaHideApp={false}
          >
            <div className="zigzag-modal-popup flex flex-col items-center justify-center bg-remove h-full p-50 lgscreen:p-0">
              <button
                onClick={closeModalMap}
                className="absolute z-9 right-30 top-30 flex items-center justify-center w-[40px] h-[40px]"
              >
                <img
                  src="../images/close.svg"
                  width={16}
                  height={16}
                  alt="close-icon"
                />
              </button>
              {module?.mapImage && (
                <div className="bg-white-100 h-auto lg:h-full ">
                  <ImageOpt
                    imgData={module.mapImage.mediaItemUrl}
                    width={1440}
                    height={712}
                    imgAlt={module.mapImage.altText}
                    imgLoad="lazy"
                    imgClass="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </Modal>
        )}
      </motion.section>
    )
  }
  return null
}

export default InformationContent
export const PageInformationContentFragment = graphql`
  fragment PageInformationContentFragment on WpPage_Pagecontent_PageContent_InformationContent {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    mapButton
    points {
      singlePoint
      link {
        target
        title
        url
      }
    }
    image {
      altText
      mediaItemUrl
    }
    button {
      target
      title
      url
    }
    mapImage {
      altText
      mediaItemUrl
    }
  }
`
