import Strings from "../../helper/strings";
import noneImage from '/sysImage/noneImage.png'

const UserOnChart = (props) => {
    const { userData } = props;
    let url = userData?.url;
    if (url === null || url === undefined) url = null;
    return (
        <>
            {props.statusShow && (
                < div className="hint show-user-on-chart" >
                    <img className="show-pic-on-chart" src={url !== null ? userData?.url : `${noneImage}` } alt="" />
                    <span className='full-name'>{userData?.firstName} {userData?.lastName} </span>
                    {
                        !props.error
                            ? <label> {Strings.Experience} <span>{userData?.experiecne} {Strings.Year} </span></label>
                            : <label className='no-data'>No Data: Complete Profile</label>
                    }
                </div >
            )}
        </>
    );
}
 
export default UserOnChart;
