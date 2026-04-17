"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiUser, FiBriefcase, FiPackage, FiClock, FiX, FiCheck, FiMessageSquare, FiSearch, FiFilter } from 'react-icons/fi';

interface Message {
  id: string;
  type: 'contact' | 'demo';
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  position?: string;
  product?: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'responded';
}

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'contact' | 'demo'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'responded'>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/admin/messages');

        if (!response.ok) {
          const errorText = await response.json(); 
          throw new Error(errorText.error || 'Failed to fetch messages');
        }

        const { messages } = await response.json();
        setMessages(messages);
      } catch (error) {
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router, supabase.auth]);

  // Mark message as read
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/read`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, status: 'read' } : msg
        ));
        
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: 'read' });
        }
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  // Mark message as responded
  const markAsResponded = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/responded`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, status: 'responded' } : msg
        ));
        
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: 'responded' });
        }
      }
    } catch (err) {
      console.error('Error marking as responded:', err);
    }
  };

  // Open message modal
  const openMessageModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    
    if (message.status === 'new') {
      markAsRead(message.id);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(message => {
    if (filterType !== 'all' && message.type !== filterType) return false;
    if (filterStatus !== 'all' && (message.status || 'new') !== filterStatus) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (message.name || '').toLowerCase().includes(searchLower) ||
      (message.email || '').toLowerCase().includes(searchLower) ||
      (message.phone || '').toLowerCase().includes(searchLower) ||
      (message.organization || '').toLowerCase().includes(searchLower) ||
      (message.message || '').toLowerCase().includes(searchLower) ||
      (message.product || '').toLowerCase().includes(searchLower)
    );
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Type colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-purple-100 text-purple-800';
      case 'contact': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Messages Dashboard</h1>
            <p className="text-xs md:text-sm text-gray-500">Manage all incoming messages</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium flex items-center">
              <FiMail className="mr-1" /> {messages.length}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs md:text-sm font-medium flex items-center">
              <FiMessageSquare className="mr-1" /> {messages.filter(m => m.type === 'demo').length}
            </span>
          </div>
        </div>

        {/* Mobile Filters Button */}
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="md:hidden w-full flex items-center justify-center py-2 px-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4"
        >
          <FiFilter className="mr-2" />
          <span>Filters</span>
        </button>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileFiltersOpen ? 1 : 0,
            height: isMobileFiltersOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.2 }}
          className={`md:block ${isMobileFiltersOpen ? 'mb-4' : ''}`}
        >
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Type Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                >
                  <option value="all">All Types</option>
                  <option value="contact">Contact</option>
                  <option value="demo">Demo</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterStatus('all');
                  }}
                  className="w-full py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg mb-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Messages List */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                    className={`p-3 ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                    onClick={() => openMessageModal(message)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(message.type)} mb-1`}>
                          {message.type === 'demo' ? 'Demo' : 'Contact'}
                        </span>
                        <h3 className="text-sm font-medium text-gray-900">{message.name}</h3>
                        <p className="text-xs text-gray-600 truncate">{message.email}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status || 'new')}`}>
                        {message.status ? (message.status.charAt(0).toUpperCase() + message.status.slice(1)) : 'New'}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <FiClock className="mr-1" size={12} />
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                    
                    {message.product && (
                      <div className="mt-1 flex items-center text-xs text-gray-700">
                        <FiPackage className="mr-1" size={12} />
                        <span className="truncate">{message.product}</span>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <div className="text-gray-500 text-sm">No messages found</div>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <motion.tr
                        key={message.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                        className={message.status === 'new' ? 'bg-blue-50' : ''}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(message.type)}`}>
                            {message.type === 'demo' ? 'Demo' : 'Contact'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{message.name}</div>
                          {message.organization && (
                            <div className="text-xs text-gray-500">{message.organization}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{message.email}</div>
                          {message.phone && (
                            <div className="text-xs text-gray-500">{message.phone}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {message.product || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status || 'new')}`}>
                            {message.status ? (message.status.charAt(0).toUpperCase() + message.status.slice(1)) : 'New'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(message.created_at)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openMessageModal(message)}
                            className="text-blue-600 hover:text-blue-900 mr-2"
                          >
                            View
                          </button>
                          {message.status !== 'responded' && (
                            <button
                              onClick={() => markAsResponded(message.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Responded
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-4 text-center">
                        <div className="text-gray-500 text-sm">No messages found matching your criteria</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Message Detail Modal */}
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 transition-opacity" 
                onClick={() => setIsModalOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">
                          {selectedMessage.type === 'demo' ? 'Demo Request' : 'Contact Message'}
                        </h3>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <FiX />
                        </button>
                      </div>
                      
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500 flex items-center">
                              <FiUser className="mr-2" /> From
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">
                              {selectedMessage.name} ({selectedMessage.email})
                            </p>
                            {selectedMessage.phone && (
                              <p className="mt-1 text-sm text-gray-900 flex items-center">
                                <FiPhone className="mr-2" /> {selectedMessage.phone}
                              </p>
                            )}
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500 flex items-center">
                              <FiClock className="mr-2" /> Received
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">
                              {formatDate(selectedMessage.created_at)}
                            </p>
                            <div className="mt-1">
                              <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedMessage.status || 'new')}`}>
                                Status: {selectedMessage.status ? (selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)) : 'New'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {selectedMessage.organization && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500 flex items-center">
                              <FiBriefcase className="mr-2" /> Organization
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">{selectedMessage.organization}</p>
                            {selectedMessage.position && (
                              <p className="mt-1 text-sm text-gray-900">Position: {selectedMessage.position}</p>
                            )}
                          </div>
                        )}
                        
                        {selectedMessage.product && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500 flex items-center">
                              <FiPackage className="mr-2" /> Product
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">{selectedMessage.product}</p>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="text-xs font-medium text-gray-500 flex items-center">
                            <FiMessageSquare className="mr-2" /> Message
                          </h4>
                          <div className="mt-1 p-2 bg-white rounded text-sm text-gray-900 whitespace-pre-line">
                            {selectedMessage.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {selectedMessage.status !== 'responded' && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        markAsResponded(selectedMessage.id);
                        setIsModalOpen(false);
                      }}
                    >
                      <FiCheck className="mr-2" /> Mark as Responded
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}