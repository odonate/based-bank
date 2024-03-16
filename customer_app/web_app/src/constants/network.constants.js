import ArbitrumLogo from '../images/venues/arbitrum.png';
import BaseLogo from '../images/venues/base.png';
import EthereumLogo from '../images/venues/ethereum.png';

// EIP-3085: Wallet Add Ethereum Chain RPC Method
const networkParams = {
  "1": {
    chainId: "0x1",
    rpcUrls: ["https://palpable-multi-meme.discover.quiknode.pro/5581f0b3739de9d697ba8863f64cfd6968682679"],
    chainName: "Ethereum",
    nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://etherscan.io"],
  },
  "8453": {
    chainId: "0x2105",
    rpcUrls: ["https://mainnet.base.org/"],
    chainName: "Base",
    nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://basescan.org/"],
  },
  "42161": {
    chainId: "0xa4b1",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    chainName: "Arbitrum One",
    nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://arbiscan.io"],
  },
};

const venueToChainId = {
  "ethereum": "1",
  "base": "8453",
  "arbitrum": "42161",
}

const chainIdToVenue = {
  "1": "ethereum",
  "8453": "base",
  "42161": "arbitrum",
}

const chainIdToLogo = {
  "1": EthereumLogo,
  "8453": BaseLogo,
  "42161": ArbitrumLogo,
}

export const networkConstants = {
  CHAIN_IDS: [1, 8453, 42161],
  PARAMS: networkParams,
  VENUE_TO_ID: venueToChainId,
  ID_TO_VENUE: chainIdToVenue,
  ID_TO_LOGO: chainIdToLogo,
};
