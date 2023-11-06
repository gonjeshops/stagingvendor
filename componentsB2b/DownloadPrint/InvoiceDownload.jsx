import ReactPDF from '@react-pdf/renderer';

// workinng on this code


export const InvoiceDownload = ({ invoiceData, children }) => {
  const items = [
    { name: 'Item 1', price: 10 },
    { name: 'Item 2', price: 20 },
    { name: 'Item 3', price: 30 },
    { name: 'Item 4', price: 40 },
    { name: 'Item 5', price: 50 },
  ];

  const InvoiceContent = (
    <div className="invoice p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Invoice</h1>
      <div className="flex justify-between">
        <div className="text-sm">
          Invoice Date: {invoiceData?.date}
        </div>
        <div className="text-sm">
          Due Date: {invoiceData?.dueDate}
        </div>
      </div>
      <hr className="my-4 border-t border-gray-400" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td className="text-right">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="text-right">Subtotal: {invoiceData?.subtotal}</p>
        <p className="text-right">Tax: {invoiceData?.tax}</p>
        <p className="text-right font-semibold text-lg">Total: {invoiceData?.total}</p>
      </div>
    </div>
  );

  const handleDownload = () => {
    const blob = ReactPDF.renderToBlob(<InvoiceContent />);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'invoice.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>
      {children}
    </button>
  );
};
