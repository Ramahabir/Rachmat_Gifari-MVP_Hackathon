
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home } from 'lucide-react';

interface SystemSelectorProps {
  onSystemSelect: (type: 'mikrogrid' | 'pribadi') => void;
}

export const SystemSelector: React.FC<SystemSelectorProps> = ({ onSystemSelect }) => {
  return (
    <div className="p-6 max-w-lg mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Pilih Sistem Anda</h2>
        <p className="text-gray-600">Silakan pilih jenis sistem yang ingin Anda monitor</p>
      </div>

      <div className="space-y-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
              <Building className="text-blue-600" size={32} />
            </div>
            <CardTitle className="text-xl">PLTS Mikrogrid</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Sistem pembangkit listrik tenaga surya untuk komunitas atau area komersial dengan distribusi ke multiple fasilitas
            </p>
            <Button 
              onClick={() => onSystemSelect('mikrogrid')}
              className="w-full energy-gradient text-white hover:opacity-90"
            >
              Pilih PLTS Mikrogrid
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
              <Home className="text-green-600" size={32} />
            </div>
            <CardTitle className="text-xl">PV Cell Pribadi</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Sistem panel surya untuk rumah tangga mandiri dengan kontrol perangkat elektronik otomatis
            </p>
            <Button 
              onClick={() => onSystemSelect('pribadi')}
              className="w-full energy-gradient-reverse text-white hover:opacity-90"
            >
              Pilih PV Cell Pribadi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
