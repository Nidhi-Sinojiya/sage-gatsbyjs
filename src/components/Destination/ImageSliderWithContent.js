import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./../ImageOpt"

const ImageSliderWithContent = ({ module }) => {
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
        className={`gallery-slider py-60 lgscreen:py-30 ${
          module.enableBackground ? "bg-brown-500 bg-opacity-10" : ""
        } ${module.extraClass ? ` ${module.extraClass}` : ""}`}
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
            <div className="flex flex-wrap items-center">
              <motion.div
                variants={animFade}
                className={`lg:w-[52%] w-full ${
                  module.imagePosition === "right"
                    ? "order-2 lgscreen:order-1"
                    : "order-1 lgscreen:order-2"
                }`}
              >
                <div className="relative">
                  {module?.images && (
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
                      {module.images.map((item, i) => (
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
                            {item?.description && (
                              <div className="slidercontent absolute bottom-0 pl-30 pb-20 w-full">
                                <h4 className="text-white-100 text-17 leading-20 font-400 font-primary italic -tracking-[0.34px] normal-case relative z-9">
                                  {item.description}
                                </h4>
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}

                      <div className="swiper-arrow arrow-big flex gap-x-5">
                        <button
                          className="absolute bottom-20 z-9 right-80 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                          onClick={() =>
                            handlePrevClick(".gallery-slider .swiper")
                          }
                        >
                          <img
                            src="../../images/swiper-arrow.svg"
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
                            src="../../images/swiper-arrow.svg"
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
                </div>
              </motion.div>
              <div
                className={`lg:w-[48%] w-full ${
                  module.imagePosition === "right"
                    ? "order-1 lgscreen:order-2"
                    : "order-2 lgscreen:order-1"
                }`}
              >
                <div className="gallery-slider-content px-75 laptop:px-30 lgscreen:px-0 lgscreen:pt-30">
                  <motion.div variants={animFade}>
                    {module?.preHeading && (
                      <span className="uppercase text-green-100 text-11 tracking-[0.55px] font-420 pb-10 inline-block">
                        {module.preHeading}
                      </span>
                    )}
                  </motion.div>
                  {module?.heading && (
                    <motion.div variants={animFade} className="title-green">
                      <h3>{module.heading}</h3>
                    </motion.div>
                  )}
                  {module?.description && (
                    <motion.div
                      variants={animFade}
                      className="content global-list pt-10"
                    >
                      {parse(module.description)}
                    </motion.div>
                  )}
                  {module?.button && (
                    <motion.div
                      variants={animFade}
                      className="mt-30 flex flex-wrap gap-x-[5px] gap-y-[10px]"
                    >
                      <Link
                        to={module.button.url}
                        className="btn btn-green-border"
                        target={module.button.target}
                      >
                        {module.button.title}
                      </Link>
                    </motion.div>
                  )}
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

export default ImageSliderWithContent
export const DestinationImageSliderWithContentFragment = graphql`
  fragment DestinationImageSliderWithContentFragment on WpDestination_Destinationcontent_DestinationContent_ImageSliderWithContent {
    extraId
    extraClass
    hideSection
    heading
    preHeading
    description
    enableBackground
    imagePosition
    button {
      target
      title
      url
    }
    images {
      description
      image {
        altText
        mediaItemUrl
      }
    }
  }
`
