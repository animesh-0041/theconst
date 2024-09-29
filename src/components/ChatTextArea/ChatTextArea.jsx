import { IoMdAttach } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";

export const ChatTextArea = ({ value, handleSend, handleTypeMessage }) => {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="w-full pb-2 flex flex-row justify-between items-center gap-2">

            <button className="w-11 h-10 rounded-full flex flex-row justify-center items-center cursor-pointer bg-black-700 hover:bg-black-900 active:bg-black-700">
                <GrGallery className="text-black-50 size-4" />
            </button>

            <button className="w-11 h-10 rounded-full flex flex-row justify-center items-center cursor-pointer bg-black-700 hover:bg-black-900 active:bg-black-700">
                <BsEmojiSmile className="text-black-50 size-4" />
            </button>

            <div className="w-full relative">
                <button
                    className="absolute -bottom-[6px] left-[2px] transform -translate-y-1/2 rounded-full px-3 py-1 font-Golos font-normal text-md text-white"
                >
                    <IoMdAttach size={20} className="text-black-75" />
                </button>

                <input
                    type="text"
                    value={value}
                    onKeyPress={(event) => handleKeyPress(event)}
                    onChange={handleTypeMessage}
                    placeholder="Type a message..."
                    className="w-full pl-10 pr-12 py-3 border border-black-200 outline-none rounded-51 font-Golos text-xs text-black-700 bg-white"
                />

                <button
                    onClick={() => handleSend()}
                    className="absolute -bottom-[10px] right-1.5 transform -translate-y-1/2 rounded-full bg-black-700 hover:to-black-900 active:bg-black-700 px-3 py-1 font-Golos font-normal text-md text-white"
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}