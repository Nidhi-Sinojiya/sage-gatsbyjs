import { motion, useInView } from "framer-motion"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./ImageOpt"

const ContentWithImageCardSlider = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)

  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
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
        className={`card-slider py-60 pt-120 lgscreen:pt-40 lgscreen:py-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        } ${
          module?.pattern
            ? "bg-brown-400 addPattern bg-opacity-[0.12] relative"
            : ""
        } `}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="container-fluid pr-0 lgscreen:!pr-20 relative"
        >
          <div className="flex flex-wrap items-center">
            <div className="lg:w-5/12 w-full pr-85 laptop:pr-30 lgscreen:pr-0">
              <div className="card-slider-content">
                {module?.heading && (
                  <motion.div variants={animFade} className="title-green">
                    <h3>{module.heading}</h3>
                  </motion.div>
                )}
                {module?.description && (
                  <motion.div variants={animFade} className="content pt-15">
                    {parse(module.description)}
                  </motion.div>
                )}
                {module?.button && (
                  <motion.div variants={animFade} className="mt-30 flex flex-wrap gap-x-[20px]">
                    <Link
                      to={module.button.url}
                      className="btn btn-green-border flex flex-wrap items-center gap-x-2"
                      target={module.button.target}
                    >
                      {module.button.title}
                      {module?.buttonIcon && (
                        <img
                          src="../images/mail.svg"
                          width={12}
                          height={12}
                          loading="lazy"
                          alt="Mail"
                        />
                      )}
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="lg:w-7/12 w-full pl-80 lgscreen:pl-0 lgscreen:pt-30">
              <motion.div variants={animFade} className="relative">
                <Swiper
                  spaceBetween={20}
                  loop={true}
                  slidesPerView={"1.2"}
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
                      slidesPerView: 1.3,
                    },
                    1600: {
                      slidesPerView: 1.2,
                    },
                  }}
                  modules={[Autoplay, Navigation]}
                >
                  {module?.imageCard.length > 0 &&
                    module?.imageCard.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="img relative">
                            {item?.image && (
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={824}
                                height={637}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                              />
                            )}
                            <div className="slidercontent absolute bottom-45 mdscreen:bottom-20 left-0 px-45 mdscreen:px-20 w-full text-white-100 z-9">
                              {item?.heading && (
                                <h4 className="text-white-100 text-[36px] leading-[40px] mdscreen:text-[32px] -tracking-[0.72px] font-primary font-400 capitalize">
                                  {item.heading}
                                </h4>
                              )}
                              {item?.description && (
                                <div className="content white pt-5 w-[483px] laptop:w-full lgscreen:pr-30">
                                  {parse(item.description)}
                                </div>
                              )}
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}

                  <div className="swiper-arrow arrow-big flex gap-x-5">
                    <button
                      className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                      onClick={() => handleNextClick(".card-slider .swiper")}
                    >
                      <img
                        src="../images/swiper-arrow.svg"
                        className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180 mdscreen:w-[10px]"
                        width={10}
                        height={10}
                        loading="lazy"
                        alt="Arrow"
                      />
                    </button>
                  </div>
                </Swiper>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default ContentWithImageCardSlider
export const PageContentWithImageCardSliderFragment = graphql`
  fragment PageContentWithImageCardSliderFragment on WpPage_Pagecontent_PageContent_ContentWithImageCardSlider {
    extraId
    extraClass
    hideSection
    buttonIcon
    description
    heading
    pattern
    imageCard {
      heading
      description
      image {
        altText
        mediaItemUrl
      }
    }
    button {
      target
      title
      url
    }
  }
`
