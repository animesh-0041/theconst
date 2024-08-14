import { EditCategoryOptionHover } from "../../components/Helper/CreatePostData";
import { Transition } from "@headlessui/react";

export const HoverOption = ({ index, changeCategory, type, isOpen, setIsOpen }) => {

    return (
        <>
            <button
                onClick={() => { setIsOpen(!isOpen) }}
                className={`w-[40px] h-[40px] border flex flex-row justify-center items-center absolute ${type ? "top-[5px]" : "top-[-12px]"} left-[35px] rounded-full z-50 hover:bg-black-50 active:bg-black-25 cursor-pointer`}
                id="innerBox"
            >
                <h1 className="w-fit rounded-full flex justify-center items-end text-[50px] mb-3 text-black-300">+</h1>
            </button>

            <Transition show={isOpen}>
                <div
                    className="absolute top-[-7px] z-50 rounded-12 border transition duration-300 ease-in data-[closed]:opacity-0 flex flex-row gap-4 bg-green-50 cursor-pointer bg-opacity-85"
                >
                    {EditCategoryOptionHover && EditCategoryOptionHover?.map((item, ind) => (
                        <div
                            key={ind}
                            onClick={() => { changeCategory(index, item.type); setIsOpen(false) }}
                            className="w-[45px] h-[45px] flex justify-center items-center cursor-pointer-black-300 hover-black-900"
                        >
                            {item.logo && item.logo}
                        </div>
                    ))}
                </div>
            </Transition>
        </>
    )
}