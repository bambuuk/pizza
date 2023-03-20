import withLayout from "../../hocs/withLayout";
import Contacts from "../../components/Contacts/Contacts";

const ContactsPage = () => {
  return (
    <>
      <Contacts />
    </>
  )
}

export default withLayout(ContactsPage, 'ContactsPage');