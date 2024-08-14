
import { GoKebabHorizontal } from "react-icons/go"



export const FriendProfile = ({ lastmessage, name, image, active, isActive, setIsActive }) => {

    return (
        <div
            onClick={() => setIsActive(active)}
            className={`w-full py-3 px-3 flex flex-row gap-4 cursor-pointer border-b bg-white hover:bg-black-25 ${isActive === active && 'border-l-[3px] border-l-black-700'}`}
        >
            <div className="w-full flex flex-row items-center gap-4">
                <div className="w-10 h-8 flex flex-col gap-1">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={image || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                    />
                </div>
                <div className="w-full flex flex-col ga-0 justify-between">
                    <h2 className="font-Golos font-normal text-xs capitalize text-black-500">{name}</h2>
                    <p className="font-Golos font-normal text-[10px] leading-4 text-black-300">{lastmessage}</p>
                </div>
            </div>
            <GoKebabHorizontal size={'14px'} className="text-black-75" />
        </div>
    )
}