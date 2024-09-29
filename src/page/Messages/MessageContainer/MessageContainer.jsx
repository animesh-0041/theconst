import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MessageLayout } from "../MessageLayout/MessageLayout";
import { getFirendHistory } from "../../../service/quiries/UserAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatBar } from "./ChatBar";
import socket from "../../../config/socket";
import { BlogUser } from "../../../components/Helper/Helper";
import { Loading } from "../../../components/common/Loading/Loading";
import { v4 as uuidv4 } from 'uuid';
import { FormatDate } from "../../../components/common/FormatDate/FormatDate";

export const MessageContainer = ({ userData }) => {
    const [selectedChat, setSelectedChat] = useState({});
    const [newMessages, setNewMessages] = useState([]);
    const [lastHeight, setLastHeight] = useState(null);
    const [message, setMessage] = useState('');
    const typingTimeoutRef = useRef(null);
    const chatContainerRef = useRef(null);
    var lastDate = useRef(null);


    const {
        isLoading: friendListLoading,
        data: friendHistoryData,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["getFriendChatHistory", userData?._id],
        initialPageParam: 1,
        enabled: !!userData?._id,
        queryFn: ({ pageParam = 1 }) => {
            return getFirendHistory({
                id: userData?._id,
                page: pageParam,
                limit: 15,
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage?.length === 15 ? allPages?.length + 1 : undefined;
            return nextPage;
        },
    });

    const articles = useMemo(() => {
        return friendHistoryData?.pages?.reduce((acc, page) => {
            return [...page, ...acc];
        }, []);
    }, [friendHistoryData?.pages]);


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
            const msg_Id = uuidv4();
            const message_data = {
                localMsgId: msg_Id,
                senderId: BlogUser()._id,
                receiverId: userData?._id,
                message: message?.trim() || message,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setNewMessages((prevChats) => [...prevChats, message_data]);

            socket.emit("send-message", {
                localMsgId: msg_Id,
                senderId: BlogUser()?._id,
                recieverId: userData?._id,
                message: message.trim() || message,
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
        const userId = BlogUser()?._id;
        if (userId) {
            socket.emit("new-user-joined", userId);
        } else {
            console.error("User ID not found.");
        }
    }, []);

    useEffect(() => {
        joinUser();

        socket.on("receive-message", (data) => {
            if (data.senderId === userData?._id) {
                setNewMessages((prevChats) => [...prevChats, data]);
            }
        })

        return () => {
            socket.off("typing");
            socket.off("send-message");
            socket.off("receive-message");
        };
    }, [joinUser, userData?._id]);


    // Scroll handling using 
    const handleAddTop = () => {
        if (chatContainerRef.current) {
            fetchNextPage();
        }
    };

    const handleAddBottom = () => {
        if (chatContainerRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 200) {

                console.log(scrollHeight, 'scrollHeight');
                // chatContainerRef.current.scrollTop = scrollHeight;
                chatContainerRef.current.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    };

    const onScroll = (event) => {
        const chat = event?.target;

        if (chat?.scrollTop === 0) {
            const { scrollHeight } = chatContainerRef.current;
            setLastHeight(scrollHeight);
            handleAddTop();
        }
    };

    useEffect(() => {
        if (!chatContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            chatContainerRef.current.scrollTop = scrollHeight;
            return;
        }

        if (!lastHeight) {
            chatContainerRef.current.scrollTop = scrollHeight;
        } else {
            if (scrollTop === 0) {
                const diff = scrollHeight - lastHeight;
                chatContainerRef.current.scrollTop = diff;
            }
        }
    }, [articles, lastHeight]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
            });
        }

        setSelectedChat({});
        setNewMessages([])
    }, [userData])

    useEffect(() => {
        if (newMessages.length > 0) {
            handleAddBottom();
        }
    }, [newMessages]);

    const isIdPresent = (id, data) => {
        return data?.some(item => item?._id === id);
    }

    useEffect(() => {

        if (articles && articles?.length > 0) {
            const lastArticle = articles?.[articles?.length - 1]?._id;

            // console.log('articles', 'trigger', isIdPresent(lastArticle, newMessages));
            if (isIdPresent(lastArticle, newMessages)) {
                console.log('articles', 'enter', isIdPresent(lastArticle, newMessages));
                setNewMessages([])
            }
        }
    }, [userData, friendHistoryData])

    if (!userData) return null;

    console.log(articles, newMessages, 'tara');

    return (
        <MessageLayout
            message={message}
            userData={userData}
            setMessage={setMessage}
            handleSend={handleSend}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            handleTypeMessage={handleTypeMessage}
        >
            <div className="w-full h-full relative">
                {(isFetchingNextPage || friendListLoading) && (
                    <div className="w-full absolute top-0 right-0 left-0">
                        <Loading type="loading-chat" />
                    </div>
                )}

                <div
                    onScroll={onScroll}
                    ref={chatContainerRef}
                    id="hide_scrollbar"
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '0 10px',
                        margin: '0 10px',
                        overflow: 'scroll',
                        scrollBehavior: 'unset',
                    }}
                >
                    {articles && articles?.map((chat, i) => {
                        if (i === 0) {
                            lastDate = FormatDate({ dateString: chat?.createdAt });
                        }

                        const updateDate = () => {
                            lastDate = FormatDate({ dateString: chat?.createdAt });
                        }

                        return (
                            <div key={i}>
                                {(lastDate !== FormatDate({ dateString: chat?.createdAt }) || i === 0) &&
                                    <p className="font-Golos text-center text-xs font-normal text-black-300">{FormatDate({ dateString: chat?.createdAt })}</p>
                                }
                                {lastDate !== FormatDate({ dateString: chat?.createdAt }) && updateDate()}

                                <ChatBar
                                    chat={chat}
                                    friendProfile={userData}
                                    selectedChat={selectedChat}
                                    setSelectedChat={setSelectedChat}
                                />
                            </div>
                        )
                    })}

                    {newMessages && newMessages?.map((chat, i) => (
                        <ChatBar
                            key={i}
                            chat={chat}
                            friendProfile={userData}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                    ))}
                </div>
            </div>
        </MessageLayout>
    );
};
