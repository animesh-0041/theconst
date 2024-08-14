import { useState } from "react";
import { InputBox } from "../../../components/common/InputBox/InputBox"


export const ProfileEditBox = ({ index, item, editDetails, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {!isOpen ?
                <div
                    onClick={() => setIsOpen(true)}
                    className="w-full flex flex-row gap-4 items-center cursor-pointer"
                >
                    {item?.icon}
                    <p className={`font-Golos font-normal ${item.name !== 'email' && "capitalize"} ${editDetails[item.name] ? 'text-black-500 text-xs md:text-sm' : 'text-black-300 text-xs'}`}>
                        {editDetails[item.name] || `add ${item.label}`}
                    </p>
                </div>
                :
                <InputBox
                    key={index}
                    name={item.name}
                    type={'text'}
                    value={editDetails[item.name]}
                    placeholder={item.label}
                    onChange={onChange}
                    icon={item.icon}
                />
            }
        </div>
    )
}