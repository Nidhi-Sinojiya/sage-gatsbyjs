import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import Modal from "react-modal"
import ReactPlayer from "react-player"
import ImageOpt from "./ImageOpt"

const Banner = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)

  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal(data) {
    document.body.classList.add("modal-open")
    setIsOpen(true)
  }

  function closeModal() {
    document.body.classList.remove("modal-open")
    setIsOpen(false)
  }
  const customStyles = {
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
      backgroundColor: "black",
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
    if (module.bannerStyle === "style_one") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`banner ${
            module.bannerType === "half" ? "small-banner" : ""
          } relative ${module.extraClass ? ` ${module.extraClass}` : ""}`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="h-full"
          >
            {module.bannerView === "image" ? (
              <>
                {module?.backgroundImage && (
                  <ImageOpt
                    imgData={module.backgroundImage.mediaItemUrl}
                    width={1440}
                    height={712}
                    imgAlt={module.backgroundImage.altText}
                    imgLoad="eager"
                    imgClass="w-full h-full object-cover block mdscreen:hidden"
                  />
                )}

                {/* Mobile Image Start */}
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
                {/* Mobile Image End */}
              </>
            ) : (
              <>
                {module?.shortVideo && (
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    poster={module.backgroundImage.mediaItemUrl}
                  >
                    <source
                      className="w-full h-full object-cover block"
                      type="video/mp4"
                      src={module.shortVideo.url}
                    />
                  </video>
                )}
              </>
            )}

            <div className="banner-content absolute bottom-[140px] lgscreen:bottom-60 left-50per translate-x-minus_50 z-9 w-full text-center max-w-[1100px] smscreen2:max-w-full mx-auto px-20">
              <div className="video">
                {module?.heading && (
                  <motion.h1
                    variants={animFade}
                    className="text-white-100 uppercase"
                  >
                    {module.heading}
                  </motion.h1>
                )}

                {module?.heading && (
                  <motion.div
                    variants={animFade}
                    className="content white w-[850px] mx-auto lgscreen:w-full px-30 lgscreen:px-0 lgscreen:mt-30"
                  >
                    <p className="text-18 font-390">
                      {parse(module.shortDescription)}
                    </p>
                  </motion.div>
                )}

                {module?.fullVideoLink && (
                  <motion.div variants={animFade}>
                    <button
                      className="flex items-center gap-x-2 justify-center transition-all duration-300 mx-auto mt-10"
                      onClick={() => {
                        openModal()
                      }}
                    >
                      <div className="video-icon w-[18px] h-[18px] border-2 border-white-100 rounded-100 flex items-center justify-center transition-all duration-300">
                        <img
                          className="relative left-[1px]"
                          src="/../images/play-icon.svg"
                          width={7}
                          height={7}
                          loading="eager"
                          alt="Play"
                        />
                      </div>
                      <span className="uppercase text-white-100 text-13 font-420 tracking-[1.04px]">
                        watch video
                      </span>
                    </button>
                  </motion.div>
                )}
                {module?.fullVideoLink && (
                  <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={closeModal}
                    contentLabel="video Modal"
                    ariaHideApp={false}
                  >
                    <div className="video-modal-popup h-full">
                      <button
                        onClick={closeModal}
                        className="absolute xlscreen:right-30 right-60 xlscreen:top-30 top-60 bg-white flex items-center justify-center w-[40px] h-[40px] bg-white-100 rounded-100"
                      >
                        <img
                          src="/../images/close-black.svg"
                          width={16}
                          height={16}
                          alt="close-icon"
                        />
                      </button>
                      <div className="flex flex-wrap items-center h-full">
                        <div className="lg:w-12/12 w-full h-full">
                          <div className="modal-video h-full">
                            <ReactPlayer
                              className="modal-banner-video !w-full !h-full"
                              loop={true}
                              playing={true}
                              controls={false}
                              muted={false}
                              url={module.fullVideoLink.url}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          </motion.div>
        </motion.section>
      )
    }
    if (module.bannerStyle === "style_two") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`banner inner-banner relative ${
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
                imgData={module.backgroundImage.mediaItemUrl}
                width={1440}
                height={712}
                imgAlt={module.backgroundImage.altText}
                imgLoad="eager"
                imgClass="w-full h-full object-cover block mdscreen:hidden"
              />
            )}
            {/* Mobile Image Start */}
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
            {/* Mobile Image End */}
            <div className="banner-content absolute bottom-[140px] lgscreen:bottom-60 left-50per translate-x-minus_50 z-9 w-full text-center max-w-[1100px] smscreen2:max-w-full mx-auto px-20">
              <div className="container-fluid w-full">
                <motion.div
                  variants={animFade}
                  className="flex flex-wrap justify-between gap-y-3"
                >
                  {module?.heading && (
                    <div className="title-white">
                      <h2 className="text-55 leading-78 lgscreen:text-[48px] lgscreen:leading-[56px] mdscreen:text-40 mdscreen:leading-45 smscreen2:text-[28px] tracking-[1.1px] font-420">
                        {module.heading}
                      </h2>
                    </div>
                  )}
                  {module?.shortDescription && (
                    <span className="font-primary italic text-white-100 font-400 text-[26px] mdscreen:text-20 mdscreen:leading-26 text-left w-[635px] leading-[30px]">
                      {parse(module.shortDescription)}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      )
    }
  }
  return null
}

export default Banner
export const PageBannerFragment = graphql`
  fragment PageBannerFragment on WpPage_Pagecontent_PageContent_Banner {
    extraId
    extraClass
    hideSection
    bannerStyle
    bannerType
    heading
    shortDescription
    backgroundImage {
      altText
      mediaItemUrl
    }
    mobileBackgroundImage {
      altText
      mediaItemUrl
    }
    bannerView
    fullVideoLink {
      target
      title
      url
    }
    shortVideo {
      target
      title
      url
    }
  }
`
