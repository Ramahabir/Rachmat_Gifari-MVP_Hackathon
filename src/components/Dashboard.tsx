
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Battery, Sun, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  systemType: 'mikrogrid' | 'pribadi';
}

export const Dashboard: React.FC<DashboardProps> = ({ systemType }) => {
  const currentTime = new Date().toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const mockData = {
    mikrogrid: {
      currentProduction: 145.2,
      currentConsumption: 123.8,
      efficiency: 87,
      batteryLevel: 76,
      totalDistributed: 892.5,
      connectedFacilities: 12,
      status: 'optimal'
    },
    pribadi: {
      currentProduction: 12.3,
      currentConsumption: 8.7,
      efficiency: 92,
      batteryLevel: 84,
      monthlySavings: 456000,
      connectedDevices: 8,
      status: 'optimal'
    }
  };

  const data = mockData[systemType];

  return (
    <div className="p-6 space-y-6">
      {/* Status Header */}
      <Card className="energy-gradient text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Status Sistem</h2>
              <p className="text-green-100">Terakhir update: {currentTime}</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
              OPTIMAL
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Sun className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Produksi Saat Ini</p>
                <p className="text-xl font-bold text-gray-800">{data.currentProduction} kW</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Konsumsi Saat Ini</p>
                <p className="text-xl font-bold text-gray-800">{data.currentConsumption} kW</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Battery and Efficiency */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Battery className="text-green-600" size={20} />
              <span>Status Baterai</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Level Baterai</span>
                <span className="text-sm font-medium">{data.batteryLevel}%</span>
              </div>
              <Progress value={data.batteryLevel} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-blue-600" size={20} />
              <span>Efisiensi Sistem</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Efisiensi</span>
                <span className="text-sm font-medium">{data.efficiency}%</span>
              </div>
              <Progress value={data.efficiency} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Specific Metrics */}
      {systemType === 'mikrogrid' ? (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{data.totalDistributed}</p>
              <p className="text-sm text-gray-600">kW Terdistribusi</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{data.connectedFacilities}</p>
              <p className="text-sm text-gray-600">Fasilitas Terhubung</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">Rp {data.monthlySavings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Penghematan Bulan Ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{data.connectedDevices}</p>
              <p className="text-sm text-gray-600">Perangkat Terhubung</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Insights */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <TrendingUp size={20} />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Prediksi produksi 24 jam ke depan: {(data.currentProduction * 1.2).toFixed(1)} kW
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                📊 Efisiensi sistem meningkat 3% dari minggu lalu
              </p>
            </div>
            {systemType === 'pribadi' && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Rekomendasi: Aktifkan AC pada pukul 14:00 untuk efisiensi optimal
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
