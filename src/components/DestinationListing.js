import { motion, useInView } from "framer-motion"
import { Link, graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { EffectFade, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "./ImageOpt"

const DestinationListing = ({ module }) => {
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

  const destiData = useStaticQuery(graphql`
    query destiQuery {
      allWpDestination(sort: { id: ASC }) {
        nodes {
          excerpt
          title
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          destinationContent {
            imageSlider {
              image {
                altText
                mediaItemUrl
              }
              description
            }
            mapImage {
              altText
              mediaItemUrl
            }
          }
          destinationCategory {
            nodes {
              name
            }
          }
        }
      }
    }
  `)
  const allDestinations = destiData.allWpDestination

  const [showImage, setShowImage] = useState([])
  const toggleImage = itemKey => {
    setShowImage(prevState => ({
      ...prevState,
      [itemKey]: !prevState[itemKey], // Toggle the value for the specific item
    }))
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
        className={`gallery-slider bg-brown-500 bg-opacity-10 py-60 lgscreen:py-30${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
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
            {allDestinations?.nodes.length > 0 &&
              allDestinations.nodes.map((item, i) => {
                //const delay = i % 2 === 0 ? 2000 : 3500
                return (
                  <div className="flex flex-wrap items-center" key={i}>
                    <motion.div
                      variants={animFade}
                      className={`lg:w-[52%] w-full ${
                        i % 2 === 0
                          ? "order-1 lgscreen:order-1"
                          : "order-2 lgscreen:order-2"
                      } `}
                    >
                      {showImage[i] ? (
                        <div className="relative">
                          {" "}
                          <div className="bg-white-100 p-15 pb-45">
                            {item.destinationContent.mapImage && (
                              <div className="img relative">
                                <ImageOpt
                                  imgData={
                                    item.destinationContent.mapImage
                                      .mediaItemUrl
                                  }
                                  width={640}
                                  height={369}
                                  imgAlt={
                                    item.destinationContent.mapImage.altText
                                  }
                                  imgLoad="lazy"
                                  imgClass={"w-full h-full object-cover"}
                                />{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          {item.destinationContent.imageSlider && (
                            <Swiper
                              spaceBetween={10}
                              loop={true}
                              slidesPerView={"11"}
                              effect={"fade"}
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
                              className={`imgslider-item-${i}`}
                              modules={[Navigation, EffectFade]}
                            >
                              {item.destinationContent.imageSlider.map(
                                (slide, j) => (
                                  <SwiperSlide key={j}>
                                    <div className="bg-white-100 p-15 pb-45">
                                      <div className="img relative">
                                        {slide?.image && (
                                          <ImageOpt
                                            imgData={slide.image.mediaItemUrl}
                                            width={640}
                                            height={369}
                                            imgAlt={slide.image.altText}
                                            imgLoad="lazy"
                                            imgClass={
                                              "w-full h-full object-cover"
                                            }
                                          />
                                        )}
                                        {slide?.description && (
                                          <div className="slidercontent absolute bottom-0 pl-30 pb-20 w-full">
                                            <h4 className="text-white-100 text-17 leading-20 font-400 font-primary italic -tracking-[0.34px] normal-case relative z-9">
                                              {slide.description}
                                            </h4>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                )
                              )}

                              <div className="swiper-arrow arrow-big flex gap-x-5">
                                <button
                                  className="absolute bottom-65 z-9 right-80 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                                  onClick={() =>
                                    handlePrevClick(
                                      `.gallery-slider .imgslider-item-${i}`
                                    )
                                  }
                                >
                                  <img
                                    src="../images/swiper-arrow.svg"
                                    className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                                    width={8}
                                    height={8}
                                    loading="lazy"
                                    alt="Arrow"
                                  />
                                </button>
                                <button
                                  className="absolute bottom-65 z-9 right-40 w-[35px] h-[35px]  bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                                  onClick={() =>
                                    handleNextClick(
                                      `.gallery-slider .imgslider-item-${i}`
                                    )
                                  }
                                >
                                  <img
                                    src="../images/swiper-arrow.svg"
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
                      )}
                    </motion.div>
                    <div
                      className={`lg:w-[48%] w-full ${
                        i % 2 === 0
                          ? "order-2 lgscreen:order-1"
                          : "order-1 lgscreen:order-2"
                      }`}
                    >
                      <div className="gallery-slider-content px-75 laptop:px-30 lgscreen:px-0 lgscreen:pt-30">
                        {item.destinationCategory?.nodes.length > 0 && (
                          <motion.div
                            variants={animFade}
                            className="text-list  mb-25 lgscreen:mb-15"
                          >
                            <ul className="flex flex-wrap gap-x-[20px]">
                              {item.destinationCategory.nodes.map((cat, k) => (
                                <li key={k}>{cat.name}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                        {item?.title && (
                          <motion.h2
                            variants={animFade}
                            className="font-primary -tracking-[0.84px] font-400 italic normal-case"
                          >
                            {item.title}
                          </motion.h2>
                        )}
                        {item?.excerpt && (
                          <motion.div
                            variants={animFade}
                            className="content pt-10"
                          >
                            {parse(item.excerpt)}
                          </motion.div>
                        )}
                        <motion.div
                          variants={animFade}
                          className="mt-30 flex flex-wrap gap-x-[20px]"
                        >
                          <Link to={item.uri} className="btn btn-green-border">
                            explore
                          </Link>
                          <button
                            to="/"
                            className="btn btn-link flex flex-wrap gap-x-2 items-center"
                            onClick={() => toggleImage(i)}
                            onKeyDown={() => toggleImage(i)}
                          >
                            <img
                              src="../images/map-icon.svg"
                              width={15}
                              height={15}
                              loading="lazy"
                              alt="Map"
                            />{" "}
                            View on map
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default DestinationListing
export const PageDestinationListingFragment = graphql`
  fragment PageDestinationListingFragment on WpPage_Pagecontent_PageContent_DestinationListing {
    extraId
    extraClass
    hideSection
  }
`
