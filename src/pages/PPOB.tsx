import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Zap, 
  Heart, 
  Droplet, 
  Wifi, 
  Tv, 
  Wallet, 
  Gamepad2,
  ArrowLeft,
  CreditCard,
  Receipt
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const services = [
  {
    id: 'pulsa',
    name: 'Pulsa & Paket Data',
    icon: Smartphone,
    description: 'Isi pulsa dan paket data semua operator',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    id: 'pln',
    name: 'Token PLN',
    icon: Zap,
    description: 'Beli token listrik PLN',
    color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 'bpjs',
    name: 'BPJS Kesehatan',
    icon: Heart,
    description: 'Bayar iuran BPJS Kesehatan',
    color: 'bg-red-500/10 text-red-600 dark:text-red-400'
  },
  {
    id: 'pdam',
    name: 'PDAM',
    icon: Droplet,
    description: 'Bayar tagihan air PDAM',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
  },
  {
    id: 'internet',
    name: 'Internet & Telkom',
    icon: Wifi,
    description: 'Bayar internet dan telepon',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  {
    id: 'tv',
    name: 'TV Kabel',
    icon: Tv,
    description: 'Bayar TV berlangganan',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    icon: Wallet,
    description: 'Top up e-wallet (GoPay, OVO, Dana, dll)',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400'
  },
  {
    id: 'voucher',
    name: 'Voucher Game',
    icon: Gamepad2,
    description: 'Beli voucher game online',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  }
];

export const PPOB = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('services');

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setActiveTab('transaction');
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setActiveTab('services');
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">PPOB</h1>
              <p className="text-muted-foreground">Payment Point Online Banking</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Layanan</TabsTrigger>
            <TabsTrigger value="transaction" disabled={!selectedService}>Transaksi</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pilih Layanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Card
                        key={service.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                          <div className={`p-4 rounded-full ${service.color}`}>
                            <Icon className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {service.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction Tab */}
          <TabsContent value="transaction" className="space-y-4">
            {selectedServiceData && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${selectedServiceData.color}`}>
                        <selectedServiceData.icon className="h-6 w-6" />
                      </div>
                      {selectedServiceData.name}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleBackToServices}>
                      Kembali
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form Transaksi - Placeholder */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-id">Nomor Pelanggan / Nomor HP</Label>
                      <Input 
                        id="customer-id" 
                        placeholder="Masukkan nomor" 
                        type="text"
                      />
                    </div>

                    {selectedService === 'pulsa' && (
                      <div className="space-y-2">
                        <Label>Pilih Nominal</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['10.000', '20.000', '25.000', '50.000', '100.000', '150.000'].map((nominal) => (
                            <Button key={nominal} variant="outline" className="h-auto py-3">
                              <div className="text-center">
                                <div className="font-semibold">Rp {nominal}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedService === 'pln' && (
                      <div className="space-y-2">
                        <Label>Pilih Nominal Token</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['20.000', '50.000', '100.000', '200.000', '500.000', '1.000.000'].map((nominal) => (
                            <Button key={nominal} variant="outline" className="h-auto py-3">
                              <div className="text-center">
                                <div className="font-semibold">Rp {nominal}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4" />
                        <span className="font-medium">Detail Transaksi</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between py-1">
                          <span>Layanan:</span>
                          <span className="font-medium text-foreground">{selectedServiceData.name}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Harga:</span>
                          <span className="font-medium text-foreground">-</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Admin:</span>
                          <span className="font-medium text-foreground">-</span>
                        </div>
                        <div className="border-t mt-2 pt-2 flex justify-between">
                          <span className="font-semibold">Total:</span>
                          <span className="font-semibold text-lg text-foreground">-</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" disabled>
                      <Receipt className="h-4 w-4 mr-2" />
                      Proses Transaksi
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      * Fitur ini akan segera diaktifkan setelah integrasi dengan Digiflaz
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi PPOB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada riwayat transaksi</p>
                  <p className="text-sm mt-2">Transaksi PPOB akan muncul di sini</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
