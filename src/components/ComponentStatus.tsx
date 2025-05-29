
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Sun, Battery, Zap, Thermometer } from 'lucide-react';

interface ComponentStatusProps {
  systemType: 'mikrogrid' | 'pribadi';
}

export const ComponentStatus: React.FC<ComponentStatusProps> = ({ systemType }) => {
  const components = {
    mikrogrid: [
      {
        id: 'solar-panels',
        name: 'Panel Surya',
        icon: Sun,
        status: 'optimal',
        health: 94,
        temperature: 38,
        voltage: 380,
        current: 12.5,
        details: 'Array 1-5 beroperasi normal'
      },
      {
        id: 'battery-bank',
        name: 'Bank Baterai',
        icon: Battery,
        status: 'good',
        health: 87,
        temperature: 32,
        voltage: 48.2,
        current: 8.7,
        details: 'Kapasitas 5000 kWh'
      },
      {
        id: 'inverter-main',
        name: 'Inverter Utama',
        icon: Zap,
        status: 'optimal',
        health: 96,
        temperature: 45,
        voltage: 220,
        current: 150.8,
        details: 'Output AC 3-phase'
      },
      {
        id: 'distribution-panel',
        name: 'Panel Distribusi',
        icon: Zap,
        status: 'warning',
        health: 78,
        temperature: 42,
        voltage: 220,
        current: 125.4,
        details: 'Load balancing aktif'
      }
    ],
    pribadi: [
      {
        id: 'roof-panels',
        name: 'Panel Atap',
        icon: Sun,
        status: 'optimal',
        health: 92,
        temperature: 36,
        voltage: 24,
        current: 8.3,
        details: '12 panel monokristalin'
      },
      {
        id: 'home-battery',
        name: 'Baterai Rumah',
        icon: Battery,
        status: 'optimal',
        health: 89,
        temperature: 28,
        voltage: 12.8,
        current: 5.2,
        details: 'Li-ion 10 kWh'
      },
      {
        id: 'home-inverter',
        name: 'Inverter',
        icon: Zap,
        status: 'good',
        health: 91,
        temperature: 41,
        voltage: 220,
        current: 15.7,
        details: 'Hybrid inverter 5kW'
      }
    ]
  };

  const currentComponents = components[systemType];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'good':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'error':
        return <AlertTriangle className="text-red-600" size={20} />;
      default:
        return <AlertTriangle className="text-gray-600" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'Optimal';
      case 'good':
        return 'Baik';
      case 'warning':
        return 'Perhatian';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Status Komponen</h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          {currentComponents.filter(c => c.status === 'optimal').length}/{currentComponents.length} Optimal
        </Badge>
      </div>

      {/* Components Grid */}
      <div className="space-y-4">
        {currentComponents.map((component) => {
          const Icon = component.icon;
          return (
            <Card key={component.id} className="border-l-4" style={{ borderLeftColor: component.status === 'optimal' ? '#10b981' : component.status === 'good' ? '#3b82f6' : component.status === 'warning' ? '#f59e0b' : '#ef4444' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${component.status === 'optimal' ? 'bg-green-100' : component.status === 'good' ? 'bg-blue-100' : component.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <Icon className={component.status === 'optimal' ? 'text-green-600' : component.status === 'good' ? 'text-blue-600' : component.status === 'warning' ? 'text-yellow-600' : 'text-red-600'} size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <p className="text-sm text-gray-600">{component.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(component.status)}
                    <Badge className={getStatusColor(component.status)}>
                      {getStatusText(component.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Health Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Kesehatan Komponen</span>
                      <span className="text-sm font-bold text-gray-800">{component.health}%</span>
                    </div>
                    <Progress value={component.health} className="h-2" />
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Thermometer size={16} className="text-orange-500 mr-1" />
                      </div>
                      <p className="text-sm text-gray-600">Suhu</p>
                      <p className="font-bold text-gray-800">{component.temperature}°C</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Tegangan</p>
                      <p className="font-bold text-gray-800">{component.voltage}V</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Arus</p>
                      <p className="font-bold text-gray-800">{component.current}A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Anomaly Detection */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <AlertTriangle size={20} />
            <span>AI Anomaly Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                ✅ Semua komponen dalam kondisi normal - Tidak ada anomali terdeteksi
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                📊 Prediksi maintenance: Panel Distribusi dalam 30 hari
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                ⚠️ Peningkatan suhu pada Panel Distribusi - Monitor terus
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
