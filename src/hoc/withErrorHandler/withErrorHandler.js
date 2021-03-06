import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
       this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err});
        return Promise.reject(err);
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    clearErrorHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.clearErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
