import React, { useState, useEffect } from "react";
import ABI from '../assets/OpenGrant.json'; // Ensure correct ABI is used
import deployedAddress from "../assets/deployed_addresses.json"; // Ensure address file is correct
import { ethers } from "ethers"; // Update import for consistency
import axios from "axios";

const ApplicationForm = () => {
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentAge: "",
    studentQualification: "",
    studentPassYear: "",
    grade: "",
    percentage: "",
    file: null,
  });
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const initProvider = () => {
      if (typeof window.ethereum !== "undefined") {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
      } else {
        setStatus("MetaMask is not installed. Please install MetaMask and refresh the page.");
      }
    };
    initProvider();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleFileUpload = async () => {
    if (!formData.file) {
      alert("Please upload a file");
      return null;
    }

    try {
      setUploading(true);
      const fileData = new FormData();
      fileData.append("file", formData.file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            pinata_api_key: "6f28a0aae06dadd1c2ea",
            pinata_secret_api_key: "46bc155031365444b927538250d3476d7a81fdb5238c04b12f940af1dfbabba2",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setFileUrl(url);
      setUploading(false);
      return url;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      setUploading(false);
      alert("File upload failed. Please try again.");
      return null;
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: "",
      studentAge: "",
      studentQualification: "",
      studentPassYear: "",
      grade: "",
      percentage: "",
      file: null,
    });
    setFileUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.file) {
      setStatus("Please upload a document image.");
      return;
    }

    try {
      setStatus("Uploading document to IPFS...");
      const uploadedFileUrl = await handleFileUpload();

      if (!uploadedFileUrl) {
        setStatus("File upload failed.");
        return;
      }

      // Get the signer from the provider
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer =await provider.getSigner()
      const cAbi = ABI.abi;
      const cAddress = deployedAddress['GrantModule#OpenGrant']
      const contractInstance = new ethers.Contract(cAddress,cAbi,signer)
  

      // Interact with the contract to submit the application
      const trx = await contractInstance.submitApplication(
        formData.studentName,
        parseInt(formData.studentAge),
        formData.studentQualification,
        parseInt(formData.studentPassYear),
        formData.grade,
        parseInt(formData.percentage),
        uploadedFileUrl
      );

      setStatus(`Transaction submitted. Hash: ${trx.hash}`);
      await trx.wait(); // Wait for the transaction to be mined
      setStatus("Application submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <p className="py-3">
          Name:
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <p className="py-3">
          Age:
          <input
            type="number"
            name="studentAge"
            value={formData.studentAge}
            onChange={handleChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <p className="py-3">
          Qualification (MSc or MCA):
          <input
            type="text"
            name="studentQualification"
            value={formData.studentQualification}
            onChange={handleChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <p className="py-3">
          Pass-out Year (2024):
          <input
            type="number"
            name="studentPassYear"
            value={formData.studentPassYear}
            onChange={handleChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <p className="py-3">
          Grade:
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <p className="py-3">
          Percentage (Min 80%):
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            className="ml-2 text-black"
            min="80"
            required
          />
        </p>
        <p className="py-3">
          Document Image:
          <input
            type="file"
            name="documentImage"
            onChange={handleFileChange}
            className="ml-2 text-black"
            required
          />
        </p>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
      {status && <p className="mt-4 text-red-500">{status}</p>}
    </div>
  );
};

export default ApplicationForm;
