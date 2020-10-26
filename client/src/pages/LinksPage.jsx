import React, {useCallback, useContext, useEffect, useState} from "react";
import {LinksList} from "../components/LInksList";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchList = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    if (loading) {
        return <Loader />
    }

    return !loading && <LinksList links={links}/>
}
