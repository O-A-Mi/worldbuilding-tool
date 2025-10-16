import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const EventModal = ({ event, position, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Preenche o formulário quando um evento é passado
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
    }
  }, [event]);

  const handleSave = () => {
    onSave({
      ...event,
      title,
      description
    });
  };

  // Posiciona o modal perto de onde o usuário clicou
  // Uma lógica mais avançada poderia verificar os limites da tela
  const modalStyle = {
    top: `calc(${position.y}px + 20px)`,
    left: `calc(${position.x}px - 150px)`, // Centraliza um pouco
  };

  return (
    // O 'backdrop' fecha o modal quando clicado fora
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} style={modalStyle} onClick={e => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Detalhes do Evento</h3>
        
        <label htmlFor="title">Título</label>
        <input 
          id="title"
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          className={styles.input}
        />
        
        <label htmlFor="description">Descrição</label>
        <textarea 
          id="description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          rows="5"
        ></textarea>
        
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.buttonCancel}>Cancelar</button>
          <button onClick={handleSave} className={styles.buttonSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;