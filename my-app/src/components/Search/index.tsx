import React from 'react';

import css from "./index.module.css"
import axios from 'axios';
import { useState } from 'react';
import { useAppSelector } from 'src/hook';
import { HOST } from "../../API"
import { Histograms } from "../../DTO/Histogram"
import { data } from "../../DTO/HistogramDate"
import { useNavigate } from "react-router-dom";
import histogramDateInput from "../../mock/HistogramData.json"

interface SearchProps {
    setJson: any
}

const Search: React.FC<SearchProps> = ({ setJson }) => {

    const [INNBoolen, setINNBoolen] = useState(false)
    const [INN, setINN] = useState(0)
    const navigate = useNavigate();
    const [DateStart, setDateStart] = useState("2019-01-01T00:00:00+03:00")
    const [DateEnd, setDateEnd] = useState("2022-08-31T23:59:59+03:00")
    const [Tonal, setTonal] = useState("any")
    const [DocumentSumBoolen, setDocumentSumBoolen] = useState(false)
    const [DocumentSum, setDocumentSum] = useState(0)

    const redux = useAppSelector((state: { todos: any; }) => state.todos)

    //var statistic: data[] = histogramDateInput.data
    const timeNow: string = "2023-03-24"

    const onChangeINN = (e: React.FormEvent<HTMLInputElement>) => {

        if (e.currentTarget.value === "") {
            setINNBoolen(false)

        } else {
            if (!/^(0|[1-9]\d*)$/.test(e.currentTarget.value)) {
                setINNBoolen(false)
            } else {

                setINNBoolen(true)
                setINN(parseInt(e.currentTarget.value))
            }

        }

    }

    const onChangeDocumentSum = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "") {
            setDocumentSumBoolen(false)
        } else {
            if (!/^(0|[1-9]\d*)$/.test(e.currentTarget.value)) {
                setDocumentSumBoolen(false)
            } else {
                setDocumentSumBoolen(true)
                setDocumentSum(parseInt(e.currentTarget.value))

            }
        }
    }

    const onChangeDateStart = (e: React.FormEvent<HTMLInputElement>) => {
        setDateStart(e.currentTarget.value)
        // setTonal()
    }
    const onChangeDateEnd = (e: React.FormEvent<HTMLInputElement>) => {
        setDateEnd(e.currentTarget.value)
        // setTonal()
    }

    const searchButtom = () => {

        var select = (document.getElementById('selectvalue')) as HTMLSelectElement;
        if (select != null) {
            var sel = select.selectedIndex;
            if (sel === 0) {
                setTonal("positive")
            }
            if (sel === 1) {
                setTonal("negative")
            }
            if (sel === 2) {
                setTonal("any")
            }
        }
        var maxFullness: boolean = false;
        var onlyMainRole: boolean = false;
        var onlyWithRiskFactors: boolean = false;
        var excludeTechNews: boolean = false;
        var excludeAnnouncements: boolean = false;
        var excludeDigests: boolean = false;

        var checkbox = document.getElementById(
            'scales1',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            maxFullness = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales2',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            onlyMainRole = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales3',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            onlyWithRiskFactors = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales4',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            excludeTechNews = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales5',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            excludeAnnouncements = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales6',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            //  checkbox.checked = true;
            excludeDigests = checkbox.checked
        }

        let histogram: Histograms = {
            issueDateInterval: {
                startDate: DateStart,
                endDate: DateEnd
            },
            searchContext:
            {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: "company",
                            //  sparkId: null,
                            //   entityId: null,
                            inn: INN,
                            maxFullness: maxFullness
                        }
                    ],
                    onlyMainRole: onlyMainRole,
                    tonality: Tonal,
                    onlyWithRiskFactors: onlyWithRiskFactors
                }
            },
            attributeFilters: {
                excludeTechNews: excludeTechNews,
                excludeAnnouncements: excludeAnnouncements,
                excludeDigests: excludeDigests
            },
            similarMode: "duplicates",
            limit: DocumentSum,
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ]
        }
        // getHistogram(histogram)
        getHistogramAxio(histogram)
    }

    return (
        <div className={css.block} >
            <div className={css.flex}>
                <div>
                    <h1 className={css.h1_title}>Найдите необходимые данные в пару кликов.</h1>
                    <p className={css.p_text}>Задайте параметры поиска.
                        Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className={css.flex}>
                    <div className={css.dockPickter}>  </div>
                    <div className={css.DoubleDockPickter}></div>
                </div>
            </div>
            <div className={css.flex}>

                <section className={css.sectionBlock}>
                    <div className={css.sectionBlock_margin}>
                        <div className={css.sectionBlock_leftBlock}>
                            <p className={css.p_text}>ИНН компании *</p>
                            <input className={INNBoolen ? css.input : css.inputError} onChange={onChangeINN}></input>
                            <p className={css.p_text}>Тональность*</p>

                            <select id="selectvalue" className={`${css.input}  ${css.p_text}`} >
                                <option className={`${css.input}  ${css.p_text}`} >позитивная</option>
                                <option className={`${css.input}  ${css.p_text}`}>негативная</option>
                                <option className={`${css.input}  ${css.p_text}`}>любая</option>
                            </select>


                            <p className={css.p_text}>Количество документов в выдаче *</p>
                            <input className={DocumentSumBoolen ? css.input : css.inputError} onChange={onChangeDocumentSum}></input>

                            <p className={`${css.p_text}  ${css.dateMarginTop}`}>Диапазон поиска *</p>
                            <div className={css.flexDate}>
                                <input className={`${css.input}  ${css.p_text}`} type="date" max={timeNow} onChange={onChangeDateStart} />
                                <input className={`${css.input} ${css.marginInput} ${css.p_text}`} type="date" max={timeNow}
                                    onChange={onChangeDateEnd}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={css.sectionBlock_marginRightBlock}>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales1" name="scales" className={css.chekbox} />
                                        Признак максимальной полноты
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales2" name="scales" className={css.chekbox} />
                                        Упоминания в бизнес-контексте
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales3" name="scales" className={css.chekbox} />
                                        Публикации только с риск-факторами
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales4" name="scales" className={css.chekbox} />
                                        Включать технические новости рынков
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales5" name="scales" className={css.chekbox} />
                                        Включать анонсы и календари
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales6" name="scales" className={css.chekbox} />
                                        Включать сводки новостей
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales7" name="scales" className={css.chekbox} />
                                        Главная роль в публикации
                                    </label>
                                </div>

                                <Button />
                            </div>
                        </div>
                    </div>
                </section>
                <div className={css.rocketPic}></div>
            </div>

        </div >
    );
    function Button() {

        if (INN && DocumentSum) {
            return (
                // <Link to={`/search/scan`} >
                <button className={css.buttonLogInTrue} style={{ marginTop: "80px" }} onClick={searchButtom}>Поиск</button>
                //  </Link>
            )
        } else
            return (
                <button className={css.buttonLogIn} style={{ marginTop: "80px" }} >Поиск</button>
            )
    }

    async function getHistogram(histogram: Histograms) {
        var jsonR: string = ""
        try {
            const options = {
                // Будем использовать метод POST
                method: 'POST',
                //  contentType: 'application/json',
                headers: {
                    'Content-Type': 'application/json', 'charset': 'utf-8',
                    'Authorization': "Bearer " + redux.token
                },
                // Добавим тело запроса
                body: JSON.stringify({
                    intervalType: histogram.intervalType,
                    histogramTypes: histogram.histogramTypes,
                    issueDateInterval: histogram.issueDateInterval,
                    searchContext: histogram.searchContext,
                    similarMode: histogram.similarMode,
                    limit: histogram.limit,
                    sortType: histogram.sortType,
                    sortDirectionType: histogram.sortDirectionType,
                    attributeFilters: histogram.attributeFilters
                })

            }
            // Делаем запрос за данными
            await fetch(HOST + '/objectsearch/histograms', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error occurred!')

                    }
                    return response.json() as Promise<data[]>
                })
                .then(json => {
                    console.log(json[0])
                    var a: data[] = json as data[]
                    console.log("aaaza===", a[0].data)
                    setJson(a)
                    navigate("/search/scan")
                }

                ).catch((err) => {
                    console.log(err, "error")
                })

        } catch {
            console.log("errrer")
        }

    }


    function getHistogramAxio(histogram: Histograms) {

        axios.create({
            baseURL: HOST,
            timeout: 1000,
            headers: { 'Authorization': 'Bearer ' + redux.token }
        });

        const config = {
            headers: { Authorization: `Bearer ${redux.token}` }
        };

        const bodyParameters = {

            intervalType: histogram.intervalType,
            histogramTypes: histogram.histogramTypes,
            issueDateInterval: histogram.issueDateInterval,
            searchContext: histogram.searchContext,
            similarMode: histogram.similarMode,
            limit: histogram.limit,
            sortType: histogram.sortType,
            sortDirectionType: histogram.sortDirectionType,
            attributeFilters: histogram.attributeFilters
        };

        axios.post(HOST + '/objectsearch/histograms',
            bodyParameters,
            config
        )
            .then(response => {
                var inputdate: data[] = response.data.data
                setJson(inputdate)
                navigate("/search/scan")
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

}

export default Search;
