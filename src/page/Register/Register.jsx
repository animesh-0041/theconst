//register

import { useEffect, useReducer, useState } from "react";
import { InputBox } from "../../components/common/InputBox/InputBox";
import { Paragraph } from "../../components/common/Paragraph/Paragraph";
import { Button } from "../../components/common/Button/Button";
import { Breaker } from "../../components/common/Breaker/Breaker";
import { PageNavigation } from "../../components/common/PageNavigation/PageNavigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { validateEmail, validatePassword } from "../../components/Helper/Tools";
import { useMutation } from "@tanstack/react-query";
import { UserAuth } from "../../service/quiries/UserAuth";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "../../Providers/UseContent";
import { LoadingModal } from "../../components/common/LoadingModal/LoadingModal";
import { requestPermission } from "../../components/Helper/Helper";

const registerStep = [
    {
        inputs: [
            { name: "name", type: "name", placeholder: "Enter Name" },
            { name: "email", type: "email", placeholder: "Enter Email" },
        ],
        button: ["NEXT"],
    },
    {
        inputs: [
            { name: "password", type: "password", placeholder: "Enter Password" },
            {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm Password",
            },
        ],
        button: ["REGISTER", "BACK"],
    },
];

const intialRegisterDetails = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPasswordError: "",
    isEmailError: "",
};

