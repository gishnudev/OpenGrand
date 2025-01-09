const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GrantModule", (m) => {
  const OpenGrant = m.contract("OpenGrant", [
    Math.floor(Date.now() / 1000) + 60,    // Start time: 1 min from now
    Math.floor(Date.now() / 1000) + 60 + (2 * 24 * 60 * 60)   // End time: 2 days after start time
  ], {
    value: 5000000000000000000000n         // 5000 ETH in Wei as bigint
  });

  return { OpenGrant };
});
