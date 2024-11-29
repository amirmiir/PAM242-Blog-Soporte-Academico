import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../shared/utils/routes'
import bsalogo from '../../assets/bsa-logo.svg'
import { IoIosArrowDown } from 'react-icons/io'

type navigationLabel = {
    name: string,
    to: string
}

const exploreNavigation: navigationLabel[] = [
    { name: "Cursos", to: ROUTES.SUBJECTS.ROOT },
    { name: "Foro", to: ROUTES.QUESTIONS.ROOT },
]

const NavBar: FC = () => {
    /*  Dropdown inicialmente cerrado, se activaba a través del hook useState */
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`max-w-screen-2xl mx-auto px-4 border-b-2 border-gray-300 bg-gray-100 h-12 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : ''}`}>
            <nav className="flex justify-between items-center h-full">
                {/* Izquierda */}
                <div className="flex items-center space-x-6 font-semibold">
                    <Link to={ROUTES.LANDING.ROOT}>
                        <div className="flex items-center space-x-2">
                            <img
                                src={bsalogo}
                                alt="Logo de Blog de Soporte Académico"
                                className="h-6"
                            />
                            <strong className="text-gray-400 text-xl">BSA</strong>

                        </div></Link>


                    {/* Explorar, Dropdown */}
                    <div>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="">
                            <div className="flex flex-row items-center space-x-1">
                                <span className="text-gray-600 hover:text-gray-800">Explorar</span>
                                <IoIosArrowDown className="h-3 translate-y-0.5" />
                            </div>
                        </button>
                        {
                            isDropdownOpen && (
                                <div className="absolute mt-3 bg-gray-100 transition-all duration-200 ease-in-out z-50 border rounded-b-md px-2 text-right w-24 -translate-x-3">
                                    <ul>
                                        {
                                            exploreNavigation.map((item) => (
                                                <li key={item.name} className="text-gray-600 hover:text-gray-800">
                                                    <Link to={item.to}>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>

                    <a href={ROUTES.LANDING.ABOUT} className="text-gray-600 hover:text-gray-800">Acerca de</a>

                    <a href={ROUTES.LANDING.US} className="text-gray-600 hover:text-gray-800">Nosotros</a>

                    <a href={ROUTES.LANDING.FAQ} className="text-gray-600 hover:text-gray-800">Preguntas Frecuentes</a>

                    <a href={ROUTES.LANDING.CONTACT} className="text-gray-600 hover:text-gray-800">Contáctanos</a>
                </div>



                {/* Derecha */}
                <div className="flex items-center space-x-4 pl-5 h-full relative">
                    <div className="border-l border-gray-300 h-full absolute left-0"></div>
                    <Link
                        to={ROUTES.LOGIN}
                        className="rounded-lg border border-red-500 bg-white py-2 px-4 text-red-500 hover:bg-gray-100"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link
                        to={ROUTES.REGISTER}
                        className="rounded-lg border border-red-500 bg-red-500 py-2 px-4 text-white hover:bg-red-600"
                    >
                        Registrarse
                    </Link>
                </div>
            </nav>
        </header>
    );
};


export default NavBar