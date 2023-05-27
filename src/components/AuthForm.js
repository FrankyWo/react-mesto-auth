import { Link } from "react-router-dom";
import { forwardRef } from "react";

const AuthForm = forwardRef((
    {
        title,
        name,
        buttonText,
        buttonTextOnLoading,
        linkText = "",
        handleSubmit,
        isValid,
        onLoading,
        children,
    },
    ref) => {
    return (
        <form
            className="auth-form"
            action="#"
            name={name}
            onSubmit={handleSubmit}
            noValidate
            ref={ref}
        >
            <h2 className="auth-form__title">{title}</h2>
            {children}
            <button
                type="submit"
                className={`auth-form__button ${!isValid && "auth-form__button_disabled"}`}
            >
                {isValid && onLoading ? buttonTextOnLoading : buttonText}
            </button>
            <Link to="/sign-in" className="auth-form__link">
                {linkText}
            </Link>
        </form>
    );
}
);

export default AuthForm;
