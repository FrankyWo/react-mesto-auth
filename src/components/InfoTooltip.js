function InfoTooltip({ name, isOpen, registered, onClose, onOverlayClick, }) {
    return (
        <div
            className={`popup popup_${name} ${isOpen && "popup_opened"}`}
            onClick={onOverlayClick}
        >
            <div className="popup__container">
                <div className="popup__tooltip-content">
                    <img className="popup__tooltip-image"
                        src={
                            registered
                                ? require("../images/UnionSuccsess.png")
                                : require("../images/UnionDenied.png")
                        }
                        alt="статус отправки формы"
                    />
                    <h2 className="popup__title popup__tooltip-title">
                        {registered
                            ? "Вы успешно зарегистрировались!"
                            : `Что-то пошло не так! Попробуйте ещё раз.`}
                    </h2>
                </div>
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

export default InfoTooltip;
