import { graphql } from "gatsby"
import React from "react"
import Banner from "../components/Destination/Banner"
import CallToAction from "../components/Destination/CallToAction"
import ImageSliderWithTabContent from "../components/Destination/ImageSliderWithTabContent"
import ImageWithContent from "../components/Destination/ImageWithContent"
import OfferTerm from "../components/Destination/OfferTerm"
import SimpleContent from "../components/Destination/SimpleContent"
import TestimonialListing from "../components/Destination/TestimonialListing"

const Offer = props => {
  const modules = props.modules.offerContent
  const { location } = props

  const components = {
    Banner: Banner,
    SimpleContent: SimpleContent,
    CallToAction: CallToAction,
    TestimonialListing: TestimonialListing,
    ImageWithContent: ImageWithContent,
    ImageSliderWithTabContent: ImageSliderWithTabContent,
    OfferTerm: OfferTerm,
  }

  return (
    <>
      {modules
        ? modules.map((module, i) => {
            const moduleName = module.__typename.replace(
              "WpOffer_Offercontent_OfferContent_",
              ""
            )
            return (
              components[moduleName] &&
              React.createElement(components[moduleName], {
                key: i,
                module,
                location,
                i,
                color: "gray",
              })
            )
          })
        : null}
    </>
  )
}

export default Offer

export const OfferFragment = graphql`
  fragment OfferFragment on WpOffer {
    offerContent {
      offerContent {
        __typename
        ...OfferBannerFragment
        ...OfferSimpleContentFragment
        ...OfferCallToActionFragment
        ...OfferTestimonialListingFragment
        ...OfferImageWithContentFragment
        ...OfferImageSliderWithTabContentFragment
        ...OfferTermFragment
      }
    }
  }
`
