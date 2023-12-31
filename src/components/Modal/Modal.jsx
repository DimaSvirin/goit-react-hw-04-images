import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, closeWindow }) {
  useEffect(() => {
    function onClose(e) {
      if (e?.code === 'Escape') closeWindow();
    }
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [closeWindow]);

  function onCloseFromModal(e) {
    if (e?.target === e?.currentTarget) closeWindow();
  }

  return createPortal(
    <Overlay onClick={onCloseFromModal}>
      <ModalStyle>{children}</ModalStyle>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeWindow: PropTypes.func.isRequired,
};

export default Modal;