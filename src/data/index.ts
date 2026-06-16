export const me = {
  name: 'Kartik Singh',
  title: 'Full Stack Developer | React | Node.js | JavaScript',
  email: 'kartiksingh379410@gmail.com',
  phone: '+91-7500379410',
  linkedin: 'https://www.linkedin.com/in/kartik-singh-359766238/',
  github: 'https://github.com/TheRustVeil',
  prompt: 'guest@kartik.dev:~$',
  whoami: 'kartik singh — full stack developer, web3 builder, mca student',
};

export const skills = {
  Languages: ['JavaScript (ES6)', 'Solidity', 'C', 'C++'],
  Frontend: ['React', 'HTML', 'CSS', 'Vite'],
  'Blockchain/Web3': ['Ethereum', 'Smart Contracts', 'Hardhat', 'Ethers.js', 'OpenZeppelin', 'MetaMask', 'Sepolia'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Remix IDE', 'Vercel'],
};

export const projects = [
  {
    id: '01',
    name: 'Crowdfunding DApp',
    tech: ['Solidity', 'Hardhat', 'React', 'Ethers.js', 'MetaMask', 'Sepolia', 'Vercel'],
    period: 'May 2026 – Jun 2026',
    live: 'https://crowd-funding-dapp-three.vercel.app',
    github: 'https://github.com/TheRustVeil/Crowd_Funding_DAPP',
    bullets: [
      'Decentralized crowdfunding platform on Ethereum Sepolia Testnet using Solidity + Hardhat',
      'MetaMask wallet integration and ETH donations via Ethers.js',
      'Campaign creation, ETH donation, withdrawal, progress tracking, and donor history',
      'Immutable smart contract logic with campaign cancellation instead of deletion',
      'Responsive React frontend deployed on Vercel with live smart contract integration',
    ],
  },
  {
    id: '02',
    name: 'Crypto Market Dashboard',
    tech: ['React', 'Vite', 'CoinGecko API', 'Vercel'],
    period: 'Dec 2025 – Jan 2026',
    live: 'https://cryptodash1.vercel.app',
    github: 'https://github.com/TheRustVeil/cryptodash1',
    bullets: [
      'Real-time cryptocurrency dashboard using React + CoinGecko API',
      'Dynamic search with live price, market cap, and 24h change metrics',
      'Responsive UI deployed on Vercel with CI/CD integration',
    ],
  },
  {
    id: '03',
    name: 'Shared Wallet Contract',
    tech: ['Solidity', 'Hardhat', 'Ethers.js', 'Sepolia'],
    period: '',
    live: 'https://sepolia.etherscan.io/address/0xE766DA58F87d42Dec8AF04831fa0a0D057e437e5#code',
    github: 'https://github.com/TheRustVeil/shared-wallet',
    bullets: [
      'Shared Wallet smart contract with owner-managed users and monthly withdrawal limits',
      'Deployed and verified on Sepolia testnet via Hardhat',
    ],
  },
  {
    id: '04',
    name: 'ERC20 Token Sale',
    tech: ['Solidity', 'Hardhat', 'TypeScript', 'Viem', 'Sepolia'],
    period: '',
    live: 'https://sepolia.etherscan.io/address/0x991374439129907bd6e5ec05d6a4eb5f4895a809',
    github: 'https://github.com/TheRustVeil/erc20-token-sale',
    bullets: [
      'ERC20 token sale smart contracts deployed on Sepolia using Solidity + Hardhat + Viem',
      'Automated deployment script with Etherscan verification',
    ],
  },
  {
    id: '05',
    name: 'Counter DApp',
    tech: ['Solidity', 'React', 'Ethers.js', 'MetaMask'],
    period: '',
    live: '',
    github: 'https://github.com/TheRustVeil/Counter-dapp',
    bullets: [
      'On-chain counter with Solidity smart contract and React frontend',
      'MetaMask wallet integration for blockchain interactions',
    ],
  },
  {
    id: '06',
    name: 'Notes App',
    tech: ['React', 'JavaScript'],
    period: '',
    live: '',
    github: 'https://github.com/TheRustVeil/Notes-App',
    bullets: ['Full-featured notes app built with React'],
  },
];

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Lovely Professional University, Phagwara',
    period: '2025 – 2027',
    score: 'CGPA: 8.2',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Graphic Era Hill University, Haldwani',
    period: '2024',
    score: 'CGPA: 7.48 / 10',
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'Adarsh Bharti I.C. Banusi, Khatima',
    period: '2021',
    score: '80.20%',
  },
  {
    degree: 'High School (10th)',
    institution: 'Alchemist Academy Khetal Sanda, Khatima',
    period: '2019',
    score: '80.00%',
  },
];

export const certifications = [
  'Ethereum Blockchain Developer Bootcamp with Solidity – Udemy',
  'JavaScript Fundamentals – Online Course',
];

export const socials = [
  { label: 'github', url: 'https://github.com/TheRustVeil', display: 'github.com/TheRustVeil' },
  { label: 'linkedin', url: 'https://www.linkedin.com/in/kartik-singh-359766238/', display: 'linkedin.com/in/kartik-singh-359766238' },
  { label: 'email', url: 'mailto:kartiksingh379410@gmail.com', display: 'kartiksingh379410@gmail.com' },
];

export const COMMANDS = [
  'about',
  'projects',
  'skills',
  'education',
  'certifications',
  'socials',
  'resume',
  'whoami',
  'neofetch',
  'banner',
  'matrix',
  'theme',
  'date',
  'hack',
  'clear',
  'help',
] as const;

export type Command = typeof COMMANDS[number];
