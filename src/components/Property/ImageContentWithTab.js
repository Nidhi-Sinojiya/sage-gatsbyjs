import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"

const ImageContentWithTab = ({ module, color }) => {
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

  const res = module.tabContent[0].tabName.replace(/ /g, "")
  const [tabOption, setTabOption] = useState(res)

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
        className={`gallery-slider py-60 lgscreen:py-30 ${
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
          <div className="grid grid-cols-1 gap-y-[45px]">
            <div className="flex flex-wrap">
              <div className="lg:w-[52%] w-full">
                <motion.div variants={animFade} className="relative">
                  {module?.sliderImage && (
                    <Swiper
                      spaceBetween={10}
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
                          slidesPerView: 1,
                        },
                      }}
                      modules={[Autoplay, Navigation]}
                    >
                      {module?.sliderImage.length > 0 &&
                        module.sliderImage.map((item, i) => {
                          return (
                            <SwiperSlide key={i}>
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
                                {item?.imageCaption && (
                                  <div className="slidercontent absolute bottom-0 pl-30 pb-20 w-full">
                                    <h4 className="text-white-100 text-17 leading-20 font-400 font-primary italic -tracking-[0.34px] normal-case relative z-9">
                                      {item.imageCaption}
                                    </h4>
                                  </div>
                                )}
                              </div>
                            </SwiperSlide>
                          )
                        })}

                      <div className="swiper-arrow arrow-big flex gap-x-5">
                        <button
                          className="absolute bottom-20 z-9 right-80 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                          onClick={() =>
                            handlePrevClick(".gallery-slider .swiper")
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
                          className="absolute bottom-20 z-9 right-40 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                          onClick={() =>
                            handleNextClick(".gallery-slider .swiper")
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
                </motion.div>
              </div>
              <div className="lg:w-[48%] w-full pt-100 desktop3:pt-20 laptop:pt-0 lgscreen:pt-0">
                <div className="gallery-slider-content px-75 laptop:px-30 lgscreen:px-0 lgscreen:pt-30">
                  {module?.heading && (
                    <div className="title-green">
                      <motion.h3 variants={animFade}>
                        {parse(module.heading)}
                      </motion.h3>
                    </div>
                  )}
                  {module?.tabContent && (
                    <motion.div
                      variants={animFade}
                      className="tabs-horizontal pt-30 pb-10 pl-0 lgscreen:pt-10"
                    >
                      <ul className="tabs w-full flex flex-wrap gap-y-5 gap-x-[20px]">
                        {module.tabContent.map((item, i) => {
                          const res = item.tabName.replace(/ /g, "")
                          return (
                            <li
                              key={i}
                              onClick={() => {
                                setTabOption(res)
                              }}
                              className={`tab-link cursor-pointer text-green-100 text-13 font-600 tracking-[1.04px] uppercase opacity-[0.65] ${
                                tabOption === res ? "tab-current" : ""
                              }`}
                              data-tab={res}
                              onKeyDown={() => {
                                setTabOption(res)
                              }}
                              aria-hidden="true"
                            >
                              {item.tabName}
                            </li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                  {module.tabContent.map((item, i) => {
                    const res = item.tabName.replace(/ /g, "")
                    return (
                      <motion.div
                        variants={animFade}
                        key={i}
                        id={res}
                        className={`tab-content ${
                          tabOption === res ? "tab-current" : "hidden"
                        }`}
                      >
                        <div className="content global-list pt-10">
                          {item?.tabDescription && (
                            <p>{parse(item.tabDescription)}</p>
                          )}
                          {item?.bulletPoints && (
                            <ul>
                              {item?.bulletPoints.length > 0 &&
                                item.bulletPoints.map((btPoint, i) => {
                                  return <li key={i}>{btPoint.point}</li>
                                })}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                  {module?.tagLine && (
                    <motion.div variants={animFade}>
                      <span className="text-color uppercase text-15 tracking-[0.75px] font-420 mt-30 mb-10 inline-block">
                        {module.tagLine}
                      </span>
                    </motion.div>
                  )}
                  <motion.div
                    variants={animFade}
                    className="flex flex-wrap gap-x-[5px] gap-y-[10px]"
                  >
                    {module?.bookingButton && (
                      <Link
                        to={module.bookingButton.url}
                        className="btn btn-green"
                        target={module.bookingButton.target}
                      >
                        {module.bookingButton.title}
                      </Link>
                    )}
                    {module?.enquiryButton && (
                      <Link
                        to={module.enquiryButton.url}
                        className="btn btn-green-border"
                        target={module.enquiryButton.target}
                      >
                        {module.enquiryButton.title}
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default ImageContentWithTab
export const PropertyImageContentWithTabFragment = graphql`
  fragment PropertyImageContentWithTabFragment on WpProperty_Propertycontent_PropertyContent_ImageContentWithTab {
    extraId
    extraClass
    hideSection
    heading
    sliderImage {
      imageCaption
      image {
        altText
        mediaItemUrl
      }
    }
    tabContent {
      tabName
      tabDescription
      bulletPoints {
        point
      }
    }
    tagLine
    enquiryButton {
      target
      title
      url
    }
    bookingButton {
      target
      title
      url
    }
  }
`
