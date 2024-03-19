import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import Modal from "react-modal"
import ImageOpt from "./ImageOpt"

const SimpleContent = ({ module }) => {
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
      backgroundColor: "rgba(24, 36, 36, 0.9)",
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
    if (module.sectionStyle === "style_two") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`intro-content pt-60 lgscreen:pt-40 ${
            module.extraClass ? ` ${module.extraClass}` : ""
          }`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="w-[920px] mx-auto text-center lgscreen:w-full lgscreen:px-20"
          >
            {module?.bulletPoints && (
              <motion.div variants={animFade} className="content-list pb-20">
                <ul className="flex flex-wrap justify-center gap-x-[30px]">
                  {module.bulletPoints.map((item, i) => {
                    return <li key={i}>{item.point}</li>
                  })}
                </ul>
              </motion.div>
            )}
            {module?.heading && (
              <motion.div variants={animFade} className="title-green">
                <h3>{parse(module.heading)}</h3>
              </motion.div>
            )}
            {module?.shortDescription && (
              <motion.div
                variants={animFade}
                className="content pt-15 w-[748px] mx-auto text-center lgscreen:w-full lgscreen:px-20"
              >
                <p>{parse(module.shortDescription)}</p>
              </motion.div>
            )}

            {module?.buttonOne && (
              <motion.div
                variants={animFade}
                className="mt-30 flex flex-wrap justify-center gap-x-[20px]"
              >
                {module?.showMailIcon ? (
                  <Link
                    to={module.buttonOne.url}
                    className="btn btn-green-border flex flex-wrap items-center gap-x-2"
                    target={module.buttonOne.target}
                  >
                    {module.buttonOne.title}{" "}
                    <img
                      src="/../images/mail.svg"
                      width={12}
                      height={12}
                      loading="lazy"
                      alt="Mail"
                    />{" "}
                  </Link>
                ) : (
                  <Link
                    to={module.buttonOne.url}
                    className="btn btn-green-border"
                    target={module.buttonOne.target}
                  >
                    {module.buttonOne.title}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )
    }
    if (module.sectionStyle === "style_one") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`intro-content py-60 lgscreen:py-40 ${
            module.extraClass ? ` ${module.extraClass}` : ""
          }`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="w-[748px] mx-auto text-center lgscreen:w-full lgscreen:px-20"
          >
            {module?.preIcon && (
              <motion.div
                variants={animFade}
                className="flex flex-wrap justify-center gap-x-5 mb-20"
              >
                {module.preIcon.length > 0 &&
                  module.preIcon.map((img, i) => (
                    <img
                      src={img.icon.mediaItemUrl}
                      width={62}
                      height={44}
                      loading="lazy"
                      alt={img.icon.altText}
                      key={i}
                    />
                  ))}
              </motion.div>
            )}

            {module?.heading && (
              <motion.div variants={animFade} className="title-green">
                <h3>{parse(module.heading)}</h3>
              </motion.div>
            )}
            {module?.shortDescription && (
              <motion.div variants={animFade} className="content pt-15">
                <p>{parse(module.shortDescription)}</p>
              </motion.div>
            )}

            <motion.div
              variants={animFade}
              className="mt-30 flex flex-wrap justify-center gap-x-[20px]"
            >
              {module?.buttonOne && (
                <Link
                  to={module.buttonOne.url}
                  className="btn btn-green-border"
                  target={module.buttonOne.target}
                >
                  {module.buttonOne.title}
                </Link>
              )}
              {module?.openMap && (
                <button
                  to="/"
                  className="btn btn-link flex flex-wrap gap-x-2 items-center"
                  onClick={() => {
                    openModalMap()
                  }}
                >
                  <img
                    src="../images/map-icon.svg"
                    width={15}
                    height={15}
                    loading="lazy"
                    alt="art-track"
                  />{" "}
                  View on map
                </button>
              )}
            </motion.div>
          </motion.div>
          {module?.openMap && (
            <Modal
              isOpen={modalIsOpenMap}
              style={mapmodal}
              onRequestClose={closeModalMap}
              contentLabel="content Modal"
              ariaHideApp={false}
            >
              <div className="zigzag-modal-popup bg-remove h-full p-50 lgscreen:p-30">
                <button
                  onClick={closeModalMap}
                  className="absolute z-9 right-10 top-10 bg-white flex items-center justify-center w-[40px] h-[40px] lgscreen:bg-white-100 lgscreen:rounded-100"
                >
                  <img
                    src="../../images/close.svg"
                    width={16}
                    height={16}
                    alt="close-icon"
                    className="lgscreen:invert-[1]"
                  />
                </button>
                <div className="bg-white-100 h-full ">
                  <ImageOpt
                    imgData={module.mapImage.mediaItemUrl}
                    width={""}
                    height={""}
                    imgAlt={module.mapImage.altText}
                    imgLoad="lazy"
                    imgClass="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Modal>
          )}
        </motion.section>
      )
    }
  }
  return null
}

export default SimpleContent
export const PageSimpleContentFragment = graphql`
  fragment PageSimpleContentFragment on WpPage_Pagecontent_PageContent_SimpleContent {
    extraId
    extraClass
    hideSection
    sectionStyle
    heading
    preHeading
    shortDescription
    preIcon {
      icon {
        altText
        mediaItemUrl
      }
    }
    bulletPoints {
      point
    }
    buttonOne {
      target
      title
      url
    }
    openMap
    mapImage {
      altText
      mediaItemUrl
    }
    showMailIcon
  }
`
