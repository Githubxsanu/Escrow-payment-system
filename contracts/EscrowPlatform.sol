// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EscrowPlatform {
    enum EscrowStatus { Created, Funded, Delivered, Accepted, Completed, Refunded, Disputed }

    struct Escrow {
        address payable buyer;
        address payable seller;
        uint256 amount;
        uint256 createdAt;
        uint256 deadline;
        EscrowStatus status;
    }

    uint256 public escrowCounter;
    mapping(uint256 => Escrow) public escrows;
    address public agent;

    constructor() {
        agent = msg.sender;
    }

    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, uint256 deadline);
    event FundsDeposited(uint256 indexed escrowId, uint256 amount);
    event DeliveryMarked(uint256 indexed escrowId);
    event DeliveryAccepted(uint256 indexed escrowId);
    event PaymentReleased(uint256 indexed escrowId, address to, uint256 amount);
    event RefundIssued(uint256 indexed escrowId, address to, uint256 amount);
    event DisputeOpened(uint256 indexed escrowId, address openedBy);

    modifier onlyBuyer(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].buyer, "Only the buyer can call this function");
        _;
    }

    modifier onlySeller(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].seller, "Only the seller can call this function");
        _;
    }

    modifier onlyAgent() {
        require(msg.sender == agent, "Only the agent can call this function");
        _;
    }

    modifier inState(uint256 _escrowId, EscrowStatus _status) {
        require(escrows[_escrowId].status == _status, "Invalid escrow state for this action");
        _;
    }

    function createEscrow(address payable _seller, uint256 _deadline) external returns (uint256) {
        require(_seller != address(0), "Invalid seller address");
        require(_seller != msg.sender, "Buyer and seller cannot be the same address");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        escrowCounter++;
        uint256 newEscrowId = escrowCounter;

        escrows[newEscrowId] = Escrow({
            buyer: payable(msg.sender),
            seller: _seller,
            amount: 0,
            createdAt: block.timestamp,
            deadline: _deadline,
            status: EscrowStatus.Created
        });

        emit EscrowCreated(newEscrowId, msg.sender, _seller, 0, _deadline);
        return newEscrowId;
    }

    function depositFunds(uint256 _escrowId) external payable onlyBuyer(_escrowId) inState(_escrowId, EscrowStatus.Created) {
        require(msg.value > 0, "Deposit amount must be greater than 0");

        escrows[_escrowId].amount = msg.value;
        escrows[_escrowId].status = EscrowStatus.Funded;

        emit FundsDeposited(_escrowId, msg.value);
    }

    function markDelivered(uint256 _escrowId) external onlySeller(_escrowId) inState(_escrowId, EscrowStatus.Funded) {
        escrows[_escrowId].status = EscrowStatus.Delivered;
        emit DeliveryMarked(_escrowId);
    }

    function acceptDelivery(uint256 _escrowId) external onlyBuyer(_escrowId) inState(_escrowId, EscrowStatus.Delivered) {
        escrows[_escrowId].status = EscrowStatus.Accepted;
        emit DeliveryAccepted(_escrowId);
    }

    function confirmDelivery(uint256 _escrowId) external onlyAgent inState(_escrowId, EscrowStatus.Accepted) {
        escrows[_escrowId].status = EscrowStatus.Completed;
        releasePayment(_escrowId);
    }

    function releasePayment(uint256 _escrowId) public {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.status == EscrowStatus.Completed, "Escrow is not completed yet");
        require(escrow.amount > 0, "No funds available to release");

        uint256 paymentAmount = escrow.amount;
        escrow.amount = 0; 

        (bool success, ) = escrow.seller.call{value: paymentAmount}("");
        require(success, "Transfer to seller failed");

        emit PaymentReleased(_escrowId, escrow.seller, paymentAmount);
    }

    function refundBuyer(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.buyer || msg.sender == escrow.seller || msg.sender == agent, "Not authorized");
        require(escrow.status == EscrowStatus.Funded || escrow.status == EscrowStatus.Delivered || escrow.status == EscrowStatus.Disputed, "Invalid state for refund");

        bool isSeller = msg.sender == escrow.seller;
        bool isBuyerPastDeadline = (msg.sender == escrow.buyer && block.timestamp > escrow.deadline && escrow.status != EscrowStatus.Delivered);
        bool isAgentDispute = (msg.sender == agent && escrow.status == EscrowStatus.Disputed);
        
        require(isSeller || isBuyerPastDeadline || isAgentDispute, "Refund conditions not met");

        escrow.status = EscrowStatus.Refunded;
        uint256 refundAmount = escrow.amount;
        escrow.amount = 0; 

        if (refundAmount > 0) {
            (bool success, ) = escrow.buyer.call{value: refundAmount}("");
            require(success, "Transfer to buyer failed");
        }

        emit RefundIssued(_escrowId, escrow.buyer, refundAmount);
    }

    function openDispute(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.buyer || msg.sender == escrow.seller, "Only buyer or seller can open a dispute");
        require(escrow.status == EscrowStatus.Funded || escrow.status == EscrowStatus.Delivered, "Cannot open dispute in current state");

        escrow.status = EscrowStatus.Disputed;
        
        emit DisputeOpened(_escrowId, msg.sender);
    }

    function getEscrowDetails(uint256 _escrowId) external view returns (
        address buyer,
        address seller,
        uint256 amount,
        uint256 createdAt,
        uint256 deadline,
        EscrowStatus status
    ) {
        Escrow memory e = escrows[_escrowId];
        return (e.buyer, e.seller, e.amount, e.createdAt, e.deadline, e.status);
    }
}