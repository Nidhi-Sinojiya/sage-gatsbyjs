import { graphql } from "gatsby"
import React from "react"
import Banner from "../components/Banner"
import BlogListing from "../components/BlogListing"
import CallToAction from "../components/CallToAction"
import CareerListing from "../components/CareerListing"
import ContactInformation from "../components/ContactInformation"
import ContentWithImageCardSlider from "../components/ContentWithImageCardSlider.js"
import DestinationListing from "../components/DestinationListing"
import EventTestimonial from "../components/EventTestimonial"
import FeaturedBlogSingle from "../components/FeaturedBlogSingle"
import GeneralContent from "../components/GeneralContent"
import GetInTouch from "../components/GetInTouch"
import ImageContentWithSlider from "../components/ImageContentWithSlider"
import ImageWithContent from "../components/ImageWithContent"
import InformationContent from "../components/InformationContent"
import MapsAndBooklets from "../components/MapsAndBooklets"
import OfferListing from "../components/OfferListing"
import OurRates from "../components/OurRates"
import OurVideo from "../components/OurVideo"
import PressCards from "../components/PressCards"
import PropertyBooking from "../components/PropertyBooking"
import PropertyGirdListing from "../components/PropertyGirdListing"
import PropertyRateGrid from "../components/PropertyRateGrid"
import PropertySliderListing from "../components/PropertySliderListing"
import RelatedCards from "../components/RelatedCards"
import SimpleContent from "../components/SimpleContent"
import TestimonialListing from "../components/TestimonialListing"

const Main = props => {
  const modules = props.modules.pageContent
  const { location } = props

  const components = {
    Banner: Banner,
    PropertySliderListing: PropertySliderListing,
    InformationContent: InformationContent,
    ImageContentWithSlider: ImageContentWithSlider,
    ImageWithContent: ImageWithContent,
    TestimonialListing: TestimonialListing,
    RelatedCards: RelatedCards,
    CallToAction: CallToAction,
    SimpleContent: SimpleContent,
    PropertyGirdListing: PropertyGirdListing,
    OfferListing: OfferListing,
    DestinationListing: DestinationListing,
    EventTestimonial: EventTestimonial,
    ContentWithImageCardSlider: ContentWithImageCardSlider,
    GeneralContent: GeneralContent,
    CareerListing: CareerListing,
    PressCards: PressCards,
    PropertyRateGrid: PropertyRateGrid,
    MapsAndBooklets: MapsAndBooklets,
    ContactInformation: ContactInformation,
    FeaturedBlogSingle: FeaturedBlogSingle,
    BlogListing: BlogListing,
    GetInTouch: GetInTouch,
    OurVideo: OurVideo,
    OurRates: OurRates,
    PropertyBooking: PropertyBooking,
  }

  return (
    <>
      {modules
        ? modules.map((module, i) => {
            const moduleName = module.__typename.replace(
              "WpPage_Pagecontent_PageContent_",
              ""
            )
            return (
              components[moduleName] &&
              React.createElement(components[moduleName], {
                key: i,
                module,
                location,
                i,
              })
            )
          })
        : null}
    </>
  )
}

export default Main

export const MainFragment = graphql`
  fragment MainFragment on WpPage {
    pageContent {
      pageContent {
        __typename
        ...PageBannerFragment
        ...PagePropertySliderListingFragment
        ...PageInformationContentFragment
        ...PageImageContentWithSliderFragment
        ...PageImageWithContentFragment
        ...PageTestimonialListingFragment
        ...PageRelatedCardsFragment
        ...PageCallToActionFragment
        ...PageSimpleContentFragment
        ...PageOfferListingFragment
        ...PagePropertyGirdListingFragment
        ...PageDestinationListingFragment
        ...PageEventTestimonialFragment
        ...PageContentWithImageCardSliderFragment
        ...PageGeneralContentFragment
        ...PageCareerListingFragment
        ...PagePressCardsFragment
        ...PagePropertyRateGridFragment
        ...PageMapsAndBookletsFragment
        ...PageContactInformationFragment
        ...PageFeaturedBlogSingleFragment
        ...PageBlogListingFragment
        ...PageGetInTouchFragment
        ...PageOurVideoFragment
        ...PageOurRatesFragment
        ...PagePropertyBookingFragment
      }
    }
  }
`
