import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router';

const TimelinePage = () => {
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragCurrent, setDragCurrent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, placement: 'top' });
  const navigate = useNavigate();

  // Dados mockados
  const [timeline] = useState({
    name: "Era dos Heróis",
    startDate: "ANO 0",
    endDate: "ANO 1000"
  });

  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'A Grande Alvorada', 
      description: 'O início da contagem do tempo, marcado pela ascensão do primeiro sol.', 
      position: 5,
      color: '#d5ae6f'
    },
    { 
      id: 2, 
      title: 'A Forja das Coroas', 
      description: 'Os reinos são estabelecidos e os primeiros reis coroados.', 
      position: 25,
      color: '#81a8af'
    },
    { 
      id: 3, 
      title: 'A Chegada da Sombra', 
      description: 'Uma era de conflitos se inicia com a chegada das criaturas da noite.', 
      position: 70,
      color: '#c79248'
    }
  ]);

  // Desenha o canvas de fundo com dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawBackground();
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenha dots de fundo
      const dotSpacing = 30;
      ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
      
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Desenha a curva de drag em tempo real
  useEffect(() => {
    if (!isDragging || !dragStart || !dragCurrent) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Redesenha o fundo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dots de fundo
    const dotSpacing = 30;
    ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Desenha a curva sendo arrastada
    ctx.strokeStyle = '#d5ae6f';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#d5ae6f';
    
    const startX = dragStart.x - rect.left;
    const startY = dragStart.y - rect.top;
    const currentX = dragCurrent.x - rect.left;
    const currentY = dragCurrent.y - rect.top;
    
    // Calcula pontos de controle para curva Bézier suave
    const controlY = Math.min(startY, currentY) - Math.abs(currentY - startY) * 0.3;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX, controlY, currentX, currentY);
    ctx.stroke();
    
    // Desenha o ponto final
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#d5ae6f';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
  }, [isDragging, dragStart, dragCurrent]);

  const handleTimelineMouseDown = (e) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = rect.top + rect.height / 2;
    
    setDragStart({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragStart) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = dragStart.x - rect.left;
    const timelineWidth = rect.width;
    const positionPercent = Math.max(0, Math.min(100, (clickX / timelineWidth) * 100));

    // Calcula o melhor posicionamento do modal
    const modalPlacement = e.clientY < window.innerHeight / 2 ? 'bottom' : 'top';

    const newEvent = {
      id: Date.now(),
      title: 'Novo Evento',
      description: '',
      position: positionPercent,
      color: '#d5ae6f'
    };

    setSelectedEvent(newEvent);
    setModalPosition({ x: dragStart.x, y: e.clientY, placement: modalPlacement });
    setIsModalOpen(true);

    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);

    // Limpa o canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const dotSpacing = 30;
    ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const modalPlacement = rect.top < window.innerHeight / 2 ? 'bottom' : 'top';
    
    setSelectedEvent(event);
    setModalPosition({ 
      x: rect.left + rect.width / 2, 
      y: rect.top,
      placement: modalPlacement
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    const existingIndex = events.findIndex(e => e.id === eventData.id);
    if (existingIndex >= 0) {
      const newEvents = [...events];
      newEvents[existingIndex] = eventData;
      setEvents(newEvents);
    } else {
      setEvents([...events, eventData]);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Linha do Tempo: {timeline.name}</h1>
          <button onClick={() => navigate('/world-tool')} className={styles.backButton}>
            <i className="fa-light fa-arrow-left"></i>
            <span>Voltar</span>
          </button>
        </header>

        <div className={styles.timelineContainer}>
          <div 
            ref={timelineRef}
            className={styles.timelineWrapper}
            onMouseDown={handleTimelineMouseDown}
          >
            <span className={styles.dateLabel}>{timeline.startDate}</span>
            <div className={styles.timelineTrack}>
              {events.map(event => (
                <div
                  key={event.id}
                  className={styles.eventPinpoint}
                  style={{left: `${event.position}%`}}
                  onClick={(e) => handleEventClick(e, event)}
                >
                  <div className={styles.eventContent}>
                    <div className={styles.pinpointTitle}>{event.title}</div>
                    <div className={styles.pinpointDot} style={{backgroundColor: event.color}}></div>
                    <div className={styles.pinpointLine} style={{backgroundColor: event.color}}></div>
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.dateLabel}>{timeline.endDate}</span>
          </div>

          <p className={styles.helpText}>
            <i className="fa-light fa-info-circle"></i>
            Clique na linha do tempo e arraste para cima para criar um novo evento
          </p>
        </div>
      </div>

      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          position={modalPosition}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const EventModal = ({ event, position, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [color, setColor] = useState(event.color || '#d5ae6f');

  const colors = [
    { value: '#d5ae6f', name: 'Dourado' },
    { value: '#81a8af', name: 'Azul' },
    { value: '#c79248', name: 'Cobre' },
    { value: '#628d95', name: 'Petróleo' },
    { value: '#b27938', name: 'Bronze' },
    { value: '#95929e', name: 'Cinza' }
  ];

  const handleSave = () => {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }
    onSave({ ...event, title, description, color });
  };

  const modalStyle = {
    left: `${position.x}px`,
    [position.placement]: position.placement === 'top' ? 'auto' : `${position.y + 20}px`,
    [position.placement === 'top' ? 'bottom' : 'top']: position.placement === 'top' ? `${window.innerHeight - position.y + 20}px` : 'auto',
    transform: 'translateX(-50%)'
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Detalhes do Evento</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fa-light fa-times"></i>
          </button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="Digite o título do evento"
            autoFocus
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            placeholder="Descreva o que aconteceu neste evento..."
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Cor</label>
          <div className={styles.colorPicker}>
            {colors.map(c => (
              <button
                key={c.value}
                className={styles.colorOption}
                style={{
                  backgroundColor: c.value,
                  border: color === c.value ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                  transform: color === c.value ? 'scale(1.1)' : 'scale(1)'
                }}
                onClick={() => setColor(c.value)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className={styles.modalActions}>
          {event.id !== Date.now() && event.title !== 'Novo Evento' && (
            <button className={styles.deleteButton} onClick={() => onDelete(event.id)}>
              <i className="fa-light fa-trash"></i>
              Excluir
            </button>
          )}
          <div className={styles.actionButtons}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              <i className="fa-light fa-check"></i>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TimelinePage;