import './../pages/index.css';
import api from '../utils/Api.js'

import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ConfirmPopup from "./ConfirmPopup.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";

import * as auth from "../utils/auth.js";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [registered, setRegistered] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");

    const [cards, setCards] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(res => {
                const [userInfo, Cards] = res;
                setCards(Cards);
                setCurrentUser(userInfo);
            })
            .catch(err => console.log(err));
    }, [])

    const isPopupOpen =
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isEditAvatarPopupOpen ||
        isConfirmPopupOpen ||
        isImagePopupOpen ||
        isInfoTooltipOpen;

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    function closePopupOverlayClick(e) {
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    const closePopupByEsc = React.useCallback((e) => {
        if (e.key === "Escape") {
            closeAllPopups();
        }
    }, []);

    React.useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener("keydown", closePopupByEsc);
            return () => document.removeEventListener("keydown", closePopupByEsc);
        }
    }, [isPopupOpen, closePopupByEsc]);

    /* function handleTransitionEnd() {
        if (!isPopupOpen) {
            setSelectedCard({});
        }
    } */

    function handleUpdateAvatar(updateUserAvatar) {
        setIsLoading(true);
        api
            .setUserAvatar(updateUserAvatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateUser(updateUserInfo) {
        setIsLoading(true);
        api
            .setUserInfo(updateUserInfo)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true);
        api
            .addNewCard(newCard)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        api
            .changeLikeCardStatus(card.id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card.id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        const isOwn = card.owner._id === currentUser._id;
        setIsLoading(true);
        if (isOwn) {
            api
                .deleteCard(card.id)
                .then(() => {
                    setCards((state) => state.filter((c) => c._id !== card.id));
                    closeAllPopups();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => setIsLoading(false));
        }
    }

    function handleCardDeleteClick(card) {
        setIsConfirmPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardImageClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleLogin(email) {
        setUserEmail(email);
        setLoggedIn(true);
    }

    function handleLoginSubmit(password, email) {
        setIsLoading(true);
        auth
            .authorize(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUserEmail(email);
                    setLoggedIn(true);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleRegisterSubmit(password, email) {
        setIsLoading(true);
        auth
            .register(password, email)
            .then((data) => {
                navigate("/sign-in");
                setRegistered(true);
                handleTooltipOpen();
            })
            .catch((err) => {
                setRegistered(false);
                handleTooltipOpen();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleTokenCheck() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        auth
            .getContent(token)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    handleLogin(res.data.email);
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUserEmail("");
    }

    function handleTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Header
                    userEmail={userEmail}
                    isLoggedIn={loggedIn}
                    onLogout={handleLogout}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            loggedIn ? (
                                <Main
                                    cards={cards}
                                    onEditProfile={setIsEditProfilePopupOpen}
                                    onAddPlace={setIsAddPlacePopupOpen}
                                    onEditAvatar={setIsEditAvatarPopupOpen}
                                    onCardClick={handleCardImageClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDeleteClick}
                                />
                            ) : (
                                <Navigate to="/sign-in" replace />
                            )
                        }
                    />

                    <Route
                        path="/sign-up"
                        element={
                            <Register
                                onSubmit={handleRegisterSubmit}
                                onTokenCheck={handleTokenCheck}
                                onLoading={isLoading}
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                onSubmit={handleLoginSubmit}
                                onTokenCheck={handleTokenCheck}
                                onLoading={isLoading}
                            />
                        }
                    />
                    <Route path="*" element={<h2>Not Found</h2>} />
                </Routes>

                {loggedIn && <Footer />}

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                    onUpdateAvatar={handleUpdateAvatar}
                    onLoading={isLoading}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                    onAddPlace={handleAddPlaceSubmit}
                    onLoading={isLoading}
                />

                <ConfirmPopup
                    card={selectedCard}
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                    onCardDelete={handleCardDelete}
                    onLoading={isLoading}
                />

                <InfoTooltip
                    name="info-tooltip"
                    isOpen={isInfoTooltipOpen}
                    registered={registered}
                    onClose={closeAllPopups}
                    onOverlayClick={closePopupOverlayClick}
                />
            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;