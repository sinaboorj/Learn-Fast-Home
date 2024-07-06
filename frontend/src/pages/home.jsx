import '../css/home.css'
import '../css/register.css'
import PlanningEn from '/sysImage/PlanningEn.jpg'
import AnalysisEn from '/sysImage/AnalysisEn.jpg'
import RepairsEn from '/sysImage/RepairsEn.jpg'
import PlanningFa from '/sysImage/PlanningFa.jpg'
import AnalysisFa from '/sysImage/AnalysisFa.jpg'
import RepairsFa from '/sysImage/RepairsFa.jpg'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/languageContext'
import Strings from '../helper/strings'
import { UserContext } from '../context/userContext'
import Loading from '../components/loading'

const Home = () => {
    const { lang } = useContext(LanguageContext);

    return (
        <>
            <br /><br /><br />
            <div className="c-plan-container">
              
                    
                <div className='logo-format'>
                <div className='c-plan'>
                <Link to='/'> <div className='c-plan-pic-border'>< img src={lang ? RepairsEn : RepairsFa} className="c-plan-pic" alt="c-plan frontend" /></div></Link>
                        <div className='home-items' style={{ direction: lang ? 'ltr' : 'rtl' }}>
                            <li className='c-plan-item'>React.js</li>
                            <li className='c-plan-item'>JavaScript</li>
                            <li className='c-plan-item'>CSS</li>
                            <li className='c-plan-item'>HTML</li>
                        </div>
                    </div>
                    <div className='c-plan'>
                    <Link to='/'> <div className='c-plan-pic-border'> <img src={lang ? PlanningEn : PlanningFa} className="c-plan-pic" alt="c-plan backend" /></div></Link>
                        <div className='home-items' style={{ direction: lang ? 'ltr' : 'rtl' }}>
                            <li className='c-plan-item'>Node.js</li>
                            <li className='c-plan-item'>Express</li>
                        </div>
                    </div>

                    <div className='c-plan'>
                        <Link to='/api/monitoring-analysis'><div className='c-plan-pic-border'> < img src={lang ? AnalysisEn : AnalysisFa} className="c-plan-pic" alt="c-plan database" /></div></Link>
                        <div className='home-items' style={{ direction: lang ? 'ltr' : 'rtl' }}>
                            <li className='c-plan-item'>{Strings.Analysis_title_1}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_2}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_3}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_4}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_5}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_6}</li>
                            <li className='c-plan-item'>{Strings.Analysis_title_7}</li>
                        </div>
                    </div>
                </div>
                <br />
            </div>
                
            <br />
        </>
    );
}
 
export default Home;