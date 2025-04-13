// cashfree.d.ts
declare module 'cashfree-sdk' {
    export interface CashfreeOrderResponse {
      payment_session_id: string;
      order_id: string;
      // Add other properties based on the Cashfree response
    }
  
    export interface CashfreePaymentRequest {
      order_amount: number;
      order_currency: string;
      order_id: string;
      customer_details: {
        customer_id: string;
        customer_email: string;
        customer_phone: string;
      };
      order_note: string;
    }
  
    export function createPaymentOrder(request: CashfreePaymentRequest): Promise<CashfreeOrderResponse>;
  }
  