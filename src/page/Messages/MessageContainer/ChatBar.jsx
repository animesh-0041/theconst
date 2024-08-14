import { ChatTimeFormater } from "../../../components/common/FormatDate/FormatDate";
import { BlogUser } from "../../../components/Helper/Helper";



export const ChatBar = ({ firendprofile, chat }) => {
    const authorId = BlogUser()?._id || '';

    const chatAuthor = (id) => {
        return id === authorId;
    }


    return (
        <div className={`w-full flex ${chatAuthor(chat?.senderId) ? 'justify-end' : 'justify-start'}`}>
            {chatAuthor(chat?.senderId)
                ?
                <div className="w-full max-w-[300px] my-[5px] relative flex flex-row justify-end gap-2">
                    <p className="w-fit mt-1 font-Golos text-[9px] font-normal whitespace-nowrap text-black-300">{ChatTimeFormater(chat?.createdAt)}</p>
                    <div className="w-fit px-4 py-2 rounded-12 rounded-tr-none bg-[#3730a3] text-white">
                        <p className="font-Golos text-xs font-normal leading-4">{chat?.message}</p>
                    </div>
                </div>
                :
                <div className="w-full max-w-[300px] my-[5px] relative flex flex-row gap-2">
                    <img
                        className="block w-5 h-5 rounded-full"
                        src={firendprofile?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                    />
                    <div className="w-fit px-3 py-2 font-Golos text-xs font-normal leading-4 rounded-12 rounded-tl-none bg-white text-black-500">
                        {chat?.message}
                    </div>
                    <div className="w-fit flex flex-col justify-end">
                        <p className="w-fit font-Golos text-[9px] font-normal whitespace-nowrap text-black-300">{ChatTimeFormater(chat?.createdAt)}</p>
                    </div>
                </div>
            }
        </div>
    )
}