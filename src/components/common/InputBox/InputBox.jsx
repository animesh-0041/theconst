import { Input } from "@headlessui/react"
import { useState } from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


export const InputBox = (props) => {
    const { type, name, value, icon, placeholder = "", onChange, errorMsg } = props;
    const [isView, setIsView] = useState(false);

    switch (type) {
        case "name":
            return (
                <div className="w-full relative">
                    <div className="absolute top-[10px] left-4">
                        <CiUser color={'#1d1d1dF'} size={'20px'} />
                    </div>
                    <Input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full flex h-10 py-2 pl-12 pr-10 text-sm items-center font-Golos self-stretch rounded border-[0.5px] text-black-700 border-black-200 focus:outline-none focus:bg-black-25`}
                    />
                </div>
            )
        case "email":
            return (
                <div className="w-full relative">
                    <div className="absolute top-[10px] left-4">
                        <GoMail color={'#1d1d1dF'} size={'18px'} />
                    </div>
                    <Input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full flex h-10 py-2 pl-12 pr-10 text-sm items-center font-Golos self-stretch rounded text-black-700 border-[0.5px] border-solid ${errorMsg ? "bg-red-100 border-red-500" : "border-black-200 focus:outline-none focus:bg-black-25"}`}
                    />
                </div>
            )
        case "password":
            return (
                <div className="w-full relative">
                    <div className="absolute top-[10px] left-4">
                        <CiLock color={'#1d1d1dF'} size={'20px'} />
                    </div>
                    <div className="w-fit absolute top-[10px] right-3 cursor-pointer">
                        {isView ?
                            <IoIosEyeOff onClick={() => setIsView(!isView)} color={'#1d1d1dF'} size={'20px'} />
                            :
                            <IoIosEye onClick={() => setIsView(!isView)} color={'#1d1d1dF'} size={'20px'} />
                        }
                    </div>
                    <Input
                        type={isView ? "text" : "password"}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full flex h-10 py-2 pl-12 pr-10 text-sm items-center font-Golos self-stretch rounded border-[0.5px] text-black-700 border-solid ${errorMsg ? "bg-red-100 border-red-500" : "border-black-200 focus:outline-none focus:bg-black-25"}`}
                    />
                </div>
            )
        case "text":
            return (
                <div className="w-full relative">
                    {icon && <div className="absolute top-[10px] left-3">{icon}</div>}
                    <Input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full h-10 flex pl-11 pr-2 py-[10px] text-xs items-center font-Golos self-stretch rounded-12 border text-black-700 border-black-50 focus:outline-none focus:bg-black-25 ${name !== 'email' && 'capitalize'}`}
                    />
                </div>
            )
        default:
            return (
                <Input
                    type="text"
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`flex h-10 py-2 px-4 text-sm items-center font-Golos self-stretch rounded-lg border border-solid text-black-700 border-black-300 bg-black-0 focus:outline-none focus:bg-green-50 ${value && "bg-green-50"} ${errorMsg && "bg-red-50 border border-red-400"}`}
                />
            )
    }
}