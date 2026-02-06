# React, Web3.0 Crowdfunding-Platform 
The next-gen crowdfunding platform. Made with React, Solidity Smart Contracts, and ThirdWeb - This simple crowdfunding application allows users to back projects through the Blockchain and Ethereum.<br>
<br>
The flow is simple. A user connects their MetaMask wallet, then can create a campaign. Campaigns then can be backed by other users, using their wallet and Ethereum.

<p>This site variant brings a sticky navbar, footer, and modern content displays.<br>
Click the image below to browse this GitHub branch.</p>
<img src="https://i.ibb.co/4JLpdBc/krowd-netlify-app.png"></a>

### Client Technologies Used
- ThirdWeb / Ethers - Connectivity between Thirdweb smart contracts and MetaMask wallet<br>
- React - Client side rendering UI and components<br>
- ReactDOM - provides DOM-specific methods that can be used at the top level of your app<br>
- React-Router-DOM - Handles the routing and paths for pages<br>
- ViteJS - the default project management system for building the application<br>
- AutoPrefixer - CSS parser and vendor CSS management<br>
- PostCSS - CSS-in-JS and styles in JS objects.<br>
- TailwindCSS - Frontend CSS service<br>

### Architecture 
┌──────────────────────────────┐
│          End User            │
│  (Browser: Chrome / Brave)   │
└──────────────┬───────────────┘
               │
               │ HTTP / HTTPS
               │
┌──────────────▼───────────────┐
│        Frontend (React)      │
│ ─────────────────────────── │
│ • Campaign Listing UI       │
│ • Create Campaign Form      │
│ • Donate / Fund UI          │
│ • Wallet Connect (MetaMask) │
│ • AI Chat Assistant UI      │
│ • State Management          │
│ • Tailwind CSS              │
└──────────────┬───────────────┘
               │
               │ REST / Web3 Calls
               │
      ┌────────▼────────┐
      │   Web3 Provider │
      │   (MetaMask)    │
      └────────┬────────┘
               │
               │ Signed Transactions
               │
┌──────────────▼───────────────┐
│        Blockchain Layer      │
│ ─────────────────────────── │
│ • Smart Contracts           │
│ • Campaign Creation Logic   │
│ • Fund / Donate Logic       │
│ • Contribution Tracking     │
│ • Ownership & Security      │
└──────────────┬───────────────┘
               │
               │ Read / Write Data
               │
      ┌────────▼────────┐
      │ Ethereum Network│
      │ (Testnet/Main)  │
      └─────────────────┘


──────────── AI LAYER ────────────

┌────────────────────────────────────────────┐
│        Backend / API Layer (Node + Express)│
│ ───────────────────────────────────────── │
│ • REST APIs                               │
│ • Campaign Metadata (off-chain)           │
│ • Search / Filter / Pagination            │
│ • User Analytics                          │
│ • AI Chat Routing                         │
└──────────────┬─────────────────────────────┘
               │
               │ API Calls
               │
┌──────────────▼───────────────┐
│      AI Chat Assistant       │
│ ───────────────────────────  │
│ • OpenAI / Gemini API        │
│ • Campaign Guidance          │
│ • Fundraising Suggestions    │
│ • Donor Targeting Insights   │
│ • Real-time Q&A              │
└──────────────────────────────┘


### Future Improvements
- Better user-authentication methods. Implimentation of a user-account model before the connection of MetaMask.
- Payment withdrawl functionality. Once users' have completed a campaign, the withdrawl of funds to their PayPal / Bank account.
- Campaign list sorting. Ability to view by date, and their highest and lowest funding totals.
- Better user profiles. With more customization options and personality.

### Things That Kicked My Boo-tay
- Handling the Solidity contract was majority of the brainache I received. I'm still navigating Solidity, and have a long way to go in order to fully understand it.
- Handling the page routing was another pain in the ***. While they function, a re-write of the routing situation is going to happen down the line.

<hr>

Click the link below to view live demo website.<br>
<a href="https://krowd-1.netlify.app/">Browse the demo website</a>






