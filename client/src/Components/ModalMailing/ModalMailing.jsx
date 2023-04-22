import { useState } from "react";
import styles from './ModalMailing.module.css'
import axios from "axios";

export default function ModalMailing ({onClose}){
    const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { subject, text: message };
    try {
      const response = await axios.post('http://localhost:3001/email/choconews', data);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('There was a problem with the axios request:', error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Enviar correo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={styles.inputField}
              rows="5"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Enviar
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

  
  