import pptxgen from "pptxgenjs";
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "BlockSafe Team";
pres.title = "BlockSafe Escrow - Capstone Project";

const DARK = "0A0A0C";
const CYAN = "06B6D4";
const VIOLET = "8B5CF6";
const WHITE = "FFFFFF";
const GRAY = "94A3B8";
const EMERALD = "10B981";

// Helper
function addBg(slide) {
  slide.background = { color: DARK };
}

// SLIDE 1 - Title
let s1 = pres.addSlide();
addBg(s1);
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { type: "solid", color: "0F172A" } });
s1.addShape(pres.ShapeType.ellipse, { x: 8, y: 0.5, w: 5, h: 5, fill: { type: "solid", color: CYAN, transparency: 90 } });
s1.addShape(pres.ShapeType.ellipse, { x: -1, y: 3, w: 4, h: 4, fill: { type: "solid", color: VIOLET, transparency: 90 } });
s1.addText("BLOCKSAFE ESCROW", { x: 0.5, y: 1.5, w: "90%", fontSize: 44, fontFace: "Segoe UI", bold: true, color: WHITE, align: "center" });
s1.addText("Decentralized Blockchain Escrow Payment Platform", { x: 0.5, y: 2.5, w: "90%", fontSize: 20, fontFace: "Segoe UI", color: CYAN, align: "center" });
s1.addText("Capstone Project Presentation", { x: 0.5, y: 3.3, w: "90%", fontSize: 16, fontFace: "Segoe UI", color: GRAY, align: "center" });
s1.addText("Powered by Polygon Smart Contracts | SHA-256 Integrity | ECDSA Authentication", { x: 0.5, y: 4.5, w: "90%", fontSize: 12, fontFace: "Segoe UI", color: GRAY, align: "center" });
s1.addText("2026", { x: 0.5, y: 5.5, w: "90%", fontSize: 14, fontFace: "Segoe UI", color: VIOLET, align: "center" });

