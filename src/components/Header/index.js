import { useAnimate } from "framer-motion"
import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import ImageOpt from "../ImageOpt"
import "./Header.css"

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState(null)

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? "down" : "up"
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener("scroll", updateScrollDirection) // add event listener

    return () => {
      window.removeEventListener("scroll", updateScrollDirection) // clean up
    }
  }, [scrollDirection])

  return scrollDirection
}

const Header = () => {
  const scrollDirection = useScrollDirection()
  const headerData = useStaticQuery(graphql`
    query {
      wp {
        fluxDnaSettings {
          fluxDna {
            mainMenu {
              innerMenu
              innerMenuStyle
              stayInnerMenu {
                heading
                mainSubMenu {
                  subMenuLink {
                    target
                    title
                    url
                  }
                }
              }
              menuLink {
                target
                title
                url
              }
            }
            sidebarMenuTwo {
              sidebarMenuTwoHeading
              sidebarMenuLinkTwo {
                menuItemTwo {
                  target
                  title
                  url
                }
                menuItemTwoImage {
                  altText
                  mediaItemUrl
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
            makeEnquiryMobile {
              target
              title
              url
            }
          }
        }
      }
    }
  `)
  const headerDataList = headerData.wp.fluxDnaSettings.fluxDna
  const [menuOpen, setMenuOpen] = useState(false)
  const [scope, animate] = useAnimate()

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
          [".main-nav", { transform: "translateX(-110%)" }, { duration: 0.6 }],
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

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header")
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop === 0) {
        header.classList.remove("header-sticky")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const MenuToggle = ({ toggle }) => (
    <div
      className="navbar-icon cursor-pointer flex items-center gap-x-4"
      onClick={toggle}
      onKeyDown={toggle}
      aria-hidden="true"
    >
      <img
        src="/../images/menu-icon.svg"
        className="menu-icon"
        width={19}
        height={16}
        alt=""
      />
      <Link to="#" className="gap-y-1 close-icon hidden">
        <img
          src="/../images/close.svg"
          width={19}
          height={19}
          alt="close-icon"
          className="close-icon"
          loading="eager "
        />
      </Link>
      <span className="text-white-100 uppercase text-13 tracking-[1.4px] font-420 hidden">
        close menu
      </span>
    </div>
  )
  const [hoveredItemId, setHoveredItemId] = useState("0-0")
  const handleMouseEnter = index => {
    setHoveredItemId(index)
  }

  const handleMouseLeave = () => {
    setHoveredItemId("0-0") // Reset to the first item on mouse leave
  }
  return (
    <React.Fragment>
      <section ref={scope}>
        <header
          className={`header py-30 fixed z-999 w-full ${
            scrollDirection === "down"
              ? "-top-[160px] -z-99 transition-all duration-[750ms] ease-in-out"
              : "top-0 z-99 transition-all duration-[750ms] ease-in-out"
          } ${
            scrollDirection === "up" && window.pageYOffset !== "0"
              ? "header-sticky "
              : ""
          }`}
        >
          <div className="container-fluid relative z-9">
            <div className="grid grid-cols-3 items-center">
              <div className="header-left flex flex-wrap items-center gap-x-10 xlscreen:gap-x-5">
                <MenuToggle
                  toggle={() => {
                    setMenuOpen(!menuOpen)
                  }}
                  onClick={() => {
                    !menuOpen ? setMenuOpen(true) : setMenuOpen(false)
                  }}
                ></MenuToggle>

                <ul className="flex flex-wrap gap-x-9 laptop:gap-x-5 ipad:hidden">
                  {headerDataList?.mainMenu.length > 0 &&
                    headerDataList.mainMenu.map((itemMenu, im) => {
                      return (
                        <li
                          onMouseEnter={() => {
                            document.body.classList.add("mega-menu-open")
                          }}
                          onMouseLeave={() => {
                            document.body.classList.remove("mega-menu-open")
                          }}
                          className="hoverable"
                          key={im}
                          aria-hidden="true"
                        >
                          <Link
                            className="uppercase text-white-100 text-14 xlscreen:text-12 font-420 tracking-[0.7px] pb-15 hover:opacity-50"
                            to={itemMenu.menuLink.url}
                            target={itemMenu.menuLink.target}
                          >
                            {itemMenu.menuLink.title}
                          </Link>
                          {itemMenu?.innerMenu === true &&
                            itemMenu?.innerMenuStyle === "style1" && (
                              <div className="mega-menu bg-green-100 p-30 text-center mt-15">
                                <div className="grid gap-y-3">
                                  {itemMenu?.stayInnerMenu.length > 0 &&
                                    itemMenu.stayInnerMenu.map((itemS, im) => {
                                      return (
                                        <div className="menu-block" key={im}>
                                          <span className="text-12 font-primary -tracking-[0.175px] font-400 italic text-white-100">
                                            {itemS.heading}
                                          </span>
                                          <ul className="grid gap-y-[5px] mt-5">
                                            {itemS?.mainSubMenu.length > 0 &&
                                              itemS.mainSubMenu.map(
                                                (item, i) => {
                                                  return (
                                                    <li key={i}>
                                                      <Link
                                                        to={
                                                          item.subMenuLink.url
                                                        }
                                                        className="uppercase text-white-100 text-16 font-420 tracking-[0.82px] hover:opacity-50"
                                                        target={
                                                          item.subMenuLink
                                                            .target
                                                        }
                                                      >
                                                        {item.subMenuLink.title}
                                                      </Link>
                                                    </li>
                                                  )
                                                }
                                              )}
                                          </ul>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            )}
                          {itemMenu?.innerMenu === true &&
                            itemMenu?.innerMenuStyle === "style2" && (
                              <div className="mega-menu mega-menu2 bg-green-100 p-30 text-center mt-15">
                                <div className="grid gap-y-3">
                                  {itemMenu?.stayInnerMenu.length > 0 &&
                                    itemMenu.stayInnerMenu.map((itemS, im) => {
                                      return (
                                        <div className="menu-block" key={im}>
                                          <span className="text-12 font-primary -tracking-[0.175px] font-400 italic text-white-100">
                                            {itemS.heading}
                                          </span>
                                          <ul className="grid gap-y-[10px] mt-5">
                                            {itemS?.mainSubMenu.length > 0 &&
                                              itemS.mainSubMenu.map(
                                                (item, i) => {
                                                  return (
                                                    <li key={i}>
                                                      <Link
                                                        to={
                                                          item.subMenuLink.url
                                                        }
                                                        className="capitalize text-white-100 font-primary italic text-16 font-420 tracking-[0.32px] hover:opacity-50"
                                                        target={
                                                          item.subMenuLink
                                                            .target
                                                        }
                                                      >
                                                        {item.subMenuLink.title}
                                                      </Link>
                                                    </li>
                                                  )
                                                }
                                              )}
                                          </ul>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            )}
                        </li>
                      )
                    })}
                </ul>
              </div>
              {headerDataList?.mainLogo && (
                <div className="logo text-center">
                  <Link to="/">
                    <img
                      src={headerDataList.mainLogo.mediaItemUrl}
                      className="mx-auto"
                      width={127}
                      height={40}
                      loading="eager"
                      alt={headerDataList.mainLogo.altText}
                    />
                  </Link>
                </div>
              )}

              <div className="btn-custom text-right flex items-center gap-x-6 justify-end">
                {headerDataList?.email && (
                  <div className="hidden emailtext transition-all duration-500">
                    <Link
                      to={`mailto:${headerDataList.email}`}
                      className="text-white-100 text-13 font-390 underline hover:opacity-50"
                    >
                      {headerDataList.email}
                    </Link>
                  </div>
                )}
                {headerDataList?.makeEnquiry && (
                  <div className="inline-block ipad:hidden">
                    <Link
                      to={headerDataList.makeEnquiry.url}
                      className="btn btn-white"
                      target={headerDataList.makeEnquiry.target}
                    >
                      {headerDataList.makeEnquiry.title}
                    </Link>
                  </div>
                )}
                {headerDataList?.makeEnquiryMobile && (
                  <div className="hidden ipad:block">
                    <Link
                      to={headerDataList.makeEnquiryMobile.url}
                      className="btn btn-white !py-10 !px-15"
                      target={headerDataList.makeEnquiryMobile.target}
                    >
                      {headerDataList.makeEnquiryMobile.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="main-nav pb-50">
          <div className="menu-overlay h-full fixed w-full top-0 right-0 bg-green-100"></div>
          <div className="scrollbar pb-80 overflow-x-hidden lgscreen:pb-40 px-70 lgscreen:px-45 pt-[150px] mdscreen:pt-120 smscreen2:pb-50 h-full overflow-y-auto xlscreen:pl-80 xlscreen:pr-50 mdscreen:!px-45 smscreen2:pr-0 relative">
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
                <div className="w-7/12 lgscreen:w-full lgscreen:hidden relative pt-[539px]">
                  {headerDataList?.sidebarMenuTwo.length > 0 &&
                    headerDataList.sidebarMenuTwo.map((itemimg, ik) => {
                      return (
                        <div
                          className="img landscape absolute top-0 w-full h-full"
                          key={ik}
                        >
                          {itemimg?.sidebarMenuLinkTwo.length > 0 &&
                            itemimg.sidebarMenuLinkTwo.map((itemi, index) => {
                              const keyi = ik + "-" + index
                              return (
                                <div
                                  key={keyi}
                                  className={
                                    keyi === hoveredItemId
                                      ? "show-image"
                                      : "hide-image"
                                  }
                                >
                                  <ImageOpt
                                    imgData={
                                      itemi.menuItemTwoImage.mediaItemUrl
                                    }
                                    width={748}
                                    height={539}
                                    imgAlt={itemi.menuItemTwoImage.altText}
                                    imgLoad="lazy"
                                  />
                                </div>
                              )
                            })}
                        </div>
                      )
                    })}
                </div>

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
                                item.sidebarMenuLinkTwo.map((itemsm, index) => {
                                  const keyi = im + "-" + index
                                  return (
                                    <li key={keyi}>
                                      <Link
                                        to={itemsm.menuItemTwo.url}
                                        className="text-white-100 text-20 font-420 tracking-[1px] uppercase hover:opacity-50"
                                        target={itemsm.menuItemTwo.target}
                                        onMouseEnter={() =>
                                          handleMouseEnter(keyi)
                                        }
                                        onMouseLeave={handleMouseLeave}
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
      </section>
    </React.Fragment>
  )
}

export default Header
