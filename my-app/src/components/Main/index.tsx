import React from 'react';

import css from "./index.module.css"
import Home from "../HomePage"
import Login from "../Login"
import { useAppDispatch } from 'src/hook';
import { addTodo, } from 'src/store/todoSlice';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'src/hook';
import PrivateRoute from '../SearchRoute';
import SearchScanRoute from '../SearchScanRoute';
import { data } from "../../DTO/HistogramDate"
import { useState } from 'react';
function Main() {
    var autorize = useAppSelector((state: { autorize: any; }) => state.autorize)


    //тут проверяем наличие токена в локал сторедж
    //нужно дописать логику с протухшим токеном а то баг
    const [Json, setJson] = useState<data[]>()
    const dispatch = useAppDispatch();
    var a = localStorage.getItem('token')
    if (a !== null) {
        // console.log("token-t", a)
        dispatch(addTodo(a));
    }
    //autorize.user
    //localStorage.clear();

    // можно попробовать ! вместо as , тип показываем что значение не нулевое будет
    return (
        <main className={css.main}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<PrivateRoute autorize={autorize.user} setJson={setJson} />} />
                <Route path="/search/scan" element={<SearchScanRoute autorize={autorize.user} Json={Json!} />} />

            </Routes>

        </main>
    );

}




export default Main;
