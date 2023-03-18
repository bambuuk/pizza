import withLayout from "../../hocs/withLayout";
import Confidentiality from "../../components/Confidentiality/Confidentiality";

const ConfidentialityPage = () => {
  return (
    <>
      <Confidentiality />
    </>
  )
}

export default withLayout(ConfidentialityPage, 'ConfidentialityPage');