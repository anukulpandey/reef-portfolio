import React, { useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Contract } from "ethers";
import GreeterContract from "./contracts/Greeter.json";
import Uik from "@reef-defi/ui-kit";

const FactoryAbi = GreeterContract.abi;
const factoryContractAddress = GreeterContract.address;

const URL = "wss://rpc-testnet.reefscan.com/ws";

function App() {

	const [signer, setSigner] = useState();
	const [isWalletConnected, setWalletConnected] = useState(false);

	const checkExtension = async () => {
		let allInjected = await web3Enable("Reef");

		if (allInjected.length === 0) {
			return false;
		}

		let injected;
		if (allInjected[0] && allInjected[0].signer) {
			injected = allInjected[0].signer;
		}

		const evmProvider = new Provider({
			provider: new WsProvider(URL),
		});

		evmProvider.api.on("ready", async () => {
			const allAccounts = await web3Accounts();

			allAccounts[0] &&
				allAccounts[0].address &&
				setWalletConnected(true);

			console.log(allAccounts);

			const wallet = new Signer(
				evmProvider,
				allAccounts[0].address,
				injected
			);

			// Claim default account
			if (!(await wallet.isClaimed())) {
				console.log(
					"No claimed EVM account found -> claimed default EVM account: ",
					await wallet.getAddress()
				);
				await wallet.claimDefaultAccount();
			}

			setSigner(wallet);
		});
	};

	const checkSigner = async () => {
		if (!signer) {
			await checkExtension();
		}
		return true;
	};

	// const getGreeting = async () => {
	// 	await checkSigner();
	// 	const factoryContract = new Contract(
	// 		factoryContractAddress,
	// 		FactoryAbi,
	// 		signer
	// 	);
	// 	const result = await factoryContract.greet();
	// 	setMsg(result);
	// };


	return (
		<Uik.Container className="main">
			<Uik.Bubbles />
			<Uik.ReefLogo className="topLeft" />
			<Uik.Container vertical>
				<Uik.Container vertical>
					<Uik.Text text='' type='headline' />
					<Uik.Text text='' type='headline' />
					<Uik.Text text='Anukul Pandey' type='headline' />
				</Uik.Container>
				<Uik.Divider text="Introduction" />
				<Uik.Container vertical>
					<Uik.Text text='
			 Hey There!👋 I am a fullstack Web Developer (Web2 + Web3) 😎, App developer📱 also ! Currently in final year of B.Tech🎓 .I have keen interest in cybersecurity 🛡️.
			  ' type='light' />
					<Uik.Divider text="Achievements" />
					<Uik.Container>

						<Uik.Tag color="red" text="Hacked Dominos 🍕" />
						<Uik.Tag color="cyan" text="Found bugs in college website🏫" />
						<Uik.Tag color="pink" text="won college level hackathon by REEF 🐠" />
						<Uik.Tag color="lime" text="annual rank 2% on THM⌨️" />
					</Uik.Container>
					<Uik.Divider text="dApps I built" />
					<Uik.Container vertical>
						<Uik.Container vertical>
							<Uik.Text text='Monkey Share  🐒 ' type='dark' />
							<img src="https://builtonreef.netlify.app/Reef%20Projects%20I%20Built%208b6b2f8cbbcd48de8846d1d897d0a64c/Untitled.png" alt=""  className="styledImage2"/>
							<Uik.Text text='This is the first dapp I ever made, here user can come , pay a one time fee of registration on the service & after that they can use unlimited free file storage services of IPFS. ' type='light' />
						</Uik.Container>
						<Uik.Divider />
						<Uik.Container vertical>
							<Uik.Text text='Pocket Monster 🦖
' type='dark' />
							<Uik.Container>


								<img src="https://builtonreef.netlify.app/Reef%20Projects%20I%20Built%208b6b2f8cbbcd48de8846d1d897d0a64c/Untitled%201.png" alt="" className="styledImage" />
								<br />
								{/* <img src="https://builtonreef.netlify.app/Reef%20Projects%20I%20Built%208b6b2f8cbbcd48de8846d1d897d0a64c/Untitled%202.png" alt="" className="styledImage" /> */}
							</Uik.Container>
							<Uik.Text text='One of the best Dapp I ever made 😀. Or maybe the first game on the Reef chain as well. So here you have to connect your wallet, select one of the characters . PS: There is no strongest or weakest character, your chances of winning depends on various criterias. Like the time in which you select that character, the actual strength of character & so on.
' type='light' />
						</Uik.Container>
						<Uik.Divider />
						<Uik.Container vertical>
							<Uik.Text text='Token Sender 🦊' type='dark' />
							<img src="https://builtonreef.netlify.app/Reef%20Projects%20I%20Built%208b6b2f8cbbcd48de8846d1d897d0a64c/Untitled%203.png" alt="" className="styledImage2"/>
							<Uik.Text text='I use reef’s extension a lot while development as well as in the production (ofc) but I had a problem of sending Reef tokens from one account to another, as I have multiple accounts for testing purpose. So what did I do? I built a DAPP specifically for sending Reef tokens from one account to another 😎 & the transaction fee per transaction is just 1.51 Reefs.

' type='light' />
						</Uik.Container>
						<Uik.Divider />
					</Uik.Container>

				</Uik.Container>
			</Uik.Container>
		</Uik.Container>
	);
}

export default App;
