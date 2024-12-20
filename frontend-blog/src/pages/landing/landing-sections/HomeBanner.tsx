import { FC } from 'react';
import FCUNI from '../../../assets/images/FCUNI.jpg'
import FrenteFCUNI from '../../../assets/images/FrenteFCUNI.jpeg'
import BiblioFCUNI from '../../../assets/images/BiblioFCUNI.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/utils/routes';

type BannerSlide = {
    "header": string,
    "description": string,
    "bg-img": string
}

const HomeBanner: FC = () => {

    const BannerSlides: BannerSlide[] = [
        {
            "header": "Sé parte de la comunidad de estudios de la Facultad de Ciencias",
            "description": "",
            "bg-img": FCUNI
        },
        {
            "header": "Comparte información con otros estudiantes",
            "description": "",
            "bg-img": FrenteFCUNI
        },
        {
            "header": "Refuerza tus conocimientos",
            "description": "",
            "bg-img": BiblioFCUNI
        }
    ];

    return (
        <div className=" text-white w-full h-screen overflow-hidden">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 50,
                    },
                }}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper h-3/4 "
            >
                {
                    BannerSlides.map((item: BannerSlide, index: number) => (
                        <SwiperSlide style={{
                            backgroundImage: `url(${item['bg-img']})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }} key={index} className="flex flex-col justify-left text-left mb-4 p-10 content-center">
                            {/* Through this div we can set a darker color to the background image */}
                            <div className="absolute inset-0 bg-black opacity-50"></div>

                            <div className="relative w-4/5 md:w-3/5 pl-24">
                                <div className="title text-2xl md:text-5xl font-extrabold" data-swiper-parallax="-300">
                                    {item.header}
                                </div>
                                <div className="text mb-6" data-swiper-parallax="-100">
                                    <p>{item.description}</p>
                                </div>
                                <Link to={ROUTES.LOGIN} className="rounded-lg border tracking-wide font-semibold border-red-500 bg-red-500 py-2 md:py-2 px-3 md:px-4 text-md md:text-lg text-white hover:bg-red-600">Unirme</Link>
                            </div>

                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default HomeBanner;
