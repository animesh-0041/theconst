import { MessageContainer } from './MessageContainer/MessageContainer';
import { MessageSidebar } from "./MessageSidebar/MessageSidebar";
import { Layout } from '../../components/layout/Layout';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getfirendList } from '../../service/quiries/UserAuth';

export const MessagesHome = () => {
    const [isActive, setIsActive] = useState(1)


    const { data: firendListData } = useQuery({
        queryKey: ["getfirendList"],
        queryFn: getfirendList,
    });

    return (
        <div className='w-full h-screen'>
            {/* <Layout> */}
                {firendListData &&
                    <div className="w-full h-full flex flex-row gap-4">
                        <div className="w-[400px] h-full shadow-lg">
                            <MessageSidebar
                                isActive={isActive}
                                firendList={firendListData}
                                setIsActive={setIsActive}
                            />
                        </div>
                        <div className="w-full h-full">
                            <MessageContainer
                                userData={firendListData[isActive]}
                            />
                        </div>
                    </div>
                }
            {/* </Layout> */}
        </div>
    )
}