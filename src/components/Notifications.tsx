
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, AlertTriangle, CheckCircle, Info, Settings, Trash2 } from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Suhu Inverter Tinggi',
      message: 'Suhu inverter utama mencapai 47°C. Monitor terus untuk mencegah overheating.',
      timestamp: '10 menit yang lalu',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Maintenance Selesai',
      message: 'Pembersihan panel surya array 1-3 telah selesai. Efisiensi meningkat 3%.',
      timestamp: '2 jam yang lalu',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Prediksi Cuaca',
      message: 'AI memprediksi cuaca cerah besok. Produksi diperkirakan meningkat 15%.',
      timestamp: '4 jam yang lalu',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'error',
      title: 'Anomali Terdeteksi',
      message: 'Fluktuasi tegangan pada panel distribusi. Sistem backup telah diaktifkan.',
      timestamp: '1 hari yang lalu',
      isRead: true,
      priority: 'critical'
    },
    {
      id: 5,
      type: 'info',
      title: 'Laporan Harian',
      message: 'Produksi hari ini: 145.2 kWh. Target tercapai 102%.',
      timestamp: '1 hari yang lalu',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    anomaly: true,
    maintenance: true,
    weather: false,
    performance: true,
    reports: false
  });

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId 
        ? { ...notif, isRead: true }
        : notif
    ));
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'error':
        return <AlertTriangle className="text-red-600" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'info':
        return <Info className="text-blue-600" size={20} />;
      default:
        return <Bell className="text-gray-600" size={20} />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'critical') return 'border-l-red-500 bg-red-50';
    if (priority === 'high') return 'border-l-orange-500 bg-orange-50';
    
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-500 text-xs">Kritis</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-xs">Tinggi</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 text-xs">Sedang</Badge>;
      case 'low':
        return <Badge className="bg-gray-500 text-xs">Rendah</Badge>;
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-800">Notifikasi</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Baca Semua
            </Button>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings size={20} />
            <span>Pengaturan Notifikasi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deteksi Anomali</p>
                <p className="text-sm text-gray-600">Notifikasi saat AI mendeteksi anomali sistem</p>
              </div>
              <Switch
                checked={notificationSettings.anomaly}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, anomaly: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Jadwal Maintenance</p>
                <p className="text-sm text-gray-600">Pengingat maintenance rutin komponen</p>
              </div>
              <Switch
                checked={notificationSettings.maintenance}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, maintenance: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prediksi Cuaca</p>
                <p className="text-sm text-gray-600">Informasi prediksi cuaca dan dampaknya</p>
              </div>
              <Switch
                checked={notificationSettings.weather}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, weather: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Performa Sistem</p>
                <p className="text-sm text-gray-600">Alert terkait performa dan efisiensi</p>
              </div>
              <Switch
                checked={notificationSettings.performance}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, performance: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Laporan Harian</p>
                <p className="text-sm text-gray-600">Ringkasan produksi dan konsumsi harian</p>
              </div>
              <Switch
                checked={notificationSettings.reports}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, reports: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
              !notification.isRead ? 'shadow-md' : 'opacity-75'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                        {notification.title}
                      </h4>
                      {getPriorityBadge(notification.priority)}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm ${!notification.isRead ? 'text-gray-700' : 'text-gray-500'} mb-2`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">{notification.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-8 w-8 p-0"
                    >
                      <CheckCircle size={16} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Notifikasi</h3>
            <p className="text-gray-500">Semua notifikasi akan muncul di sini</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
