import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { InputBox } from "../../components/common/InputBox/InputBox";
import { BlogUser } from "../../components/Helper/Helper";
import { SwitchBox } from "../../components/SwitchBox/SwitchBox";
import { FaInstagramSquare, FaUserCircle, FaFacebook, FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";



const settingList = [
    {
        name: "name",
        type: 'text',
        catagory: 'text',
        icon: <FaUserCircle className="text-black-75 size-5" />,
    },
    {
        name: "email",
        type: 'text',
        catagory: 'text',
        icon: <BiLogoGmail className="text-black-75 size-5" />,
    },
    {
        name: "social media",
        type: 'social',
        catagory: 'social',
        option: [
            {
                name: "github",
                type: 'text',
                catagory: 'text',
                icon: <FaGithub className="text-black-700 rounded-full size-10" />,
            },
            {
                name: "facebook",
                type: 'text',
                catagory: 'text',
                icon: <FaFacebook className="text-blue-500 rounded-full size-10" />,
            },
            {
                name: "telegram",
                type: 'text',
                catagory: 'text',
                icon: <FaTelegram className="text-blue-400 rounded-full size-10" />,
            },
            {
                name: "instagram",
                type: 'text',
                catagory: 'text',
                icon: <FaInstagramSquare className="text-red-400 rounded-full size-10" />,
            },
        ],
    },
    {
        name: "Display email on profile",
        type: 'switchbox',
        catagory: 'switchbox',
        value: true,
    },
    {
        name: "Display number on profile",
        type: 'switchbox',
        catagory: 'switchbox',
        value: false,
    },
    {
        name: "Display location on profile",
        type: 'switchbox',
        catagory: 'switchbox',
        value: false,
    },
];

export const Settings = () => {
    const [isDark, setIsDark] = useState(false);

    const handleValue = (name) => {
        switch (name) {
            case "name":
                return BlogUser()?.name || '';
            case "email":
                return BlogUser()?.email || '';
            default:
                return '';
        }
    };

    return (
        <Layout>
            <div className="w-full max-w-[700px] py-10 m-auto flex flex-col gap-6">
                {/* Theme Selection */}
                <div className="w-full flex flex-row gap-4">
                    <div
                        className={`w-fit py-10 px-8 flex flex-row justify-center items-center gap-4 rounded cursor-pointer bg-black-50 ${!isDark ? 'outline outline-blue-500 outline-offset-2 outline-2' : ''}`}
                    >
                        <h2 className="font-Golos font-normal text-base text-black-500 capitalize">Light Theme</h2>
                    </div>

                    <div
                        className={`w-fit py-10 px-8 flex flex-row justify-center items-center gap-4 rounded cursor-not-allowed bg-black-700`}
                    >
                        <h2 className="font-Golos font-normal text-base text-black-50 capitalize">Dark Theme</h2>
                    </div>
                </div>

                {/* Settings List */}
                <div className="w-full m-auto flex flex-col gap-6">
                    {settingList && settingList.map((item, index) => {
                        if (item.catagory === 'text') {
                            return (
                                <div key={index} className="w-full max-w-[500px]">
                                    <InputBox
                                        label={item.name}
                                        type={item.type}
                                        icon={item.icon}
                                        value={handleValue(item.name)}
                                    />
                                </div>
                            );
                        } else if (item.catagory === 'switchbox') {
                            return (
                                <div key={index} className="w-full ml-2 flex flex-row items-center gap-3">
                                    <p className="font-Golos font-normal text-sm leading-4 text-black-500">{item.name}</p>
                                    <SwitchBox
                                        enabled={item.value}
                                    />
                                </div>
                            );
                        } else if (item.catagory === 'social') {
                            return (
                                <div key={index} className="w-full ml-4 flex flex-row gap-4">
                                    {item.option.map((opt, ind) => (
                                        <div key={ind} className="w-fit rounded-full cursor-pointer">
                                            {opt.icon}
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </Layout>
    );
};
