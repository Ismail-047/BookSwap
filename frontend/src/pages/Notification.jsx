import React from 'react';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
      <p className="text-gray-600 mb-6">
        Stay updated with your book exchange activities. Click on unread notifications to mark them as read.
      </p>
      {/* <NotificationList /> */}
    </div>
  );
};

export default Notifications;