import { useState } from 'react';
import { InputBox } from '../../components/common/InputBox/InputBox';
import { Paragraph } from '../../components/common/Paragraph/Paragraph';
import { Button } from '../../components/common/Button/Button';
import { Breaker } from '../../components/common/Breaker/Breaker';
import { PageNavigation } from '../../components/common/PageNavigation/PageNavigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { UserLogin } from '../../service/quiries/UserAuth';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Providers/UseContent';
import { LoadingModal } from '../../components/common/LoadingModal/LoadingModal';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState('');
    const { isloadingModel, openLoadingModel, closeLoadingModel } = useUser();


    const validButton = () => {
        return (!email || !password);
    }

    const {
        mutateAsync: LoginUser,
        isLoading: LoginLoading,
    } = useMutation({
        mutationFn: UserLogin,
        onSuccess: (data) => {
            Cookies.set('blog_user', JSON.stringify(data.user), { expires: 7, path: '/' });
            Cookies.set('token', data.token, { expires: 7, path: '/' });
            // loading model off
            closeLoadingModel();
            navigate('/');
        },
        onError: () => {
            // loading model off
            closeLoadingModel();
        },
    });

    const ErrorHandler = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-email":
                setIsError("Invalid email format.");
                break;
            case "auth/user-not-found":
                setIsError("User not found.");
                break;
            case "auth/wrong-password":
                setIsError("Wrong password.");
                break;
            case "auth/too-many-requests":
                setIsError("Too many unsuccessful login attempts. Try again later.");
                break;
            case "auth/invalid-credential":
                setIsError("Invalid Credential")
                break;
            default:
                setIsError('Something went wrong. Please Try');
                break;
        }
    }


    const loginInWithEmailAndPassword = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user) return;

                LoginUser({
                    "uIdByFirebase": user.uid,
                })
            })
            .catch((error) => {
                ErrorHandler(error.code);
                // loading model off
                closeLoadingModel();
            });
    };


    const handleRegeisterGoogle = async () => {
        try {
            // loading model on
            openLoadingModel();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            GoogleAuthProvider.credentialFromResult(result);

            const user = result.user;
            console.log(user, "user")
            if (!user) return;

            LoginUser({
                "uIdByFirebase": user.uid,
                "photoURL": user.photoURL,
                "name": user.displayName,
                "registerOption": "Google",
            })
        } catch (error) {
            ErrorHandler(error.code);
            // loading model off
            closeLoadingModel();
        }
    }

    const handleLogin = () => {
        if (validButton()) return;

        setIsError('');
        // loading model on
        openLoadingModel();
        loginInWithEmailAndPassword();
    }

    return (
        <div className={`w-full h-screen flex relative flex-col text-left shrink-0 gap-6 bg-black-0`}>
            <div className='w-full h-screen border flex flex-row justify-between'>
                <div className='w-full relative flex justify-center items-center gap-10'>
                    {/* OUR LOGO */}
                    <div className='w-fit absolute top-2 left-6 font-Golos text-2xl font-bold leading-7 text-black-700'>
                        <PageNavigation url={'/'}>
                            Bolg.
                        </PageNavigation>
                    </div>

                    {/* login part */}
                    <div className='w-full max-w-[320px] flex flex-col gap-6'>
                        <div className='w-full flex flex-col gap-2'>
                            <h2 className='font-Golos font-bold text-2xl leading-7 text-blue-950'>Welcome Back</h2>
                            <p className='font-Golos font-normal text-xs leading-4 text-black-300'>Welcome back, please enter your details.</p>
                        </div>
                        <InputBox name={'email'} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Enter your Email'} />
                        <InputBox name={'password'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Enter your password'} />

                        {isError && <Paragraph center color={'text-red-500'}>{isError}</Paragraph>}

                        <Button
                            onClick={() => handleLogin()}
                            disabled={validButton()}
                            className={`w-full px-4 py-2 rounded text-white bg-black-900 ${validButton() ? "bg-opacity-80" : "hover:bg-opacity-50 active:bg-opacity-90"}`}
                        >
                            <Paragraph
                                color={'text-white'}
                                type={'semiheading'}
                            >
                                {LoginLoading ? 'Loading...' : 'LOGIN'}
                            </Paragraph>
                        </Button>

                        <Breaker />
                        {/* social meadia */}
                        <div className='w-full flex flex-col gap-3'>
                            <Button onClick={handleRegeisterGoogle} full type={'outline-email'}>
                                <div className='flex justify-center items-center gap-3 m-auto'>
                                    <FcGoogle size={'20px'} />
                                    <Paragraph type={"master"}>Sign in with Google</Paragraph>
                                </div>
                            </Button>
                            <Button full type={'outline-email'}>
                                <div className='flex justify-center items-center gap-3 m-auto'>
                                    <FaGithub size={'20px'} />
                                    <Paragraph type={"master"}>Sign in with GitHub</Paragraph>
                                </div>
                            </Button>
                        </div>

                        <Paragraph center>
                            Already have an account.
                            <PageNavigation url={'/register'}>
                                <Paragraph color={'text-blue-900 border-b-[1px] border-blue-900'}>Register Here</Paragraph>
                            </PageNavigation>
                        </Paragraph>
                    </div>
                </div>

                <div className='w-full hidden md:flex border bg-black-50'>

                </div>
            </div>

            {isloadingModel && <LoadingModal />}
        </div>
    )
}