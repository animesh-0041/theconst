import { useUser } from "../../Providers/UseContent";
import { Model } from "../common/Model/Model";
import { PiWarningCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import './styles.scss';

export const AuthorizeModel = () => {
    const { isAuthorizeModel, closeAuthorizeModel } = useUser();
    const navigation = useNavigate();

    const handleLogin = () => {
        closeAuthorizeModel();
        navigation('/login');
    }

    return (
        <Model isOpen={isAuthorizeModel} closeModel={closeAuthorizeModel} type="pop-up">
            <div className="w-full flex flex-col items-center gap-4">
                <PiWarningCircle size={50} className="text-orange-600 pulse-animation" />
                <p className="font-Golos font-medium text-xs text-center leading-5 text-black-500">Oops! It looks like you're not logged in. Please log in to enjoy more features!</p>
                <div className="w-full flex flex-row gap-4">
                    <button
                        onClick={() => closeAuthorizeModel()}
                        className="w-full h-10 rounded border border-black-900 text-black-900 capitalize font-Golos text-sm font-normal"
                    >
                        cancel
                    </button>
                    <button
                        onClick={handleLogin}
                        className="w-full h-10 rounded border border-black-900 bg-black-900 hover:bg-black-700 active:bg-black-900 text-black-0 capitalize font-Golos text-sm font-normal"
                    >
                        login
                    </button>
                </div>
            </div>
        </Model>
    );
}
