import { InjectedConnector } from '@web3-react/injected-connector';
import { networkConstants } from '@constants';

export const injected = new InjectedConnector({
  supportedChainIds: networkConstants.SUPPORTED_CHAIN_IDS,
});