// SLIDE 2 - Agenda
let s2 = pres.addSlide();
addBg(s2);
s2.addText("AGENDA", { x: 0.5, y: 0.4, w: 5, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const agenda = ["Introduction & Problem Statement", "Objectives", "Technology Stack", "System Architecture", "Smart Contract Design", "Key Features", "How It Works – Escrow Flow", "Hybrid Payment (Crypto + UPI)", "Security Mechanisms", "Results & Demo", "Future Scope", "Conclusion & Q&A"];
agenda.forEach((item, i) => {
  s2.addText(`${String(i + 1).padStart(2, "0")}   ${item}`, { x: 1, y: 1.2 + i * 0.37, w: 10, fontSize: 14, fontFace: "Segoe UI", color: i % 2 === 0 ? WHITE : GRAY });
});

// SLIDE 3 - Problem Statement
let s3 = pres.addSlide();
addBg(s3);
s3.addText("PROBLEM STATEMENT", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const problems = [
  ["Lack of Trust", "Online transactions between strangers lack guarantees — fraud, scams & chargebacks are rampant."],
  ["Centralized Middlemen", "Traditional escrow services charge high fees (3-10%) and introduce single points of failure."],
  ["No Transparency", "Existing payment flows are opaque — buyers/sellers can't independently verify transaction status."],
  ["Limited Access", "Crypto-only platforms exclude billions of UPI users; UPI platforms lack escrow protection."]
];
problems.forEach((p, i) => {
  s3.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.2 + i * 1.1, w: 12, h: 0.95, fill: { type: "solid", color: "1E293B" }, rectRadius: 0.1 });
  s3.addText(p[0], { x: 0.8, y: 1.25 + i * 1.1, w: 3, fontSize: 15, fontFace: "Segoe UI", bold: true, color: VIOLET });
  s3.addText(p[1], { x: 3.5, y: 1.25 + i * 1.1, w: 8.5, fontSize: 13, fontFace: "Segoe UI", color: GRAY });
});

// SLIDE 4 - Objectives
let s4 = pres.addSlide();
addBg(s4);
s4.addText("OBJECTIVES", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const objectives = [
  "Build a decentralized escrow platform using Solidity smart contracts on Polygon.",
  "Implement SHA-256 file integrity verification for digital product delivery.",
  "Integrate ECDSA-based digital signature authentication for all parties.",
  "Create a hybrid payment system supporting both Crypto (MATIC) and UPI.",
  "Develop an AI-driven Computer Agent for automated UPI verification.",
  "Provide transparent, on-chain audit trails for every transaction."
];
objectives.forEach((obj, i) => {
  s4.addShape(pres.ShapeType.ellipse, { x: 0.7, y: 1.3 + i * 0.7, w: 0.3, h: 0.3, fill: { type: "solid", color: i % 2 === 0 ? CYAN : VIOLET } });
  s4.addText(obj, { x: 1.3, y: 1.25 + i * 0.7, w: 11, fontSize: 14, fontFace: "Segoe UI", color: WHITE });
});

// SLIDE 5 - Tech Stack
let s5 = pres.addSlide();
addBg(s5);
s5.addText("TECHNOLOGY STACK", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const techCols = [
  { title: "Frontend", items: ["Next.js 15 (React 19)", "TailwindCSS 4", "Framer Motion", "Lucide Icons"], color: CYAN },
  { title: "Blockchain", items: ["Solidity ^0.8.20", "Polygon Amoy Testnet", "Ethers.js v6", "MetaMask Wallet"], color: VIOLET },
  { title: "Security", items: ["SHA-256 Hashing", "ECDSA Signatures", "OTP Authentication", "Smart Contract Audit"], color: EMERALD },
  { title: "Backend / AI", items: ["Next.js API Routes", "AI Computer Agent", "UPI Payment Gateway", "LocalStorage Records"], color: "F59E0B" }
];
techCols.forEach((col, i) => {
  const xPos = 0.5 + i * 3.15;
  s5.addShape(pres.ShapeType.roundRect, { x: xPos, y: 1.2, w: 2.95, h: 4.5, fill: { type: "solid", color: "1E293B" }, rectRadius: 0.15 });
  s5.addText(col.title, { x: xPos, y: 1.3, w: 2.95, fontSize: 16, fontFace: "Segoe UI", bold: true, color: col.color, align: "center" });
  col.items.forEach((item, j) => {
    s5.addText(`• ${item}`, { x: xPos + 0.2, y: 2.1 + j * 0.6, w: 2.6, fontSize: 12, fontFace: "Segoe UI", color: GRAY });
  });
});

// SLIDE 6 - Architecture
let s6 = pres.addSlide();
addBg(s6);
s6.addText("SYSTEM ARCHITECTURE", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const layers = [
  { label: "Presentation Layer", desc: "Next.js + React UI  |  Responsive Dashboard  |  Motion Animations", color: CYAN, y: 1.3 },
  { label: "Application Layer", desc: "Wallet Hook  |  Escrow Contract Hook  |  UPI Flow Manager  |  API Routes", color: VIOLET, y: 2.5 },
  { label: "Blockchain Layer", desc: "EscrowPlatform.sol  |  Polygon Amoy  |  Ethers.js Provider  |  MetaMask", color: EMERALD, y: 3.7 },
  { label: "Security Layer", desc: "SHA-256 Integrity  |  ECDSA Auth  |  OTP Verification  |  Computer Agent", color: "F59E0B", y: 4.9 }
];
layers.forEach(l => {
  s6.addShape(pres.ShapeType.roundRect, { x: 1, y: l.y, w: 11, h: 0.95, fill: { type: "solid", color: "1E293B" }, line: { color: l.color, width: 1.5 }, rectRadius: 0.1 });
  s6.addText(l.label, { x: 1.3, y: l.y + 0.05, w: 3, fontSize: 14, fontFace: "Segoe UI", bold: true, color: l.color });
  s6.addText(l.desc, { x: 4.5, y: l.y + 0.05, w: 7, fontSize: 12, fontFace: "Segoe UI", color: GRAY });
});
// Arrows between layers
[1.3, 2.5, 3.7].forEach(y => {
  s6.addText("▼", { x: 6, y: y + 0.85, w: 1, fontSize: 16, color: GRAY, align: "center" });
});

// SLIDE 7 - Smart Contract
let s7 = pres.addSlide();
addBg(s7);
s7.addText("SMART CONTRACT DESIGN", { x: 0.5, y: 0.4, w: 10, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
s7.addText("EscrowPlatform.sol — Solidity ^0.8.20 | Deployed on Polygon Amoy", { x: 0.5, y: 1, w: 12, fontSize: 13, fontFace: "Segoe UI", color: GRAY });
const statuses = ["Created", "Funded", "Delivered", "Accepted", "Completed", "Refunded", "Disputed"];
statuses.forEach((st, i) => {
  const c = i < 5 ? CYAN : (i === 5 ? "F59E0B" : "EF4444");
  s7.addShape(pres.ShapeType.roundRect, { x: 0.3 + i * 1.8, y: 1.6, w: 1.6, h: 0.6, fill: { type: "solid", color: "1E293B" }, line: { color: c, width: 1 }, rectRadius: 0.08 });
  s7.addText(st, { x: 0.3 + i * 1.8, y: 1.63, w: 1.6, fontSize: 10, fontFace: "Segoe UI", bold: true, color: c, align: "center" });
});
const funcs = [
  ["createEscrow()", "Buyer initiates escrow with seller address & deadline"],
  ["depositFunds()", "Buyer locks MATIC/ERC-20 tokens into the contract"],
  ["markDelivered()", "Seller confirms product/service delivery"],
  ["acceptDelivery()", "Buyer verifies and accepts the delivery"],
  ["confirmDelivery()", "Agent finalizes — triggers releasePayment()"],
  ["openDispute()", "Either party can raise a dispute for arbitration"],
  ["refundBuyer()", "Refund via seller consent, deadline expiry, or agent ruling"]
];
funcs.forEach((f, i) => {
  s7.addText(f[0], { x: 0.5, y: 2.5 + i * 0.47, w: 2.8, fontSize: 11, fontFace: "Consolas", bold: true, color: VIOLET });
  s7.addText(f[1], { x: 3.5, y: 2.5 + i * 0.47, w: 9, fontSize: 11, fontFace: "Segoe UI", color: GRAY });
});

// SLIDE 8 - Key Features
let s8 = pres.addSlide();
addBg(s8);
s8.addText("KEY FEATURES", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const features = [
  ["🔒", "Secure Payments", "Funds locked in smart contract until all conditions met", CYAN],
  ["📜", "Immutable Contracts", "Code guarantees execution without third-party intermediaries", VIOLET],
  ["👁", "Full Transparency", "Every step verifiable on public Polygon blockchain", EMERALD],
  ["⚖️", "Dispute Resolution", "Built-in arbitration via agent or deadline-based refunds", "F59E0B"],
  ["💳", "Hybrid Payments", "Supports both Crypto (MATIC) and UPI payment modes", CYAN],
  ["🤖", "AI Computer Agent", "Automated real-time verification of UPI settlements", VIOLET]
];
features.forEach((f, i) => {
  const col = i < 3 ? 0 : 1;
  const row = i % 3;
  const xPos = 0.5 + col * 6.3;
  const yPos = 1.3 + row * 1.4;
  s8.addShape(pres.ShapeType.roundRect, { x: xPos, y: yPos, w: 6, h: 1.2, fill: { type: "solid", color: "1E293B" }, rectRadius: 0.1 });
  s8.addText(f[0], { x: xPos + 0.2, y: yPos + 0.1, w: 0.6, fontSize: 22 });
  s8.addText(f[1], { x: xPos + 0.9, y: yPos + 0.05, w: 4.5, fontSize: 14, fontFace: "Segoe UI", bold: true, color: f[3] });
  s8.addText(f[2], { x: xPos + 0.9, y: yPos + 0.55, w: 4.8, fontSize: 11, fontFace: "Segoe UI", color: GRAY });
});

// SLIDE 9 - Escrow Flow
let s9 = pres.addSlide();
addBg(s9);
s9.addText("HOW IT WORKS", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const steps = [
  ["01", "Create Escrow", "Buyer & seller agree on terms, create smart contract", CYAN],
  ["02", "Deposit Funds", "Buyer deposits MATIC into secure escrow contract", VIOLET],
  ["03", "Seller Delivers", "Seller fulfills the service or delivers product", EMERALD],
  ["04", "Buyer Confirms", "Buyer inspects and approves the delivered work", "F59E0B"],
  ["05", "Funds Released", "Smart contract auto-releases funds to seller", CYAN]
];
steps.forEach((st, i) => {
  const xPos = 0.4 + i * 2.5;
  s9.addShape(pres.ShapeType.ellipse, { x: xPos + 0.5, y: 1.5, w: 1.2, h: 1.2, fill: { type: "solid", color: "1E293B" }, line: { color: st[3], width: 2 } });
  s9.addText(st[0], { x: xPos + 0.5, y: 1.7, w: 1.2, fontSize: 18, fontFace: "Segoe UI", bold: true, color: st[3], align: "center" });
  s9.addText(st[1], { x: xPos, y: 2.9, w: 2.2, fontSize: 13, fontFace: "Segoe UI", bold: true, color: WHITE, align: "center" });
  s9.addText(st[2], { x: xPos, y: 3.4, w: 2.2, fontSize: 10, fontFace: "Segoe UI", color: GRAY, align: "center" });
  if (i < 4) s9.addText("→", { x: xPos + 2.0, y: 1.7, w: 0.8, fontSize: 20, color: GRAY, align: "center" });
});
s9.addText("Entire lifecycle managed on-chain with full transparency & zero intermediary fees.", { x: 0.5, y: 4.5, w: 12, fontSize: 13, fontFace: "Segoe UI", color: GRAY, align: "center", italic: true });

// SLIDE 10 - Hybrid Payment
let s10 = pres.addSlide();
addBg(s10);
s10.addText("HYBRID PAYMENT SYSTEM", { x: 0.5, y: 0.4, w: 10, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
// Crypto side
s10.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.3, w: 5.8, h: 4.2, fill: { type: "solid", color: "1E293B" }, line: { color: CYAN, width: 1.5 }, rectRadius: 0.15 });
s10.addText("🔗  Crypto Escrow", { x: 0.8, y: 1.4, w: 5, fontSize: 18, fontFace: "Segoe UI", bold: true, color: CYAN });
["MetaMask wallet connection", "Polygon Amoy Testnet (MATIC)", "On-chain smart contract execution", "Real-time blockchain verification", "Permanent PolygonScan audit trail"].forEach((t, i) => {
  s10.addText(`✦  ${t}`, { x: 1, y: 2.2 + i * 0.55, w: 5, fontSize: 12, fontFace: "Segoe UI", color: GRAY });
});
// UPI side
s10.addShape(pres.ShapeType.roundRect, { x: 6.7, y: 1.3, w: 5.8, h: 4.2, fill: { type: "solid", color: "1E293B" }, line: { color: VIOLET, width: 1.5 }, rectRadius: 0.15 });
s10.addText("📱  UPI Escrow", { x: 7, y: 1.4, w: 5, fontSize: 18, fontFace: "Segoe UI", bold: true, color: VIOLET });
["OTP-based UPI ID authentication", "Dynamic QR code generation", "AI Computer Agent verification", "BSXP unique contract addresses", "Real-time settlement monitoring"].forEach((t, i) => {
  s10.addText(`✦  ${t}`, { x: 7.2, y: 2.2 + i * 0.55, w: 5, fontSize: 12, fontFace: "Segoe UI", color: GRAY });
});
s10.addText("VS", { x: 5.9, y: 2.8, w: 1.2, fontSize: 20, fontFace: "Segoe UI", bold: true, color: WHITE, align: "center" });

// SLIDE 11 - Security
let s11 = pres.addSlide();
addBg(s11);
s11.addText("SECURITY MECHANISMS", { x: 0.5, y: 0.4, w: 10, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const secItems = [
  ["SHA-256 File Integrity", "Every digital product delivery is hashed. Buyer verifies the file hash matches the original before accepting delivery — preventing tampering.", CYAN],
  ["ECDSA Digital Signatures", "All transactions are signed using Elliptic Curve Digital Signature Algorithm via MetaMask, ensuring non-repudiation and authenticity.", VIOLET],
  ["OTP Authentication (UPI)", "UPI users authenticate via one-time passwords sent to linked mobile numbers, adding a second factor of security.", EMERALD],
  ["Smart Contract Modifiers", "onlyBuyer, onlySeller, onlyAgent, and inState modifiers enforce role-based access control at the contract level.", "F59E0B"]
];
secItems.forEach((s, i) => {
  s11.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.2 + i * 1.2, w: 12, h: 1.05, fill: { type: "solid", color: "1E293B" }, line: { color: s[2], width: 1 }, rectRadius: 0.1 });
  s11.addText(s[0], { x: 0.8, y: 1.25 + i * 1.2, w: 3, fontSize: 14, fontFace: "Segoe UI", bold: true, color: s[2] });
  s11.addText(s[1], { x: 4, y: 1.25 + i * 1.2, w: 8.2, fontSize: 11, fontFace: "Segoe UI", color: GRAY });
});

// SLIDE 12 - Results
let s12 = pres.addSlide();
addBg(s12);
s12.addText("RESULTS & OUTCOMES", { x: 0.5, y: 0.4, w: 10, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const results = [
  ["✅", "Smart contract deployed on Polygon Amoy Testnet"],
  ["✅", "End-to-end crypto escrow flow working with MetaMask"],
  ["✅", "UPI escrow with OTP login & QR code payment functional"],
  ["✅", "AI Computer Agent automates UPI verification in real-time"],
  ["✅", "BSXP permanent record addresses generated for every deal"],
  ["✅", "Responsive, premium UI with Framer Motion animations"],
  ["✅", "Role-based access: Buyer, Seller, and Agent workflows"],
  ["✅", "Dispute resolution & deadline-based auto-refund implemented"]
];
results.forEach((r, i) => {
  s12.addText(`${r[0]}  ${r[1]}`, { x: 1, y: 1.2 + i * 0.55, w: 11, fontSize: 14, fontFace: "Segoe UI", color: WHITE });
});
s12.addShape(pres.ShapeType.roundRect, { x: 1, y: 5.6, w: 11, h: 0.6, fill: { type: "solid", color: "1E293B" }, rectRadius: 0.08 });
s12.addText("Contract: 0x31a98074c02F42328431bab9F670314a762f2e80  |  Network: Polygon Amoy", { x: 1.2, y: 5.63, w: 10.5, fontSize: 11, fontFace: "Consolas", color: CYAN, align: "center" });

// SLIDE 13 - Future Scope
let s13 = pres.addSlide();
addBg(s13);
s13.addText("FUTURE SCOPE", { x: 0.5, y: 0.4, w: 8, fontSize: 32, fontFace: "Segoe UI", bold: true, color: CYAN });
const future = [
  ["Mainnet Deployment", "Migrate from Amoy testnet to Polygon mainnet for real transactions.", CYAN],
  ["Multi-Chain Support", "Expand to Ethereum, Arbitrum, and other EVM-compatible chains.", VIOLET],
  ["RFID / IoT Integration", "Anti-tampering verification for physical product deliveries.", EMERALD],
  ["AI Dispute Resolution", "Machine learning models to auto-resolve disputes based on evidence.", "F59E0B"],
  ["Mobile Application", "Native iOS/Android apps for on-the-go escrow management.", CYAN]
];
future.forEach((f, i) => {
  s13.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.2 + i * 0.95, w: 12, h: 0.8, fill: { type: "solid", color: "1E293B" }, rectRadius: 0.1 });
  s13.addText(`→  ${f[0]}`, { x: 0.8, y: 1.25 + i * 0.95, w: 3.5, fontSize: 14, fontFace: "Segoe UI", bold: true, color: f[2] });
  s13.addText(f[1], { x: 4.5, y: 1.25 + i * 0.95, w: 7.8, fontSize: 12, fontFace: "Segoe UI", color: GRAY });
});

// SLIDE 14 - Conclusion
let s14 = pres.addSlide();
addBg(s14);
s14.addShape(pres.ShapeType.ellipse, { x: 8, y: 0.5, w: 5, h: 5, fill: { type: "solid", color: CYAN, transparency: 92 } });
s14.addShape(pres.ShapeType.ellipse, { x: -1, y: 3, w: 4, h: 4, fill: { type: "solid", color: VIOLET, transparency: 92 } });
s14.addText("CONCLUSION", { x: 0.5, y: 0.8, w: "90%", fontSize: 36, fontFace: "Segoe UI", bold: true, color: CYAN, align: "center" });
s14.addText("BlockSafe Escrow successfully demonstrates a production-ready, hybrid escrow platform that bridges the gap between Web3 blockchain security and traditional UPI payments.", { x: 1.5, y: 2, w: 10, fontSize: 15, fontFace: "Segoe UI", color: WHITE, align: "center" });
s14.addText("By combining Solidity smart contracts, SHA-256 integrity checks, ECDSA authentication, and an AI-powered Computer Agent, the platform delivers a trustless, transparent, and accessible payment ecosystem.", { x: 1.5, y: 3.2, w: 10, fontSize: 14, fontFace: "Segoe UI", color: GRAY, align: "center" });

// SLIDE 15 - Thank You
let s15 = pres.addSlide();
addBg(s15);
s15.addShape(pres.ShapeType.ellipse, { x: 4, y: 1, w: 5, h: 5, fill: { type: "solid", color: VIOLET, transparency: 90 } });
s15.addText("THANK YOU", { x: 0.5, y: 2, w: "90%", fontSize: 48, fontFace: "Segoe UI", bold: true, color: WHITE, align: "center" });
s15.addText("Questions & Discussion", { x: 0.5, y: 3.2, w: "90%", fontSize: 22, fontFace: "Segoe UI", color: CYAN, align: "center" });
s15.addText("BlockSafe Escrow  •  Polygon Amoy  •  2026", { x: 0.5, y: 4.5, w: "90%", fontSize: 14, fontFace: "Segoe UI", color: GRAY, align: "center" });

const outputPath = "BlockSafe_Escrow_Capstone_PPT.pptx";
await pres.writeFile({ fileName: outputPath });
console.log(`✅ PPT saved to: ${outputPath}`);