export const Register = () => {
    const { isloadingModel, openLoadingModel, closeLoadingModel } = useUser();
    const [step, setStep] = useState(0);
    const { inputs, button } = registerStep[step];
    const [isValidPassword, setIsVaildPassword] = useState(false);
    const [isValidEmail, setIsVaildEmail] = useState(false);
    const navigate = useNavigate();
    const [registerDetails, dispatch] = useReducer(
        registerReducer,
        intialRegisterDetails
    );

    function registerReducer(state, action) {
        switch (action.type) {
            case "SET_NAME":
                return { ...state, name: action.payload };
            case "SET_EMAIL":
                return { ...state, email: action.payload };
            case "SET_PASSWORD":
                return { ...state, password: action.payload };
            case "SET_CONFIRMPASSWORD":
                return { ...state, confirmPassword: action.payload };
            case "SET_PASSWORD_ERROR":
                return { ...state, isPasswordError: action.payload };
            case "SET_EMAIL_ERROR":
                return { ...state, isEmailError: action.payload };
            default:
                intialRegisterDetails;
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    };

    const validButton = (props) => {
        if (props === "NEXT") {
            return !registerDetails.name || !registerDetails.email;
        } else if (props === "REGISTER") {
            return (
                !registerDetails.name ||
                !registerDetails.email ||
                !registerDetails.password ||
                !registerDetails.confirmPassword
            );
        } else {
            return true;
        }
    };

    const { mutateAsync: registerUser, isLoading: RegisterLoading } = useMutation(
        {
            mutationFn: UserAuth,
            onSuccess: (data) => {
                Cookies.set("blog_user", JSON.stringify(data.user), {
                    expires: 7,
                    path: "/",
                });
                Cookies.set("token", data.token, { expires: 7, path: "/" });
                navigate("/");
                // loading model off
                closeLoadingModel();
            },
            onError: (error) => {
                console.log(error);
                // loading model off
                closeLoadingModel();
            },
        }
    );

    const signUpWithEmailAndPassword = async () => {
        const { name, email, password } = registerDetails;
        setIsVaildPassword(true);

        if (
            !validatePassword({
                password: registerDetails.password,
                confirmPassword: registerDetails.confirmPassword,
                dispatch: dispatch,
            })
        )
            return;

        // loading model on
        openLoadingModel();
        // const facmToken = await requestPermission();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user) return;

                registerUser({
                    uIdByFirebase: user?.uid,
                    name: name,
                    photoURL: user?.photoURL,
                    email: user?.email,
                    registerOption: "EmailAndPassword",
                    // fcmToken: facmToken,
                });
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    dispatch({
                        type: "SET_EMAIL_ERROR",
                        payload: "Account is arealy exist, Login Please.",
                    });
                    dispatch({
                        type: "SET_PASSWORD_ERROR",
                        payload: "Account is arealy exist, Login Please.",
                    });
                }
                // loading model off
                closeLoadingModel();
            });
    };

    const handleRegeisterGoogle = async () => {
        try {
            // loading model on
            openLoadingModel();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            GoogleAuthProvider.credentialFromResult(result);

            const user = result.user;
            if (!user) return;
            // const facmToken = await requestPermission();
            registerUser({
                uIdByFirebase: user?.uid,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
                registerOption: "Google",
                // fcmToken: facmToken,
            });

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                dispatch({
                    type: "SET_EMAIL_ERROR",
                    payload: "Account is arealy exist, Login Please.",
                });
                dispatch({
                    type: "SET_PASSWORD_ERROR",
                    payload: "Account is arealy exist, Login Please.",
                });
            }
            // loading model off
            closeLoadingModel();
        }
    };

    const handleRegister = (props) => {
        switch (props) {
            case "NEXT":
                return (
                    setIsVaildEmail(true),
                    validateEmail({ email: registerDetails.email, dispatch: dispatch }) &&
                    setStep(1)
                );
            case "BACK":
                return setStep(0);
            default:
                return signUpWithEmailAndPassword();
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isValidEmail) {
            validateEmail({
                email: registerDetails.email,
                dispatch: dispatch,
            });
        }
        if (isValidPassword) {
            validatePassword({
                password: registerDetails.password,
                confirmPassword: registerDetails.confirmPassword,
                dispatch: dispatch,
            });
        }
    }, [
        registerDetails.email,
        registerDetails.password,
        registerDetails.confirmPassword,
        isValidPassword,
        isValidEmail,
    ]);

    return (
        <div
            className={`w-full h-screen flex relative flex-col text-left shrink-0 gap-6 bg-black-0`}
        >
            <div className="w-full h-screen border flex flex-row justify-between">
                <div className='w-full relative flex flex-col justify-center items-center gap-10'>
                    {/* OUR LOGO */}
                    <PageNavigation url={"/"}>
                        <div className="w-fit absolute top-2 left-6 font-Golos text-2xl font-bold leading-7 text-black-700">
                            Bolg
                        </div>
                    </PageNavigation>

                    {/* Register part */}
                    <div className="w-full max-w-[320px] flex flex-col gap-6">
                        <h2 className="font-Golos font-bold text-2xl leading-7 text-blue-950">
                            Create an account
                        </h2>
                        {inputs &&
                            inputs?.map((item, index) => (
                                <InputBox
                                    key={index}
                                    name={item.name}
                                    type={item.type}
                                    value={registerDetails[item.name]}
                                    placeholder={item.placeholder}
                                    onChange={handleInputChange}
                                    errorMsg={
                                        registerDetails.isPasswordError ||
                                        registerDetails.isEmailError
                                    }
                                />
                            ))}

                        <div className="w-full flex flex-col gap-4">
                            {step !== 0 && registerDetails.isPasswordError && (
                                <Paragraph center color={"text-red-500"}>
                                    {registerDetails.isPasswordError}
                                </Paragraph>
                            )}
                            {step === 0 && registerDetails.isEmailError && (
                                <Paragraph center color={"text-red-500"}>
                                    {registerDetails.isEmailError}
                                </Paragraph>
                            )}
                            {button &&
                                button?.map((btn, index) => {
                                    if (btn === "BACK") {
                                        return (
                                            <Button
                                                key={index}
                                                onClick={() => handleRegister(btn)}
                                                className={
                                                    "w-full px-4 py-2 rounded border text-white bg-black-900 hover:bg-opacity-90 active:bg-opacity-70"
                                                }
                                            >
                                                <Paragraph color={"text-white"} type={"semiheading"}>
                                                    {btn}
                                                </Paragraph>
                                            </Button>
                                        );
                                    } else {
                                        return (
                                            <Button
                                                key={index}
                                                disabled={validButton(btn)}
                                                onClick={() => handleRegister(btn)}
                                                className={`w-full px-4 py-2 rounded text-white bg-black-900 ${validButton(btn)
                                                    ? "bg-opacity-80"
                                                    : "hover:bg-opacity-90 active:bg-opacity-70"
                                                    }`}
                                            >
                                                <Paragraph color={"text-white"} type={"semiheading"}>
                                                    {RegisterLoading ? "Loading..." : btn}
                                                </Paragraph>
                                            </Button>
                                        );
                                    }
                                })}
                        </div>

                        <Breaker />
                        {/* social meadia */}
                        <div className="w-full flex flex-col gap-3">
                            <Button
                                onClick={handleRegeisterGoogle}
                                full
                                type={"outline-email"}
                            >
                                <div className="flex flex-row justify-center items-center gap-3 m-auto">
                                    <FcGoogle size={"20px"} />
                                    <Paragraph type={"master"}>Sign in with Google</Paragraph>
                                </div>
                            </Button>
                            <Button full type={"outline-email"}>
                                <div className="flex flex-row justify-center items-center gap-3 m-auto">
                                    <FaGithub size={"20px"} />
                                    <Paragraph type={"master"}>Sign in with GitHub</Paragraph>
                                </div>
                            </Button>
                        </div>

                        <Paragraph center>
                            Don't have an account.
                            <PageNavigation url={"/login"}>
                                <Paragraph
                                    color={"text-blue-950 border-b-[1px] border-blue-950"}
                                >
                                    Login Here
                                </Paragraph>
                            </PageNavigation>
                        </Paragraph>
                    </div>
                </div>

                <div className='w-full hidden md:flex border bg-black-50'>

                </div>
            </div>
            {isloadingModel && <LoadingModal />}
        </div>
    );
};
