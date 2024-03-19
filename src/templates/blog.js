import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"

import { Swiper, SwiperSlide } from "swiper/react"
import ImageOpt from "../components/ImageOpt"
import Seo from "../components/Seo/Seo"
import Layout from "../components/layout"

const BlogTemplate = props => {
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
        delayChildren: 3.5,
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

  const animFade2 = {
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

  const animFade3 = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 3.5,
        staggerChildren: 0.2,
      },
    },
  }

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed, setHasPlayed])

  const post = props.data.post
  console.log(post)
  const postData = props.data.wp.fluxDnaSettings.fluxDna

  const handleNextClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slideNext()
  }
  const handlePrevClick = selector => {
    const swiper = document.querySelector(selector).swiper
    swiper.slidePrev()
  }

  return (
    <div className="fullPageanimation">
      <Layout props={props}>
        <Seo seo={post.seo} />
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="banner inner-small-banner relative z-9"
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="h-full"
          >
            {post?.featuredImage && (
              <ImageOpt
                imgData={post.featuredImage.node.mediaItemUrl}
                imgAlt={post.featuredImage.node.altText}
                imgLoad="eager"
                imgClass="w-full h-full object-cover"
                width={1440}
                height={743}
              />
            )}
            <div className="banner-content absolute bottom-40 left-50per translate-x-minus_50 z-9 w-full text-center max-w-[1100px] smscreen2:max-w-full mx-auto px-20">
              <div className="video">
                <motion.div variants={animFade}>
                  <span className="uppercase text-white-100 tracking-[1.6px] leading-22 mb-20 inline-block">
                    Our Blog
                  </span>
                </motion.div>
                {post?.title && (
                  <motion.h1
                    variants={animFade}
                    className="text-white-100 text-55 leading-[60px] mdscreen:text-[34px] mdscreen:leading-36 tracking-[2.75px]"
                  >
                    {post.title}
                  </motion.h1>
                )}
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="blog-single-content accordion-wrapper bg-brown-100 bg-opacity-10 relative pt-70"
        >
          <motion.div
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="container-fluid-lg relative"
          >
            {post?.excerpt && (
              <motion.div
                variants={animFade3}
                className="blog-single-precontent pb-60 lgscreen:pb-40"
              >
                {parse(post.excerpt)}
              </motion.div>
            )}
            <motion.div
              variants={animFade}
              className="bg-white-100 py-80 px-90 xlscreen:px-60 lgscreen:px-40 smscreen2:px-20 lgscreen:py-40"
            >
              {post?.date && (
                <motion.div variants={animFade} className="preheading mb-15">
                  <span className="text-12 tracking-[0.6px] font-420 uppercase text-green-100 inline-block relative pr-10 mr-5">
                    {post.date}
                  </span>
                  {post.author.node?.name && (
                    <span className="text-12 tracking-[0.6px] font-420 uppercase text-green-100 inline-block ml-[3px]">
                      written by {post.author.node.name}
                    </span>
                  )}
                </motion.div>
              )}

              {post?.content && (
                <motion.div
                  variants={animFade2}
                  className="content post-content"
                >
                  {parse(post.content)}
                </motion.div>
              )}

              <motion.div
                variants={animFade2}
                className="sicon relative flex flex-wrap gap-3 pt-75 lgscreen:pt-45 smscreen2:pt-30"
              >
                <motion.div variants={animFade2}>
                  <h6 className="text-20 font-heading font-420 text-lepogolodges-100 tracking-[1px]">
                    Share this blog post
                  </h6>
                </motion.div>
                <motion.div
                  variants={animFade2}
                  className="share-social sicon flex flex-wrap items-center gap-x-2 ml-15"
                >
                  <li>
                    <Link
                      to={`mailto:?Subject=${post.title}&Body=${
                        process.env.GATSBY_WP_BLOG_URL
                      }${`/blog${post.uri}`}`}
                      title="Mail to"
                      target="_blank"
                    >
                      <img
                        src="../../images/blog-mail.svg"
                        className="relative -top-2"
                        width={22}
                        height={22}
                        loading="lazy"
                        alt="mail"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`https://www.facebook.com/sharer/sharer.php?u=${
                        process.env.GATSBY_WP_BLOG_URL
                      }${`/blog${post.uri}`}`}
                      title="Facebook"
                      target="_blank"
                    >
                      <img
                        src="../../images/blog-facebook.svg"
                        className="relative -top-2"
                        width={22}
                        height={22}
                        loading="lazy"
                        alt="facebook"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`https://www.linkedin.com/shareArticle?mini=true&url=${
                        process.env.GATSBY_WP_BLOG_URL
                      }${`/blog${post.uri}`}`}
                      title="linkedin"
                      target="_blank"
                    >
                      <img
                        src="../../images/blog-linkdin.svg"
                        className="relative -top-2"
                        width={22}
                        height={22}
                        loading="lazy"
                        alt="linkedin"
                      />
                    </Link>
                  </li>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div variants={animFade3}>
              <motion.div
                variants={animFade3}
                className="flex justify-center py-70 lgscreen:py-30"
              >
                <Link
                  to="/our-blog"
                  className="btn btn-green-border opacity-50"
                  target=""
                >
                  back to all blog posts
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow1}
          className={`fullimg-content relative mt-0`}
        >
          <motion.div
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow1}
          >
            <div>
              <Swiper
                spaceBetween={10}
                loop={true}
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
                modules={[Autoplay]}
              >
                {postData?.imageSliders?.length > 0 &&
                  postData?.imageSliders.map((item, i) => {
                    return (
                      <SwiperSlide>
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
                              variants={animFade3}
                              className="text-60 font-primary font-400 -tracking-[1.2px] italic text-white-100 normal-case lgscreen:text-60 lgscreen:leading-[66px] mdscreen:text-[50px] mdscreen:leading-[54px] smscreen2:text-40 smscreen2:leading-[40px] xsscreen2:text-32"
                            >
                              {parse(item.title)}
                            </motion.h2>
                          )}
                          {item?.description && (
                            <motion.div
                              variants={animFade3}
                              className="content white w-[625px] lgscreen:w-full"
                            >
                              {parse(item.description)}
                            </motion.div>
                          )}
                          {item?.link && (
                            <motion.div variants={animFade3} className="mt-30">
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
                <div className="swiper-arrow arrow-big flex smscreen2:justify-center gap-x-5">
                  <button
                    className="absolute bottom-30 translate-y-minus_50 z-9 left-40 smscreen2:left-[calc(50%_-_50px)] mdscreen:left-20 w-[25px] h-[25px] bg-white-100 bg-opacity-40  backdrop-blur-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handlePrevClick(".fullimg-content .swiper")}
                  >
                    <img
                      src="../../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50"
                      width={6}
                      height={6}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                  <button
                    className="absolute bottom-30 translate-y-minus_50 z-9 left-80 smscreen2:left-[calc(50%_-_0px)] mdscreen:left-60 w-[25px] h-[25px] bg-white-100 bg-opacity-40  filter-[5px] rounded-100 transition-all duration-300 hover:bg-opacity-60"
                    onClick={() => handleNextClick(".fullimg-content .swiper")}
                  >
                    <img
                      src="../../images/swiper-arrow.svg"
                      className="absolute top-50per left-50per translate-y-minus_50 translate-x-minus_50 rotate-180"
                      width={6}
                      height={6}
                      loading="lazy"
                      alt="Arrow"
                    />
                  </button>
                </div>
              </Swiper>
            </div>
          </motion.div>
        </motion.section>
      </Layout>
    </div>
  )
}

export default BlogTemplate
export const blogPostQuery = graphql`
  query blogById($id: String) {
    post: wpPost(id: { eq: $id }) {
      id
      title
      uri
      link
      slug
      content
      date(formatString: "DD.MM.YYYY")
      categories {
        nodes {
          name
          uri
          slug
        }
      }
      excerpt
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      author {
        node {
          name
        }
      }
      seo {
        metaDesc
        canonical
        opengraphDescription
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphType
        opengraphUrl
        opengraphSiteName
        title
        twitterDescription
        twitterTitle
        opengraphImage {
          publicUrl
        }
        twitterImage {
          publicUrl
        }
      }
    }

    wp {
      fluxDnaSettings {
        fluxDna {
          imageSliders {
            image {
              altText
              mediaItemUrl
            }
            title
            description
            link {
              target
              title
              url
            }
          }
        }
      }
    }
  }
`
