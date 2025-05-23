import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowLeft, Phone, Video, MoreVertical, User } from "lucide-react";
import useUserStore from "../zustand/userStore";
import useComponentStore from "../zustand/componentStore";
import useBookStore from "../zustand/book.store";
import useAuthStore from "../zustand/authStore";

const Messaging = () => {

    const messagesEndRef = useRef(null);
    const [messageText, setMessageText] = useState("");
    const { onlineUsers, authUser } = useAuthStore();

    const { disMessageModal, setDisMessageModal } = useComponentStore();
    const { setBookToRequest } = useBookStore();
    const { recentChats, sendMessage, getUsersSidebarChats, userToChatWith, setUserToChatWith, userChats, listenToNewMessages } = useUserStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    };

    useEffect(() => {
        scrollToBottom();
    }, [userToChatWith?.messages]);

    useEffect(() => {
        getUsersSidebarChats();
    }, [getUsersSidebarChats]);

    useEffect(() => {
        if (userToChatWith) {
            listenToNewMessages();
        }
    }, [userToChatWith]);

    const openModal = () => {
        setBookToRequest(null)
        setDisMessageModal(true);
    }
    const closeModal = () => {
        setBookToRequest(null);
        setDisMessageModal(false);
    };

    const selectChat = (chat) => {
        setUserToChatWith(chat);
    };

    const goBackToChats = () => setUserToChatWith(null);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage(messageText);
        }
    };

    return (
        <>
            {/* Floating Chat Icon */}
            <div
                className="fixed bottom-6 right-6 z-50 cursor-pointer"
                onClick={openModal}
            >
                <div className="bg-indigo-600 hover:bg-indigo-700 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110">
                    <MessageCircle className="text-white w-6 h-6" />
                </div>
            </div>

            {/* Modal */}
            {disMessageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div onClick={closeModal} className="absolute inset-0 bg-black bg-opacity-80" />

                    {/* Modal Content */}
                    <div className="animate-themeAnimationLg relative bg-white rounded-lg shadow-xl w-full max-w-md h-96 mx-4 flex flex-col overflow-hidden">

                        {!userToChatWith ? (
                            // Chat List View
                            <>

                                {/* Header */}
                                <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Chats</h2>
                                    <X
                                        className="w-6 h-6 cursor-pointer hover:bg-indigo-700 rounded p-1"
                                        onClick={closeModal}
                                    />
                                </div>

                                {/* Chat List */}
                                <div className="flex-1 overflow-y-auto">
                                    {recentChats.map((chat) => (
                                        <div
                                            key={chat?._id}
                                            className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => selectChat(chat)}
                                        >
                                            {/* Profile Picture */}
                                            <div className="relative mr-3">
                                                {chat?.profilePic ? (
                                                    <img
                                                        src={chat?.profilePic}
                                                        alt={`${chat?.firstName} ${chat?.lastName}`}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full p-1 flex items-center justify-center">
                                                        <User className="w-6 h-6" />
                                                    </div>
                                                )}
                                                {onlineUsers.includes(chat._id) && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                                )}
                                            </div>

                                            {/* Chat Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium text-gray-900 truncate">
                                                        {chat?.firstName} {chat?.lastName}
                                                    </h3>
                                                    <span className="text-xs text-gray-500">{chat?.lastMessageTime}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600 truncate">{chat?.lastMessage}</p>
                                                    {chat?.unreadCount > 0 && (
                                                        <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                                                            {chat?.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </>
                        ) : (
                            // Individual Chat View
                            <>
                                {/* Chat Header */}
                                <div className="bg-indigo-600 text-white p-3 flex items-center">
                                    <ArrowLeft
                                        className="w-6 h-6 cursor-pointer mr-3"
                                        onClick={goBackToChats}
                                    />
                                    <div className="relative mr-3">
                                        <img
                                            src={userToChatWith.profilePic}
                                            alt={`${userToChatWith.firstName} ${userToChatWith.lastName}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        {onlineUsers.includes(userToChatWith._id) && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">
                                            {userToChatWith.firstName} {userToChatWith.lastName}
                                        </h3>
                                        <p className="text-xs opacity-80">
                                            {onlineUsers.includes(userToChatWith._id) ? "Online" : "Last seen recently"}
                                        </p>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                                    {userChats.map((message) => (
                                        <div
                                            key={message._id}
                                            className={`mb-3 flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.senderId === authUser._id
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-800 border"
                                                    }`}
                                            >
                                                <p className="text-sm">{message.chatMessage}</p>
                                                <p className={`text-xs mt-1 ${message.senderId === authUser._id ? "text-indigo-200" : "text-gray-500"
                                                    }`}>
                                                    {message.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="p-3 bg-white border-t flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => sendMessage(messageText)}
                                        disabled={!messageText.trim()}
                                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>

                            </>
                        )}
                    </div>

                </div>
            )}
        </>
    );
};

export default Messaging;