import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"

const ImageContentWithSlider = ({ module }) => {
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
        className={`zigzag-slider bg-brown-400 bg-opacity-[0.12] py-80 addPattern lgscreen:py-30 relative ${
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
          <div className="flex flex-wrap items-center">
            <motion.div variants={animFade} className="lg:w-6/12 w-full">
              <div className="relative">
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
                  modules={[Navigation]}
                >
                  {module?.imageSlider.length > 0 &&
                    module.imageSlider.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="img relative">
                            {item?.image && (
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={601}
                                height={703}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                                imgClass="w-full h-full object-cover"
                              />
                            )}
                            <div className="slidercontent absolute bottom-60 mdscreen:bottom-30 text-center w-[382px] mdscreen:w-full mdscreen:px-20 mx-auto left-50per translate-x-minus_50 text-white-100 z-9">
                              {item?.imageHeading && (
                                <h4 className="text-white-100 text-[36px] tracking-[0.76px] capitalize font-420 font-primary italic">
                                  {parse(item.imageHeading)}
                                </h4>
                              )}
                              {item?.imageContent && (
                                <p>{parse(item.imageContent)}</p>
                              )}
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  <div className="swiper-arrow arrow-big flex gap-x-5">
                    <button
                      className="absolute top-50per translate-y-minus_50 z-9 left-40 mdscreen:left-20 w-[45px] h-[45px] mdscreen:w-[35px] mdscreen:h-[35px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                      onClick={() => handlePrevClick(".zigzag-slider .swiper")}
                    >
                      <img
                        src="images/swiper-arrow.svg"
                        className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                        width={10}
                        height={10}
                        loading="lazy"
                        alt="Arrow"
                      />
                    </button>
                    <button
                      className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[45px] h-[45px] mdscreen:w-[35px] mdscreen:h-[35px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                      onClick={() => handleNextClick(".zigzag-slider .swiper")}
                    >
                      <img
                        src="images/swiper-arrow.svg"
                        className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180"
                        width={10}
                        height={10}
                        loading="lazy"
                        alt="Arrow"
                      />
                    </button>
                  </div>
                </Swiper>
              </div>
            </motion.div>
            <div className="lg:w-6/12 w-full lgscreen:pt-30">
              <div className="zigzag-slider-content pl-150 laptop:pl-80 lgscreen:pl-0">
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
                  className="mt-30 flex flex-wrap gap-x-2 gap-y-2"
                >
                  {module?.buttonOne && (
                    <Link
                      to={module.buttonOne.url}
                      className="btn btn-green"
                      target={module.buttonOne.target}
                    >
                      {module.buttonOne.title}
                    </Link>
                  )}
                  {module?.buttonTwo && (
                    <Link
                      to={module.buttonTwo.url}
                      className="btn btn-green-border"
                      target={module.buttonTwo.target}
                    >
                      {module.buttonTwo.title}
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default ImageContentWithSlider
export const PageImageContentWithSliderFragment = graphql`
  fragment PageImageContentWithSliderFragment on WpPage_Pagecontent_PageContent_ImageContentWithSlider {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    buttonTwo {
      target
      title
      url
    }
    buttonOne {
      target
      title
      url
    }
    imageSlider {
      imageHeading
      imageContent
      image {
        altText
        mediaItemUrl
      }
    }
  }
`
