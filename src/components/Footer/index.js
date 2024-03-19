import { motion, useInView } from "framer-motion"
import { Link, graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import "./Footer.css"

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasPlayed, setHasPlayed] = useState(false)
  const footerData = useStaticQuery(graphql`
    query {
      wp {
        fluxDnaSettings {
          fluxDna {
            footerLogo {
              altText
              mediaItemUrl
            }
            email
            phone
            newsletterHeading
            footerShortDescription
            copyright
            socialMedia {
              link
              image {
                altText
                mediaItemUrl
              }
            }
            firstFooterMenuHeading
            stayWithUs {
              target
              title
              url
            }
            firstFooterMenuLink {
              target
              title
              url
            }
            footerMenuOne {
              menuLink {
                target
                title
                url
              }
            }
            secondFooterMenuHeading
            secondFooterMenuLink {
              target
              title
              url
            }
            footerMenuSecond {
              secondMenuLink {
                target
                title
                url
              }
            }
            thirdFooterMenuHeading
            thirdFooterMenuLink {
              target
              title
              url
            }
            footerMenuThird {
              thirdMenuLink {
                target
                title
                url
              }
            }
            fourthFooterMenuHeading
            fourthFooterMenuLink {
              target
              title
              url
            }
            footerMenuFourth {
              fourthMenuLink {
                target
                title
                url
              }
            }
            termsMenu {
              termMenuLink {
                target
                title
                url
              }
            }
          }
        }
      }
    }
  `)
  const footerDataList = footerData.wp.fluxDnaSettings.fluxDna

  const showNewsletterThankYouMessage = () => {
    const newsletterFormWrapper = document.querySelector(".newsletter-form")
    const paragraph = document.createElement("p")
    paragraph.classList.add("newsletter-message")
    paragraph.innerText = "Thank you for signing up to our newsletter!"
    newsletterFormWrapper.appendChild(paragraph)
  }

  const [isLadoing, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    input_2: "",
    input_3: "",
    input_4: "",
  })

  const [formError, setFormError] = useState({
    input_2: "",
    input_3: "",
    input_4: "",
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
  const [activeItem, setActiveItem] = useState(1)

  const handleAccordionClick = index => {
    setActiveItem(index === activeItem ? null : index)
  }
  const [isMObile, setIsMObile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 992) {
      setIsMObile(true)
    } else {
      setIsMObile(false)
    }
  }, [setIsMObile])
  return (
    <React.Fragment>
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className="footer bg-green-100"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView || hasPlayed ? "show" : "hidden"}
          variants={sectionShow}
        >
          <div className="newsletter py-30 border-b-1 border-white-100 border-opacity-20">
            <div className="container-fluid">
              <div className="flex flex-wrap items-center justify-between">
                {footerDataList?.newsletterHeading && (
                  <motion.h6
                    variants={animFade}
                    className="text-white-100 text-20 font-800"
                  >
                    {footerDataList.newsletterHeading}
                  </motion.h6>
                )}
                <motion.div
                  variants={animFade}
                  className="w-[80%] desktop3:w-[75%] large_desktop:w-[75%] desktop_small:w-[72%] laptop:w-[70%] xlscreen:w-full"
                >
                  <div className="gform_wrapper flex flex-wrap ipad:flex-col justify-between items-end ipad:items-start">
                    <div className="gform_body w-full px-50 xlscreen:pl-0 mdscreen:pr-0">
                      <ul className="flex flex-wrap -ml-50">
                        <li>
                          <input
                            type="text"
                            placeholder="First Name"
                            value={form.input_2}
                            onChange={e => {
                              setForm({
                                ...form,
                                input_2: e.target.value,
                              })
                              setFormError({
                                ...formError,
                                input_2: "",
                              })
                            }}
                          />
                          {formError.input_2 && (
                            <div className="error">
                              <span className="text-red">
                                {formError.input_2}
                              </span>
                            </div>
                          )}
                        </li>
                        <li>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={form.input_3}
                            onChange={e => {
                              setForm({
                                ...form,
                                input_3: e.target.value,
                              })
                              setFormError({
                                ...formError,
                                input_3: "",
                              })
                            }}
                          />
                          {formError.input_3 && (
                            <div className="error">
                              <span className="text-red">
                                {formError.input_3}
                              </span>
                            </div>
                          )}
                        </li>
                        <li>
                          <input
                            type="text"
                            placeholder="Email Address"
                            value={form.input_4}
                            onBlur={e => {
                              var value = e.target.value
                              var pattern =
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                              if (!pattern.test(value)) {
                                setForm({ ...form, input_4: "" })
                                setFormError({
                                  ...formError,
                                  input_4: "Please enter valid email address.",
                                })
                              }
                            }}
                            onChange={e => {
                              setForm({
                                ...form,
                                input_4: e.target.value,
                              })
                              setFormError({
                                ...formError,
                                input_4: "",
                              })
                            }}
                          />
                          {formError.input_4 && (
                            <div className="error">
                              <span className="text-red">
                                {formError.input_4}
                              </span>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="gform_footer smscreen2:mt-15 ipad:mt-15 smscreen:w-full">
                      <button
                        className="btn btn-white mdscreen:w-full w-[150px]"
                        onClick={() => {
                          var validRegex =
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                          setFormError({
                            ...formError,
                            input_2:
                              form.input_2 === ""
                                ? "Please enter first name."
                                : "",
                            input_3:
                              form.input_3 === ""
                                ? "Please enter last name."
                                : "",
                            input_4:
                              form.input_4 === "" ||
                              !form.input_4.match(validRegex)
                                ? "Please enter valid email address."
                                : "",
                          })

                          if (
                            form.input_4 !== "" &&
                            form.input_2 !== "" &&
                            form.input_3 !== ""
                          ) {
                            document.body.classList.add("loader")
                            setIsLoading(true)
                            const requestOptions = {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(form),
                            }
                            const url = `${process.env.GATSBY_SITE_URL}wp-json/gf/v2/forms/${process.env.GATSBY_NEWSLETTER_FORM_ID}/submissions`
                            setFormError({
                              ...formError,
                            })
                            fetch(url, requestOptions).then(response => {
                              if (response.status === 200) {
                                document.body.classList.remove("loader")
                                setIsLoading(false)
                                showNewsletterThankYouMessage()
                              } else {
                                setFormError({
                                  ...formError,
                                })
                              }
                            })
                          }
                        }}
                      >
                        {isLadoing ? "Loading" : "Sign Up"}
                      </button>
                    </div>
                    <div className="newsletter-form mt-15 w-full text-left px-50 xlscreen:pl-0 mdscreen:pr-0"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="footer-navbar py-70 text-white-100 lgscreen:py-40 lgscreen:pb-0">
            <div className="container-fluid pr-150 laptop:pr-20">
              <div className="flex flex-wrap justify-between">
                <motion.div
                  variants={animFade}
                  className="footer-navbar1 ipad:w-full ipad:text-center ipad:mb-50 mdscreen:mb-20"
                >
                  {footerDataList?.footerLogo && (
                    <Link to="/">
                      <img
                        src={footerDataList.footerLogo.mediaItemUrl}
                        className="mx-auto"
                        width={127}
                        height={40}
                        loading="lazy"
                        alt={footerDataList.footerLogo.altText}
                      />
                    </Link>
                  )}
                  {footerDataList?.footerShortDescription && (
                    <span className="text-15 italic font-primary -tracking-[0.3px] font-400 w-[189px] mx-auto text-center mt-15 inline-block">
                      {footerDataList.footerShortDescription}
                    </span>
                  )}
                  {footerDataList?.stayWithUs && (
                    <div className="mt-25 text-center">
                      <Link
                        to={footerDataList.stayWithUs.url}
                        className="btn btn-white"
                        target={footerDataList.stayWithUs.target}
                      >
                        {footerDataList.stayWithUs.title}
                      </Link>
                    </div>
                  )}
                </motion.div>
                <motion.div
                  variants={animFade}
                  className="footer-menu mdscreen:w-full mdscreen:text-center mdscreen:mb-30 mdscreen:hidden"
                >
                  {footerDataList?.firstFooterMenuHeading && (
                    <h6 className="italic text-15 font-400 -tracking-[0.26px] font-primary text-white-100 capitalize">
                      {footerDataList.firstFooterMenuHeading}
                    </h6>
                  )}
                  <ul className="grid gap-3 mt-15">
                    {footerDataList?.footerMenuOne.length > 0 &&
                      footerDataList.footerMenuOne.map((item, i) => {
                        return (
                          <li key={i}>
                            {item?.menuLink && (
                              <Link
                                to={item.menuLink.url}
                                className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                target={item.menuLink.target}
                              >
                                {item.menuLink.title}
                              </Link>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                </motion.div>
                <motion.div
                  variants={animFade}
                  className="footer-menu mdscreen:w-full mdscreen:text-center mdscreen:mb-30 mdscreen:hidden"
                >
                  {footerDataList?.secondFooterMenuHeading && (
                    <h6 className="italic text-15 font-400 -tracking-[0.26px] font-primary text-white-100 capitalize">
                      {footerDataList.secondFooterMenuHeading}
                    </h6>
                  )}
                  <ul className="grid gap-3 mt-15">
                    {footerDataList?.footerMenuSecond.length > 0 &&
                      footerDataList.footerMenuSecond.map((itemS, s) => {
                        return (
                          <li key={s}>
                            {itemS?.secondMenuLink && (
                              <Link
                                to={itemS.secondMenuLink.url}
                                className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                target={itemS.secondMenuLink.target}
                              >
                                {itemS.secondMenuLink.title}
                              </Link>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                </motion.div>
                <motion.div
                  variants={animFade}
                  className="footer-menu mdscreen:w-full mdscreen:text-center mdscreen:mb-30 mdscreen:hidden"
                >
                  {footerDataList?.thirdFooterMenuHeading && (
                    <h6 className="italic text-15 font-400 -tracking-[0.26px] font-primary text-white-100 capitalize">
                      {footerDataList.thirdFooterMenuHeading}
                    </h6>
                  )}
                  <ul className="grid gap-3 mt-15">
                    {footerDataList?.footerMenuThird.length > 0 &&
                      footerDataList.footerMenuThird.map((itemT, t) => {
                        return (
                          <li key={t}>
                            {itemT?.thirdMenuLink && (
                              <Link
                                to={itemT.thirdMenuLink.url}
                                className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                target={itemT.thirdMenuLink.target}
                              >
                                {itemT.thirdMenuLink.title}
                              </Link>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                </motion.div>
                <motion.div
                  variants={animFade}
                  className="footer-menu mdscreen:w-full mdscreen:text-center mdscreen:mb-30 mdscreen:hidden"
                >
                  {footerDataList?.fourthFooterMenuHeading && (
                    <h6 className="italic text-15 font-400 -tracking-[0.26px] font-primary text-white-100 capitalize">
                      {footerDataList.fourthFooterMenuHeading}
                    </h6>
                  )}
                  <ul className="grid gap-3 mt-15">
                    {footerDataList?.footerMenuFourth.length > 0 &&
                      footerDataList.footerMenuFourth.map((itemF, f) => {
                        return (
                          <li key={f}>
                            {itemF?.fourthMenuLink && (
                              <Link
                                to={itemF.fourthMenuLink.url}
                                className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                target={itemF.fourthMenuLink.target}
                              >
                                {itemF.fourthMenuLink.title}
                              </Link>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                  <div className="flex flex-col">
                    {footerDataList?.phone && (
                      <span className="mt-10 inline-block text-14 hover:opacity-50 transition-all duration-300">
                        <Link to={`tel:${footerDataList.phone}`}>
                          {footerDataList.phone}
                        </Link>
                      </span>
                    )}
                    {footerDataList?.email && (
                      <Link
                        to={`mailto:${footerDataList.email}`}
                        className="underline hover:opacity-50 text-14"
                      >
                        {footerDataList.email}
                      </Link>
                    )}
                  </div>
                  <div className="sicon mt-20">
                    <ul className="flex gap-x-2 mdscreen:justify-center">
                      {footerDataList?.socialMedia.length > 0 &&
                        footerDataList.socialMedia.map((socialM, m) => {
                          return (
                            <li key={m}>
                              <Link to={socialM.link} target="_blank">
                                {socialM?.image && (
                                  <img
                                    src={socialM.image.mediaItemUrl}
                                    className=""
                                    width={25}
                                    height={25}
                                    loading="lazy"
                                    alt={socialM.image.altText}
                                  />
                                )}
                              </Link>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                </motion.div>
                {isMObile && (
                  <div className="w-full justify-center py-20 hidden mdscreen:block">
                    <div className="w-full ipad:pb-30">
                      <div className="block">
                        <div className="grid gap-y-6 ">
                          <div className="content-blog accordion">
                            <div
                              className={`accordion__item ${
                                activeItem === 1 ? "open" : "close"
                              }`}
                            >
                              {footerDataList?.firstFooterMenuHeading && (
                                <motion.h6 variants={animFade}>
                                  <button
                                    className="AccordionItemButton relative outline-none w-full text-center border-b-1 border-white-100 border-solid pb-5"
                                    onClick={() => handleAccordionClick(1)}
                                  >
                                    <h6 class="italic text-18 font-400 -tracking-[0.36px] font-primary text-white-100 capitalize">
                                      {footerDataList.firstFooterMenuHeading}
                                    </h6>
                                  </button>
                                </motion.h6>
                              )}
                              <div className="accordian-content-wrapper text-center">
                                <motion.div
                                  variants={animFade}
                                  className="accordian-content"
                                >
                                  <ul className="grid gap-3 mt-15">
                                    {footerDataList?.footerMenuOne.length > 0 &&
                                      footerDataList.footerMenuOne.map(
                                        (item, i) => {
                                          return (
                                            <li key={i}>
                                              {item?.menuLink && (
                                                <Link
                                                  to={item.menuLink.url}
                                                  className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                                  target={item.menuLink.target}
                                                >
                                                  {item.menuLink.title}
                                                </Link>
                                              )}
                                            </li>
                                          )
                                        }
                                      )}
                                  </ul>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          <div className="content-blog accordion">
                            <div
                              className={`accordion__item ${
                                activeItem === 2 ? "open" : "close"
                              }`}
                            >
                              {footerDataList?.secondFooterMenuHeading && (
                                <motion.h6 variants={animFade}>
                                  <button
                                    className="AccordionItemButton relative outline-none w-full text-center border-b-1 border-white-100 border-solid pb-5"
                                    onClick={() => handleAccordionClick(2)}
                                  >
                                    <h6 class="italic text-18 font-400 -tracking-[0.36px] font-primary text-white-100 capitalize">
                                      {footerDataList.secondFooterMenuHeading}
                                    </h6>
                                  </button>
                                </motion.h6>
                              )}
                              <div className="accordian-content-wrapper text-center">
                                <motion.div
                                  variants={animFade}
                                  className="accordian-content"
                                >
                                  <ul className="grid gap-3 mt-15">
                                    {footerDataList?.footerMenuSecond.length >
                                      0 &&
                                      footerDataList.footerMenuSecond.map(
                                        (itemS, s) => {
                                          return (
                                            <li key={s}>
                                              {itemS?.secondMenuLink && (
                                                <Link
                                                  to={itemS.secondMenuLink.url}
                                                  className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                                  target={
                                                    itemS.secondMenuLink.target
                                                  }
                                                >
                                                  {itemS.secondMenuLink.title}
                                                </Link>
                                              )}
                                            </li>
                                          )
                                        }
                                      )}
                                  </ul>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          <div className="content-blog accordion">
                            <div
                              className={`accordion__item ${
                                activeItem === 3 ? "open" : "close"
                              }`}
                            >
                              {footerDataList?.thirdFooterMenuHeading && (
                                <motion.div variants={animFade}>
                                  <button
                                    className="AccordionItemButton relative outline-none w-full text-center border-b-1 border-white-100 border-solid pb-5"
                                    onClick={() => handleAccordionClick(3)}
                                  >
                                    <h6 class="italic text-18 font-400 -tracking-[0.36px] font-primary text-white-100 capitalize">
                                      {footerDataList.thirdFooterMenuHeading}
                                    </h6>
                                  </button>
                                </motion.div>
                              )}
                              <div className="accordian-content-wrapper text-center">
                                <div className="accordian-content">
                                  <ul className="grid gap-3 mt-15">
                                    {footerDataList?.footerMenuThird.length >
                                      0 &&
                                      footerDataList.footerMenuThird.map(
                                        (itemT, t) => {
                                          return (
                                            <li key={t}>
                                              {itemT?.thirdMenuLink && (
                                                <Link
                                                  to={itemT.thirdMenuLink.url}
                                                  className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                                  target={
                                                    itemT.thirdMenuLink.target
                                                  }
                                                >
                                                  {itemT.thirdMenuLink.title}
                                                </Link>
                                              )}
                                            </li>
                                          )
                                        }
                                      )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-blog accordion">
                            <div
                              className={`accordion__item ${
                                activeItem === 4 ? "open" : "close"
                              }`}
                            >
                              {footerDataList?.fourthFooterMenuHeading && (
                                <motion.h6 variants={animFade}>
                                  <button
                                    className="AccordionItemButton relative outline-none w-full text-center border-b-1 border-white-100 border-solid pb-5"
                                    onClick={() => handleAccordionClick(4)}
                                  >
                                    <h6 class="italic text-18 font-400 -tracking-[0.36px] font-primary text-white-100 capitalize  ">
                                      {footerDataList.fourthFooterMenuHeading}
                                    </h6>
                                  </button>
                                </motion.h6>
                              )}
                              <div className="accordian-content-wrapper text-center">
                                <div className="accordian-content">
                                  <ul className="grid gap-3 mt-15">
                                    {footerDataList?.footerMenuFourth.length >
                                      0 &&
                                      footerDataList.footerMenuFourth.map(
                                        (itemF, f) => {
                                          return (
                                            <li key={f}>
                                              {itemF?.fourthMenuLink && (
                                                <Link
                                                  to={itemF.fourthMenuLink.url}
                                                  className="text-15 laptop:text-13 xlscreen:text-12 uppercase tracking-[0.75px] font-420 hover:opacity-50"
                                                  target={
                                                    itemF.fourthMenuLink.target
                                                  }
                                                >
                                                  {itemF.fourthMenuLink.title}
                                                </Link>
                                              )}
                                            </li>
                                          )
                                        }
                                      )}
                                  </ul>
                                  <div className="flex flex-col">
                                    {footerDataList?.phone && (
                                      <span className="mt-10 inline-block laptop:text-13 xlscreen:text-16 hover:opacity-50 transition-all duration-300">
                                        <Link
                                          to={`tel:${footerDataList.phone}`}
                                        >
                                          {footerDataList.phone}
                                        </Link>
                                      </span>
                                    )}
                                    {footerDataList?.email && (
                                      <Link
                                        to={`mailto:${footerDataList.email}`}
                                        className="underline hover:opacity-50 laptop:text-13 xlscreen:text-12"
                                      >
                                        {footerDataList.email}
                                      </Link>
                                    )}
                                  </div>
                                  <div className="sicon mt-20">
                                    <ul className="flex gap-x-2 mdscreen:justify-center">
                                      {footerDataList?.socialMedia.length > 0 &&
                                        footerDataList.socialMedia.map(
                                          (socialM, m) => {
                                            return (
                                              <li key={m}>
                                                <Link
                                                  to={socialM.link}
                                                  target="_blank"
                                                >
                                                  {socialM?.image && (
                                                    <img
                                                      src={
                                                        socialM.image
                                                          .mediaItemUrl
                                                      }
                                                      className=""
                                                      width={30}
                                                      height={30}
                                                      loading="lazy"
                                                      alt={
                                                        socialM.image.altText
                                                      }
                                                    />
                                                  )}
                                                </Link>
                                              </li>
                                            )
                                          }
                                        )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="copyright text-white-100 pb-20">
            <div className="container-fluid">
              <motion.div
                variants={animFade}
                className="flex flex-wrap gap-x-5 items-center ipad:justify-center"
              >
                {footerDataList?.copyright && (
                  <span className="text-14 font-390 opacity-[0.85]">
                    {footerDataList.copyright}
                  </span>
                )}
                <ul className="flex flex-wrap gap-x-5">
                  {footerDataList?.termsMenu.length > 0 &&
                    footerDataList.termsMenu.map((term, tm) => {
                      return (
                        <li key={tm}>
                          <Link
                            to={term.termMenuLink.url}
                            className="text-14 font-390 opacity-[0.85] hover:opacity-50"
                            target={term.termMenuLink.target}
                          >
                            {parse(term.termMenuLink.title)}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </React.Fragment>
  )
}
export default Footer
