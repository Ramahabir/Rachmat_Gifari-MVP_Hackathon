
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Sun } from 'lucide-react';

interface EnergyUsageProps {
  systemType: 'mikrogrid' | 'pribadi';
}

export const EnergyUsage: React.FC<EnergyUsageProps> = ({ systemType }) => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const dailyData = [
    { hour: '00:00', production: 0, consumption: 2.1 },
    { hour: '06:00', production: 1.2, consumption: 3.5 },
    { hour: '08:00', production: 4.8, consumption: 5.2 },
    { hour: '10:00', production: 8.5, consumption: 6.8 },
    { hour: '12:00', production: 12.3, consumption: 8.9 },
    { hour: '14:00', production: 15.2, consumption: 12.4 },
    { hour: '16:00', production: 11.8, consumption: 9.8 },
    { hour: '18:00', production: 6.2, consumption: 11.5 },
    { hour: '20:00', production: 0.8, consumption: 8.7 },
    { hour: '22:00', production: 0, consumption: 4.2 },
  ];

  const weeklyData = [
    { day: 'Sen', production: 145, consumption: 123 },
    { day: 'Sel', production: 156, consumption: 134 },
    { day: 'Rab', production: 142, consumption: 128 },
    { day: 'Kam', production: 158, consumption: 142 },
    { day: 'Jum', production: 151, consumption: 138 },
    { day: 'Sab', production: 139, consumption: 115 },
    { day: 'Min', production: 147, consumption: 119 },
  ];

  const currentData = viewMode === 'daily' ? dailyData : weeklyData;
  const xAxisKey = viewMode === 'daily' ? 'hour' : 'day';

  const totalProduction = currentData.reduce((sum, item) => sum + item.production, 0);
  const totalConsumption = currentData.reduce((sum, item) => sum + item.consumption, 0);
  const efficiency = ((totalProduction / totalConsumption) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Penggunaan Energi</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('daily')}
          >
            Harian
          </Button>
          <Button
            variant={viewMode === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('weekly')}
          >
            Mingguan
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Produksi</p>
                <p className="text-2xl font-bold text-green-600">{totalProduction.toFixed(1)} kWh</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Sun className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-sm text-green-600 ml-1">+12% dari kemarin</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Konsumsi</p>
                <p className="text-2xl font-bold text-blue-600">{totalConsumption.toFixed(1)} kWh</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="text-red-500" size={16} />
              <span className="text-sm text-red-600 ml-1">-3% dari kemarin</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Badge */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efisiensi Energi</p>
              <p className="text-xl font-bold text-gray-800">{efficiency}%</p>
            </div>
            <Badge 
              variant={parseFloat(efficiency) > 100 ? 'default' : 'secondary'}
              className={parseFloat(efficiency) > 100 ? 'bg-green-500' : 'bg-orange-500'}
            >
              {parseFloat(efficiency) > 100 ? 'Surplus' : 'Defisit'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Produksi vs Konsumsi ({viewMode === 'daily' ? '24 Jam' : '7 Hari'})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Produksi (kWh)"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Konsumsi (kWh)"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Performa Terbaik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Jam Produksi Tertinggi</span>
                <span className="font-medium">14:00 (15.2 kWh)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Hari Paling Efisien</span>
                <span className="font-medium">Kamis (111% efisiensi)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rata-rata Surplus Harian</span>
                <span className="font-medium text-green-600">+18.5 kWh</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
