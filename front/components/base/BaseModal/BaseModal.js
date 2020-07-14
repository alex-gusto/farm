import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const modalStyles = {
    content: {
        width: '920px',
        height: 'calc(100% - 80px)',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 0,
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 1000,
        backgroundColor: 'papayawhip'
    }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app')

export default function BaseModal({ isOpen, closeModal, children }) {

    return (
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            contentLabel="Example Modal"
        >

            <button onClick={closeModal} className="base-model-close">x</button>
            {children}
        </Modal>
    );
}

// ReactDOM.render(<BaseModal/>, appElement);
