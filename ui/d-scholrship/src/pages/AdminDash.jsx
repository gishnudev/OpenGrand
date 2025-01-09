import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import OpenGrant from '../assets/OpenGrant.json'; // Replace with actual ABI path
import address from '../assets/deployed_addresses.json';

const CONTRACT_ADDRESS = address['GrantModule#OpenGrant']; // Replace with your contract address

function AdminPanel() {
  const [applicants, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);  // State to track approval process
  const [rejecting, setRejecting] = useState(false);  // State to track rejection process

  // Fetch applications from smart contract
  useEffect(() => {
    const fetchApplications = async () => {
      if (!window.ethereum) return alert('Please install MetaMask!');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, OpenGrant.abi, provider);

      try {
        const apps = await contract.viewAllApplications();

        // Log the fetched data to check its structure
        console.log('Fetched Applications:', apps);

        // If apps is an array of tuples, map each tuple into an object
        if (Array.isArray(apps)) {
          // Fetching applicant address along with other details
          const applicantDetails = await Promise.all(apps.map(async (app, index) => {
            const applicantAddress = await contract.applicants(index); // Fetch applicant's address from the contract
            return {
              applicantAddress,  // Add applicant address here
              studentName: app[0], // string
              studentAge: app[1].toString(), // uint256 (converted to string)
              studentQualification: app[2], // string
              studentPassYear: app[3].toString(), // uint256 (converted to string)
              grade: app[4], // string
              percentage: app[5].toString(), // uint256 (converted to string)
              isSubmitted: app[6], // bool
              isApproved: app[7], // bool
              documentImageURL: app[8], // string
            };
          }));

          setApplications(applicantDetails);
        } else {
          console.error('Returned data is not an array:', apps);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const approveApplication = async (index) => {
    if (!window.ethereum) return alert('Please install MetaMask!');
    
    try {
      // Request access to the user's Ethereum account
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, OpenGrant.abi, signer);
    
      // Get applicant address from applicants array
      const applicantAddress = applicants[index].applicantAddress;
      console.log('Applicant Address:', applicantAddress);

      // Set approving state to true to disable the button
      setApproving(true);

      // Call the approveApplication function in the contract
      const tx = await contract.approveApplication(applicantAddress);
      await tx.wait();  // Wait for the transaction to be mined

      // Update the UI with the new approval status
      const updatedApplications = applicants.map((app, idx) =>
        idx === index ? { ...app, isApproved: true } : app
      );
      setApplications(updatedApplications);

      alert('Application approved successfully!');
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed');
    } finally {
      // Set approving state back to false after the transaction
      setApproving(false);
    }
  };

 

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants.map((app, index) => (
            <div key={index} className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-xl font-semibold">{app.studentName}</h2>
              <p>Age: {app.studentAge}</p>
              <p>Qualification: {app.studentQualification}</p>
              <p>Pass Year: {app.studentPassYear}</p>
              <p>Grade: {app.grade}</p>
              <p>Percentage: {app.percentage}%</p>
              <p>Approved: {app.isApproved ? 'Yes' : 'No'}</p>
              <p>Submitted: {app.isSubmitted ? 'Yes' : 'No'}</p>
              <p>Document URL: <a href={app.documentImageURL} target="_blank" rel="noopener noreferrer">View Document</a></p>
              <button
                onClick={() => approveApplication(index)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={app.isApproved || approving}  // Disable if already approved or in the middle of approval process
              >
                {approving ? 'Varifying...' : 'Varify'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
