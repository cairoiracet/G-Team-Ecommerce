// lib/mercadopago.ts
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// Configurar o cliente do MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
  }
});

export const preferenceClient = new Preference(client);
export const paymentClient = new Payment(client);
export default client;