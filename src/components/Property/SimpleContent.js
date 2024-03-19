import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import Modal from "react-modal"
import ImageOpt from "./ImageOpt"

import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"

const SimpleContent = ({ module, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [modalIsOpenGallery, setIsOpenGallery] = React.useState(false)

  function openModalGallery(data) {
    document.body.classList.add("modal-open")
    setIsOpenGallery(true)
  }
  function closeModalGallery() {
    document.body.classList.remove("modal-open")
    setIsOpenGallery(false)
  }
  const gallerymodal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      border: "0",
      borderRadius: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(24, 36, 36, 0.80)",
    },
    overlay: {
      zIndex: "9999",
    },
  }
  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
  }
  const handlePrevClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slidePrev()
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
    if (module.sectionStyle === "style_one") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`view-gallery py-40 pt-80 lgscreen:pt-30 lgscreen:pb-0 ${
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
          >
            <div className="w-[900px] lgscreen:w-full lgscreen:px-20 mx-auto text-center">
              {module?.heading && (
                <motion.h2
                  variants={animFade}
                  className="font-primary italic text-55 leading-[60px] font-400 normal-case lgscreen:text-[34px] lgscreen:leading-[40px] mdscreen:text-40 mdscreen:leading-[30px] smscreen2:text-[28px]"
                >
                  {parse(module.heading)}
                </motion.h2>
              )}
              {module?.galleryImages && (
                <motion.div variants={animFade}>
                  <button
                    className="btn btn-link flex flex-wrap gap-x-2 items-center justify-center mx-auto mt-25 lgscreen:mt-0 outline-none"
                    onClick={() => {
                      openModalGallery()
                    }}
                  >
                    {module?.galleryButton && (
                      <span className="flex flex-wrap gap-x-2 items-center">
                        <img
                          src="/../images/art-track.svg"
                          width={15}
                          height={15}
                          loading="lazy"
                          alt="art-track"
                        />{" "}
                        {module.galleryButton}
                      </span>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
          <Modal
            isOpen={modalIsOpenGallery}
            style={gallerymodal}
            onRequestClose={closeModalGallery}
            contentLabel="gallery Modal"
            ariaHideApp={false}
          >
            <button
                onClick={closeModalGallery}
                className="absolute z-9 right-15 top-15 bg-white flex items-center justify-center w-[40px] h-[40px] lgscreen:bg-white-100 lgscreen:rounded-100"
              >
                <img
                  src="/../images/close.svg"
                  width={16}
                  height={16}
                  alt="close-icon"
                  className="lgscreen:invert-[1]"
                />
              </button>
            <div className="flex flex-col items-center justify-center relative w-full h-full">
              
              <Swiper
                className="lg:h-full w-full view-gallery-slider"
                spaceBetween={10}
                loop={true}
                slidesPerView={"1"}
                centeredSlides={true}
                speed={1500}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: false,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  641: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
                  },
                }}
                modules={[Autoplay, Navigation]}
              >
                {module?.galleryImages.length > 0 &&
                  module.galleryImages.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="img relative lgscreen:h-full">
                          <ImageOpt
                            imgData={item.mediaItemUrl}
                            width={824}
                            height={637}
                            imgAlt={item.altText}
                            imgLoad="lazy"
                            imgClass="w-full h-full lg:h-screen object-cover lg:object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    )
                  })}
                <div className="swiper-arrow arrow-big flex gap-x-5">
                  <button
                    className="absolute top-50per translate-y-minus_50 z-9 left-40 mdscreen:left-20 w-[61px] h-[61px] mdscreen:w-[40px] mdscreen:h-[40px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handlePrevClick(".view-gallery-slider")}
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 mdscreen:w-[10px]"
                      width={15}
                      height={15}
                      loading="lazy"
                      alt="Arrow-left"
                    />
                  </button>
                  <button
                    className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[61px] h-[61px] mdscreen:w-[40px] mdscreen:h-[40px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handleNextClick(".view-gallery-slider")}
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180 mdscreen:w-[10px]"
                      width={15}
                      height={15}
                      loading="lazy"
                      alt="Arrow-right"
                    />
                  </button>
                </div>
              </Swiper>
            </div>
          </Modal>
        </motion.section>
      )
    }
    if (module.sectionStyle === "style_two") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`simple-content bg-opacity-10 pt-50 lgscreen:pt-30 ${
            module.extraClass ? ` ${module.extraClass}` : ""
          } ${color?.propertyColor === "brown" ? "brownBg" : ""} ${
            color?.propertyColor === "green" ? "greenBg" : ""
          } ${color?.propertyColor === "blue" ? "bg-blue-300" : ""}`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="w-[850px] lgscreen:w-full lgscreen:px-20 mx-auto text-center"
          >
            {module?.heading && (
              <motion.h5
                variants={animFade}
                className="font-primary italic normal-case tracking-[0px]"
              >
                {parse(module.heading)}
              </motion.h5>
            )}
          </motion.div>
        </motion.section>
      )
    }
  }
  return null
}

export default SimpleContent
export const PropertySimpleContentFragment = graphql`
  fragment PropertySimpleContentFragment on WpProperty_Propertycontent_PropertyContent_SimpleContent {
    extraId
    extraClass
    hideSection
    heading
    galleryButton
    galleryImages {
      altText
      mediaItemUrl
    }
    sectionStyle
  }
`
