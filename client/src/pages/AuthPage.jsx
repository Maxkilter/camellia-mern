import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    })

    useEffect(() => {
        if (error) {
            message(error);
            clearError();
        }
    }, [error, clearError, message]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => setForm({...form, [event.target.name]: event.target.value});

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form});
            auth.logIn(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten a link</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                    <div className="input-field">
                        <input
                            placeholder="Enter email"
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}
                        />
                        <label htmlFor="email">E-mail</label>
                    </div>
                        <div className="input-field">
                            <input
                                placeholder="Enter password"
                                id="password"
                                type="password"
                                name="password"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-1 black-text"
                            onClick={loginHandler}
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Sing in
                        </button>
                        <button
                            className="btn green lighten-3 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sing up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
