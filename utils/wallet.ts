import { BrowserProvider, Signer } from 'ethers';

// Extend window object for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const accounts = await provider.send('eth_accounts', []);
    const address = accounts[0];
    const signer = await provider.getSigner(address);
    const network = await provider.getNetwork();
    
    return { address, network, signer, provider };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const getWalletAddress = async () => {
  if (typeof window === 'undefined' || !window.ethereum) return null;
  
  try {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_accounts', []);
    if (accounts.length > 0) {
      const address = accounts[0];
      const signer = await provider.getSigner(address);
      const network = await provider.getNetwork();
      return { address, network, signer, provider };
    }
    return null;
  } catch (error) {
    console.error('Error getting wallet address:', error);
    return null;
  }
};

export const disconnectWallet = async () => {
  // MetaMask doesn't have a true disconnect method via API that revokes permissions
  // but we can clear local state.
  return true;
};

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
