import React, { useEffect, useState } from 'react';
import './CarIntro.css';

const CarIntro = ({ onComplete }) => {
  // Estado para controlar quando a animação de saída começa
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Aos 4.5 segundos, começa a transição suave de sumiço (fade-out)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4500);

    // Aos 5.0 segundos exatos, notifica o App para desmontar a intro e liberar o site
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 5000);

    // Limpeza dos timers caso o componente seja fechado antes
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    // Adiciona dinamicamente a classe "fade-out" quando faltar meio segundo
    <div className={`car-intro-container ${isFadingOut ? 'fade-out' : ''}`}>
      <h1 className="car-intro-title">AlugaCar</h1>
      <div className="car-intro-animation"></div>
    </div>
  );
};

export default CarIntro;