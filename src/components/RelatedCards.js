import { motion, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const RelatedCards = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const cardsData = useStaticQuery(graphql`
    query {
      wp {
        fluxDnaSettings {
          fluxDna {
            cards {
              cardType
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
  const cardsDataList = cardsData.wp.fluxDnaSettings.fluxDna
  const selectCards = module.selectCards

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
    if (module.gridOption === "two_grid") {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="img-grid pt-50 pb-100 lgscreen:pt-40 lgscreen:pb-30"
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="container-fluid"
          >
            <div className="flex flex-wrap -mx-20 lgscreen:mx-0 gap-y-[30px]">
              {cardsDataList.cards.map((item, j) => {
                if (
                  selectCards.filter(card => card === item.cardType).length > 0
                ) {
                  return (
                    <div
                      className="lg:w-6/12 w-full px-10 lgscreen:px-0"
                      key={j}
                    >
                      <motion.div variants={animFade} className="img-grid-bx">
                        <div className="img relative">
                          {item?.image && (
                            <Link to={item.link.url}>
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={640}
                                height={515}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                              />
                            </Link>
                          )}
                        </div>
                        <div className="pt-35 lgscreen:pt-25 w-[530px] xlscreen:w-full xlscreen:pr-0">
                          {item?.title && (
                            <motion.div
                              variants={animFade}
                              className="title-green"
                            >
                              <h4>
                                <Link to={item.link.url}>
                                  {parse(item.title)}
                                </Link>
                              </h4>
                            </motion.div>
                          )}
                          {item?.description && (
                            <motion.div
                              variants={animFade}
                              className="content pt-10"
                            >
                              <p>{parse(item.description)}</p>
                            </motion.div>
                          )}
                          {item?.link && (
                            <motion.div variants={animFade} className="mt-25">
                              <Link
                                to={item.link.url}
                                className="btn btn-green-border"
                                target={item.link.target}
                              >
                                {item.link.title}
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </motion.div>
        </motion.section>
      )
    } else {
      return (
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="discover-img-grid pt-50 pb-50 lgscreen:pt-50 lgscreen:pb-30"
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="container-fluid"
          >
            <div className="flex flex-wrap -mx-20 lgscreen:mx-0 gap-y-[30px]">
              {cardsDataList.cards.map((item, i) => {
                if (
                  selectCards.filter(card => card === item.cardType).length > 0
                ) {
                  return (
                    <div
                      className="lg:w-4/12 w-full px-10 lgscreen:px-0"
                      key={i}
                    >
                      <motion.div variants={animFade} className="img-grid-bx">
                        <div className="img relative">
                          {item?.image && (
                            <Link to="/">
                              <ImageOpt
                                imgData={item.image.mediaItemUrl}
                                width={640}
                                height={515}
                                imgAlt={item.image.altText}
                                imgLoad="lazy"
                              />
                            </Link>
                          )}
                        </div>
                        <div className="pt-35 lgscreen:pt-25 w-[360px] laptop:w-[340px] xlscreen:w-full xlscreen:pr-30 lgscreen:pr-0">
                          {item?.title && (
                            <motion.div
                              variants={animFade}
                              className="title-green"
                            >
                              <h4 className="max-w-[250px]">
                                <Link to="/">{parse(item.title)}</Link>
                              </h4>
                            </motion.div>
                          )}
                          {item?.description && (
                            <motion.div
                              variants={animFade}
                              className="content pt-5"
                            >
                              <p>{parse(item.description)}</p>
                            </motion.div>
                          )}
                          {item?.link && (
                            <motion.div variants={animFade} className="mt-25">
                              <Link
                                to={item.link.url}
                                className="btn btn-green-border"
                                target={item.link.target}
                              >
                                {item.link.title}
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </motion.div>
        </motion.section>
      )
    }
  }
  return null
}

export default RelatedCards
export const PageRelatedCardsFragment = graphql`
  fragment PageRelatedCardsFragment on WpPage_Pagecontent_PageContent_RelatedCards {
    extraId
    extraClass
    hideSection
    selectCards
    gridOption
  }
`
