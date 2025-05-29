
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, AlertTriangle, Zap, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HistoryProps {
  systemType: 'mikrogrid' | 'pribadi';
}

export const History: React.FC<HistoryProps> = ({ systemType }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const weeklyTrends = [
    { date: '2024-01-01', production: 145, consumption: 123, efficiency: 118 },
    { date: '2024-01-02', production: 156, consumption: 134, efficiency: 116 },
    { date: '2024-01-03', production: 142, consumption: 128, efficiency: 111 },
    { date: '2024-01-04', production: 158, consumption: 142, efficiency: 111 },
    { date: '2024-01-05', production: 151, consumption: 138, efficiency: 109 },
    { date: '2024-01-06', production: 139, consumption: 115, efficiency: 121 },
    { date: '2024-01-07', production: 147, consumption: 119, efficiency: 124 },
  ];

  const historyEvents = [
    {
      id: 1,
      date: '2024-01-07 14:30',
      type: 'maintenance',
      title: 'Maintenance Rutin Panel Surya',
      description: 'Pembersihan dan inspeksi panel surya array 1-3',
      status: 'completed',
      impact: 'Peningkatan efisiensi 3%'
    },
    {
      id: 2,
      date: '2024-01-06 09:15',
      type: 'anomaly',
      title: 'Anomali Terdeteksi - Inverter',
      description: 'AI mendeteksi fluktuasi output pada inverter utama',
      status: 'resolved',
      impact: 'Downtime 15 menit'
    },
    {
      id: 3,
      date: '2024-01-05 16:45',
      type: 'optimization',
      title: 'Optimasi Load Balancing',
      description: 'Sistem otomatis menyesuaikan distribusi beban',
      status: 'active',
      impact: 'Efisiensi +5%'
    },
    {
      id: 4,
      date: '2024-01-04 11:20',
      type: 'weather',
      title: 'Cuaca Berawan - Prediksi AI',
      description: 'AI memprediksi penurunan produksi akibat cuaca',
      status: 'predicted',
      impact: 'Produksi -12%'
    },
    {
      id: 5,
      date: '2024-01-03 08:30',
      type: 'performance',
      title: 'Record Produksi Harian',
      description: 'Mencapai produksi tertinggi bulan ini',
      status: 'milestone',
      impact: '158 kWh'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Zap className="text-blue-600" size={16} />;
      case 'anomaly':
        return <AlertTriangle className="text-red-600" size={16} />;
      case 'optimization':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'weather':
        return <Calendar className="text-yellow-600" size={16} />;
      case 'performance':
        return <TrendingUp className="text-purple-600" size={16} />;
      default:
        return <Calendar className="text-gray-600" size={16} />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'anomaly':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'optimization':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'weather':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'performance':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-xs">Selesai</Badge>;
      case 'resolved':
        return <Badge className="bg-blue-500 text-xs">Teratasi</Badge>;
      case 'active':
        return <Badge className="bg-orange-500 text-xs">Aktif</Badge>;
      case 'predicted':
        return <Badge className="bg-yellow-500 text-xs">Prediksi</Badge>;
      case 'milestone':
        return <Badge className="bg-purple-500 text-xs">Milestone</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Riwayat Sistem</h2>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Download size={16} />
          <span>Export</span>
        </Button>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        <Button
          variant={selectedPeriod === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('week')}
        >
          7 Hari
        </Button>
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('month')}
        >
          30 Hari
        </Button>
        <Button
          variant={selectedPeriod === 'year' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('year')}
        >
          1 Tahun
        </Button>
      </div>

      {/* Performance Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Performa Sistem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
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
                  labelFormatter={(value) => new Date(value).toLocaleDateString('id-ID')}
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Efisiensi (%)"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">892.5</p>
            <p className="text-sm text-gray-600">Total kWh Bulan Ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">94.2%</p>
            <p className="text-sm text-gray-600">Rata-rata Efisiensi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">99.8%</p>
            <p className="text-sm text-gray-600">Uptime Sistem</p>
          </CardContent>
        </Card>
      </div>

      {/* Event History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyEvents.map((event) => (
              <div key={event.id} className={`p-4 rounded-lg border ${getEventColor(event.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        {getStatusBadge(event.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{event.date}</p>
                        <p className="text-xs font-medium">{event.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <TrendingUp size={20} />
            <span>Analisis AI - Insight Historis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                📈 Efisiensi sistem meningkat 8% dalam 30 hari terakhir
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                🔧 Maintenance rutin menunjukkan korelasi positif dengan performa
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                ☀️ Pola cuaca menunjukkan produksi optimal pada pukul 11:00-15:00
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
