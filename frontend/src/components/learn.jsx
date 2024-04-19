import '../css/learn.css'
import '../css/register.css'

const Learn = () => {
    return (
        <>
            <div className="learn-container">
                <br />
                <hr />
                {/* <div className='img-backgrand'></div> */}
                <div className='web-img'>
                    <h3 style={{marginBottom:'20px'}}>Teaching programming from beginner to advanced</h3>
                    <span style={{ fontStyle: 'italic', fontWeight: '600', marginBottom: '25px' }}>Fast and professional web programming training</span>
                </div>
                <div className='logo-format'>
                    <div className='learn'>
                        <div>
                            <img src="/sysImage/backend.jpg" className="learn-backend" width={100} height={100} alt="learn backend" />
                        </div>
                        <div>
                            <li className='learn-item' style={{ marginTop: '15px' }}>Node.js</li>
                            <li className='learn-item'>Express</li>
                        </div>
                    </div>
                    <div className='learn'>
                        <div>
                            <img src="/sysImage/frontend.jpg" className="learn-frontend" width={100} height={100} alt="learn frontend" />
                        </div>
                        <div>
                            <li className='learn-item' style={{ marginTop: '15px' }}>React.js</li>
                            <li className='learn-item'>JavaScript</li>
                            <li className='learn-item'>CSS</li>
                            <li className='learn-item'>HTML</li>
                        </div>
                    </div>
                    <div className='learn'>
                        <div>
                            <img src="/sysImage/database.jpg" className="learn-database" width={100} height={100} alt="learn database" />
                        </div>
                        <div>
                            <li className='learn-item' style={{ marginTop: '15px' }}>MySQL</li>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}
 
export default Learn;