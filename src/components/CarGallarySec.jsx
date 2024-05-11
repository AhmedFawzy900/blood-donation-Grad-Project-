import amb4 from '../images/amb4.jpg';
import gal1 from '../images/gal1.jpg';
import gal2 from '../images/gal2.jpg';
import gal3 from '../images/gal3.jpg';
import gal4 from '../images/gal4.jpg';
import gal5 from '../images/gal5.jpg';
import gal6 from '../images/gal6.jpg';
import gal7 from '../images/gal7.jpg';


const CarGallarySec = () => {

    return (
        <div className="gallary" id="gallary">

        <div className="main-title"><h1>Gallary</h1></div>
        <div className="container">
            <div className="box">
                <div className="image">
                    <img src={amb4} alt=""/>
                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={gal1} alt=""/>
                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={gal2} alt="" />
                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={gal3} alt="" />
                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={gal4} alt="" />
                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={gal5} alt="" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default CarGallarySec