import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';

// Contract Address
// Will draw from the .env file variable securely, otherwise gracefully falls back to the public testnet address
export const ESCROW_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || "0x31a98074c02F42328431bab9F670314a762f2e80";

// Minimal ABI for the EscrowPlatform contract
export const ESCROW_ABI = [
  "function createEscrow(address _seller, uint256 _deadline) external returns (uint256)",
  "function depositFunds(uint256 _escrowId) external payable",
  "function markDelivered(uint256 _escrowId) external",
  "function acceptDelivery(uint256 _escrowId) external",
  "function confirmDelivery(uint256 _escrowId) external",
  "function releasePayment(uint256 _escrowId) public",
  "function refundBuyer(uint256 _escrowId) external",
  "function openDispute(uint256 _escrowId) external",
  "function getEscrowDetails(uint256 _escrowId) external view returns (address buyer, address seller, uint256 amount, uint256 createdAt, uint256 deadline, uint8 status)",
  "function escrowCounter() external view returns (uint256)",
  "function agent() external view returns (address)",
  "event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, uint256 deadline)",
  "event FundsDeposited(uint256 indexed escrowId, uint256 amount)",
  "event DeliveryMarked(uint256 indexed escrowId)",
  "event DeliveryAccepted(uint256 indexed escrowId)",
  "event PaymentReleased(uint256 indexed escrowId, address to, uint256 amount)",
  "event RefundIssued(uint256 indexed escrowId, address to, uint256 amount)",
  "event DisputeOpened(uint256 indexed escrowId, address openedBy)"
];

export function useEscrowContract() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const web3Provider = new BrowserProvider((window as any).ethereum);
          setProvider(web3Provider);
          
          const accounts = await web3Provider.send('eth_accounts', []);
          if (accounts.length > 0) {
            const web3Signer = await web3Provider.getSigner(accounts[0]);
            setSigner(web3Signer);
          
            const escrowContract = new Contract(
              ESCROW_CONTRACT_ADDRESS,
              ESCROW_ABI,
              web3Signer
            );
            setContract(escrowContract);
            setIsReady(true);
          } else {
            setSigner(null);
            setContract(null);
            setIsReady(false);
          }
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      }
    };

    initProvider();

    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const handleAccountsChanged = () => {
        initProvider();
      };
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  // --- Contract Interactions ---

  const createEscrow = useCallback(async (sellerAddress: string, deadlineTimestamp: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.createEscrow(sellerAddress, deadlineTimestamp);
    return await tx.wait();
  }, [contract]);

  const depositFunds = useCallback(async (escrowId: number, amountInEth: string) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.depositFunds(escrowId, {
      value: parseEther(amountInEth)
    });
    return await tx.wait();
  }, [contract]);

  const markDelivered = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.markDelivered(escrowId);
    return await tx.wait();
  }, [contract]);

  const acceptDelivery = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.acceptDelivery(escrowId);
    return await tx.wait();
  }, [contract]);

  const confirmDelivery = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.confirmDelivery(escrowId);
    return await tx.wait();
  }, [contract]);

  const refundBuyer = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.refundBuyer(escrowId);
    return await tx.wait();
  }, [contract]);

  const openDispute = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.openDispute(escrowId);
    return await tx.wait();
  }, [contract]);

  const getEscrowDetails = useCallback(async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const details = await contract.getEscrowDetails(escrowId);
    
    // Map the uint8 status to our string enum
    const statusMap = ['Created', 'Funded', 'Delivered', 'Accepted', 'Completed', 'Refunded', 'Disputed'];
    
    return {
      id: escrowId,
      buyer: details.buyer,
      seller: details.seller,
      amount: formatEther(details.amount),
      createdAt: Number(details.createdAt),
      deadline: Number(details.deadline),
      status: statusMap[Number(details.status)] || 'Unknown'
    };
  }, [contract]);

  const getAgent = useCallback(async () => {
    if (!contract) return null;
    try {
      return await contract.agent();
    } catch (e) {
      console.error("Failed to fetch agent", e);
      return null;
    }
  }, [contract]);

  const getAllEscrows = useCallback(async () => {
    if (!contract) return [];
    try {
      const counter = await contract.escrowCounter();
      const count = Number(counter);
      const allEscrows = [];
      for (let i = 1; i <= count; i++) {
        const details = await getEscrowDetails(i);
        allEscrows.push(details);
      }
      return allEscrows;
    } catch (error) {
      console.error("Failed to fetch all escrows:", error);
      return [];
    }
  }, [contract, getEscrowDetails]);

  return {
    provider,
    signer,
    contract,
    isReady,
    createEscrow,
    depositFunds,
    markDelivered,
    acceptDelivery,
    confirmDelivery,
    refundBuyer,
    openDispute,
    getEscrowDetails,
    getAgent,
    getAllEscrows
  };
}
