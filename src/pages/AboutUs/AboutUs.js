import withLayout from "../../hocs/withLayout"
import InfoAboutUs from "../../components/AboutUs/InfoAboutUs"

const AboutUs = () => {
  return (
    <>
      <InfoAboutUs />
    </>
  )
}

export default withLayout(AboutUs, 'AboutUs');