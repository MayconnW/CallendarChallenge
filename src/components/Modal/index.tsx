

import { useState, useEffect, useCallback } from 'react';
import { Props } from 'react-modal';

import { Container, ReactModal } from './styles';

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

export default function Modal(props: Props) {
  const {children, isOpen, onRequestClose, shouldCloseOnEsc = true, ...rest} = props;
  const [closing, setClosing] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setOpened(true);
      return;
    }

    setClosing(true);
    setTimeout(() => {
      setOpened(false);
      setClosing(false);
    }, 200);
  }, [isOpen]);

  const handleOnClose = useCallback(
    e => {
      setClosing(true);
      setTimeout(() => {
        if (typeof onRequestClose === 'function') onRequestClose(e);
        setOpened(false);
        setClosing(false);
      }, 200);
    },
    [onRequestClose]
  );

  return (
    <ReactModal
      isOpen={opened}
      onRequestClose={handleOnClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      style={{
        overlay: {
          animation: closing ? 'lighten 0.2s both' : 'darken 0.2s both'
        }
      }}
      {...rest}
    >
      <Container className="_modalContainer" closing={closing}>
        {children}
      </Container>
    </ReactModal>
  );
};
