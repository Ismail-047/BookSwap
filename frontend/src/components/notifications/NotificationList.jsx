import React, { useState, useEffect } from 'react';
import { getNotifications, markAsRead } from '../../services/notification.service';
import Alert from '../ui/Alert';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      if (response.success) {
        setNotifications(response.notifications);
      } else {
        setError('Failed to fetch notifications.');
      }
    } catch (err) {
      setError('Failed to fetch notifications. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      setNotifications(
        notifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      setError('Failed to mark notification as read.');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-600">You have no notifications.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className={`p-4 rounded-lg border ${
            notification.isRead ? 'bg-white' : 'bg-blue-50'
          }`}
          onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
        >
          <div className="flex justify-between items-start">
            <div className="text-gray-900">{notification.message}</div>
            {!notification.isRead && (
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
            )}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(notification.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;