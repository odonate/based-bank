const isZeroAddress = (address) => {
  const zeroAddressRegex = /^(0x)?0+$/i;
  return zeroAddressRegex.test(address);
};

const isValidAddress = (address) => {
  const contractAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return contractAddressRegex.test(address);
}
