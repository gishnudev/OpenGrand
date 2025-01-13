const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GrantModule", (m) => {
  // Set the start and end times for the scholarship application period
  const startTime = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  const endTime = startTime + (2 * 24 * 60 * 60); // 2 days after start time

  // Deploy the contract with the specified start and end times, and the initial value of 10,000 Wei
  const OpenGrant = m.contract("OpenGrant", [startTime, endTime], {
    value: 10000n, // Send 10,000 Wei for contract initialization
  });

  return { OpenGrant };
});
