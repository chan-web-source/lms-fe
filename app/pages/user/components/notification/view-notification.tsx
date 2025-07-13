import React, { useState } from 'react';
import { AlertTriangleIcon, ChevronRight } from 'lucide-react';
import PageHeader from '~/components/page-header';
import { Button } from '~/components/ui/button';
import VerificationIcon from '~/assets/icons/view-notification';

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
    message: 'Additional information needed for your application (Ref ID).',
  },
  {
    id: 3,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Additional information needed for your application (Ref ID).',
  },
  {
    id: 4,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Additional information needed for your application (Ref ID).',
  },
  {
    id: 5,
    title: 'Action Required',
    time: '11:48 AM, 2 July 2025',
    message: 'Additional information needed for your application (Ref ID).',
  },
];

const ViewNotification = () => {
  const [readNotifications, setReadNotifications] = useState<number[]>([5]);

  const markAsRead = (id: number) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications((prev) => [...prev, id]);
    }
  };

  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadNotifications(allIds);
  };

  return (
    <div>
      <PageHeader title={'Notification'} icon={<VerificationIcon />} />

      <div className="bg-white p-5 rounded-t-3xl mt-5 h-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[32px] font-semibold">All Notifications</h2>
          <Button
            onClick={markAllAsRead}
            className="bg-yellow-200 text-sm text-white h-9 px-4 py-1 rounded-6px hover:bg-yellow-300 transition"
          >
            Mark all as read
          </Button>
        </div>

        <div className="space-y-3 separate-y ">
          {notifications.map((item, index) => {
            const isRead = readNotifications.includes(item.id);
            const isLast = index === notifications.length - 1;

            return (
              <div key={item.id} className={`${!isLast ? 'border-b' : ''} pb-3`}>
                <div
                  onClick={() => markAsRead(item.id)}
                  className={`flex items-center justify-between rounded-lg p-4 cursor-pointer ${
                    isRead ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangleIcon
                      className={`w-6 h-6 mt-1 ${isRead ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[20px]">{item.title}</p>
                        <p className="text-base mr-5">{item.time}</p>
                      </div>
                      <p className="text-base">{item.message}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-8 h-8 ${isRead ? 'text-gray-400' : 'text-gray-900'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewNotification;
