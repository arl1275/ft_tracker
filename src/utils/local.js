// CRUDLocalStorage.js

// Función para obtener el elemento guardado en localStorage
export const getItem = () => {
    const item = localStorage.getItem('item');
    return item ? JSON.parse(item) : null;
  };
  
  // Función para guardar un nuevo elemento en localStorage
  export const setItem = (newItem) => {
    localStorage.setItem('item', JSON.stringify(newItem));
  };
  
  // Función para actualizar el elemento en localStorage
  export const updateItem = (newItem) => {
    localStorage.setItem('item', JSON.stringify(newItem));
  };
  
  // Función para eliminar el elemento de localStorage
  export const deleteItem = () => {
    localStorage.removeItem('item');
  };
  
  