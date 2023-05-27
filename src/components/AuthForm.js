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
            className="auth"
            action="#"
            name={name}
            onSubmit={handleSubmit}
            noValidate
            ref={ref}
        >
            <h2 className="auth__title">{title}</h2>
            {children}
            <button
                type="submit"
                className={`auth__button ${!isValid && "auth__button_disabled"}`}
            >
                {isValid && onLoading ? buttonTextOnLoading : buttonText}
            </button>
            <Link to="/sign-in" className="auth__link">
                {linkText}
            </Link>
        </form>
    );
}
);

export default AuthForm;
