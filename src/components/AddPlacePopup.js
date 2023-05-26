import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText={onLoading ? `Создание...` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handleChangePlaceName}
        required
      />
      <span className="input-title-error" />
      <input
        className="popup__input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={placeLink}
        onChange={handleChangePlaceLink}
        required
      />
      <span className="input-link-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup