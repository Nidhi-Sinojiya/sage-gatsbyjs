import { motion, useInView } from "framer-motion"
import { Link, graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { EffectFade, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "../components/ImageOpt"
import Layout from "../components/layout"

const NotFoundPage = () => {
  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
  }
  const handlePrevClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slidePrev()
  }

  const fourData = useStaticQuery(graphql`
    query {
      wp {
        fluxDnaSettings {
          fluxDna {
            fourHeading
            fourImage {
              altText
              mediaItemUrl
            }
            fourDescription
            fourPropertyHeading
            fourPropertyDescription
            fourPropertyButton {
              target
              title
              url
            }
            fourCtaImage {
              altText
              mediaItemUrl
            }
            fourCtaHeading
            fourCtaDescription
            fourCtaButton {
              target
              title
              url
            }
          }
        }
      }
      allWpProperty {
        nodes {
          title
          slug
          propertyContent {
            destination
          }
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  `)
  const fourDataList = fourData.wp.fluxDnaSettings.fluxDna
  const fourDataPropertyList = fourData.allWpProperty.nodes

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

  const sectionShow1 = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delayChildren: 1.5,
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

  const animFade1 = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 1.5,
        staggerChildren: 0.2,
      },
    },
  }

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed, setHasPlayed])

  return (
    <Layout>
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className="banner inner-banner relative"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="h-full"
        >
          {fourDataList?.fourImage && (
            <div className="desk-img h-full mdscreen:h-full relative block ">
              <ImageOpt
                imgData={fourDataList.fourImage.mediaItemUrl}
                width={1440}
                height={700}
                imgAlt={fourDataList.fourImage.altText}
                imgLoad="eager"
                imgClass="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="absolute bottom-[110px] lgscreen:bottom-60 left-50per translate-x-minus_50 w-full z-9 text-center max-w-[1050px] smscreen2:max-w-full mx-auto px-20">
            {fourDataList?.fourHeading && (
              <motion.h1
                variants={animFade}
                className="text-white-100 font-primary normal-case text-[80px] lgscreen:text-60 leading-[80px] lgscreen:leading-[60px] -tracking-[1.6px]"
              >
                {fourDataList.fourHeading}
              </motion.h1>
            )}

            {fourDataList?.fourDescription && (
              <motion.div
                variants={animFade}
                className="content lg pt-15 text-white-100 w-[635px] mx-auto lgscreen:w-full"
              >
                {parse(fourDataList.fourDescription)}
              </motion.div>
            )}

            <motion.div variants={animFade} className="btn-custom  mt-30">
              <Link to="/" className="btn btn-white">
                go to home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className="fullbx-slider py-100 lgscreen:py-40"
      >
        <motion.div
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="h-full"
        >
          <div className="w-[900px] mx-auto text-center lgscreen:w-full lgscreen:px-20">
            {fourDataList?.fourPropertyHeading && (
              <motion.div variants={animFade} className="title-green">
                <h3>{parse(fourDataList.fourPropertyHeading)}</h3>
              </motion.div>
            )}
            {fourDataList?.fourPropertyDescription && (
              <motion.div variants={animFade} className="content pt-15">
                {parse(fourDataList.fourPropertyDescription)}
              </motion.div>
            )}
          </div>
          <motion.div variants={animFade} className="relative mt-50">
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
              modules={[EffectFade, Navigation]}
            >
              {fourDataPropertyList.length > 0 &&
                fourDataPropertyList.map((item, i) => {
                  return (
                    <SwiperSlide key={i}>
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
                    </SwiperSlide>
                  )
                })}

              <div className="swiper-arrow arrow-big flex gap-x-5">
                <button
                  className="absolute top-50per translate-y-minus_50 z-9 left-40 mdscreen:left-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                  onClick={() => handlePrevClick(".fullbx-slider .swiper")}
                >
                  <img
                    src="/../images/swiper-arrow.svg"
                    className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 mdscreen:w-[10px]"
                    width={10}
                    height={10}
                    loading="lazy"
                    alt="Arrow"
                  />
                </button>
                <button
                  className="absolute top-50per translate-y-minus_50 z-9 right-40 mdscreen:right-20 w-[50px] h-[50px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                  onClick={() => handleNextClick(".fullbx-slider .swiper")}
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
          </motion.div>
          {fourDataList?.fourPropertyButton && (
            <motion.div
              variants={animFade}
              className="mt-45 flex justify-center px-20"
            >
              <Link
                to={fourDataList.fourPropertyButton.url}
                className="btn btn-green-border"
                target={fourDataList.fourPropertyButton.target}
              >
                {fourDataList.fourPropertyButton.title}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow1}
        className={`fullimg-content relative mt-50 lgscreen:mt-25 `}
      >
        <motion.div
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow1}
        >
          {fourDataList?.fourCtaImage && (
            <ImageOpt
              imgData={fourDataList.fourCtaImage.mediaItemUrl}
              width={1440}
              height={565}
              imgAlt={fourDataList.fourCtaImage.altText}
              imgLoad="lazy"
              imgClass="w-full h-[565px] mdscreen:h-[400px] object-cover"
            />
          )}
          <div className="absolute pr-70 right-0 mdscreen:!px-20 mdscreen:pr-0 bottom-90 z-9 text-right smscreen2:text-center">
            {fourDataList?.fourCtaHeading && (
              <motion.h2
                variants={animFade1}
                className="text-60 font-primary font-400 -tracking-[1.2px] italic text-white-100 normal-case lgscreen:text-60 lgscreen:leading-[66px] mdscreen:text-[50px] mdscreen:leading-[54px] smscreen2:text-40 smscreen2:leading-[40px] xsscreen2:text-32"
              >
                {parse(fourDataList.fourCtaHeading)}
              </motion.h2>
            )}
            {fourDataList?.fourCtaDescription && (
              <motion.div
                variants={animFade1}
                className="content white w-[625px] lgscreen:w-full"
              >
                {parse(fourDataList.fourCtaDescription)}
              </motion.div>
            )}
            {fourDataList?.fourCtaButton && (
              <motion.div variants={animFade1} className="mt-30">
                <Link
                  to={fourDataList.fourCtaButton.url}
                  className="btn btn-white"
                  target={fourDataList.fourCtaButton.target}
                >
                  {fourDataList.fourCtaButton.title}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.section>
    </Layout>
  )
}

export default NotFoundPage
