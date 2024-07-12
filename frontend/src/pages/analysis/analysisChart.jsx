import React, { useContext, useState } from 'react';
import '../../sass/chart.scss'
import Strings from '../../helper/strings';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import UserOnChart from '../users/userOnChart';

const AnalysisChart = () => {
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
            <UserOnChart userData={showPersonDetail} statusShow={showUserOnChart} error={error} />
        </>
    );
}
 
export default AnalysisChart;