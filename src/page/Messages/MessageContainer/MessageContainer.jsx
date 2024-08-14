import { useEffect, useRef, useState, useCallback } from "react";
import { MessageLayout } from "../MessageLayout/MessageLayout";
import { getFirendHistory } from "../../../service/quiries/UserAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatBar } from "./ChatBar";
import socket from "../../../config/socket";
import { BlogUser } from "../../../components/Helper/Helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../../../components/common/Loading/Loading";

export const MessageContainer = ({ userData }) => {
    const [newMessages, setNewMessages] = useState([]);
    const [message, setMessage] = useState('');
    const typingTimeoutRef = useRef(null);
    const scrollableDivRef = useRef(null);

    const {
        isLoading: friendListLoading,
        data: friendHistoryData,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["getFriendChatHistory", userData?._id],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => {
            return getFirendHistory(`friendId=${userData?._id}&page=${pageParam}&limit=15`);
        },
        enabled: !!userData?._id,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage?.length === 15 ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    const articles = friendHistoryData?.pages?.reduce((acc, page) => {
        return [...page, ...acc]
    }, []);

    const handleTypeMessage = useCallback((e) => {
        setMessage(e.target.value);

        socket.emit("typing", {
            senderId: BlogUser()._id,
            receiverId: userData?._id,
            isTyping: true,
        });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("typing", {
                senderId: BlogUser()._id,
                receiverId: userData?._id,
                isTyping: false,
            });
        }, 1000);
    }, [userData]);

    const handleSend = useCallback(() => {
        if (message.trim()) {
            const newMessage = {
                _id: `${Math.random()}`, // Generate a temporary ID for the new message
                senderId: BlogUser()._id,
                receiverId: userData?._id,
                message,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setNewMessages((prevChats) => [...prevChats, newMessage]);

            socket.emit("send-message", {
                senderId: BlogUser()._id,
                recieverId: userData?._id,
                message,
            });

            socket.emit("typing", {
                senderId: BlogUser()._id,
                receiverId: userData?._id,
                isTyping: false,
            });

            setMessage("");
        }
    }, [message, userData]);

    const joinUser = useCallback(() => {
        const userId = BlogUser()._id;
        if (userId) {
            socket.emit("new-user-joined", userId);
        } else {
            console.error("User ID not found.");
        }
    }, []);

    const scrollToBottom = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollTop + 520;
        }
    }, [friendHistoryData]);

    useEffect(() => {
        joinUser();
        scrollToBottom();

        return () => {
            socket.off("typing");
            socket.off("send-message");
        };
    }, [joinUser]);

    console.log(friendHistoryData, 'chats');

    if (!userData) return null;

    return (
        <MessageLayout
            message={message}
            userData={userData}
            setMessage={setMessage}
            handleSend={handleSend}
            handleTypeMessage={handleTypeMessage}
        >
            <div className="w-full h-full relative">
                {(isFetchingNextPage || friendListLoading) && <div className="w-full absolute top-0 right-0 left-0"><Loading type={'loading-chat'} /></div>}
                <div
                    id="scrollableDiv"
                    ref={scrollableDivRef}
                    style={{ width: '100%', height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
                >
                    <style>
                        {`#scrollableDiv::-webkit-scrollbar {
                            display: none;
                            /* Hide scrollbar for WebKit browsers */
                        }
                        #scrollableDiv {
                            scrollbar-width: none;
                            /* Hide scrollbar for Firefox */
                            -ms-overflow-style: none;
                            /* Hide scrollbar for Internet Explorer and Edge */
                        }`}
                    </style>
                    {articles &&
                        <InfiniteScroll
                            inverse={true}
                            hasMore={true}
                            next={() => fetchNextPage()}
                            dataLength={articles?.length || 0}
                            scrollableTarget="scrollableDiv"
                        >
                            {articles.map((chat, ind) => (
                                <ChatBar
                                    key={ind}
                                    chat={chat}
                                    friendProfile={userData}
                                />
                            ))}
                        </InfiniteScroll>}
                </div>
            </div>
        </MessageLayout>
    );
};
