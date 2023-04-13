import './userCabinet.scss';

const UserCabinet = (props) => {
  const {activeLogRegWindow, toggleLogRegWindActive} = props;
  
  const showWindow = activeLogRegWindow ? 'user-cabinet_active' : '1';
  return (
    <div className={`user-cabinet ${showWindow}`}>
      <div className="user-cabinet__overlay" onClick={toggleLogRegWindActive}>
        <div className="user-cabinet__wrapper">
          <div className="user-cabinet__icon-close">
            <i className='bx bx-x'></i>
          </div>

          <div className="user-cabinet__title">Ваш кабінет</div>

          <div className="user-cabinet__body">
            <div className="user-cabinet__user-name">
              <span>Ваше ім'я</span>
              <span>Ivan</span>
            </div>
            <div className="user-cabinet__email">
              <span>E-mail</span>
              <span>caban@gmal.com</span>
            </div>
          </div>

          <button className='user-cabinet__logout'>Закінчити сесію</button>
        </div>
      </div>
    </div>
  )
}

export default UserCabinet;