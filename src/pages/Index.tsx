
import React, { useState } from 'react';
import { SystemSelector } from '../components/SystemSelector';
import { Dashboard } from '../components/Dashboard';
import { EnergyUsage } from '../components/EnergyUsage';
import { ComponentStatus } from '../components/ComponentStatus';
import { DeviceControl } from '../components/DeviceControl';
import { History } from '../components/History';
import { Notifications } from '../components/Notifications';
import { Settings } from '../components/Settings';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Cpu, Smartphone, History as HistoryIcon, Bell, Settings as SettingsIcon } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemType, setSystemType] = useState<'mikrogrid' | 'pribadi' | null>(null);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'energy', label: 'Energy', icon: BarChart3 },
    { id: 'components', label: 'Components', icon: Cpu },
    ...(systemType === 'pribadi' ? [{ id: 'devices', label: 'Devices', icon: Smartphone }] : []),
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    if (!systemType) {
      return <SystemSelector onSystemSelect={setSystemType} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard systemType={systemType} />;
      case 'energy':
        return <EnergyUsage systemType={systemType} />;
      case 'components':
        return <ComponentStatus systemType={systemType} />;
      case 'devices':
        return systemType === 'pribadi' ? <DeviceControl /> : <Dashboard systemType={systemType} />;
      case 'history':
        return <History systemType={systemType} />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings onResetSystem={() => setSystemType(null)} />;
      default:
        return <Dashboard systemType={systemType} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="energy-gradient text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">SuryaOptiAI</h1>
            <p className="text-green-100 text-sm">
              {systemType === 'mikrogrid' ? 'PLTS Mikrogrid' : systemType === 'pribadi' ? 'PV Cell Pribadi' : 'Smart Solar Monitoring'}
            </p>
          </div>
          {systemType && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSystemType(null)}
              className="text-white hover:bg-white/20"
            >
              Switch System
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      {systemType && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
          <div className="flex justify-around">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    isActive ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
