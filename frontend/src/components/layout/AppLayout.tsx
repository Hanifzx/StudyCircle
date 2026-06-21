import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { socketService } from '../../utils/socket';
import { useAuth } from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { gooeyToast } from 'goey-toast';
import { Bell } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();

  const handleMenuToggle = () => setSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setSidebarOpen(false);

  useEffect(() => {
    if (user) {
      socketService.connect();
      socketService.joinUser(user.id);
    }
    
    socketService.onNotification((data: any) => {
      gooeyToast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    });

    socketService.onNewMessageNotification((data: any) => {
      // Determine if the user is currently on the group page of the message
      const groupPathMatch = location.pathname.match(/\/groups\/([^/]+)/);
      const currentGroupId = groupPathMatch ? groupPathMatch[1] : null;

      // Only show notification toast if they are NOT viewing this group page
      if (data.studyGroupId !== currentGroupId) {
        gooeyToast.info(data.groupName, {
          description: `Pesan baru dari ${data.senderName}`,
          icon: <Bell className="w-5 h-5 text-blue-400" />,
        });
      }
    });

    return () => {
      socketService.offNotification();
      socketService.offNewMessageNotification();
    };
  }, [user, queryClient, location.pathname]);

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <Navbar onMenuToggle={handleMenuToggle} />

      {/* Main content area – offset for fixed sidebar (lg+) and navbar */}
      <main id="main-content" role="main" className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
