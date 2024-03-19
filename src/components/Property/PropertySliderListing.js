import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./ImageOpt"
const PropertySliderListing = ({ module }) => {
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
        className="fullbx-slider py-100 lgscreen:py-40 fullbx-slider-property"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="h-full"
        >
          <div className="w-[900px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
            {module?.topIcon && (
              <motion.div
                variants={animFade}
                className="flex flex-wrap justify-center gap-x-5 mb-15"
              >
                {module?.topIcon.length > 0 &&
                  module.topIcon.map((item, i) => {
                    return (
                      <img
                        src={item.icon.mediaItemUrl}
                        width={62}
                        height={44}
                        alt={item.icon.altText}
                        className=""
                        loading="lazy"
                      />
                    )
                  })}
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
          </div>
          <motion.div variants={animFade} className="relative mt-50">
            {module?.selectProperty && (
              <Swiper
                spaceBetween={20}
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
                    slidesPerView: 2.1,
                  },
                }}
                modules={[Navigation]}
              >
                {module?.selectProperty.length > 0 &&
                  module.selectProperty
                    .concat(module.selectProperty)
                    .map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <Link to={item.uri}>
                            <div className="img relative">
                              {item?.featuredImage?.node && (
                                <ImageOpt
                                  imgData={item.featuredImage.node.mediaItemUrl}
                                  width={824}
                                  height={637}
                                  imgAlt={item.featuredImage.node.altText}
                                  imgLoad="lazy"
                                  imgClass="w-full h-full object-cover"
                                />
                              )}
                              <div className="slidercontent absolute bottom-80 text-center w-full text-white-100 z-9">
                                {item?.propertyContent.destination && (
                                  <span className="italic text-17 font-primary font-400 -tracking-[0.34px] mb-15 inline-block">
                                    {item.propertyContent.destination}
                                  </span>
                                )}
                                {item?.title && (
                                  <h4 className="text-white-100 text-[38px] mdscreen:text-[32px] tracking-[0.76px] uppercase font-420">
                                    {item.title}
                                  </h4>
                                )}
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      )
                    })}

                <div className="swiper-arrow arrow-big flex gap-x-5">
                  <button
                    className="absolute top-50per translate-y-minus_50 z-9 left-40 mdscreen:left-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() =>
                      handlePrevClick(".fullbx-slider-property .swiper")
                    }
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
                    className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() =>
                      handleNextClick(".fullbx-slider-property .swiper")
                    }
                  >
                    <img
                      src="/../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180 mdscreen:w-[10px]"
                      width={12}
                      height={12}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                </div>
              </Swiper>
            )}
          </motion.div>
          {module?.button && (
            <motion.div
              variants={animFade}
              className="mt-45 flex justify-center px-20"
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
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default PropertySliderListing
export const PropertyPropertySliderListingFragment = graphql`
  fragment PropertyPropertySliderListingFragment on WpProperty_Propertycontent_PropertyContent_PropertySliderListing {
    extraId
    extraClass
    hideSection
    heading
    shortDescription
    topIcon {
      icon {
        altText
        mediaItemUrl
      }
    }
    button {
      target
      title
      url
    }
    selectProperty {
      ... on WpProperty {
        id
        title
        uri
        link
        excerpt
        content
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        propertyContent {
          propertyColor
          destination
        }
        terms {
          nodes {
            ... on WpPropertyCategory {
              id
              name
            }
          }
        }
      }
    }
  }
`
