"use client"

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Loader from '@/component/Loader';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setLastUpdated(format(new Date(), 'HH:mm:ss'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
     <Loader/>
    );
  }

 

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Contact Messages</h1>
          <p className="mt-2 text-sm text-gray-700">
            All messages received through the contact form
         
          </p>
        </div>
      </div>

 <div className="overflow-x-auto">
            <table className="min-w-full table-auto border bg-green">
           <thead className="bg-green-600">
            <tr>
              <th className="text-left px-4 py-2 text-white border">
                Name
              </th>
              <th  className="text-left px-4 py-2 text-white border">
                Email
              </th>
              <th  className="text-left px-4 py-2 text-white border">
                Message
              </th>
              <th  className="text-left px-4 py-2 text-white border">
                Received
              </th>
              <th  className="text-left px-4 py-2 text-white border">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No messages found
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {message.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <a href={`mailto:${message.email}`} className="text-green-600 hover:text-green-800">
                      {message.email}
                    </a>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                    <span title={message.message}>{message.message}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(new Date(message.updatedAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesPage;