import { DataTable } from "@/components/Layout/Invoicing/DataTable";
import {
  columns,
  InvoicingType,
} from "@/components/Layout/Invoicing/columns";
import React from "react";

const Invoicing = () => {
  const InvoicingData = [
    {
      transactionId: 'trx001',
      invoiceId: 'inv001',
      orderId: 'order001',
      purchaseName: 'Product A',
      amount: 100,
      dueDate: '2023-11-15',
      status: 'Paid',
      PaidOn: '2023-11-10',
      paymentMethod: 'Credit Card'
    },
    {
      transactionId: 'trx002',
      invoiceId: 'inv002',
      orderId: 'order002',
      purchaseName: 'Product B',
      amount: 75,
      dueDate: '2023-11-20',
      status: 'Sent',
      PaidOn: '2023-11-18',
      paymentMethod: 'PayPal'
    },
    {
      transactionId: 'trx003',
      invoiceId: 'inv003',
      orderId: 'order003',
      purchaseName: 'Product C',
      amount: 50,
      dueDate: '2023-11-25',
      status: 'Overdue',
      PaidOn: '2023-11-24',
      paymentMethod: 'Bank Transfer'
    },
    {
      transactionId: 'trx004',
      invoiceId: 'inv004',
      orderId: 'order004',
      purchaseName: 'Product D',
      amount: 120,
      dueDate: '2023-11-30',
      status: 'Sent',
      PaidOn: '2023-11-27',
      paymentMethod: 'Cryptocurrency'
    },
    {
      transactionId: 'trx005',
      invoiceId: 'inv005',
      orderId: 'order005',
      purchaseName: 'Product E',
      amount: 90,
      dueDate: '2023-12-05',
      status: 'Paid',
      PaidOn: '2023-12-02',
      paymentMethod: 'Debit Card'
    }
  ];
  
  
  return (
    <section>
      <DataTable columns={columns} data={InvoicingData} />
    </section>
  );
};

export default Invoicing;
