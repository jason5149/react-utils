import React, { Component } from 'react';
import { polyfill } from 'react-lifecycles-compat';

const AsyncLoader = WrappedComponent => {
  return polyfill(class extends Component {
    state = {
      comp: null,
    };

    async componentDidMount() {
      const { default: component } = await WrappedComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C } = this.state;

      return C ? <C {...this.props} /> : null;
    }
  });
};

export default AsyncLoader;
