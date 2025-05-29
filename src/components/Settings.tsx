
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Wifi, RefreshCw, Download } from 'lucide-react';

interface SettingsProps {
  onResetSystem: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onResetSystem }) => {
  const [userSettings, setUserSettings] = useState({
    name: 'Admin SuryaOptiAI',
    email: 'admin@suryaoptiai.com',
    location: 'Jakarta, Indonesia',
    timezone: 'Asia/Jakarta'
  });

  const [systemSettings, setSystemSettings] = useState({
    autoOptimization: true,
    predictiveMode: true,
    realTimeMonitoring: true,
    weatherIntegration: true,
    energySavingMode: false,
    alertsEnabled: true
  });

  const [dataSettings, setDataSettings] = useState({
    dataRetention: '1year',
    autoBackup: true,
    cloudSync: true,
    dataCompression: true
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <SettingsIcon className="text-gray-700" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
      </div>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User size={20} />
            <span>Profil Pengguna</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={userSettings.name}
                onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={userSettings.location}
                onChange={(e) => setUserSettings({...userSettings, location: e.target.value})}
              />
            </div>
          </div>
          <Button className="w-full">Simpan Profil</Button>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon size={20} />
            <span>Konfigurasi Sistem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Optimasi Otomatis</p>
              <p className="text-sm text-gray-600">Sistem otomatis mengoptimalkan distribusi energi</p>
            </div>
            <Switch
              checked={systemSettings.autoOptimization}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, autoOptimization: checked})
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mode Prediktif AI</p>
              <p className="text-sm text-gray-600">Prediksi produksi dan konsumsi menggunakan AI</p>
            </div>
            <Switch
              checked={systemSettings.predictiveMode}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, predictiveMode: checked})
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Monitoring Real-time</p>
              <p className="text-sm text-gray-600">Update data setiap 5 detik</p>
            </div>
            <Switch
              checked={systemSettings.realTimeMonitoring}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, realTimeMonitoring: checked})
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Integrasi Cuaca</p>
              <p className="text-sm text-gray-600">Sinkronisasi dengan API weather.com</p>
            </div>
            <Switch
              checked={systemSettings.weatherIntegration}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, weatherIntegration: checked})
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mode Hemat Energi</p>
              <p className="text-sm text-gray-600">Prioritaskan efisiensi maksimal</p>
            </div>
            <Switch
              checked={systemSettings.energySavingMode}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, energySavingMode: checked})
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Connectivity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi size={20} />
            <span>Status Konektivitas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Azure Cloud</span>
              <Badge className="bg-green-500">Terhubung</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weather API</span>
              <Badge className="bg-green-500">Aktif</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">IoT Sensors</span>
              <Badge className="bg-green-500">12/12 Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Azure ML</span>
              <Badge className="bg-green-500">Operasional</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database size={20} />
            <span>Manajemen Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Backup Otomatis</p>
              <p className="text-sm text-gray-600">Backup data setiap hari ke cloud</p>
            </div>
            <Switch
              checked={dataSettings.autoBackup}
              onCheckedChange={(checked) => 
                setDataSettings({...dataSettings, autoBackup: checked})
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sinkronisasi Cloud</p>
              <p className="text-sm text-gray-600">Sinkronisasi real-time dengan Azure</p>
            </div>
            <Switch
              checked={dataSettings.cloudSync}
              onCheckedChange={(checked) => 
                setDataSettings({...dataSettings, cloudSync: checked})
              }
            />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Sync Manual</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <Shield size={20} />
            <span>Tindakan Sistem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {/* Reset to factory */}}
          >
            Reset ke Pengaturan Pabrik
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onResetSystem}
          >
            Ganti Jenis Sistem
          </Button>
          <Button 
            variant="destructive" 
            className="w-full"
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Version Info */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-sm text-gray-600">
            <p className="font-semibold">SuryaOptiAI v2.1.0</p>
            <p>Build: 2024.01.15</p>
            <p className="mt-2">© 2024 SuryaOptiAI Team</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
