import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"

const ImageSlider = ({ module, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
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
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`fullbx-slider small-slider py-100 lgscreen:py-30 ${
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
          {module?.imageSlider && (
            <motion.div
              variants={animFade}
              className="relative mt-50 lgscreen:mt-25"
            >
              <Swiper
                spaceBetween={20}
                loop={true}
                slidesPerView={"11"}
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
                    slidesPerView: 2.1,
                  },
                }}
                modules={[Autoplay, Navigation]}
              >
                {module?.imageSlider.length > 0 &&
                  module.imageSlider.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="img relative">
                          {item?.slideImage && (
                            <ImageOpt
                              imgData={item.slideImage.mediaItemUrl}
                              width={640}
                              height={369}
                              imgAlt={item.slideImage.altText}
                              imgLoad="lazy"
                              imgClass="w-full h-full object-cover"
                            />
                          )}
                          {item?.imageCaption && (
                            <div className="slidercontent absolute bottom-20 text-center w-full text-white-100 z-9">
                              <span className="italic text-22 font-primary font-400 -tracking-[0.44px]">
                                {item.imageCaption}
                              </span>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    )
                  })}
                <div className="swiper-arrow arrow-big flex gap-x-5">
                  <button
                    className="absolute top-50per translate-y-minus_50 z-9 left-40 mdscreen:left-20 w-[61px] h-[61px] mdscreen:w-[40px] mdscreen:h-[40px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handlePrevClick(".fullbx-slider .swiper")}
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 mdscreen:w-[10px]"
                      width={15}
                      height={15}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                  <button
                    className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[61px] h-[61px] mdscreen:w-[40px] mdscreen:h-[40px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handleNextClick(".fullbx-slider .swiper")}
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180 mdscreen:w-[10px]"
                      width={15}
                      height={15}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                </div>
              </Swiper>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default ImageSlider
export const PropertyImageSliderFragment = graphql`
  fragment PropertyImageSliderFragment on WpProperty_Propertycontent_PropertyContent_ImageSlider {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    imageSlider {
      imageCaption
      slideImage {
        altText
        mediaItemUrl
      }
    }
  }
`
