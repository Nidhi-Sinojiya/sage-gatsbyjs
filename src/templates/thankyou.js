import { motion, useAnimate, useInView } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "../components/ImageOpt"

const Enquiry = props => {
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

  const [propertyValue, setPropertyValue] = useState("")

  useEffect(() => {
    // Get the full URL
    const currentURL = window.location.href
    const queryString = currentURL.split("?")[1]
    if (queryString) {
      const queryParams = queryString.split("&")
      const queryObject = {}
      queryParams.forEach(param => {
        const [key, value] = param.split("=")
        queryObject[key] = decodeURIComponent(value)
      })
      // Get the "enquiry" value from the query object
      const extractedPropertyValue = queryObject.enquiry
      setPropertyValue(extractedPropertyValue)
    }
  }, [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [scope, animate] = useAnimate()
  const [headerFull, setHeaderFull] = useState(false)

  const headerData = useStaticQuery(graphql`
    query {
      wp {
        fluxDnaSettings {
          fluxDna {
            formLogo {
              altText
              mediaItemUrl
            }
            guestEnquiryImage {
              altText
              mediaItemUrl
            }
            property1Image {
              altText
              mediaItemUrl
            }
            property2Image {
              altText
              mediaItemUrl
            }
            property3Image {
              altText
              mediaItemUrl
            }
            property4Image {
              altText
              mediaItemUrl
            }
            property5Image {
              altText
              mediaItemUrl
            }
            property6Image {
              altText
              mediaItemUrl
            }
            sidebarMenuTwo {
              sidebarMenuTwoHeading
              sidebarMenuLinkTwo {
                menuItemTwo {
                  target
                  title
                  url
                }
              }
            }
            email
            mainLogo {
              altText
              mediaItemUrl
            }
            sidebarMenuOne {
              menu {
                target
                title
                url
              }
            }
            sidebarMenuLogo {
              altText
              mediaItemUrl
            }
            sidebarMenuImage {
              altText
              mediaItemUrl
            }
            allPropertiesButton {
              target
              title
              url
            }
            makeEnquiry {
              target
              title
              url
            }
            thankyouHeading
            thankyouDescription
          }
        }
      }
    }
  `)

  const headerDataList = headerData.wp.fluxDnaSettings.fluxDna
  useEffect(() => {
    const menuAnimations = menuOpen
      ? [
          [".main-nav", { transform: "translateX(0%)" }, { duration: 0.6 }],
          [
            ".navMenu",
            { transform: "translateX(0px)", opacity: 1 },
            { duration: 0.5, at: "4" },
          ],
        ]
      : [
          [
            ".navMenu",
            { transform: "translateX(50px)", opacity: 0 },
            { duration: 0.5, at: "1" },
          ],
          [".main-nav", { transform: "translateX(-100%)" }, { duration: 0.6 }],
        ]
    animate([...menuAnimations])
  }, [scope, menuOpen, animate])

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
  }, [menuOpen])

  const MenuToggle = ({ toggle }) => (
    <div
      className="navbar-icon cursor-pointer flex items-center gap-x-4"
      onClick={toggle}
      onKeyDown={toggle}
      aria-hidden="true"
    >
      <img
        src="/../images/menu-icon-black.svg"
        className="menu-icon"
        width={27}
        height={14}
        alt=""
      />
      <Link to="#" className="gap-y-1 close-icon hidden">
        <img
          src="/../images/close.svg"
          width={19}
          height={19}
          alt="close-icon"
          className="close-icon"
          loading="eager"
        />
      </Link>
      <span className="text-white-100 uppercase text-13 tracking-[1.4px] font-420 hidden">
        close menu
      </span>
    </div>
  )

  return (
    <div
      className="fullPageanimation headerSecondary overflow-x-hidden"
      ref={scope}
    >
      <>
        <motion.section
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
          className="thank-you traveller-enquiry-form"
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView || hasPlayed ? "show" : "hidden"}
            variants={sectionShow}
            className="flex flex-wrap"
          >
            <div className="lg:w-7/12 w-full closemenu relative">
              <div className="xl:px-60 lg:px-40 px-20 pt-0 mdscreen:pb-[100px] relative h-screen enquiry-left overflow-y-auto overflow-x-hidden smscreen:pt-0">
                <div className="scroll-form-main mx-auto flex flex-col justify-between items-center gap-y-6 h-full">
                  <div className="w-full h-full">
                    <div
                      className={`topheader pt-50 pb-15 flex flex-wrap items-center justify-between smscreen:justify-end relative z-9999 smscreen2:pb-20 ${
                        headerFull
                          ? "!fixed xl:w-[calc(100%_-_120px)] lg:w-[calc(100%_-_80px)] w-[calc(100%_-_40px)]"
                          : ""
                      }`}
                    >
                      {" "}
                      {headerDataList?.formLogo && (
                        <div className="logo smscreen:hidden">
                          <Link to="/">
                            <img
                              src={headerDataList.formLogo.mediaItemUrl}
                              loading="eager"
                              width={273}
                              height={20}
                              alt={headerDataList.formLogo.altText}
                              className={`${headerFull ? "invert-[1] smscreen:w-[230px]" : ""}`}
                            />
                          </Link>
                        </div>
                      )}
                      <div className="navbar-menu flex flex-wrap items-center smscreen:gap-x-4">
                        <Link
                          to="/"
                          className={`text-green-100 text-13 uppercase tracking-[1.04px] font-420 mr-15 flex flex-wrap gap-x-2 ${
                            headerFull ? "hidden" : ""
                          }`}
                        >
                          <img src="../images/back-arrow.svg" alt="" />
                          Back to site
                        </Link>

                        <MenuToggle
                          toggle={() => {
                            setMenuOpen(!menuOpen)
                            setHeaderFull(!headerFull)
                          }}
                          onClick={() => {
                            !menuOpen ? setMenuOpen(true) : setMenuOpen(false)
                          }}
                        ></MenuToggle>
                      </div>
                    </div>

                    <div className="scroll-form-main w-[580px] lgscreen:w-full mx-auto thankYou-content flex flex-col justify-center items-center gap-y-6 text-center h-[calc(100vh_-_100px)]">
                      <div className="max-w-[510px] lgscreen:w-full mx-auto">
                        {headerDataList?.thankyouHeading && (
                          <motion.h4 variants={animFade}>
                            {headerDataList.thankyouHeading}
                          </motion.h4>
                        )}
                        {headerDataList?.thankyouDescription && (
                          <motion.div
                            variants={animFade}
                            className="content pt-10"
                          >
                            {parse(headerDataList.thankyouDescription)}
                          </motion.div>
                        )}
                        <motion.div
                          variants={animFade}
                          className="mt-40 flex justify-center "
                        >
                          <Link to="/" className="btn btn-green-border">
                            Go to homepage
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 w-full h-screen lgscreen:hidden enquiry-form-img transition-all duration-[600ms]">
              {propertyValue === "THE-OUTPOST" ? (
                <ImageOpt
                  imgData={headerDataList.property1Image.mediaItemUrl}
                  imgAlt={headerDataList.property1Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : propertyValue === "THE-OLD-RECTORY" ? (
                <ImageOpt
                  imgData={headerDataList.property2Image.mediaItemUrl}
                  imgAlt={headerDataList.property2Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : propertyValue === "Pel-s-Post" ? (
                <ImageOpt
                  imgData={headerDataList.property3Image.mediaItemUrl}
                  imgAlt={headerDataList.property3Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : propertyValue === "Country-house" ? (
                <ImageOpt
                  imgData={headerDataList.property4Image.mediaItemUrl}
                  imgAlt={headerDataList.property4Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : propertyValue === "Tshwene-Lodge" ? (
                <ImageOpt
                  imgData={headerDataList.property5Image.mediaItemUrl}
                  imgAlt={headerDataList.property5Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : propertyValue === "Ekuthuleni-Lodge" ? (
                <ImageOpt
                  imgData={headerDataList.property6Image.mediaItemUrl}
                  imgAlt={headerDataList.property6Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : (
                <ImageOpt
                  imgData={headerDataList.guestEnquiryImage.mediaItemUrl}
                  imgAlt={headerDataList.guestEnquiryImage.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              )}
            </div>
          </motion.div>
        </motion.section>

        <div className="main-nav">
          <div className="menu-overlay h-full fixed w-full top-0 right-0 bg-green-100"></div>
          <div className="scrollbar pb-80 lgscreen:pb-40 overflow-x-hidden px-70 lgscreen:px-45 pt-[160px] mdscreen:pt-120 smscreen2:pt-100 smscreen2:pb-50 h-full mdscreen:overflow-y-auto xlscreen:pl-80 xlscreen:pr-50 mdscreen:!px-45 smscreen2:pr-0 relative">
            <div className="mainNav__col relative h-full lgscreen:h-auto smscreen2:flex smscreen2:flex-col">
              <ul className="navMenu main-navbar text-white flex flex-wrap smscreen2:flex-col smscreen2:text-center gap-x-8 gap-y-3 justify-center smscreen2:order-2">
                {headerDataList?.sidebarMenuOne.length > 0 &&
                  headerDataList.sidebarMenuOne.map((itemMenu, im) => {
                    return (
                      <li key={im}>
                        <Link
                          to={itemMenu.menu.url}
                          className="text-16 laptop:text-14 text-white-100 font-420 tracking-[0.786px] uppercase hover:opacity-50"
                          target={itemMenu.menu.target}
                        >
                          {parse(itemMenu.menu.title)}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
              <div className="navMenu flex flex-wrap items-center pt-40 h-full smscreen2:order-1 smscreen2:pt-0 smscreen2:pb-40">
                {headerDataList?.sidebarMenuImage && (
                  <div className="w-7/12 lgscreen:w-full lgscreen:hidden">
                    <div className="img landscape relative">
                      <ImageOpt
                        imgData={headerDataList.sidebarMenuImage.mediaItemUrl}
                        width={748}
                        height={539}
                        imgAlt={headerDataList.sidebarMenuImage.altText}
                        imgLoad="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className="w-5/12 sub-navbar lgscreen:w-full pl-120 xlscreen:pl-60 lgscreen:pl-0 lgscreen:pt-50 mdscreen:pt-0">
                  <div className="flex flex-col lgscreen:!flex-wrap lgscreen:flex-row mdscreen:justify-center lgscreen:justify-center gap-y-[26px] gap-x-[50px] mdscreen:flex-col mdscreen:text-center ">
                    {headerDataList?.sidebarMenuTwo.length > 0 &&
                      headerDataList.sidebarMenuTwo.map((item, im) => {
                        return (
                          <div className="sub-navMenu" key={im}>
                            {item?.sidebarMenuTwoHeading && (
                              <span>{item.sidebarMenuTwoHeading}</span>
                            )}
                            <ul>
                              {item?.sidebarMenuLinkTwo.length > 0 &&
                                item.sidebarMenuLinkTwo.map((itemsm, ism) => {
                                  return (
                                    <li key={ism}>
                                      <Link
                                        to={itemsm.menuItemTwo.url}
                                        className="text-white-100 text-20 font-420 tracking-[1px] uppercase hover:opacity-50"
                                        target={itemsm.menuItemTwo.target}
                                      >
                                        {itemsm.menuItemTwo.title}
                                      </Link>
                                    </li>
                                  )
                                })}
                            </ul>
                          </div>
                        )
                      })}
                  </div>
                  {headerDataList?.allPropertiesButton && (
                    <div className="mt-30 lgscreen:text-center">
                      <Link
                        to={headerDataList.allPropertiesButton.url}
                        className="btn btn-white"
                        target={headerDataList.allPropertiesButton.target}
                      >
                        {headerDataList.allPropertiesButton.title}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Enquiry
