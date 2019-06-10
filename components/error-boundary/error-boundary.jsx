import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classname from 'classname';

class ErrorBoundary extends Component {
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

ErrorBoundary.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

polyfill(ErrorBoundary);

export default ErrorBoundary;
