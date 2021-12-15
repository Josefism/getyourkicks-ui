import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { ethers } from 'ethers';
import './styles/App.css';
import contract from './contracts/GetYourKicksHiTops.json';
import { Fragment } from 'react/cjs/react.production.min';
import Footer from './components/Footer';
import Header from './components/Header';
import HiTopsBanner from './assets/HiTopsBanner.png';
import HiTopsGif from './assets/GetYourKicks-HiTops.gif';

const enviro = runtimeEnv();
const contractOwner = process.env.REACT_APP_GYKHT_CONTRACT_OWNER || enviro.REACT_APP_GYKHT_CONTRACT_OWNER;
const imgBase = process.env.REACT_APP_GYKHT_IMG_BASE || enviro.REACT_APP_GYKHT_IMG_BASE;
const metadataBase = process.env.REACT_APP_GYKHT_META_BASE || enviro.REACT_APP_GYKHT_META_BASE;
const contractAddress = "0x6D5928245A9F5df381b70cfbBD5c8121805E6fAB";
const abi = contract.abi;

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/hitop' element={<Home />} />
        <Route path='/hitop/:id' element={<KicksData />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  let TotalPrice = "0";
  let showAdmin = false;

  if (contractOwner === currentAccount) {
    showAdmin = true;
  }

  const checkWalletIsConnected = async () => {
	  const { ethereum } = window;
	  
	  if (!ethereum) {
		  console.log("Make sure you have Metamask installed!");
		  return;
	  } else {
		  console.log("Wallet exists! We're ready to go!");
	  }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const network = await ethereum.request({ method: 'eth_chainId' });
    let networkValid = false;
    let networkChainId = network.toString();
    if (networkChainId === '0x4' || networkChainId === '0x89' || networkChainId === '0x13881') {
      networkValid = true;
    }

    if (accounts.length !== 0 && networkValid) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      setMetamaskError(true);
      console.log("No authorized account found.");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const network = await ethereum.request({ method: 'eth_chainId' });
      let networkValid = false;
      let networkChainId = network.toString();
      if (networkChainId === '0x4' || networkChainId === '0x89' || networkChainId === '0x13881') {
        networkValid = true;
      }
  
      if (networkValid) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setMetamaskError(null);
        setCurrentAccount(accounts[0]);
      }

      else {
        setMetamaskError(true);
      }

    } catch (err) {
      console.log(err)
    }
  }

  const mintOneNftHandler = async () => { 
    try {
      TotalPrice = "10";

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("10") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintTwoNftHandler = async () => { 
    try {
      TotalPrice = "16";

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(2, { value: ethers.utils.parseEther("16") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintThreeNftHandler = async () => { 
    try {
      TotalPrice = "21";

      setMineStatus('mining');
      
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(3, { value: ethers.utils.parseEther("21") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintFourNftHandler = async () => { 
    try {
      TotalPrice = "24";

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(4, { value: ethers.utils.parseEther("24") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintFiveNftHandler = async () => { 
    try {
      TotalPrice = "25";

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(5, { value: ethers.utils.parseEther("25") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const reserveNFTHandler = async () => {
    try {

        setMineStatus('mining');
  
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Initialize reservation");
          let nftTxn = await nftContract.reserveNFTs(10);

          console.log("Mining ... please wait.");
          await nftTxn.wait();
  
          console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
          setMineStatus('success');
        } else {
          setMineStatus('error');
          console.log("Ethereum object does not exist.");
        }
      } catch (err) {
        setMineStatus('error');
        console.log(err);
      }
  }

  const withdrawHandler = async () => {
    try {
        setMineStatus('mining');
  
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Processing Withdrawal");
          let nftTxn = await nftContract.withdraw();

          console.log("Mining ... please wait.");
          await nftTxn.wait();
  
          console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
          setMineStatus('withdrawsuccess');
        } else {
          setMineStatus('withdrawerror');
          console.log("Ethereum object does not exist.");
        }
      } catch (err) {
        setMineStatus('withdrawerror');
        console.log(err);
      }
  }

  const closePresaleHandler = async () => {
    try {
        setMineStatus('mining');
  
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Closing Presale");
          let nftTxn = await nftContract.closePresale();

          console.log("Mining ... please wait.");
          await nftTxn.wait();
  
          console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
          setMineStatus('presaleclosesuccess');
        } else {
          setMineStatus('presalecloseerror');
          console.log("Ethereum object does not exist.");
        }
      } catch (err) {
        setMineStatus('presalecloseerror');
        console.log(err);
      }
  }

  const aboutContent = () => {
    return (
      <div className="about-content">
        <p>Get some fresh kicks just in time for holiday giving! These funky, colorful, randomly generated kicks aim to catch eyes and wow envious passersby.</p>
        <p><strong>Get Your Kicks - HiTops</strong> is a collection of 20,000 stylized HiTop NFTs living on the Polygon blockchain.</p>
        <p>Each <em>Get Your Kicks</em> HiTop style was generated from a Python script randomly combining elements and traits, including: 7 Background Colors, 9 Side Panels, 4 Soles, 5 Subsoles, 5 Laces, and 12 Tongues. Some style also include up to 6 options elements from among: 6 Toe Lowers, 4 Toe Uppers, 6 Lace Surrounds, 6 Ankles, 7 Heels, and 5 Decorative touches.</p>
        <p>Additional types of Kicks are already in the works, with plans to add High Heels, Boots, and Sneakers featuring new prints and additional traits! Mint your own kicks today, and check back soon for more info about the next style in the series!</p>
        <p className="about-note"><strong>NOTE:</strong> We currently only support connections with the MetaMask wallet browser extension. If you have other wallet extensions installed in your browser, you may need to temporarily disable them in order for this app to correctly detect MetaMask.</p>
      </div>
    )
  }

  const connectWalletButton = () => {
    return (
      <div>
        <p>Connect your Metamask wallet to get started minting Get Your Kicks HiTops!</p>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </div>
    )
  }

  const mintNftButtons = () => {
    return (
      <div>
        <h2>Minting Get Your Kicks HiTops</h2>
        <h3>Presale Pricing In Effect!</h3>
        <p>Mint 1 to 5 hitops at a time. During our presale, the more you mint in a single transaction, the less you pay per-hitop!</p>
        <p>When the presale is closed (on Dec 20, 2021, or when NFT supply is exhausted) any remaining NFTs will be minted and listed for sale on OpenSea for 10 MATIC each.</p>
        <p><em>Get your <strong>Get Your Kicks HiTops</strong> before the discounted pricing is gone forever!</em></p>
        <p className="about-note"><strong>NOTE:</strong> Ensure you have enough additional MATIC in your connected wallet to cover gas fees prior to minting. (~ 0.01 MATIC)</p>
        <h3>1 Get Your Kicks HiTop @ 10 MATIC each</h3>
        <p className="about-note"><strong>10 MATIC</strong> total + ~ 0.01 MATIC gas</p>
        <button onClick={mintOneNftHandler} className='cta-button mint-nft-button'>
          Mint 1 HiTop
        </button>
        <h3>2 Get Your Kicks HiTops @ 8 MATIC each</h3>
        <p className='discount-note'>20% off per hitop!</p>
        <p className="about-note"><strong>16 MATIC</strong> total + ~ 0.01 MATIC gas</p>
        <button onClick={mintTwoNftHandler} className='cta-button mint-nft-button'>
          Mint 2 HiTops
        </button>
        <h3>3 Get Your Kicks HiTops @ 7 MATIC each</h3>
        <p className='discount-note'>30% off per hitop!</p>
        <p className="about-note"><strong>21 MATIC</strong> total + ~ 0.01 MATIC gas</p>
        <button onClick={mintThreeNftHandler} className='cta-button mint-nft-button'>
          Mint 3 HiTops
        </button>
        <h3>4 Get Your Kicks HiTops @ 6 MATIC each</h3>
        <p className='discount-note'>40% off per hitop!</p>
        <p className="about-note"><strong>24 MATIC</strong> total + ~ 0.01 MATIC gas</p>
        <button onClick={mintFourNftHandler} className='cta-button mint-nft-button'>
          Mint 4 HiTops
        </button>
        <h3>5 Get Your Kicks HiTops @ 5 MATIC each</h3>
        <p className='discount-note'>50% off per hitop! <em>Best Deal!</em></p>
        <p className="about-note"><strong>25 MATIC</strong> total + ~ 0.01 MATIC gas</p>
        <button onClick={mintFiveNftHandler} className='cta-button mint-nft-button'>
          Mint 5 HiTops
        </button>
      </div>
    )
  }

  const ownerButtons = () => {
    return (
      <div>
        <h2>
          Contract Owner Functionality
        </h2>
        <p>
          <button onClick={reserveNFTHandler} className='cta-button reserve-nft-button'>
            Reserve 10 HiTops
          </button>
          <button onClick={withdrawHandler} className='cta-button withdraw-button'>
            Withdraw Balance to Owner
          </button>
          <button onClick={closePresaleHandler} className='cta-button close-presale-button'>
            Close Presale
          </button>
        </p>
      </div>
    )      
  }

  useEffect(() => {
    checkWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    }
  }, [])


  return (
    <Fragment>
      {metamaskError && <div className='metamask-error'>Please make sure you are connected to the Polygon Network on Metamask!</div>}
      <div className="App">
        <div className="container">
          <Header bannerImg={HiTopsBanner} />
          <div className="content home-content">
            {aboutContent()}
            {currentAccount && mineStatus !== 'mining' && mintNftButtons()}
            {showAdmin && mineStatus !== 'mining' && ownerButtons()}
            {!currentAccount && !mineStatus && connectWalletButton()}
            <div className='mine-submission'>
              {mineStatus === 'success' && <div className={mineStatus}>
                <p>NFT minting successful!</p>
                <p className='success-link'>
                  <a href={`https://opensea.io/${currentAccount}/`} target='_blank' rel='noreferrer'>Click here</a>
                  <span> to view your NFT on OpenSea.</span>
                </p>
              </div>}
              {mineStatus === 'withdrawsuccess' && <div className={mineStatus}>
                <p>Withdrawal succeeded. Verify the transaction appears in MetaMask.</p>
              </div>}
              {mineStatus === 'presaleclosesuccess' && <div className={mineStatus}>
                <p>Presale closure succeeded. Verify the transaction appears in MetaMask.</p>
              </div>}
              {mineStatus === 'mining' && <div className={mineStatus}>
                <div className='loader' />
                <span>Transaction is mining</span>
              </div>}
              {mineStatus === 'error' && <div className={mineStatus}>
                <p>Transaction failed. Make sure you have at least {TotalPrice} Polygon MATIC in your Metamask wallet and try again.</p>
              </div>}
              {mineStatus === 'withdrawerror' && <div className={mineStatus}>
                <p>Withdrawal failed. No funds to withdraw at this time.</p>
              </div>}
              {mineStatus === 'presalecloseerror' && <div className={mineStatus}>
                <p>Presale closure failed. Consult contract transaction for details.</p>
              </div>}
            </div>
          </div>
          <Footer address={contractAddress} footerImg={HiTopsGif} />
        </div>
      </div>
      <div id="modal-root"></div>
    </Fragment>
  )
}

function KicksData() {
  let { id } = useParams();
  let kicksNum;
  let kicksIdErr = false;
  let imgUrl = "https://storage.googleapis.com/getyourkicks.assemblystudio.com/hitops/images/images";
  let metaUrl = "https://storage.googleapis.com/getyourkicks.assemblystudio.com/hitops/metadata/metadata/";
  let openseaKicksLink = "https://opensea.io/assets/matic/" + contractAddress + "/";
  let kicksAttr = [];

  try {
    kicksNum = parseInt(id);
    const validId = new RegExp(/^\d{1,5}$/, 'gi');

    if (!validId.test(kicksNum)) {
      console.log('Too many digits in Kicksnum');
      kicksIdErr = true;
    } else {
      if (kicksNum > 20000) {
        console.log('Kicksnum out of range.');
        kicksIdErr = true;
      }
    }

    imgUrl += kicksNum + ".png";
    metaUrl += kicksNum;
    openseaKicksLink += kicksNum;

    let kicksRequest = new Request(metaUrl);

    fetch(kicksRequest, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Host': 'storage.googleapis.com',
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      }
    })
    .then(function(response) {
      //if (!response.ok) {
      //  throw new Error(`HTTP error! status: ${response.status}`);
      //}
      console.log(response);
      let kicksData = JSON.parse(response);
      return kicksData
    })
    .then(function(kicksData) {
      for(var i in kicksData.attributes)
        kicksAttr.push([i, kicksData.attributes[i]]);
    });
  }
  catch{
    console.log('Kicksnum is not a number.');
    kicksIdErr = true;
  }

  return(
    <Fragment>
      <div className="App">
        <div className="container">
          <Header bannerImg={HiTopsBanner} />
          <div className="content">
            {kicksIdErr && <div><h2>Get Your Kicks</h2><h3>Oops!</h3><p>You're looking for something that isn't one of our Kicks! <Link to="/">Go back to the homepage</Link> and try again.</p></div>}
            {!kicksIdErr && <div>
            <div className='kicks-header-block'>
              <h2>
                Get Your Kicks - HiTops
              </h2>
              <h3>
                Data about Get Your Kicks Style #{kicksNum}
              </h3>
            </div>
            <div className="kicks-image-block">
              <img className="single-kicks-image" src={imgUrl} alt="Get Your Kicks NFT graphic" /> 
            </div>
            <div className="kicks-data-block">
              <p>
                Please be patient as we finalize our kicks data output. This section will soon contain information about the attributes of each kicks style.
                {kicksAttr}
              </p>
              <p>
                In the meantime, minted elves can be viewed on OpenSea. If Get Your Kicks Style #{kicksNum} has been minted, you can click the link below to view its info on OpenSea.
              </p>
              <p>
                <a href={openseaKicksLink} target="_blank" title="View this Get Your Kicks Style on OpenSea (if minted)">View on OpenSea (If Minted)</a>
              </p>
            </div>
            </div>}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

function NotFound() {
  return(
    <Fragment>
      <div className="App">
        <div className="container">
          <Header bannerImg={HiTopsBanner} />
          <div className="content">
            <h2>
              Get Your Kicks
            </h2>
            <h3>
              Kicks Not Found!
            </h3>
            <p>
              It appears you're looking for kicks in the wrong place. You might want to <Link to="/">go back to the homepage</Link> and get on the right track.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;