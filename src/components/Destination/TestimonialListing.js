import { motion, useInView } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

const TestimonialListing = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const testimonialData = useStaticQuery(graphql`
    query testiCatQuery {
      allWpTestimonial(
        filter: {
          testimonialCategory: { nodes: { elemMatch: { slug: { eq: "all" } } } }
        }
      ) {
        nodes {
          title
          content
          testimonialCategory {
            nodes {
              id
              name
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
        className="testimonial bg-lightblue bg-opacity-60 py-100 lgscreen:py-30"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="testimonialcontent relative w-[890px] mx-auto text-center lgscreen:w-full lgscreen:px-20"
        >
          <motion.div variants={animFade} className="relative">
            {module?.heading && (
              <h5
                variants={animFade}
                className="font-primary italic text-20 font-400 -tracking-[0.4px] capitalize"
              >
                {parse(module.heading)}
              </h5>
            )}
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
                  return (
                    <SwiperSlide key={i}>
                      {item?.content && (
                        <h6
                          className="text-22 font-390 opacity-80 text-green-100 tracking-[0px] leading-[30px] lgscreen:px-80 mdscreen:px-40 mdscreen:text-18 normal-case mt-15"
                          dangerouslySetInnerHTML={{
                            __html: contentWithoutPTags,
                          }}
                        ></h6>
                      )}

                      <div className="testimonialbtm relative mt-50 inline-block">
                        <div className="relative flex flex-wrap gap-x-[30px] justify-center">
                          {item?.title && (
                            <span className="italic text-green-100 text-12 -tracking-[0.24px] font-400 font-primary">
                              {parse(item.title)}
                            </span>
                          )}
                          {item?.testimonialCategory.nodes.length > 0 &&
                            item.testimonialCategory.nodes.map((itemCat, i) => {
                              return (
                                <span
                                  className="text-green-100 text-10 tracking-[0.2px] font-420 uppercase"
                                  key={i}
                                >
                                  {itemCat.name}
                                </span>
                              )
                            })}
                        </div>
                      </div>
                    </SwiperSlide>
                  )
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
export const DestinationTestimonialListingFragment = graphql`
  fragment DestinationTestimonialListingFragment on WpDestination_Destinationcontent_DestinationContent_TestimonialListing {
    extraId
    extraClass
    hideSection
    heading
  }
`
export const OfferTestimonialListingFragment = graphql`
  fragment OfferTestimonialListingFragment on WpOffer_Offercontent_OfferContent_TestimonialListing {
    extraId
    extraClass
    hideSection
    heading
  }
`
