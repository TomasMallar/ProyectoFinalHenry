import { useState } from "react";
import styles from './ModalMailing.module.css'
import axios from "axios";

export default function ModalMailing({ onClose }) {
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
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full font-serif bg-blacky text-chocolate-oscuro">
      <div className="p-5 rounded shadow-md bg-chocolate-blanco w-[500px]">
        <h2 className="m-2 text-2xl">Enviar correo</h2>
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <label htmlFor="subject" className="text-lg ">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className=" block w-[93%] p-2.5 rounded border text-sm m-5"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="message" className="text-lg ">Mensaje:</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className=" block w-[93%] p-2.5 rounded border text-sm m-5"
              rows="5"
              required
            />
          </div>
          <div className="flex justify-end mt-5">
            <button type="submit" className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-claro hover:text-chocolate-oscuro">
              Enviar
            </button>
            <button type="button" onClick={onClose} className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


