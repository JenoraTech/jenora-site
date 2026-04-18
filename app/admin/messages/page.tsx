"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  FiMail, FiPhone, FiUser, FiBriefcase, FiPackage, FiClock, 
  FiX, FiCheck, FiMessageSquare, FiSearch, FiTrash2, FiFilter, 
  FiArchive, FiAlertTriangle 
} from 'react-icons/fi';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'responded' | 'archived';
}

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  organization?: string;
  position?: string;
  product?: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'responded' | 'archived';
}

type Message = (Contact & { type: 'contact' }) | (DemoRequest & { type: 'demo' });

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'contact' | 'demo'>('all');
  
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'responded' | 'archived'>('new');
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isSingleDeleteModalOpen, setIsSingleDeleteModalOpen] = useState(false); 
  const [messageToProcess, setMessageToProcess] = useState<Message | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push('/login'); return; }

        const [
          { data: contacts, error: contactsError },
          { data: demoRequests, error: demoRequestsError }
        ] = await Promise.all([
          supabase.from('contacts').select('*'),
          supabase.from('demo_requests').select('*')
        ]);

        if (contactsError || demoRequestsError) throw (contactsError || demoRequestsError);

        const combinedMessages = [
          ...(contacts?.map(c => ({ ...c, type: 'contact' as const })) || []),
          ...(demoRequests?.map(d => ({ ...d, type: 'demo' as const })) || [])
        ];

        setMessages(combinedMessages);
      } catch (error) {
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [router, supabase]);

  const archiveMessage = async (id: string, type: 'contact' | 'demo') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/archive`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (response.ok) {
        setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: 'archived' } : msg));
        setIsSingleDeleteModalOpen(false);
        if (selectedMessage?.id === id) setSelectedMessage(prev => prev ? { ...prev, status: 'archived' } : null);
      }
    } catch (err) { console.error('Error archiving:', err); }
  };

  const markAsRead = async (id: string, type: 'contact' | 'demo') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (response.ok) {
        setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg));
        if (selectedMessage?.id === id) setSelectedMessage(prev => prev ? { ...prev, status: 'read' } : null);
      }
    } catch (err) { console.error(err); }
  };

  const markAsResponded = async (id: string, type: 'contact' | 'demo') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/responded`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (response.ok) {
        setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: 'responded' } : msg));
        if (selectedMessage?.id === id) setSelectedMessage(prev => prev ? { ...prev, status: 'responded' } : null);
      }
    } catch (err) { console.error(err); }
  };

  const deleteMessage = async (id: string, type: 'contact' | 'demo') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}?type=${type}`, { method: 'DELETE' });
      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        setSelectedMessages(prev => prev.filter(msgId => msgId !== id));
        setIsSingleDeleteModalOpen(false);
        setIsModalOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  const deleteSelectedMessages = async () => {
    try {
      const messagesToDelete = messages.filter(msg => selectedMessages.includes(msg.id));
      const response = await fetch('/api/admin/messages/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: messagesToDelete.filter(m => m.type === 'contact').map(m => m.id),
          demoRequests: messagesToDelete.filter(m => m.type === 'demo').map(m => m.id)
        })
      });
      if (response.ok) {
        setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
        setSelectedMessages([]);
        setIsDeleteModalOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  const initiateDelete = (msg: Message) => {
    setMessageToProcess(msg);
    setIsSingleDeleteModalOpen(true);
  };

  const filteredMessages = messages.filter(message => {
    if (filterType !== 'all' && message.type !== filterType) return false;
    
    if (filterStatus === 'all') {
        if (message.status === 'archived') return false;
    } else {
        if ((message.status || 'new') !== filterStatus) return false;
    }

    const searchLower = searchTerm.toLowerCase();

    // FIXED: Using 'in' operator to narrow types and satisfy TypeScript
    const orgMatch = 'organization' in message && message.organization 
      ? message.organization.toLowerCase().includes(searchLower) 
      : false;
      
    const productMatch = 'product' in message && message.product 
      ? message.product.toLowerCase().includes(searchLower) 
      : false;

    return (
      (message.name || '').toLowerCase().includes(searchLower) ||
      (message.email || '').toLowerCase().includes(searchLower) ||
      orgMatch ||
      productMatch ||
      (message.message || '').toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => type === 'demo' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800';

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Messages Dashboard</h1>
            <p className="text-xs md:text-sm text-gray-500">Manage inquiries & lead data</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center">
              <FiMail className="mr-1" /> {messages.filter(m => m.status !== 'archived').length} Inbox
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center">
              <FiMessageSquare className="mr-1" /> {messages.filter(m => m.type === 'demo' && m.status === 'new').length} New Demos
            </span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" placeholder="Search name, email, org, or product..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className="bg-gray-50 border-none p-2 rounded-lg text-sm outline-none">
                <option value="all">All Types</option>
                <option value="contact">Contact</option>
                <option value="demo">Demo</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="bg-gray-50 border-none p-2 rounded-lg text-sm outline-none">
                <option value="all">All Active</option>
                <option value="new">New Only</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived Items</option>
              </select>
            </div>
          </div>
        </div>

        {selectedMessages.length > 0 && (
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6">
            <span className="text-sm font-medium">{selectedMessages.length} Selected</span>
            <button onClick={() => setIsDeleteModalOpen(true)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 font-bold">
              <FiTrash2 /> Delete Selected
            </button>
            <button onClick={() => setSelectedMessages([])} className="text-gray-400 text-xs">Cancel</button>
          </motion.div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="md:hidden divide-y divide-gray-100">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-4 ${msg.status === 'new' ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''}`}
                onClick={() => { setSelectedMessage(msg); setIsModalOpen(true); if(msg.status === 'new') markAsRead(msg.id, msg.type); }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" checked={selectedMessages.includes(msg.id)}
                      onChange={(e) => { e.stopPropagation(); setSelectedMessages(prev => prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id]); }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getTypeColor(msg.type)}`}>{msg.type}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusColor(msg.status || 'new')}`}>{msg.status || 'new'}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{msg.name}</h3>
                <p className="text-xs text-gray-500 truncate mb-2">{msg.email}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{msg.message}</p>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><FiClock /> {formatDate(msg.created_at)}</span>
                  <div className="flex gap-4">
                    <button onClick={(e) => { e.stopPropagation(); archiveMessage(msg.id, msg.type); }} className="text-amber-600"><FiArchive size={18}/></button>
                    <button onClick={(e) => { e.stopPropagation(); initiateDelete(msg); }} className="text-red-600"><FiTrash2 size={18}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left"><input type="checkbox" onChange={(e) => setSelectedMessages(e.target.checked ? filteredMessages.map(m => m.id) : [])} checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0} /></th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Sender Details</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Company/Product</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} className={`hover:bg-gray-50 transition-colors cursor-pointer ${msg.status === 'new' ? 'bg-blue-50/30 font-medium' : ''}`} onClick={() => { setSelectedMessage(msg); setIsModalOpen(true); if(msg.status === 'new') markAsRead(msg.id, msg.type); }}>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selectedMessages.includes(msg.id)} onChange={() => setSelectedMessages(prev => prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id])} /></td>
                    <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getTypeColor(msg.type)}`}>{msg.type}</span></td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-bold text-gray-900">{msg.name}</div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 font-medium">{('organization' in msg && msg.organization) || 'Individual'}</div>
                      <div className="text-[10px] text-indigo-600 font-bold uppercase">{('product' in msg && msg.product) || 'Inquiry'}</div>
                    </td>
                    <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(msg.status || 'new')}`}>{msg.status || 'new'}</span></td>
                    <td className="px-4 py-4 text-xs text-gray-500">{formatDate(msg.created_at)}</td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <button onClick={() => archiveMessage(msg.id, msg.type)} className="text-amber-600 hover:bg-amber-100 p-1.5 rounded-lg" title="Archive"><FiArchive /></button>
                        <button onClick={() => initiateDelete(msg)} className="text-red-600 hover:bg-red-100 p-1.5 rounded-lg" title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && selectedMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getTypeColor(selectedMessage.type)}`}>{selectedMessage.type} Request</span>
                      <h2 className="text-2xl font-bold mt-2 text-gray-900">{selectedMessage.name}</h2>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX size={24}/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3 text-gray-600 mb-3"><FiMail /> <span className="text-sm">{selectedMessage.email}</span></div>
                      {selectedMessage.type === 'contact' && (selectedMessage as Contact).phone && <div className="flex items-center gap-3 text-gray-600 mb-3"><FiPhone /> <span className="text-sm">{(selectedMessage as Contact).phone}</span></div>}
                      <div className="flex items-center gap-3 text-gray-600"><FiClock /> <span className="text-sm">{formatDate(selectedMessage.created_at)}</span></div>
                    </div>
                    <div className="bg-indigo-50/50 p-4 rounded-xl">
                      <div className="flex items-center gap-3 text-indigo-700 mb-3"><FiBriefcase /> <span className="text-sm font-bold">{('organization' in selectedMessage && selectedMessage.organization) || 'Private Personal'}</span></div>
                      {('position' in selectedMessage && selectedMessage.position) && <div className="text-xs text-indigo-600 ml-8 mb-3">Position: {selectedMessage.position}</div>}
                      {('product' in selectedMessage && selectedMessage.product) && <div className="flex items-center gap-3 text-purple-700 font-bold"><FiPackage /> <span className="text-sm">{selectedMessage.product}</span></div>}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl mb-8">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest">Message Content</h4>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedMessage.status !== 'responded' && (
                      <button onClick={() => markAsResponded(selectedMessage.id, selectedMessage.type)} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"><FiCheck /> Mark Responded</button>
                    )}
                    <button onClick={() => archiveMessage(selectedMessage.id, selectedMessage.type)} className="py-3 px-6 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-100"><FiArchive /> Archive</button>
                    <button onClick={() => initiateDelete(selectedMessage)} className="py-3 px-6 bg-red-50 text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100"><FiTrash2 /> Delete</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSingleDeleteModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSingleDeleteModalOpen(false)} />
              <motion.div initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full text-red-600"><FiAlertTriangle size={24} /></div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Message?</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to permanently delete the message from <span className="font-bold">{messageToProcess?.name}</span>? This cannot be undone.</p>
                <div className="space-y-3">
                  <button onClick={() => messageToProcess && deleteMessage(messageToProcess.id, messageToProcess.type)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200">Confirm Permanent Delete</button>
                  <button onClick={() => messageToProcess && archiveMessage(messageToProcess.id, messageToProcess.type)} className="w-full py-3 bg-amber-50 text-amber-700 rounded-xl font-bold flex items-center justify-center gap-2"><FiArchive /> Move to Archive Instead</button>
                  <button onClick={() => setIsSingleDeleteModalOpen(false)} className="w-full py-3 text-gray-500 font-medium">Keep Message</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDeleteModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60" />
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-white max-w-sm w-full rounded-2xl p-6 text-center">
                <div className="p-4 bg-red-100 w-fit mx-auto rounded-full mb-4 text-red-600"><FiTrash2 size={32} /></div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Delete {selectedMessages.length} Messages?</h3>
                <p className="text-gray-500 text-sm mb-6">This will permanently remove all selected data from the system.</p>
                <div className="flex gap-3">
                  <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-700">Cancel</button>
                  <button onClick={deleteSelectedMessages} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Delete All</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}