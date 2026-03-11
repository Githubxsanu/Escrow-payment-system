import { useState, useEffect } from 'react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';

// Contract Address (Mock for now, replace with actual deployed address on Sepolia/Mainnet)
export const ESCROW_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";

// Minimal ABI for the EscrowPlatform contract
export const ESCROW_ABI = [
  "function createEscrow(address _seller, uint256 _deadline) external returns (uint256)",
  "function depositFunds(uint256 _escrowId) external payable",
  "function markDelivered(uint256 _escrowId) external",
  "function confirmDelivery(uint256 _escrowId) external",
  "function releasePayment(uint256 _escrowId) public",
  "function refundBuyer(uint256 _escrowId) external",
  "function openDispute(uint256 _escrowId) external",
  "function getEscrowDetails(uint256 _escrowId) external view returns (address buyer, address seller, uint256 amount, uint256 createdAt, uint256 deadline, uint8 status)",
  "event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, uint256 deadline)",
  "event FundsDeposited(uint256 indexed escrowId, uint256 amount)",
  "event DeliveryMarked(uint256 indexed escrowId)",
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
          
          const web3Signer = await web3Provider.getSigner();
          setSigner(web3Signer);
          
          const escrowContract = new Contract(
            ESCROW_CONTRACT_ADDRESS,
            ESCROW_ABI,
            web3Signer
          );
          setContract(escrowContract);
          setIsReady(true);
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      }
    };

    initProvider();
  }, []);

  // --- Contract Interactions ---

  const createEscrow = async (sellerAddress: string, deadlineTimestamp: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.createEscrow(sellerAddress, deadlineTimestamp);
    return await tx.wait();
  };

  const depositFunds = async (escrowId: number, amountInEth: string) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.depositFunds(escrowId, {
      value: parseEther(amountInEth)
    });
    return await tx.wait();
  };

  const markDelivered = async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.markDelivered(escrowId);
    return await tx.wait();
  };

  const confirmDelivery = async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.confirmDelivery(escrowId);
    return await tx.wait();
  };

  const refundBuyer = async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.refundBuyer(escrowId);
    return await tx.wait();
  };

  const openDispute = async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const tx = await contract.openDispute(escrowId);
    return await tx.wait();
  };

  const getEscrowDetails = async (escrowId: number) => {
    if (!contract) throw new Error("Contract not initialized");
    const details = await contract.getEscrowDetails(escrowId);
    
    // Map the uint8 status to our string enum
    const statusMap = ['Created', 'Funded', 'Delivered', 'Completed', 'Refunded', 'Disputed'];
    
    return {
      buyer: details.buyer,
      seller: details.seller,
      amount: formatEther(details.amount),
      createdAt: Number(details.createdAt),
      deadline: Number(details.deadline),
      status: statusMap[Number(details.status)] || 'Unknown'
    };
  };

  return {
    provider,
    signer,
    contract,
    isReady,
    createEscrow,
    depositFunds,
    markDelivered,
    confirmDelivery,
    refundBuyer,
    openDispute,
    getEscrowDetails
  };
}
