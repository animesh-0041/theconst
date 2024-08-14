import { useState } from "react";
import { Paragraph } from "../Paragraph/Paragraph";
import { MdCancel } from "react-icons/md";


export const Button = (props) => {
    const { children, type, disabled = false, className, onClick, color, full = false } = props;
    const [isHovered, setIsHovered] = useState(false);

    switch (type) {
        case "secondary":
            return (
                <button
                    className={`${full ? "w-full" : "w-fit"} px-3 py-1 bg-[#F7FAFC] rounded-full border border-[rgba(0,0,0,.04)] ${!disabled && "hover:bg-black-200 active:bg-black-25"}`}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <p className={`${color} font-Golos text-sm font-normal text-[#0C1016]`}>{children}</p>
                </button>
            )
        case "link":
            return (
                <button
                    className={`${full ? "w-full" : "w-fit"}`}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Paragraph color={color}>{children}</Paragraph>
                </button>
            )
        case "outline":
            return (
                <button
                    className={`${full ? "w-full" : "w-fit"} px-3 py-1 border border-black-700 rounded-full ${!disabled && "hover:bg-black-50 active:bg-green-50"}`}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Paragraph color={color}>{children}</Paragraph>
                </button>
            )
        case "outline-email":
            return (
                <button
                    className={`${full ? "w-full" : "w-fit"} px-3 py-2 border border-black-700 rounded ${!disabled && "hover:bg-black-50 active:bg-green-50"}`}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Paragraph color={color}>{children}</Paragraph>
                </button>
            )
        case "primary":
            return (
                <button
                    className={`${className} px-3 py-2 rounded-full ${!disabled && "hover:bg-black-50 active:bg-green-50"}`}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Paragraph color={color}>{children}</Paragraph>
                </button>
            )
        case "skill-edit":
            return (
                <button
                    className={className}
                    onClick={onClick}
                    disabled={disabled}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {children}
                    {isHovered && <div><MdCancel size={15} className="text-white" /></div>}
                </button>
            )
        default:
            return (
                <button
                    className={className}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {children}
                </button>
            )
    }

}