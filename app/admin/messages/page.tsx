"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiUser, FiBriefcase, FiPackage, FiClock, FiX, FiCheck, FiMessageSquare, FiSearch } from 'react-icons/fi';
import { BsFilter } from 'react-icons/bs';

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
          console.error("Backend Error Detail:", errorText.error);
          throw new Error(errorText.error || 'Failed to fetch messages');
        }

        const { messages } = await response.json();
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router, supabase.auth]);

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

  const openMessageModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    
    if (message.status === 'new') {
      markAsRead(message.id);
    }
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-purple-100 text-purple-800';
      case 'contact': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Messages Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all incoming messages and demo requests</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
              <FiMail className="mr-1" /> Total: {messages.length}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center">
              <FiMessageSquare className="mr-1" /> Demo: {messages.filter(m => m.type === 'demo').length}
            </span>
          </div>
        </div>

        {/* Filters and Search - Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden md:block bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option value="contact">Contact Form</option>
                <option value="demo">Demo Requests</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterStatus('all');
                }}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-between py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <BsFilter className="mr-2" />
              <span>Filters</span>
            </div>
            <span className={`transform transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {isMobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="bg-white p-4 mt-2 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                  >
                    <option value="all">All Types</option>
                    <option value="contact">Contact Form</option>
                    <option value="demo">Demo Requests</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterStatus('all');
                  }}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Mobile Cards View */}
            <div className="md:hidden">
              {filteredMessages.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                      className={`p-4 ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                      onClick={() => openMessageModal(message)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(message.type)} mb-2`}>
                            {message.type === 'demo' ? 'Demo' : 'Contact'}
                          </span>
                          <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{message.email}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status || 'new')}`}>
                          {message.status ? (message.status.charAt(0).toUpperCase() + message.status.slice(1)) : 'New'}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <FiClock className="mr-1" />
                        <span>{formatDate(message.created_at)}</span>
                      </div>
                      
                      {message.product && (
                        <div className="mt-2 flex items-center text-sm text-gray-700">
                          <FiPackage className="mr-1" />
                          <span>{message.product}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-500">No messages found matching your criteria</div>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(message.type)}`}>
                            {message.type === 'demo' ? 'Demo' : 'Contact'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{message.name}</div>
                              {message.organization && (
                                <div className="text-xs text-gray-500">{message.organization}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{message.email}</div>
                          {message.phone && (
                            <div className="text-xs text-gray-500">{message.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {message.product || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status || 'new')}`}>
                            {message.status ? (message.status.charAt(0).toUpperCase() + message.status.slice(1)) : 'New'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(message.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openMessageModal(message)}
                            className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                          >
                            <FiMessageSquare className="mr-1" /> View
                          </button>
                          {message.status !== 'responded' && (
                            <button
                              onClick={() => markAsResponded(message.id)}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <FiCheck className="mr-1" /> Responded
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center">
                        <div className="text-gray-500">No messages found matching your criteria</div>
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
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 transition-opacity" 
                aria-hidden="true"
                onClick={() => setIsModalOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              {/* Modal Content */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl leading-6 font-bold text-gray-900">
                          {selectedMessage.type === 'demo' ? 'Demo Request' : 'Contact Message'}
                        </h3>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <FiX className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="mt-4 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
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
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
                              <FiClock className="mr-2" /> Received
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">
                              {formatDate(selectedMessage.created_at)}
                            </p>
                            
                            <div className="mt-2">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedMessage.status || 'new')}`}>
                                Status: {selectedMessage.status ? (selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)) : 'New'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {selectedMessage.organization && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
                              <FiBriefcase className="mr-2" /> Organization
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">{selectedMessage.organization}</p>
                            {selectedMessage.position && (
                              <p className="mt-1 text-sm text-gray-900">Position: {selectedMessage.position}</p>
                            )}
                          </div>
                        )}
                        
                        {selectedMessage.product && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
                              <FiPackage className="mr-2" /> Product
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">{selectedMessage.product}</p>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 flex items-center">
                            <FiMessageSquare className="mr-2" /> Message
                          </h4>
                          <div className="mt-1">
                            <p className="text-sm text-gray-900 whitespace-pre-line">{selectedMessage.message}</p>
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
                      className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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