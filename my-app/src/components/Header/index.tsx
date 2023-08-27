import React from 'react';
import { Link } from 'react-router-dom'
import css from "./index.module.css"
import { useAppSelector } from 'src/hook';
import { HOST } from "../../API"
import { useState } from 'react';
import { addAutorizeUser } from 'src/store/autorizeUserSlice';
import { useAppDispatch } from 'src/hook';

interface EventFiltersInfo {
    usedCompanyCount: number;
    companyLimit: number;
}

const Header: React.FC = () => {

    const [infoUser, setInfoUser] = useState<EventFiltersInfo>();
    //needUpdate -false и isLoading -false значит мы уже собрали статистику и всю инфу отображаем в хеадер
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const redux = useAppSelector((state: { todos: any; }) => state.todos)
    const dispatch = useAppDispatch();

    const loginIn = () => {
        //  setIsLoading(true)
        try {
            const options = {
                // Будем использовать метод POST
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + redux.token
                }
            }
            // Делаем запрос за данными
            fetch(HOST + '/account/info', options)
                .then(response => {
                    if (!response.ok) {
                        //  setError( response.json.)
                        // response.json()
                        throw new Error('Error occurred!')

                    }
                    return response.json()
                })
                .then(json => {
                    var infoUser1: EventFiltersInfo = json.eventFiltersInfo;
                    setInfoUser(infoUser1)
                    dispatch(addAutorizeUser(true))
                    //  console.log("===", infoUser)
                }

                ).catch((err) => {
                    //   setError(false)
                    console.log(err, options, "error")
                    localStorage.clear();
                    dispatch(addAutorizeUser(false))
                })

        } catch {
            console.log("errrer")
            localStorage.clear();
            dispatch(addAutorizeUser(false))
        }
    }
    // console.log(infoUser, redux.completed)
    if (needUpdate) {
        if (redux.completed) {
            setIsLoading(true)
            loginIn()
            //задержка в 3 секунды что б посмотреть как идет анимация загрузки
            const a = function (): void {
                setIsLoading(false)
            }
            setTimeout(a, 3000);

            // setIsLoading(false)
            setNeedUpdate(false)



        }
    }
    return (
        <header className={css.header}>
            <div className={css.header_content}>
                <div className={css.scan}></div>
                <div className={css.menu}>
                    <Link to={`/`} >
                        <button className={css.menu_item_l}>Главная</button>
                    </Link>
                    <button className={css.menu_item}>Тарифы</button>
                    <button className={css.menu_item}>FAQ</button>
                </div>

                <LoadStat />
                <Profil />

            </div>
        </header>
    );

    function LoadStat() {
        if (isLoading) {
            return (
                <div className={css.loader}>
                </div>
            )
        } else if (isLoading === false && needUpdate === false) {
            return (
                <div className={css.infoBlockMargin}>
                    <div className={css.flex}>
                        <p className={css.textUser}>Использовано компаний</p>
                        <p className={css.textNumber}>{infoUser?.companyLimit}</p>
                    </div>
                    <div className={css.flexlimitComponent}>
                        <p className={css.textUser}>Лимит по компаниям</p>
                        <p className={css.textNumberGreen}>{infoUser?.usedCompanyCount}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className={css.NLoader}>
            </div>
        )
    }
    function Profil() {
        if (isLoading === false && needUpdate === false) {
            return (
                <div className={css.flex}>
                    <div className={css.blockProfil}>
                        <p className={css.userTextProfil}>User</p>
                        <p className={css.textUser}>выйти</p>
                    </div>
                    <div className={css.userIcon}></div>
                </div>
            )
        } else {
            return (
                <div className={css.loginOrRegistrate}>
                    <div className={css.registate}>Зарегистрироваться</div>
                    <div className={css.line}></div>
                    <Link to={`/login`} >
                        <button className={css.button_login}>Войти</button>
                    </Link>
                </div>
            )
        }
    }
}

export default Header;
