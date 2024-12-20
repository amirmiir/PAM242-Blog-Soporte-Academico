import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/utils/routes';
import bsalogo from '../../assets/bsa-logo.svg';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosMenu } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import useSmallScreenSize from '../../hooks/small-screen-size/useSmallScreen';

type navigationLabel = {
    name: string,
    to: string | null
}

const exploreNavigation: navigationLabel[] = [
    { name: "Cursos", to: ROUTES.SUBJECTS.ROOT },
    { name: "Foro", to: ROUTES.QUESTIONS.ROOT },
];

const landingNavigation: navigationLabel[] = [
    { 'name': 'Inicio', to: ROUTES.LANDING.HOME },
    { 'name': 'Acerca de', to: ROUTES.LANDING.ABOUT },
    { 'name': 'Nosotros', to: ROUTES.LANDING.US },
    { 'name': 'Contáctanos', to: ROUTES.LANDING.CONTACT },
];

const userNavigation: navigationLabel[] = [
    { name: 'Mi perfil', to: ROUTES.MYPROFILE },
    { name: 'Cerrar Sesión' },
];


const NavBar: FC = () => {
    const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
    const [isSmallMenuOpen, setIsSmallMenuOpen] = useState<boolean>(false);
    const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null)

    const isSmallScreen = useSmallScreenSize();

    useEffect(() => {
        const verifyToken = () => {
            const storedToken = localStorage.getItem('access_token'); // Fetch token directly
            if (!storedToken) {
                console.log("User is not logged in");
                setToken(null); // Explicitly clear token state
                return;
            }

            setToken(storedToken); // Update token state
        };

        verifyToken();
    }, []);

    return (
        <header className="w-full  px-6 mx-auto border-b-2 border-gray-300 bg-gray-100 h-[10vh]">
            <nav className="flex justify-between items-center h-full w-full">
                {/* Izquierda */}

                <div className="flex h-full items-center font-semibold text-center">
                    {
                        !isSmallScreen && (
                            <Link to={ROUTES.LANDING.ROOT}>
                                <div className="flex items-center space-x-2 mr-4">
                                    <img
                                        src={bsalogo}
                                        alt="Logo de Blog de Soporte Académico"
                                        className="h-6"
                                    />
                                    <strong className="text-gray-400 text-xl">BSA</strong>
                                </div>
                            </Link>
                        )
                    }

                    {!isSmallScreen && (
                        <div className="relative h-full w-full">
                            <button onClick={() => setIsExploreOpen(!isExploreOpen)} className="h-full">
                                <div className="flex flex-row items-center space-x-1 px-4 hover:bg-red-500 text-gray-600 hover:text-white h-full transition-all duration-200">
                                    <span>Explorar</span>
                                    <IoIosArrowDown className="h-3 translate-y-0.5" />
                                </div>
                            </button>

                            {isExploreOpen && (
                                <div className="absolute left-1/2 flex flex-row transform -translate-x-1/2 bg-gray-100 border rounded-b-md pb-1 text-right z-50 w-full">
                                    <ul className="flex flex-col w-full items-start">
                                        {exploreNavigation.map((item: navigationLabel, index: number) => (
                                            <li key={index} className="text-gray-600 pr-6 pb-2 hover:text-white hover:bg-red-500 w-full transition-all duration-200">
                                                <Link to={item.to} >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {!isSmallScreen && (
                        landingNavigation.map((item: navigationLabel, index: number) => (
                            <a key={index} href={item.to} className="text-gray-600 h-full hover:text-white hover:bg-red-500 px-4 place-content-center transition-all duration-200">
                                {item.name}
                            </a>
                        ))
                    )}
                </div>

                {/* Derecha */}
                {!isSmallScreen && (
                    <div className="flex items-center space-x-2 pl-5 h-full relative">
                        <div className="border-l border-gray-300 h-full absolute left-0"></div>

                        {
                            true ?
                                <div className="w-auto">
                                    <button onClick={() => setIsUserOpen(!isUserOpen)}>
                                        <FaCircleUser className="h-6" />
                                    </button>
                                    {
                                        isUserOpen && (
                                            <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-100 border rounded-md z-50 w-40 shadow-md pb-1">
                                                <ul className="flex flex-col w-full text-sm ">
                                                
                                                    <li className="relative w-full"><Link to={ROUTES.MYPROFILE} className="block p-2 text-gray-600 pb-2 hover:text-white hover:bg-red-500 w-full transition-all duration-200 text-start">Mi Perfil</Link></li>
                                                    <li className="relative w-full justify-start"><button onClick className="block p-2 text-gray-600 pb-2 hover:text-white hover:bg-red-500 w-full transition-all duration-200 text-start">Cerrar Sesión</button></li> {/*to add the onClick function for logout*/}
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                <div className="flex flex-row space-x-2">
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
                        }

                    </div>
                )}

                {isSmallScreen && (
                    <div className="h-full content-end text-right w-full relative">
                        <button onClick={() => (setIsSmallMenuOpen(!isSmallMenuOpen))} className="h-full">
                            <IoIosMenu className="size-8" />
                        </button>

                        {isSmallMenuOpen && (
                            <div className="absolute left-0 top-full w-full z-50 bg-gray-100 border-x-2 border-b-2 px-4 pb-2">
                                <ul className="text-center">
                                    {landingNavigation.map((item: navigationLabel, index: number) => (
                                        <li key={index} className="py-2 flex flex-row">
                                            <a href={item.to} className="block hover:text-red-500 hover:bg-gray-200 px-2 rounded">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <hr className="my-4" />
                                <div>
                                    <ul className="text-center">
                                        {exploreNavigation.map((item: navigationLabel, index: number) => (
                                            <li key={index}>
                                                <Link to={item.to}>{item.name}</Link>
                                            </li>
                                        )
                                        )}
                                    </ul>
                                </div>
                                <hr className="my-4" />
                                {
                                    token ?
                                        <ul>
                                            <li className="text-gray-600 pr-6 pb-2 hover:text-white hover:bg-red-500 w-full"><Link to={ROUTES.MYPROFILE} >Mi Perfil</Link></li>
                                            <li className="text-gray-600 pr-6 pb-2 hover:text-white hover:bg-red-500 w-full"><button>Cerrar Sesión</button></li> {/*to add the onClick function for logout*/}
                                        </ul>
                                        :

                                        <div className="flex flex-col space-y-1 text-center">
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
                                }
                            </div>

                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default NavBar;
