import { useAnimate } from "framer-motion"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ImageOpt from "../components/ImageOpt"

const Enquiry = props => {
  const [stepForm, setStepForm] = useState(1)
  const [isLadoing, setIsLoading] = useState(false)
  const [nxtDate, setNxtDate] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerFull, setHeaderFull] = useState(false)
  const [scope, animate] = useAnimate()
  const [numNight, setNumNight] = useState()
  const [startD, setStartD] = useState(null)
  const [endD, setEndD] = useState(null)
  const [checked, setChecked] = useState(false)
  const [form, setForm] = useState({
    input_1: [],
    input_5: [],
    input_33: [],
    input_8: "",
    input_11: "",
    input_12: "",
    input_31: "",
    input_16: "",
    input_17: "",
    input_20: "",
    input_21: "",
    input_22: "",
    input_34: "",
    input_23: "",
    input_24: "",
    input_25: "",
    input_28: "",
    input_29: "",
  })
  const [formError, setFormError] = useState({
    input_33: "",
    input_8: "",
    input_11: "",
    input_12: "",
    input_31: "",
    input_16: "",
    input_17: "",
    input_20: "",
    input_21: "",
    input_22: "",
    input_34: "",
    input_23: "",
    input_24: "",
    input_25: "",
    input_28: "",
    input_29: "",
  })

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

  const staticOptions = [
    {
      value: "THE OUTPOST",
      title: "THE OUTPOST",
      label: "Kruger National Park",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon1.svg",
    },
    {
      value: "THE OLD RECTORY",
      title: "THE OLD RECTORY",
      label: "Plettenberg Bay",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon2.svg",
    },
    {
      value: "Pel s Post",
      title: "Pel's Post",
      label: "Kruger National Park",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon1.svg",
    },
    {
      value: "Country house",
      title: "Country house",
      label: "Plettenberg Bay",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon3.svg",
    },
    {
      value: "Tshwene Lodge",
      title: "Tshwene Lodge",
      label: "Welgevonden Game Reserve",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon1.svg",
    },
    {
      value: "Ekuthuleni Lodge",
      title: "Ekuthuleni Lodge",
      label: "Welgevonden Game Reserve",
      price: "FRom price Rxxxxx Per Night",
      animicon: "animal-icon1.svg",
    },
  ]

  const handleCheckboxChange = value => {
    const isChecked = form.input_5.includes(value)
    if (isChecked) {
      setForm({
        ...form,
        input_5: form.input_5.filter(item => item !== value),
      })
    } else {
      setForm({
        ...form,
        input_5: [...form.input_5, value],
      })
    }
  }

  useEffect(() => {
    document.body.classList.add("enquiry-page")
  })

  useEffect(() => {
    if (startD && endD) {
      const dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 3600 * 24
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

        return Math.floor((utc2 - utc1) / _MS_PER_DAY + 1)
      }
      const a = startD
      const b = endD
      const difference = dateDiffInDays(a, b)
      setNumNight(difference)
    }
  }, [startD, endD, setNumNight])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href
      const queryString = url.includes("?") ? url.split("?")[1] : ""
      const searchParams = new URLSearchParams(queryString)

      if (searchParams.has("property")) {
        const formStr = url.split("=")[1]
        const venue = formStr.replace(/-/g, " ")
        const venueStr = venue.replace("+", "’")
        if (venueStr !== form.input_5[0]) {
          setForm({
            ...form,
            input_5: [venueStr], // Assuming input_5 is an array
          })
        }
      }
    }
  }, [form])

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
          }
        }
      }
    }
  `)

  const headerDataList = headerData.wp.fluxDnaSettings.fluxDna
  return (
    <div
      className="fullPageanimation headerSecondary overflow-hidden"
      ref={scope}
    >
      <>
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

        <section className="traveller-enquiry-form">
          <div className="flex flex-wrap">
            <div className="lg:w-8/12 w-full closemenu relative">
              <div className="xl:px-60 lg:px-40 px-20 pb-20 pt-0 relative lg:h-[calc(100vh_-_10px)] enquiry-left overflow-y-auto overflow-x-hidden smscreen:pt-0">
                <div className="scroll-form-main mx-auto flex flex-col justify-between items-center gap-y-6 h-full lgscreen:h-auto">
                  <div className="w-full">
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
                              className={`${
                                headerFull
                                  ? "invert-[1] smscreen:w-[230px]"
                                  : ""
                              }`}
                            />
                          </Link>
                        </div>
                      )}
                      <div className="navbar-menu flex flex-wrap items-center smscreen:gap-x-4">
                        <span
                          onClick={() => navigate(-1)}
                          onKeyDown={() => navigate(-1)}
                          className={`text-green-100 text-13 uppercase cursor-pointer tracking-[1.04px] font-420 mr-15 flex flex-wrap gap-x-2 ${
                            headerFull ? "hidden" : ""
                          }`}
                        >
                          <img src="../images/back-arrow.svg" alt="" />
                          Back to site
                        </span>

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

                    <div
                      className={`top-info flex flex-wrap items-center justify-between pb-10 border-b-1 border-[#4D4D4F] border-opacity-20 ${
                        headerFull ? "pt-90" : ""
                      }`}
                    >
                      <h3 className="text-[28px] text-green-100 uppercase tracking-[1.4px] font-420">
                        {form.input_5.length === 1
                          ? form.input_5[0] + " Enquiry"
                          : "Guest Enquiry"}
                      </h3>
                    </div>
                    <div className={`gf-step ${"step_" + stepForm}`}></div>
                    <form className=" mt-35 enquiry-step-form">
                      {stepForm === 1 && (
                        <div className="form-row">
                          <h6 className="text-18 text-green-100 tracking-[0.9px] uppercase font-420">
                            Select property or properties to enquire for:
                          </h6>
                          <div className="flex flex-wrap lg:mx-minus-20 lgscreen:gap-x-20 mt-30 lgscreen:gap-y-3">
                            <div className="w-full lg:pr-80 desktop2:pr-40 lgscreen:pr-0">
                              <div className="form-group grid grid-cols-2 mdscreen:grid-cols-1  gap-x-20 desktop2:gap-x-[40px] gap-y-6 relative overflow-hidden">
                                {staticOptions.map((option, index) => (
                                  <div key={index} className="checkbox-bx">
                                    <input
                                      type="checkbox"
                                      value={option.value}
                                      checked={form.input_5.includes(
                                        option.value
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(option.value)
                                      }
                                      id={`label_2_5_${index}`}
                                    />

                                    <label
                                      htmlFor={`label_2_5_${index}`}
                                      className="w-full flex flex-wrap justify-between items-center gap-y-5 cursor-pointer pt-5"
                                    >
                                      <div className="flex flex-col gap-y-[5px] pr-15">
                                        <span className="text-12 font-primary italic text-green-100 -tracking-[0.16px] font-400">
                                          {option.label}
                                        </span>
                                        <span className="text-15 smscreen2:text-16 font-420 uppercase tracking-[0.75px] text-green-100">
                                          {option.title}
                                        </span>
                                        <span className="text-12 font-420 text-green-100 uppercase">
                                          {option.price}
                                        </span>
                                      </div>
                                      <div className="icon">
                                        <img
                                          src={"../images/" + option.animicon}
                                          alt=""
                                        />
                                      </div>
                                    </label>
                                  </div>
                                ))}
                              </div>

                              {formError.input_5 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_5}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {stepForm === 2 && (
                        <div className="form-row">
                          <h6 className="text-18 text-green-100 tracking-[0.9px] uppercase font-420">
                            When will you be staying?
                          </h6>
                          <div className="flex flex-wrap lg:mx-minus-10 lgscreen:gap-x-20 mt-30 lgscreen:gap-y-3 pr-35 lgscreen:pr-0">
                            <div className="lg:w-6/12 w-full lg:pr-10">
                              <div className="form-group flex flex-wrap add-arrow">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_11"
                                >
                                  Arrival Date
                                  <span className="text-100">*</span>
                                </label>
                                <DatePicker
                                  className="enquiry-date-picker w-full"
                                  selected={form.input_11}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Select Date..."
                                  minDate={new Date()}
                                  onChange={date => {
                                    setForm({
                                      ...form,
                                      input_11: date,
                                    })

                                    var ardate = new Date(date)
                                    ardate.setDate(ardate.getDate() + 1)
                                    setNxtDate(ardate)
                                    setStartD(ardate)
                                    setFormError({
                                      ...formError,
                                      input_11: "",
                                    })
                                  }}
                                />
                              </div>

                              {formError.input_11 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_11}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="lg:w-6/12 w-full lg:pl-10">
                              <div className="form-group flex flex-wrap add-arrow">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_12"
                                >
                                  Departure Date
                                  <span className="text-100">*</span>
                                </label>
                                <DatePicker
                                  selected={form.input_12}
                                  disabled={form.input_11 === "" ? true : false}
                                  minDate={nxtDate}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Select Date..."
                                  onChange={date => {
                                    setForm({
                                      ...form,
                                      input_12: date,
                                    })
                                    setEndD(date)
                                    setFormError({
                                      ...formError,
                                      input_12: "",
                                    })
                                  }}
                                />
                              </div>
                              {formError.input_12 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_12}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="pt-5">
                              {numNight && (
                                <p className="text-12 smscreen2:text-16 text-green-300 uppercase italic tracking-[0.45px]">
                                  You've selected a {numNight} night stay.
                                </p>
                              )}
                            </div>

                            <div className="w-full">
                              <div className="form-group flex flex-wrap lg:mt-20 mt-10">
                                <div className="simple-bx relative cursor-pointer cursor-scale">
                                  <input
                                    type="checkbox"
                                    value="Yes"
                                    checked={checked}
                                    onChange={e => {
                                      setChecked(e.target.checked)
                                      setForm({
                                        ...form,
                                        input_30_1: e.target.value,
                                      })
                                    }}
                                    id="input_30_1"
                                  />
                                  <label
                                    htmlFor="input_30_1"
                                    className="w-full text-16 smscreen2:text-16 font-390 -tracking-[0.26px] text-green-300 cursor-pointer pl-30"
                                  >
                                    My dates are flexible
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {stepForm === 3 && (
                        <div className="form-row">
                          <h6 className="text-18 text-green-100 tracking-[0.9px] uppercase font-420">
                            Who will be joining you?
                          </h6>
                          <div className="flex flex-wrap lg:mx-minus-20 lgscreen:gap-x-20 mt-30 gap-y-[20px] pr-35 lgscreen:pr-0">
                            <div className="lg:w-6/12 w-full lg:pr-20">
                              <div className="form-group flex flex-wrap add-arrow">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_16"
                                >
                                  Number of Adults
                                  <span className="text-100">*</span>
                                </label>

                                <select
                                  name=""
                                  id=""
                                  value={form.input_16}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_16: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_16: "",
                                    })
                                  }}
                                >
                                  <option value="">Select number...</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>

                              {formError.input_16 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_16}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="lg:w-6/12 w-full lg:pl-20">
                              <div className="form-group flex flex-wrap add-arrow">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_17"
                                >
                                  Number of Children{" "}
                                  <span className="text-100">*</span>
                                </label>

                                <select
                                  name=""
                                  value={form.input_17}
                                  id=""
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_17: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_17: "",
                                    })
                                  }}
                                >
                                  <option value="">Select number...</option>
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              {formError.input_17 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_17}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="lg:w-6/12 w-full lg:pr-20">
                              <div className="form-group flex flex-wrap add-arrow">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_31"
                                >
                                  Number of rooms{" "}
                                  <span className="text-100">*</span>
                                </label>

                                <select
                                  name=""
                                  value={form.input_31}
                                  id=""
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_31: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_31: "",
                                    })
                                  }}
                                >
                                  <option value="">Select number...</option>
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              {formError.input_31 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_31}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {stepForm === 4 && (
                        <div className="form-row">
                          <h6 className="text-18 text-green-100 tracking-[0.9px] uppercase font-420">
                            Guest information
                          </h6>

                          <div className="flex flex-wrap lg:mx-minus-20 lgscreen:gap-x-20 mt-10 pr-35 lgscreen:pr-0">
                            <div className="lg:w-6/12 w-full lg:pr-20">
                              <div className="form-group flex flex-wrap lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_20"
                                >
                                  First Name<span className="text-100">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={form.input_20}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_20: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_20: "",
                                    })
                                  }}
                                  placeholder="Type Here..."
                                />
                              </div>

                              {formError.input_20 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_20}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="lg:w-6/12 w-full lg:pl-20">
                              <div className="form-group flex flex-wrap lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_21"
                                >
                                  Last Name<span className="text-100">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={form.input_21}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_21: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_21: "",
                                    })
                                  }}
                                  placeholder="Type Here..."
                                />
                              </div>
                              {formError.input_21 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_21}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="lg:w-6/12 w-full lg:pr-20">
                              <div className="form-group flex flex-wrap lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_22"
                                >
                                  Email Address
                                  <span className="text-100">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={form.input_22}
                                  onBlur={e => {
                                    var value = e.target.value
                                    var pattern =
                                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                    if (!pattern.test(value)) {
                                      setForm({ ...form, input_22: "" })
                                      setFormError({
                                        ...formError,
                                        input_22: "Please enter valid email.",
                                      })
                                    }
                                  }}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_22: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_22: "",
                                    })
                                  }}
                                  placeholder="Type Here..."
                                />
                              </div>
                              {formError.input_22 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_22}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="lg:w-6/12 w-full lg:pl-20">
                              <div className="form-group flex flex-wrap lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_23"
                                >
                                  Phone Number
                                  <span className="text-100">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={form.input_23}
                                  onKeyPress={event => {
                                    if (!/^[0-9\b]+$/.test(event.key)) {
                                      event.preventDefault()
                                    }
                                  }}
                                  onBlur={e => {
                                    var value = e.target.value
                                    var pattern = /^[0-9\b]+$/
                                    if (!pattern.test(value)) {
                                      setForm({ ...form, input_23: "" })
                                      setFormError({
                                        ...formError,
                                        input_23: "Please enter valid phone.",
                                      })
                                    }
                                  }}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_23: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_23: "",
                                    })
                                  }}
                                  placeholder="Type Here..."
                                />
                              </div>
                              {formError.input_23 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_23}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="lg:w-6/12 w-full lg:pr-20">
                              <div className="form-group flex flex-wrap add-arrow lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_24"
                                >
                                  Country travelling from
                                  <span className="text-100">*</span>
                                </label>
                                <select
                                  value={form.input_24}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_24: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_24: "",
                                    })
                                  }}
                                >
                                  <option value="">Select Country...</option>
                                  <option value="South Africa">
                                    South Africa
                                  </option>
                                  <option value="Afghanistan">
                                    Afghanistan
                                  </option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">
                                    American Samoa
                                  </option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antarctica">Antarctica</option>
                                  <option value="Antigua and Barbuda">
                                    Antigua and Barbuda
                                  </option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bonaire, Sint Eustatius and Saba">
                                    Bonaire, Sint Eustatius and Saba
                                  </option>
                                  <option value="Bosnia and Herzegovina">
                                    Bosnia and Herzegovina
                                  </option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Bouvet Island">
                                    Bouvet Island
                                  </option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Territory">
                                    British Indian Ocean Territory
                                  </option>
                                  <option value="Brunei Darussalam">
                                    Brunei Darussalam
                                  </option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">
                                    Burkina Faso
                                  </option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">
                                    Cayman Islands
                                  </option>
                                  <option value="Central African Republic">
                                    Central African Republic
                                  </option>
                                  <option value="Chad">Chad</option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">
                                    Christmas Island
                                  </option>
                                  <option value="Cocos Islands">
                                    Cocos Islands
                                  </option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo, Democratic Republic of the">
                                    Congo, Democratic Republic of the
                                  </option>
                                  <option value="Congo, Republic of the">
                                    Congo, Republic of the
                                  </option>
                                  <option value="Cook Islands">
                                    Cook Islands
                                  </option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Curaçao">Curaçao</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">
                                    Czech Republic
                                  </option>
                                  <option value="Côte d'Ivoire">
                                    Côte d'Ivoire
                                  </option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">
                                    Dominican Republic
                                  </option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">
                                    El Salvador
                                  </option>
                                  <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                  </option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Eswatini (Swaziland)">
                                    Eswatini (Swaziland)
                                  </option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands">
                                    Falkland Islands
                                  </option>
                                  <option value="Faroe Islands">
                                    Faroe Islands
                                  </option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">
                                    French Guiana
                                  </option>
                                  <option value="French Polynesia">
                                    French Polynesia
                                  </option>
                                  <option value="French Southern Territories">
                                    French Southern Territories
                                  </option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guernsey">Guernsey</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guinea-Bissau">
                                    Guinea-Bissau
                                  </option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Heard and McDonald Islands">
                                    Heard and McDonald Islands
                                  </option>
                                  <option value="Holy See">Holy See</option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="India">India</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="Iran">Iran</option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Isle of Man">
                                    Isle of Man
                                  </option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jersey">Jersey</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Lao People's Democratic Republic">
                                    Lao People's Democratic Republic
                                  </option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libya">Libya</option>
                                  <option value="Liechtenstein">
                                    Liechtenstein
                                  </option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macau">Macau</option>
                                  <option value="Macedonia">Macedonia</option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands">
                                    Marshall Islands
                                  </option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Micronesia">Micronesia</option>
                                  <option value="Moldova">Moldova</option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montenegro">Montenegro</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Namibia">Namibia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherlands">
                                    Netherlands
                                  </option>
                                  <option value="New Caledonia">
                                    New Caledonia
                                  </option>
                                  <option value="New Zealand">
                                    New Zealand
                                  </option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">
                                    Norfolk Island
                                  </option>
                                  <option value="North Korea">
                                    North Korea
                                  </option>
                                  <option value="Northern Mariana Islands">
                                    Northern Mariana Islands
                                  </option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau">Palau</option>
                                  <option value="Palestine, State of">
                                    Palestine, State of
                                  </option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea">
                                    Papua New Guinea
                                  </option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Philippines">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn">Pitcairn</option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">
                                    Puerto Rico
                                  </option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russia">Russia</option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="Réunion">Réunion</option>
                                  <option value="Saint Barthélemy">
                                    Saint Barthélemy
                                  </option>
                                  <option value="Saint Helena">
                                    Saint Helena
                                  </option>
                                  <option value="Saint Kitts and Nevis">
                                    Saint Kitts and Nevis
                                  </option>
                                  <option value="Saint Lucia">
                                    Saint Lucia
                                  </option>
                                  <option value="Saint Martin">
                                    Saint Martin
                                  </option>
                                  <option value="Saint Pierre and Miquelon">
                                    Saint Pierre and Miquelon
                                  </option>
                                  <option value="Saint Vincent and the Grenadines">
                                    Saint Vincent and the Grenadines
                                  </option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome and Principe">
                                    Sao Tome and Principe
                                  </option>
                                  <option value="Saudi Arabia">
                                    Saudi Arabia
                                  </option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Serbia">Serbia</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra Leone">
                                    Sierra Leone
                                  </option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Sint Maarten">
                                    Sint Maarten
                                  </option>
                                  <option value="Slovakia">Slovakia</option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">
                                    Solomon Islands
                                  </option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Georgia">
                                    South Georgia
                                  </option>
                                  <option value="South Korea">
                                    South Korea
                                  </option>
                                  <option value="South Sudan">
                                    South Sudan
                                  </option>
                                  <option value="Spain">Spain</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Svalbard and Jan Mayen Islands">
                                    Svalbard and Jan Mayen Islands
                                  </option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">
                                    Switzerland
                                  </option>
                                  <option value="Syria">Syria</option>
                                  <option value="Taiwan">Taiwan</option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania">Tanzania</option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Timor-Leste">
                                    Timor-Leste
                                  </option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad and Tobago">
                                    Trinidad and Tobago
                                  </option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">
                                    Turkmenistan
                                  </option>
                                  <option value="Turks and Caicos Islands">
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="US Minor Outlying Islands">
                                    US Minor Outlying Islands
                                  </option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Emirates">
                                    United Arab Emirates
                                  </option>
                                  <option value="United Kingdom">
                                    United Kingdom
                                  </option>
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="Uruguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Venezuela">Venezuela</option>
                                  <option value="Vietnam">Vietnam</option>
                                  <option value="Virgin Islands, British">
                                    Virgin Islands, British
                                  </option>
                                  <option value="Virgin Islands, U.S.">
                                    Virgin Islands, U.S.
                                  </option>
                                  <option value="Wallis and Futuna">
                                    Wallis and Futuna
                                  </option>
                                  <option value="Western Sahara">
                                    Western Sahara
                                  </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                  <option value="Åland Islands">
                                    Åland Islands
                                  </option>
                                </select>
                              </div>
                              {formError.input_24 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_24}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="lg:w-6/12 w-full lg:pl-20">
                              <div className="form-group flex flex-wrap add-arrow lg:mt-20 mt-10">
                                <label
                                  className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                  htmlFor="input_25"
                                >
                                  Nationality
                                  <span className="text-100">*</span>
                                </label>
                                <select
                                  value={form.input_25}
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      input_25: e.target.value,
                                    })
                                    setFormError({
                                      ...formError,
                                      input_25: "",
                                    })
                                  }}
                                >
                                  <option value="">Select Country...</option>
                                  <option value="South Africa">
                                    South Africa
                                  </option>
                                  <option value="Afghanistan">
                                    Afghanistan
                                  </option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">
                                    American Samoa
                                  </option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antarctica">Antarctica</option>
                                  <option value="Antigua and Barbuda">
                                    Antigua and Barbuda
                                  </option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bonaire, Sint Eustatius and Saba">
                                    Bonaire, Sint Eustatius and Saba
                                  </option>
                                  <option value="Bosnia and Herzegovina">
                                    Bosnia and Herzegovina
                                  </option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Bouvet Island">
                                    Bouvet Island
                                  </option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Territory">
                                    British Indian Ocean Territory
                                  </option>
                                  <option value="Brunei Darussalam">
                                    Brunei Darussalam
                                  </option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">
                                    Burkina Faso
                                  </option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">
                                    Cayman Islands
                                  </option>
                                  <option value="Central African Republic">
                                    Central African Republic
                                  </option>
                                  <option value="Chad">Chad</option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">
                                    Christmas Island
                                  </option>
                                  <option value="Cocos Islands">
                                    Cocos Islands
                                  </option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo, Democratic Republic of the">
                                    Congo, Democratic Republic of the
                                  </option>
                                  <option value="Congo, Republic of the">
                                    Congo, Republic of the
                                  </option>
                                  <option value="Cook Islands">
                                    Cook Islands
                                  </option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Curaçao">Curaçao</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">
                                    Czech Republic
                                  </option>
                                  <option value="Côte d'Ivoire">
                                    Côte d'Ivoire
                                  </option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">
                                    Dominican Republic
                                  </option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">
                                    El Salvador
                                  </option>
                                  <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                  </option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Eswatini (Swaziland)">
                                    Eswatini (Swaziland)
                                  </option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands">
                                    Falkland Islands
                                  </option>
                                  <option value="Faroe Islands">
                                    Faroe Islands
                                  </option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">
                                    French Guiana
                                  </option>
                                  <option value="French Polynesia">
                                    French Polynesia
                                  </option>
                                  <option value="French Southern Territories">
                                    French Southern Territories
                                  </option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guernsey">Guernsey</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guinea-Bissau">
                                    Guinea-Bissau
                                  </option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Heard and McDonald Islands">
                                    Heard and McDonald Islands
                                  </option>
                                  <option value="Holy See">Holy See</option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="India">India</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="Iran">Iran</option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Isle of Man">
                                    Isle of Man
                                  </option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jersey">Jersey</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Lao People's Democratic Republic">
                                    Lao People's Democratic Republic
                                  </option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libya">Libya</option>
                                  <option value="Liechtenstein">
                                    Liechtenstein
                                  </option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macau">Macau</option>
                                  <option value="Macedonia">Macedonia</option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands">
                                    Marshall Islands
                                  </option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Micronesia">Micronesia</option>
                                  <option value="Moldova">Moldova</option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montenegro">Montenegro</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Namibia">Namibia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherlands">
                                    Netherlands
                                  </option>
                                  <option value="New Caledonia">
                                    New Caledonia
                                  </option>
                                  <option value="New Zealand">
                                    New Zealand
                                  </option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">
                                    Norfolk Island
                                  </option>
                                  <option value="North Korea">
                                    North Korea
                                  </option>
                                  <option value="Northern Mariana Islands">
                                    Northern Mariana Islands
                                  </option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau">Palau</option>
                                  <option value="Palestine, State of">
                                    Palestine, State of
                                  </option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea">
                                    Papua New Guinea
                                  </option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Philippines">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn">Pitcairn</option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">
                                    Puerto Rico
                                  </option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russia">Russia</option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="Réunion">Réunion</option>
                                  <option value="Saint Barthélemy">
                                    Saint Barthélemy
                                  </option>
                                  <option value="Saint Helena">
                                    Saint Helena
                                  </option>
                                  <option value="Saint Kitts and Nevis">
                                    Saint Kitts and Nevis
                                  </option>
                                  <option value="Saint Lucia">
                                    Saint Lucia
                                  </option>
                                  <option value="Saint Martin">
                                    Saint Martin
                                  </option>
                                  <option value="Saint Pierre and Miquelon">
                                    Saint Pierre and Miquelon
                                  </option>
                                  <option value="Saint Vincent and the Grenadines">
                                    Saint Vincent and the Grenadines
                                  </option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome and Principe">
                                    Sao Tome and Principe
                                  </option>
                                  <option value="Saudi Arabia">
                                    Saudi Arabia
                                  </option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Serbia">Serbia</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra Leone">
                                    Sierra Leone
                                  </option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Sint Maarten">
                                    Sint Maarten
                                  </option>
                                  <option value="Slovakia">Slovakia</option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">
                                    Solomon Islands
                                  </option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Georgia">
                                    South Georgia
                                  </option>
                                  <option value="South Korea">
                                    South Korea
                                  </option>
                                  <option value="South Sudan">
                                    South Sudan
                                  </option>
                                  <option value="Spain">Spain</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Svalbard and Jan Mayen Islands">
                                    Svalbard and Jan Mayen Islands
                                  </option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">
                                    Switzerland
                                  </option>
                                  <option value="Syria">Syria</option>
                                  <option value="Taiwan">Taiwan</option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania">Tanzania</option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Timor-Leste">
                                    Timor-Leste
                                  </option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad and Tobago">
                                    Trinidad and Tobago
                                  </option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">
                                    Turkmenistan
                                  </option>
                                  <option value="Turks and Caicos Islands">
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="US Minor Outlying Islands">
                                    US Minor Outlying Islands
                                  </option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Emirates">
                                    United Arab Emirates
                                  </option>
                                  <option value="United Kingdom">
                                    United Kingdom
                                  </option>
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="Uruguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Venezuela">Venezuela</option>
                                  <option value="Vietnam">Vietnam</option>
                                  <option value="Virgin Islands, British">
                                    Virgin Islands, British
                                  </option>
                                  <option value="Virgin Islands, U.S.">
                                    Virgin Islands, U.S.
                                  </option>
                                  <option value="Wallis and Futuna">
                                    Wallis and Futuna
                                  </option>
                                  <option value="Western Sahara">
                                    Western Sahara
                                  </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                  <option value="Åland Islands">
                                    Åland Islands
                                  </option>
                                </select>
                              </div>
                              {formError.input_25 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_25}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="lg:w-6/12 w-full smscreen2:mt-10">
                              <div className="form-group flex flex-wrap add-arrow lg:mt-20 mt-10">
                                <label
                                  className="w-full text-12 smscreen2:text-16 text-green-100 font-390 tracking-[0.45px] uppercase mb-10"
                                  htmlFor="input_1"
                                >
                                  Preferred method of contact
                                  <span className="text-100">*</span>
                                </label>

                                <div className="form-group flex flex-wrap gap-x-[15px]">
                                  <div className="radio-bx relative">
                                    <input
                                      type="radio"
                                      value="Email"
                                      checked={form.input_34 === "Email"}
                                      onChange={e => {
                                        setForm({
                                          ...form,
                                          input_34: e.target.value,
                                        })
                                        setFormError({
                                          ...formError,
                                          input_34: "",
                                        })
                                      }}
                                      id="label_2_34_0"
                                    />
                                    <label
                                      htmlFor="label_2_34_0"
                                      className="text-16 smscreen2:text-16 text-green-300 -tracking-[0.26px] font-390 cursor-pointer pl-30"
                                    >
                                      Email
                                    </label>
                                  </div>

                                  <div className="radio-bx relative">
                                    <input
                                      type="radio"
                                      value="Phone"
                                      checked={form.input_34 === "Phone"}
                                      onChange={e => {
                                        setForm({
                                          ...form,
                                          input_34: e.target.value,
                                        })
                                        setFormError({
                                          ...formError,
                                          input_34: "",
                                        })
                                      }}
                                      id="label_2_34_1"
                                    />
                                    <label
                                      htmlFor="label_2_34_1"
                                      className="text-16 smscreen2:text-16 text-green-300 -tracking-[0.26px] font-390 cursor-pointer pl-30"
                                    >
                                      Phone
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {formError.input_34 && (
                                <div className="error">
                                  <span className="text-lightgreen text-12 pt-5 font-heading">
                                    {formError.input_34}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {stepForm === 5 && (
                        <div className="form-row">
                          <h6 className="text-18 text-green-100 tracking-[0.9px] uppercase font-420">
                            Additional information
                          </h6>

                          <div className="flex flex-col lg:mx-minus-20 lgscreen:gap-x-20 pr-35 lgscreen:pr-0">
                            <div className="form-group flex flex-wrap mt-20">
                              <label
                                className="w-full text-14 smscreen2:text-16 font-390 text-green-100 uppercase tracking-[0.45px]"
                                htmlFor="input_28"
                              >
                                Anything we should know?
                              </label>

                              <textarea
                                rows="4"
                                className="outline-none w-full border-1 border-solid border-[#DBDBDC] p-15 bg-transparent"
                                onChange={e => {
                                  setForm({
                                    ...form,
                                    input_28: e.target.value,
                                  })
                                }}
                                id="message"
                                value={form.input_28}
                                placeholder="Type Here..."
                              ></textarea>
                            </div>
                          </div>

                          <div className="form-group flex flex-wrap mt-35 lgscreen:mt-20">
                            <label
                              className="w-full text-12 smscreen2:text-16 text-green-100 font-390 tracking-[0.45px] uppercase mb-10"
                              htmlFor="input_29"
                            >
                              Have you stayed with us before?
                            </label>

                            <div className="radio-bx flex flex-wrap relative !pb-0 mr-30">
                              <input
                                type="radio"
                                value="yes"
                                checked={form.input_29 === "yes"}
                                onChange={e => {
                                  setForm({
                                    ...form,
                                    input_29: e.target.value,
                                  })
                                  setFormError({
                                    ...formError,
                                    input_29: "",
                                  })
                                }}
                                id="label_2_29_0"
                              />
                              <label
                                htmlFor="label_2_29_0"
                                className="text-13 smscreen2:text-16 text-green-300 -tracking-[0.26px] font-390 cursor-pointer capitalize pl-30"
                              >
                                yes
                              </label>
                            </div>

                            <div className="radio-bx relative !pb-0 mr-30">
                              <input
                                type="radio"
                                value="no"
                                checked={form.input_29 === "no"}
                                onChange={e => {
                                  setForm({
                                    ...form,
                                    input_29: e.target.value,
                                  })
                                  setFormError({
                                    ...formError,
                                    input_29: "",
                                  })
                                }}
                                id="label_2_29_1"
                              />
                              <label
                                htmlFor="label_2_29_1"
                                className="text-13 smscreen2:text-16 text-green-300 -tracking-[0.26px] font-390 cursor-pointer capitalize pt-5 pl-30"
                              >
                                No
                              </label>
                            </div>

                            {formError.input_29 && (
                              <div className="error w-full">
                                <span className="text-lightgreen text-12 pt-5 font-heading">
                                  {formError.input_29}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                  <div
                    className={`form-btn flex flex-wrap gap-y-4 w-full border-t-1 border-[#4D4D4F] border-opacity-20 py-40 mt-30 ${
                      stepForm === 1 ? "justify-end" : "justify-between"
                    }`}
                  >
                    {stepForm > 1 && (
                      <button
                        onClick={() => {
                          setIsLoading(isLadoing => {
                            document.body.classList.add("loading")
                            isLadoing = true
                          })
                          setStepForm(stepForm => stepForm - 1)
                          setIsLoading(isLadoing => {
                            document.body.classList.remove("loader")
                            isLadoing = false
                          })
                        }}
                        className="back-btn btn px-0 flex flex-wrap gap-x-2 items-center form-btn-cta"
                      >
                        <img src="../images/back-arrow.svg" alt="" />
                        previous step
                      </button>
                    )}
                    {stepForm !== 5 ? (
                      <button
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          })
                          if (stepForm === 1) {
                            if (form.input_5.length === 0) {
                              setFormError({
                                input_5: "Please select at least one property",
                              })
                            } else {
                              setFormError({ input_5: "" }) // Clear the error if there are selected options
                              document.body.classList.add("loader")
                              setIsLoading(true)
                              setStepForm(stepForm => stepForm + 1)
                              document.body.classList.remove("loader")
                              setIsLoading(false)
                            }
                          } else if (stepForm === 2) {
                            if (form.input_30_1 !== "Yes") {
                              setFormError({
                                ...formError,
                                input_11:
                                  form.input_11 === ""
                                    ? "Please select arrival date."
                                    : "",
                                input_12:
                                  form.input_12 === ""
                                    ? "Please select departure date."
                                    : "",
                              })
                              if (
                                form.input_11 !== "" &&
                                form.input_12 !== ""
                              ) {
                                document.body.classList.add("loader")
                                setIsLoading(true)
                                setStepForm(stepForm => stepForm + 1)
                                document.body.classList.remove("loader")
                                setIsLoading(false)
                              }
                            } else {
                              document.body.classList.add("loader")
                              setIsLoading(true)
                              setStepForm(stepForm => stepForm + 1)
                              document.body.classList.remove("loader")
                              setIsLoading(false)
                            }
                          } else if (stepForm === 3) {
                            setFormError({
                              ...formError,
                              input_16:
                                form.input_16 === ""
                                  ? "Please select no of adults."
                                  : "",
                              input_17:
                                form.input_17 === ""
                                  ? "Please select no of children."
                                  : "",
                              input_31:
                                form.input_31 === ""
                                  ? "Please select no of rooms."
                                  : "",
                            })
                            if (
                              form.input_16 !== "" &&
                              form.input_17 !== "" &&
                              form.input_31 !== ""
                            ) {
                              document.body.classList.add("loader")
                              setIsLoading(true)
                              setStepForm(stepForm => stepForm + 1)
                              document.body.classList.remove("loader")
                              setIsLoading(false)
                            }
                          } else if (stepForm === 4) {
                            const validRegex =
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            const numberPattern = /^[0-9\b]+$/

                            setFormError({
                              ...formError,
                              input_20:
                                form.input_20 === ""
                                  ? "Please enter first name."
                                  : "",
                              input_21:
                                form.input_21 === ""
                                  ? "Please enter last name."
                                  : "",
                              input_22:
                                form.input_22 === "" ||
                                !form.input_22.match(validRegex)
                                  ? "Please enter valid email."
                                  : "",
                              input_23:
                                form.input_23 === "" ||
                                !numberPattern.test(form.input_23)
                                  ? "Please enter correct phone number."
                                  : "",
                              input_24:
                                form.input_24 === ""
                                  ? "Please select country."
                                  : "",
                              input_25:
                                form.input_25 === ""
                                  ? "Please select nationality."
                                  : "",
                              input_34:
                                form.input_34 === ""
                                  ? "Please select preferred method of contact."
                                  : "",
                            })
                            if (
                              form.input_20 !== "" &&
                              form.input_21 !== "" &&
                              form.input_22 !== "" &&
                              form.input_23 !== "" &&
                              form.input_24 !== "" &&
                              form.input_25 !== "" &&
                              form.input_34 !== ""
                            ) {
                              document.body.classList.add("loader")
                              setIsLoading(true)
                              setStepForm(stepForm => stepForm + 1)
                              document.body.classList.remove("loader")
                              setIsLoading(false)
                            }
                          }
                        }}
                        className="btn btn-green-border form-btn-cta"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setFormError({
                            ...formError,

                            input_29:
                              form.input_29 === ""
                                ? "Please select stayed with us before"
                                : "",
                          })
                          if (form.input_29 !== "") {
                            document.body.classList.add("loader")
                            setIsLoading(true)

                            if (form.input_5) {
                              const convertedObject = {}
                              form.input_5.forEach((item, index) => {
                                convertedObject[`input_33.${index + 1}`] = item
                                form[`input_33.${index + 1}`] = item
                              })
                            }

                            if (form.input_11) {
                              form.input_11 =
                                form.input_11.getMonth() +
                                1 +
                                "/" +
                                form.input_11.getDate() +
                                "/" +
                                form.input_11.getFullYear()
                            }
                            if (form.input_12) {
                              form.input_12 =
                                form.input_12.getMonth() +
                                1 +
                                "/" +
                                form.input_12.getDate() +
                                "/" +
                                form.input_12.getFullYear()
                            }
                            const requestOptions = {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(form),
                            }
                            const url = `${process.env.GATSBY_SITE_URL}wp-json/gf/v2/forms/${process.env.GATSBY_ENQUIRY_FORM_ID}/submissions`
                            setFormError({
                              ...formError,
                              input_29: "",
                              input_28: "",
                            })
                            fetch(url, requestOptions).then(response => {
                              if (response.status === 200) {
                                document.body.classList.remove("loader")
                                setIsLoading(false)
                                if (form.input_5.length > 1) {
                                  navigate("/thank-you/?enquiry=guest")
                                } else {
                                  const stringWithDashes = form.input_5[0]
                                    .replace(" ", "-")
                                    .replace(/[’\s]/g, "-")
                                  navigate(
                                    "/thank-you/?enquiry=" + stringWithDashes
                                  )
                                }
                              } else {
                                setStepForm(1)
                                setFormError({
                                  ...formError,
                                  input_4: "Please try again.",
                                })
                              }
                            })
                          }
                        }}
                        className="btn btn-green border-lepogolodges-100 border-1 border-solid"
                      >
                        {isLadoing ? "Loading" : "send enquiry"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 w-full h-screen lgscreen:hidden enquiry-form-img transition-all duration-[600ms]">
              {form.input_5.length > 1 ? (
                <ImageOpt
                  imgData={headerDataList.guestEnquiryImage.mediaItemUrl}
                  imgAlt={headerDataList.guestEnquiryImage.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("THE OUTPOST") ? (
                <ImageOpt
                  imgData={headerDataList.property1Image.mediaItemUrl}
                  imgAlt={headerDataList.property1Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("THE OLD RECTORY") ? (
                <ImageOpt
                  imgData={headerDataList.property2Image.mediaItemUrl}
                  imgAlt={headerDataList.property2Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("Pel s Post") ? (
                <ImageOpt
                  imgData={headerDataList.property3Image.mediaItemUrl}
                  imgAlt={headerDataList.property3Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("Country house") ? (
                <ImageOpt
                  imgData={headerDataList.property4Image.mediaItemUrl}
                  imgAlt={headerDataList.property4Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("Tshwene Lodge") ? (
                <ImageOpt
                  imgData={headerDataList.property5Image.mediaItemUrl}
                  imgAlt={headerDataList.property5Image.altText}
                  imgClass="w-full h-full object-cover"
                  width={600}
                  height={900}
                  imgLoad="lazy"
                />
              ) : form.input_5.includes("Ekuthuleni Lodge") ? (
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
          </div>
        </section>
      </>
    </div>
  )
}

export default Enquiry
