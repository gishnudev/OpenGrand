import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import ABI from '../assets/OpenGrant.json';
import address from '../assets/deployed_addresses.json';

const AllApplications = ({ contract }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  

  const cAbi = ABI.abi;
  const cAddress = address['GrantModule#OpenGrant'];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('Ethereum provider not found. Install Metamask.');
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer =await provider.getSigner()
        const cAbi = ABI.abi;
        const cAddress = address['GrantModule#OpenGrant']
        const contractInstance = new ethers.Contract(cAddress,cAbi,signer)

        const allApplications = await contractInstance.viewAllApplications();
        const formattedApplications = allApplications.map((app, index) => ({
          applicantId: index,  // Use the index as applicantId
          studentName: app[0],
          age: app[1].toString(),
          studentQualification: app[2],
          studentPassYear: app[3].toString(),
          grade: app[4],
          percentage: app[5].toString(),
          isSubmitted: app[6],
          isApproved: app[7],
          documentImageURL: app[8],
          buttonText: app[6] ? 'Approved' : 'Approve Application'
        }));

        setApplications(formattedApplications);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [contract, cAbi, cAddress]);

  const approveApplication = async (applicantIndex) => {
    try {
      if (!window.ethereum) {
        throw new Error('Ethereum provider not found. Install Metamask.');
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer =await provider.getSigner()
      const cAbi = ABI.abi;
      const cAddress = address['GrantModule#OpenGrant']
      const contractInstance = new ethers.Contract(cAddress, cAbi, signer);
      // console.log(contractInstance);
      
  
      // Get the correct Ethereum address from the applicants array
      // const applicantAddress = await contractInstance.applicants();
      // console.log(applicantAddress);
      
      // setData(applicantAddress)
      // console.log(data);

      // console.log(applicantAddress);

      console.log("Sending transaction to approve application...");
      const tx = await contractInstance.approveApplication('0x70997970C51812dc3A010C7d01b50e0d17dc79C8'); // Pass the address instead of index
      console.log("Transaction sent:", tx);
  
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction mined:", tx);
  
      // After approval, update the application state
      setApplications(prevApplications =>
        prevApplications.map((app, i) =>
          i === applicantIndex ? { ...app, isApproved: true, buttonText: 'Approved' } : app
        )
      );
    } catch (err) {
      console.error("Error approving application:", err);
      setError(err.message || "An unexpected error occurred while approving the application.");
    }
  };
  
  
  return (
    <div className='text-white p-6'>
      <h2 className='text-2xl font-bold mb-4'>All Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <table className='w-full table-auto border-collapse border border-gray-500'>
          <thead>
            <tr>
              <th className='border border-gray-400 px-4 py-2'>Applicant ID</th>
              <th className='border border-gray-400 px-4 py-2'>Student Name</th>
              <th className='border border-gray-400 px-4 py-2'>Age</th>
              <th className='border border-gray-400 px-4 py-2'>Qualification</th>
              <th className='border border-gray-400 px-4 py-2'>Graduation Year</th>
              <th className='border border-gray-400 px-4 py-2'>Grade</th>
              <th className='border border-gray-400 px-4 py-2'>Score</th>
              <th className='border border-gray-400 px-4 py-2'>Approved</th>
              <th className='border border-gray-400 px-4 py-2'>IPFS Link</th>
              <th className='border border-gray-400 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <tr key={index} className='border border-gray-500 text-white'>
                  <td className='border border-gray-400 px-4 py-2'>{application.applicantId}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.studentName}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.age}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.studentQualification}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.studentPassYear}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.grade}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.percentage}</td>
                  <td className='border border-gray-400 px-4 py-2'>{application.isApproved ? 'Yes' : 'No'}</td>
                  <td className='border border-gray-400 px-4 py-2'>
                    <a href={application.documentImageURL} target="_blank" rel="noopener noreferrer">View Document</a>
                  </td>
                  <td>
                    <button 
                      className='bg-slate-600 p-1 rounded-sm' 
                      onClick={() => approveApplication(index)}
                      disabled={application.isApproved} // Disable if already approved
                    >
                      {application.buttonText}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='10' className='text-center p-4'>No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllApplications;
