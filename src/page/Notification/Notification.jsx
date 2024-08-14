import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getnotification, markNotificationAsRead } from "../../service/quiries/UserAuth";
import { DashLayout } from "../../components/DashLayout/DashLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../components/common/FormatDate/FormatDate";



export const Notification = () => {
    const [activeTab, setActiveTab] = useState("unread");
    const queryClient = useQueryClient();
    const navigation = useNavigate();

    const {
        isLoading: notificationLoading,
        data: notificationData
    } = useQuery({
        queryKey: ["getnotification", activeTab],
        queryFn: () => getnotification(activeTab === "read"),
        retry: 2,
    });

    const {
        mutateAsync: readNotification,
    } = useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries(["getnotification", activeTab]);
        },
        onError: (error) => {
            console.log(error)
        },
    });

    const handleMarkReadNotification = async ({ url, id, isRead }) => {

        try {
            if(!isRead){
                await readNotification(id)
            }
            navigation(url);
        } catch (error) {
            console.log(error)
        }
    };

    const handleTabChange = (tab) => {
        localStorage.setItem('notificationTab', tab);
        setActiveTab(tab);
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('notificationTab');
        storedValue ? setActiveTab(storedValue) : setActiveTab('unread');
    }, [activeTab])

    console.log(notificationData, 'notificationData')

    return (
        <DashLayout>
            <div className="w-full flex flex-col gap-8">
                <div className='w-fit flex flex-row justify-between gap-3 items-center'>
                    <button
                        onClick={() => handleTabChange("unread")}
                        className={`w-fit px-5 py-[6px] font-Golos text-xs md:text-sm font-normal whitespace-nowrap capitalize ${activeTab !== "unread" ? 'text-black-700 border-0' : 'text-black-900 border-b border-black-500'}`}
                    >
                        unread
                    </button>
                    <button
                        onClick={() => handleTabChange("read")}
                        className={`w-fit px-5 py-[6px] font-Golos text-xs md:text-sm font-normal whitespace-nowrap capitalize ${activeTab !== "read" ? 'text-black-700 border-0' : 'text-black-900 border-b border-black-500'}`}
                    >
                        readed
                    </button>
                </div>


                {notificationData &&
                    <div className="w-full pr-4 flex flex-col gap-2">
                        {notificationData?.map((notification) => (
                            <div
                                key={notification?._id}
                                className={`w-full border-b px-6 py-4 flex items-start cursor-pointer hover:bg-black-25 active:bg-black-50 transition-all duration-75 ease-in`}
                                onClick={() => handleMarkReadNotification({
                                    url: notification?.url,
                                    id: notification?._id,
                                    isRead: notification?.isRead
                                })}
                            >
                                <img
                                    src={notification.creator?.photoURL}
                                    alt={notification.creator?.name}
                                    className="w-8 h-8 rounded-full mr-4"
                                />
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <h2 className="font-Golos text-sm font-normal text-black-700">{notification?.title}</h2>
                                        <span className="font-Golos text-xs font-normal text-gray-500">
                                            {formatDateTime(notification?.createdAt) || '---'}
                                        </span>
                                    </div>
                                    <p className="font-Golos text-xs font-normal text-gray-500">{notification?.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </DashLayout>
    );
};
