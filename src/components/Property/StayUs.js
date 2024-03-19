import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"

const StayUs = ({ module, color }) => {
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
    if (module.sectionStyle === "style_one") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`gallery-slider-full bg-opacity-[0.08] py-50 pt-100 lgscreen:py-30 lgscreen:pt-30 ${
            module.extraClass ? ` ${module.extraClass}` : ""
          } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""} ${
            color?.propertyColor === "blue" ? "blueBg bg_blue" : ""
          } ${color?.propertyColor === "green" ? "greenBg bg_brown" : ""}`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="px-[180px] laptop:px-60 lgscreen:px-20"
          >
            <motion.div variants={animFade} className="intro-content">
              <div className="w-[910px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
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
              </div>
            </motion.div>
            {module?.sliderImages && (
              <motion.div
                variants={animFade}
                className="relative mt-40 bg-white-100 p-15 pb-45"
              >
                <Swiper
                  spaceBetween={10}
                  loop={true}
                  slidesPerView={"11"}
                  centeredSlides={true}
                  speed={1500}
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
                  {module?.sliderImages.length > 0 &&
                    module.sliderImages.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="img singleimg relative">
                            {item?.image && (
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={660}
                                height={525}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                                imgClass="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      )
                    })}

                  <div className="swiper-arrow arrow-big flex gap-x-5">
                    <button
                      className="absolute bottom-25 z-9 right-55 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                      onClick={() =>
                        handlePrevClick(".gallery-slider-full .swiper")
                      }
                    >
                      <img
                        src="/../images/swiper-arrow.svg"
                        className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                        width={8}
                        height={8}
                        loading="lazy"
                        alt="Arrow"
                      />
                    </button>
                    <button
                      className="absolute bottom-25 z-9 right-20 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                      onClick={() =>
                        handleNextClick(".gallery-slider-full .swiper")
                      }
                    >
                      <img
                        src="/../images/swiper-arrow.svg"
                        className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180"
                        width={8}
                        height={8}
                        loading="lazy"
                        alt="Arrow"
                      />
                    </button>
                  </div>
                </Swiper>
                <div className="slider-content pt-20 pl-15 pr-20 lgscreen:pl-0 lgscreen:pr-0">
                  <div className="flex flex-wrap justify-between gap-y-[15px]">
                    <div className="left-content w-[759px]">
                      {module?.bottomHeading && (
                        <h5 className="font-420 text-[28px] mdscreen:text-22 tracking-[1.4px]">
                          {parse(module.bottomHeading)}
                        </h5>
                      )}
                      {module?.bottomDescription && (
                        <div className="content lgscreen:pt-10">
                          <p>{parse(module.bottomDescription)}</p>
                        </div>
                      )}
                    </div>
                    {module?.bookingIcon && (
                      <div className="flex flex-wrap gap-x-[10px]">
                        {module?.bookingIcon.length > 0 &&
                          module.bookingIcon.map((item, i) => {
                            return (
                              <div
                                className="w-[32px] h-[32px] bg-brown-300 rounded-100 flex items-center justify-center bg-opacity-10"
                                key={i}
                              >
                                {item?.icon && (
                                  <img
                                    src={item.icon.mediaItemUrl}
                                    width={16}
                                    height={12}
                                    alt={item.icon.altText}
                                    className=""
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )
    }
    if (module.sectionStyle === "style_two") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className={`gallery-slider-full bg-opacity-[0.08] py-50 pt-100 lgscreen:py-30 lgscreen:pt-30 ${
            module.extraClass ? ` ${module.extraClass}` : ""
          } ${color?.propertyColor === "brown" ? "brownBg bg_brown" : ""} ${
            color?.propertyColor === "blue" ? "blueBg bg_blue" : ""
          } ${color?.propertyColor === "green" ? "greenBg bg_brown" : ""}`}
          id={module.extraId}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="container-fluid"
          >
            <motion.div variants={animFade} className="intro-content">
              <div className="w-[910px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
                {module?.heading && (
                  <motion.div className="title-green">
                    <h3>{parse(module.heading)}</h3>
                  </motion.div>
                )}
                {module?.shortDescription && (
                  <motion.div className="content pt-15 w-[748px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
                    <p>{parse(module.shortDescription)}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
            {module?.gridBox && (
              <motion.div variants={animFade} className="relative mt-40">
                <div className="flex flex-wrap -mx-20 lgscreen:mx-0 gap-y-[30px]">
                  {module?.gridBox.length > 0 &&
                    module.gridBox.map((item, i) => {
                      //const delay = i % 2 === 0 ? 1500 : 3500
                      return (
                        <div
                          className="lg:w-6/12 w-full px-10 lgscreen:px-0"
                          key={i}
                        >
                          <div className="bg-white-100 p-15 pb-45">
                            {item?.boxSlider && (
                              <Swiper
                                spaceBetween={10}
                                loop={true}
                                slidesPerView={"11"}
                                centeredSlides={true}
                                speed={1500}
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
                                modules={[Navigation]}
                                className={`slideitem-${i}`}
                              >
                                {item?.boxSlider.length > 0 &&
                                  item.boxSlider.map((item, j) => {
                                    return (
                                      <SwiperSlide key={j}>
                                        <div className="img relative">
                                          {item?.image && (
                                            <ImageOpt
                                              imgData={item.image.mediaItemUrl}
                                              width={660}
                                              height={525}
                                              imgAlt={item.image.altText}
                                              imgLoad="lazy"
                                              imgClass="w-full h-full object-cover"
                                            />
                                          )}
                                        </div>
                                      </SwiperSlide>
                                    )
                                  })}
                                <div className="swiper-arrow arrow-big flex gap-x-5">
                                  <button
                                    className="absolute bottom-25 z-9 right-55 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                                    onClick={() =>
                                      handlePrevClick(
                                        `.gallery-slider-full .slideitem-${i}`
                                      )
                                    }
                                  >
                                    <img
                                      src="/../images/swiper-arrow.svg"
                                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                                      width={8}
                                      height={8}
                                      loading="lazy"
                                      alt="Arrow"
                                    />
                                  </button>
                                  <button
                                    className="absolute bottom-25 z-9 right-20 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                                    onClick={() =>
                                      handleNextClick(
                                        `.gallery-slider-full .slideitem-${i}`
                                      )
                                    }
                                  >
                                    <img
                                      src="/../images/swiper-arrow.svg"
                                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180"
                                      width={8}
                                      height={8}
                                      loading="lazy"
                                      alt="Arrow"
                                    />
                                  </button>
                                </div>
                              </Swiper>
                            )}
                            <div className="slider-content pt-20 pr-20">
                              <div className="flex flex-wrap justify-between gap-y-[15px]">
                                <div className="left-content">
                                  <div className="flex flex-wrap justify-between gap-y-2">
                                    {item?.boxHeading && (
                                      <h5 className="font-420 text-[28px] mdscreen:text-22 tracking-[1.4px]">
                                        {parse(item.boxHeading)}
                                      </h5>
                                    )}
                                    <div>
                                      {item?.boxIcon && (
                                        <div className="flex flex-wrap gap-x-[10px]">
                                          {item?.boxIcon.length > 0 &&
                                            item.boxIcon.map((item, k) => {
                                              return (
                                                <div
                                                  key={k}
                                                  className="w-[32px] h-[32px] bg-blue-200 rounded-100 flex items-center justify-center bg-opacity-10"
                                                >
                                                  {item?.icon && (
                                                    <img
                                                      src={
                                                        item.icon.mediaItemUrl
                                                      }
                                                      className=""
                                                      width={16}
                                                      height={12}
                                                      loading="lazy"
                                                      alt={item.icon.altText}
                                                    />
                                                  )}
                                                </div>
                                              )
                                            })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {item?.boxDescription && (
                                    <div className="content pt-10">
                                      <p>{item.boxDescription}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )
    }
  }
  return null
}

export default StayUs
export const PropertyStayUsFragment = graphql`
  fragment PropertyStayUsFragment on WpProperty_Propertycontent_PropertyContent_StayUs {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    bottomHeading
    bottomDescription
    sliderImages {
      image {
        altText
        mediaItemUrl
      }
    }
    bookingIcon {
      icon {
        altText
        mediaItemUrl
      }
    }
    sectionStyle
    gridBox {
      boxHeading
      boxDescription
      boxIcon {
        icon {
          altText
          mediaItemUrl
        }
      }
      boxSlider {
        image {
          altText
          mediaItemUrl
        }
      }
    }
  }
`
