'use client';

import { useState, useEffect, useCallback } from 'react';
import { connectWallet, getWalletAddress, disconnectWallet, formatAddress } from '@/utils/wallet';
import { Signer, BrowserProvider, Network } from 'ethers';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = useCallback(async () => {
    const data = await getWalletAddress();
    if (data) {
      setAddress(data.address);
      setNetwork(data.network);
      setSigner(data.signer);
      setProvider(data.provider);
    } else {
      setAddress(null);
      setNetwork(null);
      setSigner(null);
      setProvider(null);
    }
  }, []);

  useEffect(() => {
    checkConnection();

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          checkConnection();
        } else {
          handleDisconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [checkConnection]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const data = await connectWallet();
      setAddress(data.address);
      setNetwork(data.network);
      setSigner(data.signer);
      setProvider(data.provider);
    } catch (err: any) {
      if (err.code === 'ACTION_REJECTED' || err?.info?.error?.code === 4001) {
        setError('Connection rejected by user.');
      } else {
        setError(err.message || 'Failed to connect wallet');
      }
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setAddress(null);
    setNetwork(null);
    setSigner(null);
    setProvider(null);
  };

  return {
    address,
    shortAddress: address ? formatAddress(address) : '',
    network,
    signer,
    provider,
    isConnecting,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}
