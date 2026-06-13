import Slider from "react-slick";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useRef } from "react";

const ProductZoom = (props) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: true
    };

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false
    };

    const { product } = props;
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    const goto = (index) => {
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };

    return (
        <div className="productZoom">

            <div className="position-relative">
                <div className="badge badge-primary">{product.discount}%</div>
                <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                    {product.images.map((img, i) => (
                        <div className="item" key={i}>
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={img} />
                        </div>
                    ))}
                </Slider>
            </div>

            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {product.images.map((img, i) => (
                    <div className="item" key={i}>
                        <img src={img} alt="zoom" className="w-100" onClick={() => goto(i)} />
                    </div>
                ))}
            </Slider>

        </div>
    );
};

export default ProductZoom;