import {useState} from 'react';
import { FaEnvelope, FaAngleDown } from 'react-icons/fa';

const DocumentTable = () => {
  const data = [
    { id: 1, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 2, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 3, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 4, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 5, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 6, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 7, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 8, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 9, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 10, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 12, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    { id: 13, name: 'Document 1', date: '2023-08-17', size: '2.5 MB', status: 'Pending' },
    // ... Add more data entries
  ];

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

    const handleChange = () => {

    }

  return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="min-w-full table-auto lg:w-full">
        <thead>
          <tr className='border-y border-light300'>
            <th className=" py-4 text-start ">
            <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+document.id}
                    checked={selectedOption === 'option'+document.id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
            </th>
            <th className="px-2 py-4 border-r border-light300 text-start">SUPPLIER NAME</th>
            <th className="px-2 py-4 border-r border-light300 text-start">
              <div className="flex items-center">
                <div className="rounded-full w-7 h-7 bg-green-200 text-green-600 flex justify-center items-center">
                  <FaEnvelope />
                </div>
                <p className="ml-2">BIDDING</p>
                <p className="ml-1">
                  <FaAngleDown />
                </p>
              </div>
            </th>
            <th className="px-2 py-4 border-r border-light300 text-start">
              <div className="flex items-center">
                <div className="rounded-full w-7 h-7 bg-green-200 text-green-600 flex justify-center items-center">
                  <FaEnvelope />
                </div>
                <p className="ml-2">SELLING</p>
                <p className="ml-1">
                  <FaAngleDown />
                </p>
              </div>
            </th>
            <th className="px-2 py-4 border-r border-light300 text-start">
              <div className="flex items-center">
                <div className="rounded-full w-7 h-7 bg-green-200 text-green-600 flex justify-center items-center">
                  <FaEnvelope />
                </div>
                <p className="ml-2">REQUEST ID</p>
                <p className="ml-1">
                  <FaAngleDown />
                </p>
              </div>
            </th>
            <th className="px-2 py-4 text-start">
              <div className="flex items-center">
                <div className="rounded-full w-7 h-7 bg-green-200 text-green-600 flex justify-center items-center">
                  <FaEnvelope />
                </div>
                <p className="ml-2">EXPIRY DATE</p>
                <p className="ml-1">
                  <FaAngleDown />
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((document) => (
            <tr key={document.id} className='border-b border-light300'>
              <td className=" py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+document.id}
                    checked={selectedOption === 'option'+document.id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td>
              <td className="border-r border-light300 px-2 py-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-blue-200 overflow-hidden">

                    </div>
                    <div className="">
                        <p className="font-medium text-blue-600">
                            {`firstName${document.id} lastName${document.id}`}
                        </p>
                        <p>VP Titles</p>
                    </div>
                </div>
              </td>
              <td className="border-r border-light300 px-2 py-4">
                <div className="flex items-center gap-2 text-[10px]">
                    <button className='text-blue-600'>
                        View Request
                    </button>
                    <div className='px-2 py-0 text-blue-600 rounded-sm bg-blue-200 border-blue-300 border'>
                        APPROVED

                    </div>
                    
                </div>
              </td>
              <td className="border-r border-light300 px-2 py-4">{document.size}</td>
              <td className="border-r border-light300 px-2 py-4">{document.status}</td>
              <td className="px-2 py-4">{document.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
