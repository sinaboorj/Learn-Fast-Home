
import '../sass/about.scss'
import sina from '../../public/sysImage/Sina.png'
import { useContext } from 'react'
import Strings from '../helper/strings';
import { PublicContext } from '../context/publicContext';

const About = () => {
    const { lang } = useContext(PublicContext);
    return (
        <>
            <br /><br /><br />
            <div className="about">
                <img className="resume-pic" src={sina} alt="Sina picture profile" />
                <span className='resume'>Hossein Zarei (Sina)</span>
                <div className='resume-text-fa' style={{direction : lang ? 'ltr' : 'rtl'}}>
                    <span>{Strings.Sina_1}</span>
                    <span>{Strings.Sina_2}</span>
                    <span>{Strings.Sina_3}</span>
                </div>
            </div>
        </>
    )
}

export default About