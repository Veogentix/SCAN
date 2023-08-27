import Page404 from "../Page404";
import css from "./index.module.css"
//import histogramDateInput from "../../mock/HistogramData.json"
import { data } from "../../DTO/HistogramDate"
import documents from "../../mock/documents.json"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import { json } from "stream/consumers";
interface SearchScanRouteProps {
    autorize: boolean,
    Json: data[]
}

interface DocumentObj {
    markup: string,
    title: string,
    url: string,
    img: string,
    words: number
}

const SearchScanRoute: React.FC<SearchScanRouteProps> = ({ autorize, Json }) => {
    console.log("searchScanRoute", Json)
    const [page, setUsePage] = useState(0)
    const [allPage, setAllPage] = useState(0)
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();


    if (Json !== null && Json !== undefined) {
        if (autorize) {
            var searchEl: number = 0;
            var arrayDocumentObj = [];
            //получаем тестовые входные данные
            arrayDocumentObj = addElementDoc()
            if (Json !== null && Json !== undefined && Json.length > 1) {
                searchEl = Json.length;
            }
            return (
                <section className={css.scan}>
                    <div className={css.flex}>
                        <div>
                            <h1 className={css.capital_h1_text}>
                                Ищем. Скоро будут результаты
                            </h1>
                            <p className={css.p_text}>
                                Поиск может занять некоторое время, просим сохранять терпение.
                            </p>
                        </div>
                        <div className={css.scan_pic}>

                        </div>
                    </div>
                    <div>
                        <h1 className={css.capital_h1_text}>
                            Общая сводка
                        </h1>
                        <p className={css.text_search}>Найдено {searchEl} вариантов</p>
                        <div className={css.flex}>
                            <div className={css.leftArrow}></div>
                            <div className={css.elementBox}>
                                <div className={css.elementBoxLeftMenu}>
                                    <h3 className={css.h3_menuText}>
                                        Период
                                    </h3>
                                    <h3 className={css.h3_menuText}>
                                        Всего
                                    </h3>
                                    <h3 className={css.h3_menuText}>
                                        Риски
                                    </h3>
                                </div>
                                <ShortStatistic Json={Json} />
                            </div>
                            <div className={css.rightArrow}></div>
                        </div>
                    </div>
                    <div className={css.centr}>
                        <h1 className={css.capital_h1_text}>
                            Список документов
                        </h1>
                        <div className={`${css.documentMargin} ${css.centr}`}>
                            {
                                arrayDocumentObj.map((element, id) => {

                                    return (
                                        <GetListOfDockument
                                            key={id}
                                            img={element.img}
                                            head={element.title}
                                            text={element.markup}
                                            tag={"Технические новости"}
                                            words={element.words}
                                            url={element.url}
                                        />
                                    )

                                })
                            }


                        </div>

                    </div>
                    <button className={css.section_button}>Показать больше</button>
                </section>
            )
        }
        return (
            <Page404 />
        )
    } else {
        console.log("dasdasd")

        return (
            <Link to={`/search`} >
                <button className={`${css.section_button} ${css.section_button_padding}`} >Искать заново</button>
            </Link>

        )
    }
};

const addElementDoc = () => {
    var arrayDocumentObj = [];
    //тестовые данные
    var document: DocumentObj = {
        markup: "Медведь напал на жителя Приморья в окрестностях села Яконовка, пострадавший госпитализирован в реанимационное отделение городской больницы Уссурийска. По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. У мужчины есть разрешение на охоту, оружие должным образом зарегистрировано.       Медведь напал на жителя Приморья, пострадавший госпитализирован, — сообщает Вести: Приморье со ссылкой на Интерфакс-Дальний Восток. Сотрудники полиции проводят проверку по факту инцидента, связанного с нападением медведя на жителя Уссурийска в лесу, в окрестностях села Яконовка. Пострадавшего госпитализировали в реанимационное отделение городской больницы.           По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. Полицейские установили, что у мужчины есть разрешение на охоту, оружие должным образом зарегистрировано. Обстоятельства случившегося выясняются.     Напомним, ранее сообщалось, что в минувшие выходные в окрестностях Уссурийска, в районе села Кроуновка на охотника напал тигр, пострадавший госпитализирован.",
        title: "Медведь напал на охотника в Приморье",
        url: documents.ok.url,
        img: 'https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D',
        words: 232
    }
    var markup: string = documents.ok.content.markup
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(markup, "text/xml");

    arrayDocumentObj.push(document)
    arrayDocumentObj.push(document)
    arrayDocumentObj.push(document)
    arrayDocumentObj.push(document)
    arrayDocumentObj.push(document)
    arrayDocumentObj.push(document)
    return arrayDocumentObj
}

interface ShortStatisticProps {
    Json: data[]
}
const ShortStatistic: React.FC<ShortStatisticProps> = ({ Json }) => {
    var statistic: data[] = Json
    if (statistic !== undefined && statistic !== null && statistic.length > 1) {
        console.log("fffffffffffffffffe")
        return (
            <div className={css.flex}>
                {
                    statistic.map((element, id) => {
                        console.log(id)
                        if (id < 7) {
                            return (
                                <ShortStatisticElement
                                    key={id}
                                    dateStart={element.data[0].date}
                                    all={element.data[0].value}
                                    risk={element.data[1].value}
                                />
                            )
                        }

                    })
                }
            </div>

        )
    }
    else {
        return (
            <div>

            </div>
        )
    }

}

interface ShortStatisticElementProps {
    dateStart: string,
    all: number,
    risk: number
}
const ShortStatisticElement: React.FC<ShortStatisticElementProps> = ({ dateStart, all, risk }) => {
    return (
        <div>
            <div className={css.flex}>
                <div className={css.elemetShortStaat}>
                    <p className={css.p_elemetShortStaat}>
                        {dateStart.substr(0, 10)}
                    </p>
                    <p className={css.p_elemetShortStaat}>
                        {all}
                    </p>
                    <p className={css.p_elemetShortStaat}>
                        {risk}
                    </p>
                </div>
                <div className={css.line}></div>

            </div>

        </div>


    )
}

interface GetListOfDockumentProps {
    img: string,
    head: string,
    text: string,
    tag: string,
    url: string,
    words: number

}
const GetListOfDockument: React.FC<GetListOfDockumentProps> = ({ img, head, text, tag, words, url }) => {

    const click = () => {
        window.location.href = url;
    }
    return (
        <div className={css.element}>
            <div className={css.element_box}>
                <h1 className={css.h1_element}>{head}</h1>
                <div className={css.element_yellowBlock}>
                    <p className={`${css.element_yellowBlock_p_text} `}>{tag}</p>
                </div>
                <img className={css.element_img} src={img} />

                <p className={css.element_p_boodytext}>{text}</p>

                <div className={css.flex}>
                    <button className={css.element_button} onClick={click}>Читать в источнике</button>
                    <h6 className={css.element_h6_text}>{words} слов</h6>
                </div>
            </div>
        </div>
    )
}





export default SearchScanRoute;