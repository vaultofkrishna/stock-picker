import React, { Fragment, useEffect, useState } from 'react';
import {fetchData} from '../../utils';
import Loader from '../../components/loader';

const Description = ({symbolId, closeSymbol}) => {
    const [data, setData] = useState(null);
    const [errorHandling, setErrorHandling] = useState(false);

    useEffect(() => {
        executeFetch()
    },[symbolId])

    const executeFetch = () => {
        setErrorHandling(false);
        fetchData('function=OVERVIEW&symbol='+symbolId).then((res) => {
            if(res.error){
                setErrorHandling(true);
            } else if(res && res.Symbol) {
                setErrorHandling(false);
                setData(res);
            } else {
                setErrorHandling(true);
            }
        })
    }

    const renderRatio = (key, includeCurrency=false) => {
        return (
            <li className="flex flex-space-between" data-source="default">
                <span className="name">
                    {key}
                </span>
                <span className="nowrap value bold">
                    {includeCurrency && <span>{data['Currency']} </span>}
                    <span className="number">{data[key]}</span>
                </span>
            </li>
        )
    }
    return (
        <div className="card card-large fixed-height" id="top">
            {
                data && !errorHandling && <Fragment>
                    <div className="flex-row flex-space-between flex-gap-8">
                        <div className="flex flex-baseline">
                            <h1 className="mainHeading margin-0">{data.Name} ({data['Country']})</h1>
                            <i className="refreshIcon material-icons" onClick={executeFetch}>autorenew</i>
                        </div>
                        <button className="close-desc" onClick={() => closeSymbol(symbolId)}>close</button>
                    </div>
                    <div className="extra-info">
                        <div>
                            {data['Address']}
                        </div>
                    </div>
                    <div className="company-info flex">
                        <div className="company-ratios">
                            <ul id="top-ratios">
                                {renderRatio('Sector')}
                                {renderRatio('Industry')}
                                {renderRatio('Exchange')}
                                {renderRatio('CIK')}
                                {renderRatio('PERatio')}
                                {renderRatio('MarketCapitalization', true)}
                            </ul>
                        </div>
                        <div className="company-profile flex-column">
                            <div className="flex flex-column">
                                <div className="title">About</div>
                                <div className="sub show-more-box about">
                                    <p>{data.Description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
            {
                errorHandling && <div><p className="error-msg">No data is available !</p><button className="close-desc" onClick={() => closeSymbol(symbolId)}>close</button></div>
            }
            {
                !errorHandling && !data && <Loader/>
            }
        </div>
    )
}
export default Description;