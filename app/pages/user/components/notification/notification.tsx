import React, { useState } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Additional information needed for your application (Ref ID).',
  },
  {
    id: 2,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Expected review and decision needed for the application (Ref ID).',
  },
  {
    id: 3,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Expected review and decision needed for the application (Ref ID).',
  },
];

const Notification = () => {
  const [readNotifications, setReadNotifications] = useState<number[]>([3]);

  const markAsRead = (id: number) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm max-w-[390px] mt-150 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-medium">Notifications</h2>
        <Link to="/user/view-notification" className="text-normal text-[17px] underline">
          View more
        </Link>
      </div>

      <div className="space-y-3">
        {notifications.slice(0, 3).map((item, index) => {
          const isRead = readNotifications.includes(item.id);
          const isLast = index === notifications.length - 1;

          return (
            <div key={item.id} className={`${!isLast ? 'border-b' : ''} pb-3`}>
              <div
                onClick={() => markAsRead(item.id)}
                className={`rounded-md p-2 cursor-pointer transition-colors ${
                  isRead ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon
                    className={`w-5 h-5 mt-1 ${isRead ? 'text-gray-400' : 'text-gray-500'}`}
                  />
                  <div className="text-sm w-full">
                    <div className="flex justify-between">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-md">{item.time}</p>
                    </div>
                    <p>{item.message}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
