import { motion, useInView } from "framer-motion"
import { graphql } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

const EventTestimonial = ({ module }) => {
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

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`simple-content bg-brown-500 bg-opacity-10 pb-90 lgscreen:pb-30 ${
          module.extraClass ? ` ${module.extraClass}` : ""
        }`}
        id={module.extraId}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
        >
          <motion.div variants={animFade}>
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
              {module?.testimonial?.length > 0 &&
                module?.testimonial.map((item, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="w-[951px] lgscreen:w-full lgscreen:px-20 mx-auto text-center">
                        <h5 className="font-primary -tracking-[0.52px] italic font-400 leading-[36px] normal-case">
                          {item.testimonial}
                        </h5>

                        <ul className="flex flex-wrap gap-x-4 justify-center mt-30">
                          {item?.name && <li>{item.name}</li>}
                          {item?.location && <li>{item.location}</li>}
                        </ul>
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

export default EventTestimonial
export const PageEventTestimonialFragment = graphql`
  fragment PageEventTestimonialFragment on WpPage_Pagecontent_PageContent_EventTestimonial {
    extraId
    extraClass
    hideSection
    testimonial {
      location
      name
      testimonial
    }
  }
`
