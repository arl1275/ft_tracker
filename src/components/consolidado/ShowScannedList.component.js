import React, { useState, useEffect } from 'react';

const SelfClosingAlert = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return isVisible ? <div className="alert">{message}</div> : null;
};

export default SelfClosingAlert;