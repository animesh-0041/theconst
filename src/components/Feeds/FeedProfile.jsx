import { GoKebabHorizontal } from "react-icons/go"
import { Paragraph } from "../common/Paragraph/Paragraph"
import { PopupDropDown } from "../common/PopupDropDown/PopupDropDown"
import { FormatDate } from "../common/FormatDate/FormatDate"
import { validMyprofile } from "../Helper/Helper"
import { useErrorHandler } from "../Helper/StatusManager"
import toast, { Toaster } from 'react-hot-toast';
import { deletebookMarkBlog } from "../../service/quiries/UserAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const FeedProfile = (props) => {
    const { icon, name, username, date, blogUrl, queryType, followers, bookmark } = props;
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();

    const {
        mutateAsync: deletebookmark,
    } = useMutation({
        mutationFn: deletebookMarkBlog,
        onSuccess: (data) => {
            toast(data?.message, { style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '14px' } });
            queryClient.invalidateQueries({ queryKey: ["getbookmark"] });
        },
        onError: (error) => {
            handleError(error);
            // console.log(error);
        },
    });

    const validMenuType = () => {
        if (validMyprofile(username)) {
            return 'profileMenu'
        } else {
            return "feedMenu"
        }
    }

    const handleRemoveBookmark = async (event) => {
        event.stopPropagation();
        try {
            await deletebookmark(blogUrl);
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center md:items-start">
            <div className="w-fit flex flex-row items-center gap-3">
                <div>
                    <PopupDropDown
                        icon={icon}
                        name={name}
                        username={username}
                        type={'UserProfile'}
                        followers={followers}
                    >
                        {icon ?
                            <img
                                src={icon || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                className="w-8 h-8 rounded-full flex flex-row justify-center items-center"
                            />
                            :
                            <div className="w-8 h-8 rounded-full flex flex-row justify-center items-center bg-green-50 text-base font-Golos text-semibold text-black-500">
                                {name[0] || '@'}
                            </div>
                        }
                    </PopupDropDown>
                </div>
                <div className="w-fit h-fit">
                    <Paragraph className="font-Golos text-xs font-bold text-black-700 capitalize">{name || 'Author'} • {date && FormatDate({ dateString: date })}</Paragraph>
                </div>
            </div>

            {bookmark ?
                <button
                    onClick={(event)=> handleRemoveBookmark(event)}
                    className="w-fit h-fit px-2 py-1 rounded-full font-Golos text-xs font-normal capitalize text-red-400 bg-red-100 hover:bg-red-200 active:bg-red-100"
                >
                    remove
                </button>
                :
                <PopupDropDown queryType={queryType} type={validMenuType()} blogUrl={blogUrl}>
                    <div className="p-2 rounded-full hover:bg-black-25">
                        <GoKebabHorizontal size={'15px'} className="text-black-75" />
                    </div>
                </PopupDropDown>
            }
            <Toaster />
        </div>
    )

}