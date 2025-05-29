import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sun, Battery, Zap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  systemType: 'mikrogrid' | 'pribadi';
}

interface MikrogridData {
  currentProduction: number;
  currentConsumption: number;
  efficiency: number;
  batteryLevel: number;
  totalDistributed: number;
  connectedFacilities: number;
  status: string;
}

interface PribadiData {
  currentProduction: number;
  currentConsumption: number;
  efficiency: number;
  batteryLevel: number;
  monthlySavings: number;
  connectedDevices: number;
  status: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ systemType }) => {
  // Sample data - in real app this would come from API
  const mikrogridData: MikrogridData = {
    currentProduction: 2500,
    currentConsumption: 1800,
    efficiency: 85,
    batteryLevel: 70,
    totalDistributed: 15000,
    connectedFacilities: 12,
    status: 'optimal'
  };

  const pribadiData: PribadiData = {
    currentProduction: 4.2,
    currentConsumption: 3.1,
    efficiency: 92,
    batteryLevel: 85,
    monthlySavings: 280000,
    connectedDevices: 8,
    status: 'optimal'
  };

  const data = systemType === 'mikrogrid' ? mikrogridData : pribadiData;

  // Sample chart data
  const chartData = [
    { time: '00:00', production: 400, consumption: 300 },
    { time: '03:00', production: 600, consumption: 400 },
    { time: '06:00', production: 800, consumption: 500 },
    { time: '09:00', production: 700, consumption: 600 },
    { time: '12:00', production: 900, consumption: 700 },
    { time: '15:00', production: 1000, consumption: 800 },
    { time: '18:00', production: 800, consumption: 700 },
    { time: '21:00', production: 600, consumption: 500 },
    { time: '24:00', production: 400, consumption: 300 },
  ];

  // Sample energy distribution data
  const energyData = [
    { name: 'Produksi', value: 400 },
    { name: 'Konsumsi', value: 300 },
    { name: 'Baterai', value: 200 },
  ];

  const COLORS = ['#10b981', '#06b6d4', '#64748b'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-gray-800';
      case 'critical':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'Optimal';
      case 'warning':
        return 'Perhatian';
      case 'critical':
        return 'Kritis';
      default:
        return 'Tidak Diketahui';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">
            {systemType === 'mikrogrid' ? 'Monitoring PLTS Mikrogrid' : 'Monitoring PV Cell Pribadi'}
          </p>
        </div>
        <Badge className={getStatusColor(data.status)}>
          {getStatusText(data.status)}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="energy-gradient text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Produksi Saat Ini</p>
                <p className="text-2xl font-bold">
                  {data.currentProduction}{systemType === 'mikrogrid' ? 'kW' : 'kW'}
                </p>
              </div>
              <Sun className="text-yellow-300" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Konsumsi Saat Ini</p>
                <p className="text-2xl font-bold">
                  {data.currentConsumption}{systemType === 'mikrogrid' ? 'kW' : 'kW'}
                </p>
              </div>
              <Zap className="text-yellow-300" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Efisiensi Sistem</span>
              <span className="text-lg font-bold text-green-600">{data.efficiency}%</span>
            </div>
            <Progress value={data.efficiency} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level Baterai</span>
              <div className="flex items-center space-x-1">
                <Battery className="text-green-500" size={16} />
                <span className="text-lg font-bold">{data.batteryLevel}%</span>
              </div>
            </div>
            <Progress value={data.batteryLevel} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* System Specific Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {systemType === 'mikrogrid' && (
          <>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{(data as MikrogridData).totalDistributed}kWh</p>
                <p className="text-sm text-gray-600">Total Terdistribusi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{(data as MikrogridData).connectedFacilities}</p>
                <p className="text-sm text-gray-600">Fasilitas Terhubung</p>
              </CardContent>
            </Card>
          </>
        )}

        {systemType === 'pribadi' && (
          <>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">Rp {(data as PribadiData).monthlySavings.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Penghematan Bulan Ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{(data as PribadiData).connectedDevices}</p>
                <p className="text-sm text-gray-600">Perangkat Terhubung</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Production vs Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Produksi vs Konsumsi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2} name="Produksi" />
              <Line type="monotone" dataKey="consumption" stroke="#06b6d4" strokeWidth={2} name="Konsumsi" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Energy Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Energi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={energyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {energyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-700">
            <AlertTriangle size={20} />
            <span>Insights AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Konsumsi melebihi produksi pada pukul 18:00 - pertimbangkan untuk mengurangi beban
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Sistem beroperasi optimal pada pukul 12:00 dengan produksi tertinggi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <CheckCircle size={20} />
            <span>Aksi Cepat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
            Optimalkan Konsumsi
          </Button>
          <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
            Lihat Detail Energi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
