import React, { useState } from 'react';
import axios from 'axios';

function AdminPaymentTrack() {
  const [purchaseId, setPurchaseId] = useState('');
  const [payments, setPayments] = useState([]);
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('accessToken');
  const searchPayments = async () => {
    try {
      const response = await axios.get(`${url}/api/purchases/payments/${purchaseId}`,{
        headers: { Authorization: `Bearer ${token}` }
        }); 
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition duration-300">
      <h3 className="text-xl font-bold text-blue-600 mb-4">Payment Track</h3>
      <label htmlFor="purchaseId" className="block text-sm font-medium text-gray-600 text-left mx-2">
        Enter Purchase ID:
      </label>
      <div className='flex items-center'>
        <input
          type="text"
          id="purchaseId"
          value={purchaseId}
          onChange={(e) => setPurchaseId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        />
        <button 
          onClick={searchPayments}
          className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-10">
          Search
        </button>
      </div>
      

      {payments.length!==0 && (
        <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{payment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{payment.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default AdminPaymentTrack;
