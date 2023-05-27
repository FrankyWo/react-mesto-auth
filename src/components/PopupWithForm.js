import React from "react";

const PopupWithForm = React.forwardRef((
    {
        name,
        title,
        isOpen,
        onClose,
        onSubmit,
        onLoading,
        buttonText = "Сохранить",
        buttonTextOnLoading = "Сохранение",
        onOverlayClick,
        onTransitionEnd,
        isValid,
        children,
    }, ref) => {
    return (
        <div
            className={`popup popup_${name} ${isOpen && "popup_opened"}`}
            onClick={onOverlayClick}
            onTransitionEnd={onTransitionEnd}
        >
            <div className="popup__container">
                <form
                    className="popup__form"
                    onSubmit={onSubmit}
                    name={name}
                    noValidate
                    ref={ref}
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        type="submit"
                        className={`popup__button-submit ${!isValid && "popup__button-submit_inactive"}`}
                    >
                        {isValid && onLoading ? buttonTextOnLoading : buttonText}
                    </button>
                </form>
                <button
                    className="popup__button-close"
                    type="button"
                    onClick={() => {
                        onClose(true);
                    }}
                ></button>
            </div>
        </div>
    );
}
);

export default PopupWithForm;
