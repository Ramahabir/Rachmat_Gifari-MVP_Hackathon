
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AirVent, Tv, Lightbulb, Refrigerator, WashingMachine, Coffee, Fan, Thermometer } from 'lucide-react';

interface BaseDevice {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  isOn: boolean;
  power: number;
  controllable: boolean;
  priority: string;
}

interface ACDevice extends BaseDevice {
  temperature: number;
  mode: string;
  brightness?: never;
}

interface LightDevice extends BaseDevice {
  brightness: number;
  temperature?: never;
  mode?: never;
}

interface OtherDevice extends BaseDevice {
  temperature?: never;
  mode?: never;
  brightness?: never;
}

type Device = ACDevice | LightDevice | OtherDevice;

export const DeviceControl: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'ac-living',
      name: 'AC Ruang Tamu',
      icon: AirVent,
      isOn: true,
      power: 1200,
      controllable: true,
      temperature: 24,
      mode: 'cool',
      priority: 'high'
    } as ACDevice,
    {
      id: 'tv-main',
      name: 'TV Utama',
      icon: Tv,
      isOn: false,
      power: 150,
      controllable: true,
      priority: 'medium'
    } as OtherDevice,
    {
      id: 'lights',
      name: 'Lampu Rumah',
      icon: Lightbulb,
      isOn: true,
      power: 200,
      controllable: true,
      brightness: 80,
      priority: 'high'
    } as LightDevice,
    {
      id: 'refrigerator',
      name: 'Kulkas',
      icon: Refrigerator,
      isOn: true,
      power: 300,
      controllable: false,
      priority: 'critical'
    } as OtherDevice,
    {
      id: 'washing-machine',
      name: 'Mesin Cuci',
      icon: WashingMachine,
      isOn: false,
      power: 800,
      controllable: true,
      priority: 'low'
    } as OtherDevice,
    {
      id: 'coffee-maker',
      name: 'Coffee Maker',
      icon: Coffee,
      isOn: false,
      power: 1000,
      controllable: true,
      priority: 'low'
    } as OtherDevice
  ]);

  const toggleDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, isOn: !device.isOn }
        : device
    ));
  };

  const updateTemperature = (deviceId: string, temperature: number) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, temperature }
        : device
    ));
  };

  const updateBrightness = (deviceId: string, brightness: number) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, brightness }
        : device
    ));
  };

  const totalPowerUsage = devices
    .filter(device => device.isOn)
    .reduce((total, device) => total + device.power, 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-blue-500';
      case 'low':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Kritis';
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'low':
        return 'Rendah';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kontrol Perangkat</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Konsumsi</p>
          <p className="text-xl font-bold text-blue-600">{totalPowerUsage}W</p>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Mode Hemat Energi</h3>
              <p className="text-sm text-gray-600">Otomatis mengoptimalkan penggunaan perangkat</p>
            </div>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              Aktifkan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Device Grid */}
      <div className="space-y-4">
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <Card key={device.id} className={`${device.isOn ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${device.isOn ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={device.isOn ? 'text-green-600' : 'text-gray-400'} size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-600">{device.power}W</p>
                        <Badge className={`text-xs ${getPriorityColor(device.priority)}`}>
                          {getPriorityText(device.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {device.controllable && (
                      <Switch
                        checked={device.isOn}
                        onCheckedChange={() => toggleDevice(device.id)}
                      />
                    )}
                    {!device.controllable && (
                      <Badge variant="outline" className="text-xs">
                        Otomatis
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {device.isOn && device.controllable && (
                <CardContent>
                  {/* AC Temperature Control */}
                  {device.id === 'ac-living' && 'temperature' in device && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Suhu</span>
                        <div className="flex items-center space-x-2">
                          <Thermometer size={16} className="text-blue-500" />
                          <span className="text-sm font-bold">{device.temperature}°C</span>
                        </div>
                      </div>
                      <Slider
                        value={[device.temperature]}
                        onValueChange={(value) => updateTemperature(device.id, value[0])}
                        min={16}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>16°C</span>
                        <span>30°C</span>
                      </div>
                    </div>
                  )}

                  {/* Light Brightness Control */}
                  {device.id === 'lights' && 'brightness' in device && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Kecerahan</span>
                        <span className="text-sm font-bold">{device.brightness}%</span>
                      </div>
                      <Slider
                        value={[device.brightness]}
                        onValueChange={(value) => updateBrightness(device.id, value[0])}
                        min={10}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>10%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Lightbulb size={20} />
            <span>Rekomendasi AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 Matikan TV dan Coffee Maker untuk menghemat 1150W
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                ❄️ Naikkan AC ke 26°C saat produksi solar rendah (malam hari)
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⏰ Jadwalkan mesin cuci pada pukul 12:00 saat produksi solar optimal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
