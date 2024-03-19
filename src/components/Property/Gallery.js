import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./ImageOpt"

const Gallery = ({ module, color }) => {
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

  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
  }
  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className="gallery-bx-slider pt-100 lgscreen:pt-30"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid pr-0 lgscreen:pr-20"
        >
          <div className="top-content">
            {module?.heading && (
              <div className="title-green">
                <motion.h4 variants={animFade}>
                  {parse(module.heading)}
                </motion.h4>
              </div>
            )}
            {module?.shortDescription && (
              <motion.div
                variants={animFade}
                className="content lgscreen:pt-10"
              >
                <p>{parse(module.shortDescription)}</p>
              </motion.div>
            )}
          </div>
          <motion.div
            variants={animFade}
            className="relative mt-30 lgscreen:mt-25"
          >
            {module?.sliderImages && (
              <Swiper
                spaceBetween={20}
                loop={true}
                slidesPerView={"11"}
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
                    slidesPerView: 2.5,
                  },
                }}
                modules={[Autoplay, Navigation]}
              >
                {module?.sliderImages.length > 0 &&
                  module.sliderImages.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="img relative">
                          {item?.image && (
                            <ImageOpt
                              imgData={item.image.mediaItemUrl}
                              width={527}
                              height={303}
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
                    className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() =>
                      handleNextClick(".gallery-bx-slider .swiper")
                    }
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180 mdscreen:w-[10px]"
                      width={10}
                      height={10}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                </div>
              </Swiper>
            )}
          </motion.div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default Gallery
export const PropertyGalleryFragment = graphql`
  fragment PropertyGalleryFragment on WpProperty_Propertycontent_PropertyContent_Gallery {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    sliderImages {
      image {
        altText
        mediaItemUrl
      }
    }
  }
`
