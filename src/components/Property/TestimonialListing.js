import { motion, useInView } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

const TestimonialListing = ({ module, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const testimonialData = useStaticQuery(graphql`
    query testiQuery {
      allWpTestimonial {
        nodes {
          title
          content
          testimonialCategory {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  `)
  const allTeatinomials = testimonialData.allWpTestimonial

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
        className={`testimonial py-60 lgscreen:py-30 ${
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
          className="testimonialcontent relative w-[930px] mx-auto text-center lgscreen:w-full lgscreen:px-20"
        >
          <motion.div
            variants={animFade}
            className="relative mt-50 lgscreen:mt-25"
          >
            <Swiper
              spaceBetween={10}
              loop={false}
              slidesPerView={"1"}
              centeredSlides={false}
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
              modules={[Autoplay, Pagination]}
            >
              {allTeatinomials?.nodes.length > 0 &&
                allTeatinomials.nodes.map((item, i) => {
                  const contentWithoutPTags = item.content
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, "")

                  if (
                    item?.testimonialCategory.nodes &&
                    item.testimonialCategory.nodes.filter(
                      card => card.slug === module.selectCategory.slug
                    ).length > 0
                  ) {
                    return (
                      <SwiperSlide key={i}>
                        {item?.content && (
                          <h5
                            className="!text-24 font-400 -tracking-[0.48px] leading-[34px] px-30 lgscreen:px-60 smscreen2:px-35 normal-case italic font-primary"
                            dangerouslySetInnerHTML={{
                              __html: contentWithoutPTags,
                            }}
                          ></h5>
                        )}

                        <div className="testimonialbtm relative mt-50 inline-block">
                          <div className="relative flex flex-wrap gap-x-[30px] justify-center">
                            {item?.content && (
                              <span className="text-color text-green-100 text-12 tracking-[0.6px] font-400 uppercase">
                                {parse(item.title)}, Country
                              </span>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  }
                  return null
                })}
            </Swiper>
          </motion.div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default TestimonialListing
export const PropertyTestimonialListingFragment = graphql`
  fragment PropertyTestimonialListingFragment on WpProperty_Propertycontent_PropertyContent_TestimonialListing {
    extraId
    extraClass
    hideSection
    heading
    selectCategory {
      slug
    }
  }
`
