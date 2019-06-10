import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classname from 'classname';

class ErrorBoudnary extends Component {
  state = {
    hasError: false,
    errorMessage: null,
    errorInfo: null,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error,
      errorInfo: info,
    });
  }

  render() {
    const { className, children } = this.props;
    const { hasError, errorMessage, errorInfo } = this.state;
    const cls = classname({
      [className]: !!className
    });

    if (hasError) {
      return (
        <div className={cls}>
          {errorMessage && errorMessage.toString()}
          {errorInfo && errorInfo.componentStack}
        </div>
      )
    }
    
    return children;
  }
};

ErrorBoudnary.propTypes = {
  children: PropTypes.element.isRequired,
};

polyfill(ErrorBoudnary);

export default ErrorBoudnary;
