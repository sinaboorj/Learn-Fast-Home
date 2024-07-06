import React, { useContext, useState } from 'react';
import '../../css/chart.css'
import Strings from '../../helper/strings';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const AnalysisChart = () => {
    const [showPersonDetail, setShowPersonDetail] = useState(false);
    const { headers } = useContext(UserContext);
    const [showUserOnChart, setShowUserOnChart] = useState(false)

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
            setShowUserOnChart(false)
        }
    }

    return (
        <>
            <div className="analysis-chart" onMouseEnter={() => { setShowUserOnChart(false) }}>
                <div
                    onMouseEnter={() => { showUserChart(2, 1, 'A') }}
                    onMouseLeave={()=>{setShowUserOnChart(false)}}
                    className='person' > {Strings.Supervisor}
                </div>
                <div className='v-line'></div>
                <div
                    onMouseEnter={() => { showUserChart(3, 1, 'A') }}
                    onMouseLeave={()=>{setShowUserOnChart(false)}}
                    className='person' >{Strings.Expert}
                </div>
            </div>
            {showUserOnChart && (
                < div className="hint show-user-on-chart" >
                    <img className="show-pic-on-chart" src={showPersonDetail?.url} alt="" />
                    <span className='full-name'>{showPersonDetail?.firstName} { showPersonDetail?.lastName} </span>
                    <label>{Strings.Experience} <span>{showPersonDetail?.experiecne} {Strings.Year} </span></label>
                </div >
            )}
        </>
    );
}
 
export default AnalysisChart;