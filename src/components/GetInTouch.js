import { motion, useInView } from "framer-motion"
import { graphql, navigate } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useRef, useState } from "react"
import ImageOpt from "./ImageOpt"

const GetInTouch = ({ module }) => {
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

  const [isLadoing, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    input_2: "",
    input_4: "",
    input_8: "",
    input_7: "",
  })

  const [formError, setFormError] = useState({
    input_2: "",
    input_4: "",
    input_8: "",
    input_7: "",
  })

  if (module.hideSection === "no") {
    return (
      <motion.section
        initial="hidden"
        animate={isInView || hasPlayed ? "show" : "hidden"}
        variants={sectionShow}
        className={`zigzag contact py-80 lgscreen:py-30 mt-60 ${
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
          <div className="flex flex-wrap items-center">
            {module?.image && (
              <div className="lg:w-6/12 w-full">
                <motion.div
                  variants={animFade}
                  className="img landscape relative"
                >
                  <ImageOpt
                    imgData={module.image.mediaItemUrl}
                    width={658}
                    height={472}
                    imgAlt={module.image.altText}
                    imgLoad="lazy"
                  />
                </motion.div>
              </div>
            )}
            <div className="lg:w-6/12 w-full lgscreen:pt-30">
              <div className="zigzagcontent pl-90 xlscreen:pl-30 w-full lgscreen:pl-0">
                {module?.heading && (
                  <div className="title-green">
                    <motion.h3 variants={animFade}>{module.heading}</motion.h3>
                  </div>
                )}
                {module?.description && (
                  <motion.div
                    variants={animFade}
                    className="contact-detail flex gap-[4px] pt-5"
                  >
                    {parse(module.description)}
                  </motion.div>
                )}
                <div className="contact-form pt-15">
                  <motion.div variants={animFade} className="gform_body">
                    <ul>
                      <li>
                        <div className="form-group">
                          <label htmlFor="input_2">Full Name & surname*</label>
                          <input
                            type="text"
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
                            placeholder="Type Here..."
                          />
                        </div>

                        {formError.input_2 && (
                          <div className="error">
                            <span className="text-green-100 text-16 font-primary">
                              {formError.input_2}
                            </span>
                          </div>
                        )}
                      </li>
                      <li>
                        <div className="form-group">
                          <label htmlFor="input_4">email Address*</label>
                          <input
                            type="email"
                            value={form.input_4}
                            onBlur={e => {
                              var value = e.target.value
                              var pattern =
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                              if (!pattern.test(value)) {
                                setForm({ ...form, input_4: "" })
                                setFormError({
                                  ...formError,
                                  input_4: "Please enter valid email.",
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
                            placeholder="Type Here..."
                          />
                        </div>
                        {formError.input_4 && (
                          <div className="error">
                            <span className="text-green-100 text-16 font-primary">
                              {formError.input_4}
                            </span>
                          </div>
                        )}
                      </li>
                      <li>
                        <div className="form-group">
                          <label htmlFor="input_8">Phone number*</label>
                          <input
                            type="text"
                            value={form.input_8}
                            onBlur={e => {
                              var value = e.target.value
                              var pattern = /^\d{10}$/
                              if (!pattern.test(value)) {
                                setForm({ ...form, input_8: "" })
                                setFormError({
                                  ...formError,
                                  input_8: "Please enter valid phone number.",
                                })
                              }
                            }}
                            onChange={e => {
                              setForm({
                                ...form,
                                input_8: e.target.value,
                              })
                              setFormError({
                                ...formError,
                                input_8: "",
                              })
                            }}
                            placeholder="Type Here..."
                          />
                        </div>
                        {formError.input_8 && (
                          <div className="error">
                            <span className="text-green-100 text-16 font-primary">
                              {formError.input_8}
                            </span>
                          </div>
                        )}
                      </li>
                      <li>
                        <div className="form-group">
                          <label htmlFor="input_7">Message*</label>
                          <textarea
                            type="text"
                            value={form.input_7}
                            onChange={e => {
                              setForm({
                                ...form,
                                input_7: e.target.value,
                              })
                              setFormError({
                                ...formError,
                                input_7: "",
                              })
                            }}
                            rows={3}
                            placeholder="Type Here..."
                          />
                        </div>
                        {formError.input_7 && (
                          <div className="error">
                            <span className="text-green-100 text-16 font-primary">
                              {formError.input_7}
                            </span>
                          </div>
                        )}
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div
                    variants={animFade}
                    className="gform_footer contact_gform-footer mt-15 md:mt-30"
                  >
                    <button
                      className="btn btn-green"
                      onClick={() => {
                        var validRegex =
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        setFormError({
                          ...formError,
                          input_2:
                            form.input_2 === ""
                              ? "Please enter full name & surname."
                              : "",
                          input_7:
                            form.input_7 === "" ? "Please enter message." : "",
                          input_8:
                            form.input_8 === ""
                              ? "Please enter phone number."
                              : "",
                          input_4:
                            form.input_4 === "" ||
                            !form.input_4.match(validRegex)
                              ? "Please enter valid email."
                              : "",
                        })

                        if (
                          form.input_2 !== "" &&
                          form.input_7 !== "" &&
                          form.input_8 !== "" &&
                          form.input_4 !== ""
                        ) {
                          document.body.classList.add("loader")
                          setIsLoading(true)
                          const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                          }
                          const url = `${process.env.GATSBY_SITE_URL}wp-json/gf/v2/forms/${process.env.GATSBY_GETINTOUCH_FORM_ID}/submissions`
                          setFormError({
                            ...formError,
                          })
                          fetch(url, requestOptions).then(response => {
                            if (response.status === 200) {
                              document.body.classList.remove("loader")
                              setIsLoading(false)
                              navigate("/thank-you")
                            } else {
                              setFormError({
                                ...formError,
                              })
                            }
                          })
                        }
                      }}
                    >
                      <span>{isLadoing ? "LOADING" : "SEND ENQUIRY"}</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    )
  }
  return null
}

export default GetInTouch
export const PageGetInTouchFragment = graphql`
  fragment PageGetInTouchFragment on WpPage_Pagecontent_PageContent_GetInTouch {
    extraId
    extraClass
    hideSection
    description
    heading
    image {
      altText
      mediaItemUrl
    }
  }
`
