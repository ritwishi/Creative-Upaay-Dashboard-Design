import React, { useState } from 'react';
import { Lightbulb, MessageSquare, Send, X } from 'lucide-react';
import Modal from '../Common/Modal';

const ThoughtsTimer = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message.trim(),
        timestamp: new Date(),
        user: 'You'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setShowMessageModal(false);
      
      // Show success feedback
      setTimeout(() => {
        alert('Message shared with your team!');
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="bg-gray-100 rounded-xl p-6 text-center max-w-xs mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Thoughts Timer
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </p>

        {/* Message Count */}
        {messages.length > 0 && (
          <div className="flex items-center justify-center space-x-1 mb-4 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{messages.length} message{messages.length !== 1 ? 's' : ''} shared</span>
          </div>
        )}

        {/* Button */}
        <button 
          onClick={() => setShowMessageModal(true)}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Write a message</span>
        </button>

        {/* Recent Messages */}
        {messages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Recent Thoughts
            </h4>
            <div className="space-y-2">
              {messages.slice(-2).map((msg) => (
                <div key={msg.id} className="text-left p-2 bg-white rounded text-xs">
                  <p className="text-gray-700 line-clamp-2">{msg.text}</p>
                  <p className="text-gray-400 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Share Your Thoughts"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts, ideas, or feedback with your team..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="4"
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1">
              {message.length}/500 characters
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowMessageModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ThoughtsTimer;