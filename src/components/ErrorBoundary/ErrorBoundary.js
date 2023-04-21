import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, message: 'Щось пішло не так' };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
      message: 'errorInfo'
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage errorMessage={this.state.message} />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;