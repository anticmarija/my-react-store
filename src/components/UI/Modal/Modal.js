import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    componentWillUpdate() {
        console.log('[Modal] willUpdate');
    }

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className='Modal' style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-999px)',
                    opacity: this.props.show ? 1 : 0,
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default Modal;