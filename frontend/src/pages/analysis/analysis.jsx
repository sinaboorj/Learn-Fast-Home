import { useContext } from 'react';
import '../../css/analysis.css'
import folder_img from '../../../public/sysImage/FY1.png'
import { LanguageContext } from '../../context/languageContext';
import '../../css/font.css'
import ManagerChart from '../manager/managerChart';
import Strings from '../../helper/strings';
import AnalysisChart from './analysisChart';
import { UserContext } from '../../context/userContext';

const Analysis = () => {
     const { lang } = useContext(LanguageContext)
     const { userData } = useContext(UserContext);
     return (
          <>
               {userData?.token !== undefined &&
                    <div className="analysis" >
                         <ManagerChart />
                         <AnalysisChart />
                         <div className='folder' style={{ direction: lang ? 'ltr' : 'rtl', width: '100%' }}>
                              <div className='analysis-title'>
                                   <img src={folder_img} alt="Chart-img" className='folder-img' />
                                   <span >{Strings.Analysis_title}</span>
                              </div>
                              <div className='folder-summry'>
                                   <p>{Strings.Analysis_discription}</p>
                              </div>
                         </div>
                         <div className='discription' style={{ flexDirection: !lang && 'row-reverse' }}>

                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_1} </li>
                                   <span className='under-items'>{Strings.Analysis_job_1}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_2} </li>
                                   <span className='under-items'>{Strings.Analysis_job_2}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_3} </li>
                                   <span className='under-items'>{Strings.Analysis_job_3}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_4} </li>
                                   <span className='under-items'>{Strings.Analysis_job_4}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_5} </li>
                                   <span className='under-items'>{Strings.Analysis_job_5}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_6} </li>
                                   <span className='under-items'>{Strings.Analysis_job_6}</span>
                              </ul>
                              <ul className='items-title' style={{ direction: !lang && 'rtl' }}>
                                   <li className='items'>{Strings.Analysis_title_7}</li>
                                   <li className='under-under-items'>{Strings.Analysis_job_7_1} </li>
                                   <li className='under-under-items'>{Strings.Analysis_job_7_2} </li>
                                   <li className='under-under-items'>{Strings.Analysis_job_7_3} </li>
                              </ul>
                         </div>
                    
                    </div>
               }
               <div className={lang ? 'img-backgrand-en' : 'img-backgrand-fa'}></div> {/* use background-image in CSS */}
          </>
     );
}
 
export default Analysis;