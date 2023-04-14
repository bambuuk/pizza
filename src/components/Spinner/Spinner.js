import './spinner.scss';

function Spinner(props) {
  let { size, wrapperSize } = props;
  size = size ? size : 124;
  wrapperSize = wrapperSize ? `${wrapperSize}%` : '100vh';
  const backgroundColor = size ? 'transparent' : '#000000';

  return (
    <div className="wrapper-spinner" style={{height: wrapperSize, backgroundColor: backgroundColor}}>
      <div className="loader" style={{width: `${size}px`, height: `${size}px`}} />
    </div>
  );
}

export default Spinner;
