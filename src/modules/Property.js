import { graphql } from "gatsby"
import React from "react"
import Banner from "../components/Property/Banner"
import CallToAction from "../components/Property/CallToAction"
import EventsWidget from "../components/Property/EventsWidget"
import Gallery from "../components/Property/Gallery"
import GeneralInformation from "../components/Property/GeneralInformation"
import GridBox from "../components/Property/GridBox"
import IconGrid from "../components/Property/IconGrid"
import ImageContentWithSlider from "../components/Property/ImageContentWithSlider"
import ImageContentWithTab from "../components/Property/ImageContentWithTab"
import ImageSlider from "../components/Property/ImageSlider"
import ImageWidget from "../components/Property/ImageWidget"
import ImageWithContent from "../components/Property/ImageWithContent"
import Newsletter from "../components/Property/Newsletter"
import PropertySliderListing from "../components/Property/PropertySliderListing"
import SimpleContent from "../components/Property/SimpleContent"
import SinglePropertyList from "../components/Property/SinglePropertyList"
import StayUs from "../components/Property/StayUs"
import TestimonialListing from "../components/Property/TestimonialListing"

const Property = props => {
  const modules = props.modules.propertyContent
  const { location } = props

  const components = {
    Banner: Banner,
    PropertySliderListing: PropertySliderListing,
    ImageWidget: ImageWidget,
    ImageWithContent: ImageWithContent,
    EventsWidget: EventsWidget,
    TestimonialListing: TestimonialListing,
    SimpleContent: SimpleContent,
    ImageSlider: ImageSlider,
    StayUs: StayUs,
    ImageContentWithTab: ImageContentWithTab,
    IconGrid: IconGrid,
    ImageContentWithSlider: ImageContentWithSlider,
    GridBox: GridBox,
    CallToAction: CallToAction,
    Newsletter: Newsletter,
    Gallery: Gallery,
    SinglePropertyList: SinglePropertyList,
    GeneralInformation: GeneralInformation,
  }

  return (
    <>
      {modules
        ? modules.map((module, i) => {
            const moduleName = module.__typename.replace(
              "WpProperty_Propertycontent_PropertyContent_",
              ""
            )
            return (
              components[moduleName] &&
              React.createElement(components[moduleName], {
                key: i,
                module,
                location,
                i,
                color: props.color,
              })
            )
          })
        : null}
    </>
  )
}

export default Property

export const PropertyFragment = graphql`
  fragment PropertyFragment on WpProperty {
    propertyContent {
      propertyContent {
        __typename
        ...PropertyBannerFragment
        ...PropertyPropertySliderListingFragment
        ...PropertyImageWidgetFragment
        ...PropertyImageWithContentFragment
        ...PropertyEventsWidgetFragment
        ...PropertyTestimonialListingFragment
        ...PropertySimpleContentFragment
        ...PropertyImageSliderFragment
        ...PropertyStayUsFragment
        ...PropertyImageContentWithTabFragment
        ...PropertyIconGridFragment
        ...PropertyImageContentWithSliderFragment
        ...PropertyGridBoxFragment
        ...PropertyCallToActionFragment
        ...PropertyNewsletterFragment
        ...PropertyGalleryFragment
        ...PropertySinglePropertyListFragment
        ...PropertyGeneralInformationFragment
      }
    }
  }
`
