import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup({ card, isOpen, onClose, onOverlayClick, onCardDelete, onTransitionEnd, onLoading, }) {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
            buttonTextOnLoading="Удаление..."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onOverlayClick={onOverlayClick}
            onTransitionEnd={onTransitionEnd}
            onLoading={onLoading}
            isValid="true"
        />
    );
}

export default ConfirmPopup;