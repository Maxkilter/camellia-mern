import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const [link, setLink] = useState('');
    const history = useHistory();
    const {request} = useHttp();
    const auth = useContext(AuthContext);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const linkHandler = (event) => setLink(event.target.value);
    const pressHandler = async (event) => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    }


    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Enter a link"
                        id="link"
                        type="text"
                        name="link"
                        value={link}
                        onKeyPress={pressHandler}
                        onChange={linkHandler}
                    />
                    <label htmlFor="link">Enter a link</label>
                </div>
            </div>
        </div>
    )
}
