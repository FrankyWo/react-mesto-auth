function ImagePopup({ card, isOpen, onClose, onOverlayClick, onTransitionEnd, }) {
    return (
        <div
            className={`popup popup_image-form ${isOpen && "popup_opened"}`}
            onClick={onOverlayClick}
            onTransitionEnd={onTransitionEnd}
        >
            <div className="popup__image-container">
                <img className="popup__image-place" src={card.link} alt={card.name} />
                <figcaption className="popup__image-title">{card.name}</figcaption>
                <button
                    className="popup__button-close"
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;