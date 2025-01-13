import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import OpenGrant from '../assets/OpenGrant.json'; // Replace with actual ABI path
import address from '../assets/deployed_addresses.json';

const CONTRACT_ADDRESS = address['GrantModule#OpenGrant']; // Replace with your contract address

function AdminPanel() {
  const [applicants, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingIndex, setApprovingIndex] = useState(null); // Track which index is being approved

  // Fetch applications from smart contract
  useEffect(() => {
    const fetchApplications = async () => {
      if (!window.ethereum) return alert('Please install MetaMask!');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, OpenGrant.abi, provider);

      try {
        const apps = await contract.viewAllApplications();

        if (Array.isArray(apps)) {
          const applicantDetails = await Promise.all(
            apps.map(async (app, index) => {
              const applicantAddress = await contract.applicants(index);
              return {
                applicantAddress,
                studentName: app[0],
                studentAge: app[1].toString(),
                studentQualification: app[2],
                studentPassYear: app[3].toString(),
                grade: app[4],
                percentage: app[5].toString(),
                isSubmitted: app[6],
                isApproved: app[7],
                documentImageURL: app[8],
              };
            })
          );

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
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, OpenGrant.abi, signer);

      const applicantAddress = applicants[index].applicantAddress;

      // Track which index is being approved
      setApprovingIndex(index);

      const tx = await contract.approveApplication(applicantAddress);
      await tx.wait();

      const updatedApplications = applicants.map((app, idx) =>
        idx === index ? { ...app, isApproved: true } : app
      );
      setApplications(updatedApplications);

      alert('Application approved successfully!');
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed');
    } finally {
      // Reset approving index
      setApprovingIndex(null);
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
              <p>
                Document URL:{' '}
                <a href={app.documentImageURL} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
              <button
                onClick={() => approveApplication(index)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={app.isApproved || approvingIndex === index} // Disable only the button for the application being processed
              >
                {approvingIndex === index ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
