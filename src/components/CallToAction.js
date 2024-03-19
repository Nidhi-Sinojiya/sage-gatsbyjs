import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import "swiper/css"
import "swiper/css/effect-fade"

import { EffectFade, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./ImageOpt"

const CallToAction = ({ module }) => {
  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
  }
  const handlePrevClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slidePrev()
  }

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

  const callData = useStaticQuery(graphql`
    query callQuery {
      wp {
        fluxDnaSettings {
          fluxDna {
            imageSliders {
              description
              title
              link {
                target
                title
                url
              }
              image {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `)
  const allCallImages = callData.wp.fluxDnaSettings.fluxDna

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`fullimg-content relative mt-50 lgscreen:mt-25 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
        >
          <Swiper
            spaceBetween={10}
            loop={true}
            slidesPerView={"1"}
            centeredSlides={false}
            effect={'fade'}
            speed={1500}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
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
            modules={[EffectFade, Autoplay]}
          >
            {allCallImages?.imageSliders?.length > 0 &&
              allCallImages?.imageSliders.map((item, i) => {
                return (
                  <SwiperSlide key={i}>
                    {item?.image && (
                      <ImageOpt
                        imgData={item.image.mediaItemUrl}
                        width={1440}
                        height={565}
                        imgAlt={item.image.altText}
                        imgLoad="lazy"
                        imgClass="w-full h-[565px] mdscreen:h-[400px] object-cover"
                      />
                    )}
                    <div className="absolute pr-70 right-0 mdscreen:!px-20 mdscreen:pr-0 bottom-90 z-9 text-right smscreen2:text-center">
                      {item?.title && (
                        <motion.h2
                          variants={animFade}
                          className="text-60 font-primary font-400 -tracking-[1.2px] italic text-white-100 normal-case lgscreen:text-60 lgscreen:leading-[66px] mdscreen:text-[50px] mdscreen:leading-[54px] smscreen2:text-40 smscreen2:leading-[40px] xsscreen2:text-32"
                        >
                          {parse(item.title)}
                        </motion.h2>
                      )}
                      {item?.description && (
                        <motion.div
                          variants={animFade}
                          className="content white w-[625px] lgscreen:w-full"
                        >
                          {parse(item.description)}
                        </motion.div>
                      )}
                      {item?.link && (
                        <motion.div variants={animFade} className="mt-30">
                          <Link
                            to={item.link.url}
                            className="btn btn-white"
                            target={item.link.target}
                          >
                            {item.link.title}
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </SwiperSlide>
                )
              })}
            <div className="swiper-arrow absolute w-full arrow-big flex smscreen2:justify-center gap-x-5">
              <button
                className="absolute bottom-30 translate-y-minus_50 z-9 left-40 smscreen2:left-[auto] smscreen2:relative mdscreen:left-20 w-[25px] h-[25px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                onClick={() => handlePrevClick(".fullimg-content .swiper")}
              >
                <img
                  src="../images/swiper-arrow.svg"
                  className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                  width={6}
                  height={6}
                  loading="lazy"
                  alt="Arrow"
                />
              </button>
              <button
                className="absolute bottom-30 translate-y-minus_50 z-9 left-80 smscreen2:left-[auto] smscreen2:relative mdscreen:left-60 w-[25px] h-[25px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                onClick={() => handleNextClick(".fullimg-content .swiper")}
              >
                <img
                  src="../images/swiper-arrow.svg"
                  className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180"
                  width={6}
                  height={6}
                  loading="lazy"
                  alt="Arrow"
                />
              </button>
            </div>
          </Swiper>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default CallToAction
export const PageCallToActionFragment = graphql`
  fragment PageCallToActionFragment on WpPage_Pagecontent_PageContent_CallToAction {
    extraId
    extraClass
    hideSection
  }
`
