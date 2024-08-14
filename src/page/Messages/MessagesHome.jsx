import { MessageContainer } from './MessageContainer/MessageContainer';
import { MessageSidebar } from "./MessageSidebar/MessageSidebar";
import { Layout } from '../../components/layout/Layout';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getfirendList } from '../../service/quiries/UserAuth';

// const userlist = [
//     { name: 'sourav samanta', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'raman raju', image: 'https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'khusi', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'sakhi', image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'sham', image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'jitu', image: 'https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },
//     { name: 'tara', image: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600' },

// ]

export const MessagesHome = () => {
    const [isActive, setIsActive] = useState(1)


    const { isLoading: firendListLoading, data: firendListData } = useQuery({
        queryKey: ["getfirendList"],
        queryFn: getfirendList,
    });

    return (
        <div className='w-full h-screen bg-black-50'>
            <Layout>
                {firendListData &&
                    <div className="w-full h-content flex flex-row gap-4 bg-black-50">
                        <div className="w-[400px] h-full">
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
            </Layout>
        </div>
    )
}