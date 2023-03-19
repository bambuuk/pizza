import withLayout from "../../hocs/withLayout"
import PublicOffer from "../../components/PublicOffer/PublicOffer";

const PublicOfferPage = () => {
  return (
    <>
      <PublicOffer />
    </>
  )
}

export default withLayout(PublicOfferPage, 'PublicOfferPage');