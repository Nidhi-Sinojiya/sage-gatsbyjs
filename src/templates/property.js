import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import PropertyModule from "../modules/Property"

function useScrollDirection() {``
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

const Property = (props, color) => {
  const scrollDirection = useScrollDirection()
  const post = props.data.post
  const { location } = props
  const [toggle, setToggle] = useState(false)

  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Calculate the height of the entire document, including content beyond the viewport
      const documentHeight = document.documentElement.scrollHeight

      // Calculate the current scroll position
      const scrollPosition = window.innerHeight + window.scrollY

      // Check if the scroll position is near the end of the document (within a threshold)
      const isNearEnd = scrollPosition + 100 >= documentHeight - 50 // Adjust the threshold as needed

      setIsScrollAtEnd(isNearEnd)
    }

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll)

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.add("property-single")
    document.body.classList.remove("enquiry-page")
  }, [])

  return (
    <div
      className={`fullPageanimation ${isScrollAtEnd ? "footer-sticky" : ""}`}
    >
      <Layout props={props}>
        <Seo seo={post.seo} />
        <PropertyModule
          modules={post.propertyContent}
          location={location}
          color={post.color}
        />
      </Layout>

      {/* Sticky Footer Start */}
      {post.color?.enableFooterNavigation && (
        <section
          className={`sticky-footer drop-shadow-stickyFooter fixed z-99 w-full bg-green-100 text-white-100  ${
            scrollDirection === "down"
              ? "bottom-0 z-99 transition-all duration-[750ms] ease-in-out"
              : "-bottom-[160px] -z-99 transition-all duration-[750ms] ease-in-out"
          } ${post.color.propertyColor}Border`}
        >
          <div className="container-fluid laptop:px-20">
            <div className="flex flex-wrap items-center gap-[25px] laptop:gap-[15px]">
              <div className="navbar-logo">
                <div className="title-brown">
                  <h6>{post.title}</h6>
                </div>
                {post.color?.price && (
                  <span className="font-primary text-13 italic font-400 pt-5">
                    {post.color.price}
                  </span>
                )}
              </div>
              {post.color?.menuItems && (
                <ul className="nav-menu-list xlscreen:!hidden">
                  {post.color.menuItems.map((menu, i) => (
                    <li key={i}>
                      <Link className="nav-link" to={menu.item.url} target={""}>
                        {parse(menu.item.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {post.color?.bookNow && (
                <div className="navbar-btn xlscreen:hidden">
                  <Link
                    to={post.color.bookNow.url}
                    className="btn btn-book-link"
                    target={post.color.bookNow.target}
                  >
                    Book now
                  </Link>
                </div>
              )}
              <div className="mobileNavbar relative hidden xlscreen:block ml-auto">
                {post.color?.menuItems && (
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="flex flex-wrap gap-x-4 smscreen2:gap-x-3 items-center outline-none"
                  >
                    <h6>MENU</h6>
                    <div className="navbar-btn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                )}
                {post.color?.menuItems && (
                  <ul
                    className={`tabs bgBaptiste fixed bottom-[105px] right-10 z-9 ${
                      scrollDirection === "down" &&
                      window.pageYOffset !== "0" &&
                      toggle
                        ? "open"
                        : ""
                    } `}
                  >
                    {post.color.menuItems.map((menu, i) => (
                      <li key={i}>
                        <Link to={menu.item.url} target={""}>
                          {parse(menu.item.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Sticky Footer End */}
    </div>
  )
}

export default Property
export const propertyQuery = graphql/* GraphQL */ `
  query PropertyById($id: String!) {
    post: wpProperty(id: { eq: $id }) {
      id
      title
      color: propertyContent {
        propertyColor
        enableFooterNavigation
        price
        menuItems {
          item {
            target
            title
            url
          }
        }
        bookNow {
          url
          title
          target
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
      ...PropertyFragment
    }
  }
`
