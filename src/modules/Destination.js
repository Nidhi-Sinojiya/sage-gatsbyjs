import { graphql } from "gatsby"
import React from "react"
import Banner from "../components/Destination/Banner"
import CallToAction from "../components/Destination/CallToAction"
import DiscoverProperty from "../components/Destination/DiscoverProperty"
import ImageSliderWithContent from "../components/Destination/ImageSliderWithContent"
import ImageWithContent from "../components/Destination/ImageWithContent"
import SimpleContent from "../components/Destination/SimpleContent"
import TestimonialListing from "../components/Destination/TestimonialListing"

const Destination = props => {
  const modules = props.modules.destinationContent
  const { location } = props

  const components = {
    Banner: Banner,
    SimpleContent: SimpleContent,
    ImageWithContent: ImageWithContent,
    ImageSliderWithContent: ImageSliderWithContent,
    DiscoverProperty: DiscoverProperty,
    CallToAction: CallToAction,
    TestimonialListing: TestimonialListing,
  }

  return (
    <>
      {modules
        ? modules.map((module, i) => {
            const moduleName = module.__typename.replace(
              "WpDestination_Destinationcontent_DestinationContent_",
              ""
            )
            return (
              components[moduleName] &&
              React.createElement(components[moduleName], {
                key: i,
                module,
                location,
                i,
                color: "",
              })
            )
          })
        : null}
    </>
  )
}

export default Destination

export const DestinationFragment = graphql`
  fragment DestinationFragment on WpDestination {
    destinationContent {
      destinationContent {
        __typename
        ...DestinationBannerFragment
        ...DestinationSimpleContentFragment
        ...DestinationImageWithContentFragment
        ...DestinationImageSliderWithContentFragment
        ...DestinationDiscoverPropertyFragment
        ...DestinationCallToActionFragment
        ...DestinationTestimonialListingFragment
      }
    }
  }
`
