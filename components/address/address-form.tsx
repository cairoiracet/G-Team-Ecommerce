"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface AddressData {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressFormProps {
  onAddressSubmit: (address: AddressData) => void;
  initialData?: Partial<AddressData>;
}

export function AddressForm({ onAddressSubmit, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    street: initialData?.street || '',
    number: initialData?.number || '',
    complement: initialData?.complement || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'Brasil',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validação básica
    if (!formData.street || !formData.number || !formData.city || !formData.state || !formData.zipCode) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
    
    await onAddressSubmit(formData);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Endereço de Entrega</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="street">Rua *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => handleChange('street', e.target.value)}
              placeholder="Nome da rua"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="Nº"
                required
              />
            </div>
            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) => handleChange('complement', e.target.value)}
                placeholder="Apto, bloco, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Cidade"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Estado"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">CEP *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                placeholder="00000-000"
                required
              />
            </div>
            <div>
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Salvando...' : 'Usar este endereço'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}