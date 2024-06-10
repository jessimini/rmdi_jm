// src/components/ChatbotIcon.js
import React from 'react';

const ChatbotIcon = () => {
  return (
    <div className="fixed bottom-4 right-4">
        <a href="https://chat.openai.com/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4M20 6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2h6V6zM10 6a2 2 0 00-2-2H6a2 2 0 00-2 2v2h6V6z"/>
            <path fill="#000" d="M15 14a1 1 0 100-2 1 1 0 000 2zM9 14a1 1 0 100-2 1 1 0 000 2z"/>
        </svg>
        </a>
    </div>
  );
};

export default ChatbotIcon;
