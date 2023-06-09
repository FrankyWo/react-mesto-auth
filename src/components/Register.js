import { useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import AuthForm from "./AuthForm";

function Register({ onSubmit, onTokenCheck, onLoading }) {
    const { values, errors, isValid, handleChange, setValue, formRef } =
        useFormValidation();

    useEffect(() => {
        setValue("email", "");
        setValue("password", "");
    }, [setValue]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            const { password, email } = values;
            onSubmit(password, email);
        }
    }

    useEffect(() => {
        onTokenCheck();
    }, []);

    return (
        <AuthForm
            name="register"
            title="Регистрация"
            buttonText="Зарегистрироваться"
            buttonTextOnLoading="Реристрируюсь"
            linkText="Уже зарегистрированы? Войти"
            handleSubmit={handleSubmit}
            onLoading={onLoading}
            isValid={isValid}
            ref={formRef}
        >
            <input
                className="auth__input"
                name="email"
                type="email"
                minLength="2"
                maxLength="30"
                placeholder="Email"
                onChange={handleChange}
                value={values["email"] || ""}
                required
            />
            <span className="auth__input-error">{errors.email}</span>
            <input
                className="auth__input"
                name="password"
                type="password"
                minLength="5"
                maxLength="30"
                placeholder="Пароль"
                onChange={handleChange}
                value={values["password"] || ""}
                required
            />
            <span className="auth__input-error">{errors.password}</span>
        </AuthForm>
    );
}

export default Register;