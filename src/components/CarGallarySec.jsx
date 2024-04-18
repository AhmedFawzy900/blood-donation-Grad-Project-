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
        <div class="gallary" id="gallary">

        <div class="main-title"><h1>Gallary</h1></div>
        <div class="container">
            <div class="box">
                <div class="image">
                    <img src={amb4} alt=""/>
                </div>
            </div>
            <div class="box">
                <div class="image">
                    <img src={gal1} alt=""/>
                </div>
            </div>
            <div class="box">
                <div class="image">
                    <img src={gal2} alt="" />
                </div>
            </div>
            <div class="box">
                <div class="image">
                    <img src={gal3} alt="" />
                </div>
            </div>
            <div class="box">
                <div class="image">
                    <img src={gal4} alt="" />
                </div>
            </div>
            <div class="box">
                <div class="image">
                    <img src={gal5} alt="" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default CarGallarySec