import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/all';
import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast type="info" hasDescription>
        <FiAlertCircle size={18} />
        <div>
          <strong>deu um error</strong>
          <p>nao foi pisssveil blabla</p>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={18} />
        <div>
          <strong>deu um error</strong>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="error" hasDescription>
        <FiAlertCircle size={18} />
        <div>
          <strong>deu um error</strong>
          <p>nao foi pisssveil blabla</p>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
