import img from '../../resources/error/bubble-gum-error.gif';

const ErrorMessage = (props) => {
    return (
      <>
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='error'/>
        <p style={{textAlign: 'center', color: '#ffffff', marginTop: 10, marginBottom: 40, fontSize: 30}}>{props.errorMessage ? props.errorMessage : 'Щось пішло не так'}</p>
      </>
    )
}

export default ErrorMessage;