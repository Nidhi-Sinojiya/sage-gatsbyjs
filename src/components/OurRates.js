import { motion, useInView } from "framer-motion"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"

const OurRates = ({ module }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)

  const [tabOption, setTabOption] = useState(() => {
    const initialTabOptions = {}
    module.tableContent.forEach(item => {
      const tab1Name = item.heading.replace(/ /g, "-")
      const tab2Name = item.tableOne[0].tabName.replace(/ /g, "-") // Use index 0 for the first tab
      const newTabName = tab1Name + "-" + tab2Name
      initialTabOptions[item.heading] = newTabName
    })
    return initialTabOptions
  })

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
        className={`rates bg-brown-500 bg-opacity-10 py-60 lgscreen:py-30 mt-50 pb-110 ${
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
          {module?.tableContent && (
            <div className="flex flex-wrap gap-y-[50px] lgscreen:gap-y-[20px]">
              {module?.tableContent.length > 0 &&
                module.tableContent.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full bg-white-100 py-70 lgscreen:py-30 px-90 lgscreen:px-45 smscreen2:px-30"
                    >
                      <div className="flex flex-wrap items-end gap-y-[20px]">
                        <div className="w-9/12 lgscreen:w-full">
                          {item?.preHeading && (
                            <motion.div variants={animFade}>
                              <span className="text-green-100 text-15 italic font-400 tracking-[-0.3px] font-primary pb-5">
                                {parse(item.preHeading)}
                              </span>
                            </motion.div>
                          )}
                          {item?.heading && (
                            <div className="title-green">
                              <motion.h4 variants={animFade}>
                                {parse(item.heading)}
                              </motion.h4>
                            </div>
                          )}
                          {item?.shortDescription && (
                            <motion.div variants={animFade} className="content">
                              <p>{parse(item.shortDescription)}</p>
                            </motion.div>
                          )}
                        </div>
                        {item?.enquireButton && (
                          <div className="w-3/12 lgscreen:w-full">
                            <motion.div
                              variants={animFade}
                              className="flex flex-wrap justify-end lgscreen:justify-start gap-x-[5px] gap-y-[10px]"
                            >
                              <Link
                                to={item.enquireButton.url}
                                className="btn btn-green"
                                target={item.enquireButton.target}
                              >
                                {item.enquireButton.title}
                              </Link>
                            </motion.div>
                          </div>
                        )}
                      </div>
                      <div className="rates-details relative mt-30 lgscreen:mt-20">
                        <div className="tabs-container">
                          {item?.tableOne &&
                            item.tableOne.map((itemTab, m) => {
                              const tabName1 = item.heading.replace(/ /g, "-")
                              const tabName = itemTab.tabName
                              const tabNameStr = tabName.replace(/ /g, "-")
                              const newTabName = tabName1 + "-" + tabNameStr
                              return (
                                <motion.div
                                  key={i + "-" + m}
                                  variants={animFade}
                                  id={newTabName}
                                  className={`tab-content w-full overflow-y-hidden smscreen2:pb-15 ${
                                    tabOption[item.heading] === newTabName
                                      ? "tab-current"
                                      : "hidden"
                                  }`}
                                >
                                  <table className="tabletabs w-full smscreen2:min-w-[800px] price-table">
                                    <tbody>
                                      <tr>
                                        <td className="flex tablecontent">
                                          {item?.tableOne.length > 0 &&
                                            item.tableOne.map((itemTab, j) => {
                                              const tabName1 =
                                                item.heading.replace(/ /g, "-")
                                              const tabNameStr =
                                                itemTab.tabName.replace(
                                                  / /g,
                                                  "-"
                                                )
                                              const newTabName =
                                                tabName1 + "-" + tabNameStr
                                              return (
                                                <li
                                                  key={i + "-" + j}
                                                  onClick={() => {
                                                    setTabOption({
                                                      ...tabOption,
                                                      [item.heading]:
                                                        newTabName,
                                                    })
                                                  }}
                                                  className={`tab-link !text-13 text-center !font-500 tracking-[1.04px] uppercase cursor-pointer px-15 opacity-[0.65] ${
                                                    tabOption[item.heading] ===
                                                    newTabName
                                                      ? "tab-current"
                                                      : ""
                                                  }`}
                                                  onKeyDown={() => {
                                                    setTabOption({
                                                      ...tabOption,
                                                      [item.heading]:
                                                        newTabName,
                                                    })
                                                  }}
                                                  aria-hidden="true"
                                                >
                                                  {itemTab.tabName}
                                                </li>
                                              )
                                            })}
                                        </td>

                                        {itemTab.tableHeading.map(
                                          (tabHead, k) => (
                                            <td key={i + "-" + k}>
                                              <span className="flex flex-col justify-center items-center">
                                                <span className="txt-l">
                                                  {tabHead.heading}
                                                </span>
                                                <span className="txt-top">
                                                  {tabHead.tagLine}
                                                </span>
                                              </span>
                                            </td>
                                          )
                                        )}
                                      </tr>
                                      {itemTab.tableDetails.map(
                                        (tabdata, k) => (
                                          <tr key={i + "-" + k}>
                                            {tabdata.suitesDetail.map(
                                              (info, t) => (
                                                <td key={i + "-" + t}>
                                                  <span
                                                    className={`${
                                                      info.tabWidth === "big"
                                                        ? "txt-o"
                                                        : "txt-p"
                                                    }`}
                                                  >
                                                    {info.suitesName}
                                                  </span>
                                                </td>
                                              )
                                            )}
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>

                                  <table className="w-full smscreen2:min-w-[800px] mt-50">
                                    <tbody>
                                      {item.tableTwo.map((moredata, l) => (
                                        <tr key={i + "-" + l}>
                                          <td colSpan="2">
                                            <span className="txt-o">
                                              {moredata.rowName}
                                            </span>
                                            <span className="txt-sub">
                                              {moredata.rowTagline}
                                            </span>
                                          </td>
                                          <td>
                                            <span className="txt-p">
                                              {moredata.price}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </motion.div>
                              )
                            })}

                          {item?.downloadRatesFile && (
                            <motion.div
                              variants={animFade}
                              className="mt-30 smscreen2:mt-15 flex flex-wrap gap-x-[20px]"
                            >
                              {item?.downloadRatesFile.length > 0 &&
                                item.downloadRatesFile.map((itembtn, k) => {
                                  return (
                                    <React.Fragment key={i + "-" + k}>
                                      {itembtn?.downloadFile && (
                                        <Link
                                          to={itembtn.downloadFile.url}
                                          className="btn btn-link flex flex-wrap gap-x-2 items-center"
                                          target={itembtn.downloadFile.target}
                                        >
                                          <img
                                            src="/../images/download.svg"
                                            width={15}
                                            height={15}
                                            loading="lazy"
                                            alt="get directions"
                                          />{" "}
                                          {itembtn.downloadFile.title}
                                        </Link>
                                      )}
                                    </React.Fragment>
                                  )
                                })}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default OurRates
export const PageOurRatesFragment = graphql`
  fragment PageOurRatesFragment on WpPage_Pagecontent_PageContent_OurRates {
    extraId
    extraClass
    hideSection
    tableContent {
      heading
      preHeading
      shortDescription
      enquireButton {
        target
        title
        url
      }
      downloadRatesFile {
        downloadFile {
          target
          title
          url
        }
      }
      tableOne {
        tabName
        tableDetails {
          suitesDetail {
            suitesName
            tabWidth
          }
        }
        tableHeading {
          heading
          tagLine
        }
      }
      tableTwo {
        price
        rowName
        rowTagline
      }
    }
  }
`
