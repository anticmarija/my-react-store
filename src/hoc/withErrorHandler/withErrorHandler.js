import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: 'Network error.'});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler() {
            this.setState({error: null});
        }

        render() {
            return (
                <div>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler.bind(this)}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    }
}

export default withErrorHandler;