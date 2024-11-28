import { FC } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/utils/routes';
import bsalogo from '../../assets/bsa-logo.svg'
import checkIcon from '../../assets/icons/checkIcon.png'
import LoginForm from './LoginForm';

const Login: FC = () => {
    const features: string[] = [
        "Accede a información actualizada sobre los cursos de la facultad",
        "Comparte tus dudas y conocimientos",
        "Hecho por estudiantes, para estudiantes"
    ];

    return (
        <div className="h-[calc(100vh-120px)] flex flex-row justify-between items-center bg-gray-900">

            {/* Información */}
            <div className=" w-1/4 ml-32 space-y-4 ">
                <Link to={ROUTES.LANDING} className="flex text-center items-center space-x-2">
                    <img src={bsalogo} alt="" className="pl-8 h-10" />
                    <h1 className="text-4xl text-gray-400">BSA </h1>
                </Link>

                <div className="flex flex-row justify-between border-l-2 pl-4 border-red-500 items-center h-auto text-white">
                    {/* Información sobre la comunidad */}
                    <div>
                        <h2 className="text-xl">Sé parte de la comunidad de estudios de la Facultad de Ciencias</h2>
                        <ol>
                            {
                                features.map((items: string, index: number) => (
                                    <li key={index} className="flex flex-row text-left items-start space-x-1 ">
                                        <img src={checkIcon} className="h-4 translate-y-0.5"/>
                                        <span className="text-sm">{items}</span>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>


            {/* Formato de inicio de sesión */}
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Iniciar Sesión
                </h2>

                <LoginForm />

                <p className="align-baseline font-medium mt-4 text-sm">¿No tienes una cuenta? Por favor, <Link to={ROUTES.REGISTER} className="text-blue-500 hover:text-blue-700">Regístrate</Link></p>



                <p className="mt-5 text-center text-gray-500 text-xs">©2025 BSA. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login