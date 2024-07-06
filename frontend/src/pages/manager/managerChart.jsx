import React, { useContext, useState } from 'react';
import '../../css/chart.css'
import Strings from '../../helper/strings';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const ManagerChart = () => {
    const [showPersonDetail, setShowPersonDetail] = useState(false);
    const { headers } = useContext(UserContext);
    const [showUserOnChart, setShowUserOnChart] = useState(false)
    const [error, setError] = useState(false)
    
    const showUserChart = async (level, No, unit) => {
        let level_No = {
            level: level,
            No: No,
            unit: unit
        };
          
        try {
            const users = await axios.post(`http://localhost:5500/api/user-info`, level_No, { headers: headers })
            setShowPersonDetail(users?.data)
            setShowUserOnChart(true)
        } catch (error) {
            setShowUserOnChart(true)
            setError(true)
        }
    }
    return (
        <>
            <br />
            <div className='title-chart'  onMouseEnter={() => { setShowUserOnChart(false) }}>{Strings.Organizational_Chart}</div>
            <div className="managechart-chart">
                <div
                    onMouseEnter={() => { showUserChart(1, 1, 'T') }}
                    onMouseLeave={() => { setShowUserOnChart(false) }}
                    className='person' >{Strings.Manager} </div>
                <div className='v-line'></div>
            </div>
            {showUserOnChart && (
                < div className="hint show-user-on-chart" >
                    <img className="show-pic-on-chart" src={showPersonDetail?.url} alt="" />
                    <span className='full-name'>{showPersonDetail?.firstName} {showPersonDetail?.lastName} </span>
                    {
                        !error
                            ? <label> {Strings.Experience} <span>{showPersonDetail?.experiecne} {Strings.Year} </span></label>
                            : <label className='no-data'>No Data: Complete Profile</label>
                    }
                </div >
            )}
        </>
    );
}


export default ManagerChart;