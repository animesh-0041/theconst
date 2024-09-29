import { ChatTimeFormater } from "../../../components/common/FormatDate/FormatDate";
import { BlogUser } from "../../../components/Helper/Helper";
import { GoKebabHorizontal } from "react-icons/go";
import { LiaShareSolid } from "react-icons/lia";
import { PopupDropDown } from "../../../components/common/PopupDropDown/PopupDropDown";
import { CheckBoxTogggel } from "../../../components/CheckBoxTogggel/CheckBoxTogggel";


export const ChatBar = ({ friendProfile, chat, selectedChat, setSelectedChat }) => {
    const isSelected = selectedChat?.[chat?._id] !== undefined;
    const selectedType = Object.keys(selectedChat)?.length;
    const authorId = BlogUser()?._id || '';

    const chatAuthor = (id) => {
        return id === authorId;
    }

    const handleSelectEvent = (event) => {
        event.preventDefault();
        const refference = { ...selectedChat };

        // setIsShowMenu(chat?._id);

        if (refference?.[chat?._id] === undefined) {
            refference[chat?._id] = 'selected';
        } else {
            delete refference?.[chat?._id];
        }

        setSelectedChat(refference);
    };

    const chatMenu = (position) => {
        return (
            <div className={`flex flex-row items-center gap-2 absolute -top-9 ${position} bg-black-700 text-black-100 text-sm font-light rounded px-2 py-1`}>
                <>😄 😁 😝 😅 </>
                |
                <LiaShareSolid className="size-4 text-black-50 rotate-180" />
                <PopupDropDown type={'bookMenu'}>
                    <GoKebabHorizontal size={'14px'} className="text-black-50" />
                </PopupDropDown>
            </div>
        )
    }

    return (
        <div
            onContextMenu={!selectedType ? handleSelectEvent : null}
            onClick={(e) => { selectedType ? handleSelectEvent(e) : null }}
            className={`w-full flex justify-between items-center ${isSelected ? 'bg-blue-50' : ''} ${selectedType && "cursor-pointer"}`}
        >
            {chatAuthor(chat?.senderId) && <span>{isSelected && <CheckBoxTogggel enabled={true} />}</span>}

            {chatAuthor(chat?.senderId)
                ?
                <div
                    className="w-full max-w-[300px] my-[5px] relative flex flex-row justify-end gap-2"
                >
                    <p className="w-fit mt-1 font-Golos text-[9px] font-normal whitespace-nowrap text-black-300">{ChatTimeFormater(chat?.createdAt)}</p>

                    <PopupDropDown isDisable={!!selectedType} onClick={[handleSelectEvent]} type={'chatMenu'} position="left end">
                        <div className="w-fit relative px-4 py-2 rounded-12 rounded-tr-none bg-[#2c68d9c4] text-white">
                            <p className="font-Golos text-start text-xs font-normal leading-4">
                                {/* {isShowMenu === chat?._id && chatMenu("-left-[130px]")} */}
                                {chat?.message}
                            </p>
                        </div>
                    </PopupDropDown>
                </div>
                :
                <div
                    className="w-full max-w-[300px] my-[5px] relative flex flex-row gap-2"
                >
                    <img
                        className="block w-5 h-5 rounded-full"
                        src={friendProfile?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                    />

                    <PopupDropDown isDisable={!!selectedType} onClick={[handleSelectEvent]} type={'chatMenu'} position="right end">
                        <div className="w-fit text-start relative px-3 py-2 font-Golos text-xs font-normal leading-4 rounded-12 rounded-tl-none bg-black-50 text-black-500 shadow-md">
                            {/* {isShowMenu === chat?._id && chatMenu("-right-[130px]")} */}
                            {chat?.message}
                        </div>
                    </PopupDropDown>

                    <div className="w-fit flex flex-col justify-end">
                        <p className="w-fit font-Golos text-[9px] font-normal whitespace-nowrap text-black-300">{ChatTimeFormater(chat?.createdAt)}</p>
                    </div>
                </div>
            }
            {!chatAuthor(chat?.senderId) && <span>{isSelected && <CheckBoxTogggel enabled={true} />}</span>}
        </div >
    )
}