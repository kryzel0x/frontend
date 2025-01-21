import { Account, AccountAddress, AccountAddressInput, AnyRawTransaction, Aptos, AptosConfig, Ed25519PrivateKey, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";
import toast from "react-hot-toast";
import { setComponentLoading } from "../redux/slices/loading.slice";
import store from "../redux/store";
import { KRYZEL_COIN } from "../core/constants";

const USDT_COINS_TO_MINT = 1000;
const moduleAddress = '0x69d738995c2d7ee9b59c87a6b4ba578ebb6848c9d8de4f47f9ea9512584f4de3';
const stakeModuleAddress = '0x69d738995c2d7ee9b59c87a6b4ba578ebb6848c9d8de4f47f9ea9512584f4de3';
const coinType = KRYZEL_COIN;
const poolAddress = '0xcbc2c79870a290cecdbaac4b8d9f38b428d7a46f2a24e965613161121b7dd438';
// Setup the client
const APTOS_NETWORK: Network = NetworkToNetworkName[Network.TESTNET];
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

/** 
 * Stakes a specified amount of tokens from an account.
 * 
 * @param alice - The account that will stake the tokens.
 * @param amount - The amount that will be staked.
 * @returns The transaction hash for the staking operation.
 */
//Add investment user function
export async function handleStakeCoins(account: Account, amount: number) {
    store.dispatch(setComponentLoading(true))
    const txn = await aptos.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: `${stakeModuleAddress}::kryzel_staking_v1::stake`,
            typeArguments: [], // Remove coinType - it's hardcoded to Kryzel
            functionArguments: [
                amount  // Only amount needed
            ],
        },
    });
    try {
        const pendingTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
        console.log('pendingTxn', pendingTxn)
        await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
        store.dispatch(setComponentLoading(false))
        return pendingTxn;
    } catch (error) {
        store.dispatch(setComponentLoading(false))
        toast.error(error.message || 'An unexpected error occurred', {
            position: 'bottom-right',
            style: {
                maxWidth: '40%'
            },
            id: 'stake_error'
        })
    }
}


// Function to get user stakes
export async function handleGetUserStakes(account: Account) {
    try {
        const userAddress = account.accountAddress;
        const data = {
            function: `${stakeModuleAddress}::kryzel_staking_v1::get_user_stakes`,
            typeArguments: [],
            functionArguments: [userAddress]
        };


        const response = await aptos.view({
            payload: data
        })
        return response;
    } catch (error) {
        console.error("Error getting stakes:", error);
        throw error;
    }
}

// Function to get user stakes
export async function handleRestakeFunc(account: Account, index: any) {
    store.dispatch(setComponentLoading(true))
    const txn = await aptos.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: `${stakeModuleAddress}::kryzel_staking_v1::restake`,
            typeArguments: [],
            functionArguments: [
                index
            ],
        },
    });
    try {
        const pendingTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
        console.log('pendingTxn', pendingTxn)
        await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
        store.dispatch(setComponentLoading(false))
        return pendingTxn;
    } catch (error) {
        store.dispatch(setComponentLoading(false))
        toast.error(error.message || 'An unexpected error occurred', {
            position: 'bottom-right',
            style: {
                maxWidth: '40%'
            },
            id: 'stake_error'
        })
    }
}

// Function to get user stakes
export async function handleGetUserDailyReturn(account: Account) {
    try {
        const userAddress = account.accountAddress;
        const data = {
            function: `${stakeModuleAddress}::kryzel_staking_v1::get_user_daily_summary`,
            typeArguments: [],
            functionArguments: [userAddress]
        };


        const response = await aptos.view({
            payload: data
        })
        return response;
    } catch (error) {
        console.error("Error getting stakes:", error);
        throw error;
    }
}

/** 
 * Register the receiver account to receive transfers for the new coin.
 * 
 * @param receiver - The account to register for receiving the new coin.
 * @returns The transaction hash for the coin registration.
 */
export async function registerCoin(receiver: Account): Promise<string> {
    const transaction = await aptos.transaction.build.simple({
        sender: receiver.accountAddress,
        data: {
            function: `${moduleAddress}::USDTCoin::register`,
            typeArguments: [],
            functionArguments: [],
        },
    });

    const pendingTxn1 = await aptos.signAndSubmitTransaction({ signer: receiver, transaction: transaction });
    await aptos.waitForTransaction({ transactionHash: pendingTxn1.hash });
    return pendingTxn1.hash;
}
export async function
    reinvestToPool(alice: Account, amount: number, stakeIndex: string) {
    // Get stakeInfo        
    const resourcePath = `${stakeModuleAddress}::USDTStaking::StakeInfo<${coinType}>`;
    const stakerInfo = await aptos.getAccountResource({ accountAddress: alice.accountAddress, resourceType: resourcePath });
    let stake = stakerInfo.stakes[stakeIndex];
    console.log("stake index info", stake);

    // Initialize txn to ensure it's not null
    let txn: AnyRawTransaction;

    if (stake.amount > amount) {
        // If stake is larger, remove from stakeIndex and withdraw
        txn = await aptos.transaction.build.simple({
            sender: alice.accountAddress,
            data: {
                function: `${stakeModuleAddress}::USDTStaking::unstake`,
                typeArguments: [
                    `${moduleAddress}::USDTCoin::USDTCoin`
                ],
                functionArguments: [
                    amount, // amount
                    poolAddress,
                    stakeIndex // index
                ],
            },
        });
    } else if (stake.amount < amount) {
        // If stake is smaller, add to stakeIndex
        txn = await aptos.transaction.build.simple({
            sender: alice.accountAddress,
            data: {
                function: `${stakeModuleAddress}::USDTStaking::updateStake`,
                typeArguments: [
                    `${moduleAddress}::USDTCoin::USDTCoin`
                ],
                functionArguments: [
                    amount - stake.amount, // amount
                    poolAddress,
                    stakeIndex // index
                ],
            },
        });
    } else {
        // Handle the case where stake.amount == amount (if needed)
        console.log("No reinvestment needed: stake amount equals the specified amount.");
        return; // Or you can throw an error if you want to enforce a specific behavior
    }

    console.log(`Alice reinvesting ${amount} tokens`);

    // Sign and submit the transaction
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: alice, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });

    return pendingTxn2.hash;
}



/** 
 * Mints an amount of the newly created coin to a specified receiver address.
 * 
 * @param minter - The account that mints the coins.
 * @param receiverAddress - The address of the receiver.
 * @param amount - The amount of coins to mint.
 * @returns The transaction hash for the mint operation.
 */
//Claim test tokens/coins function
export async function mintCoin(minter: Account, receiverAddress: AccountAddress, amount: number): Promise<string> {
    const transaction = await aptos.transaction.build.simple({
        sender: minter.accountAddress,
        data: {
            function: `${moduleAddress}::USDTCoin::mint`,
            typeArguments: [],
            functionArguments: [receiverAddress, amount],
        },
    });

    const pendingTxn1 = await aptos.signAndSubmitTransaction({ signer: minter, transaction: transaction });
    await aptos.waitForTransaction({ transactionHash: pendingTxn1.hash });
    return pendingTxn1.hash;
}

/** 
 * Returns the balance of the USDTcoin for a user.
 * 
 * @param accountAddress - The address of the account whose balance is to be retrieved.
 * @returns The balance of the USDTCoin for the specified account.
 */
//User & its investment function
export const getBalance = async (accountAddress: AccountAddress) => {
    const amount = await aptos.getAccountCoinAmount({
        accountAddress,
        coinType: `${moduleAddress}::USDTCoin::USDTCoin`,
    });

    return amount;
};


/** 
 * Fetches information about the investment pool including total stakers and total amount in staking.
 * 
 * @returns The pool information object with details like owner address, total amount staked, and staker count.
 */
export async function fetchPoolInfo() {
    try {
        const resourcePath = `0xcbc2c79870a290cecdbaac4b8d9f38b428d7a46f2a24e965613161121b7dd438::USDTStaking::PoolInfo<${KRYZEL_COIN}>`;
        const poolInfo = await aptos.getAccountResource({
            accountAddress: stakeModuleAddress,
            resourceType: resourcePath
        });

        console.log(`Owner Address: ${poolInfo.owner_addr}`);
        console.log(`Total Investment Amount: ${poolInfo.total_amount}`);
        console.log(`Total Users: ${poolInfo.staker_count}`);
        return {
            "Owner_Address": poolInfo.owner_addr,
            "Total_Investment_Amount": poolInfo.total_amount,
            "Total_Users": poolInfo.staker_count
        };
    } catch (error) {
        console.error('Error fetching pool information:', error);
    }
}


/** 
 * Fetches staking information for a specified user.
 * 
 * @param alice - The account whose staking information will be retrieved.
 * @returns The staker information object with details like amount staked, reward amount, and stake time.
 */
//User staking details function
async function userInfo(alice: Account) {
    try {
        // Define the resource path
        const resourcePath = `${stakeModuleAddress}::USDTStaking::StakeInfo<${coinType}>`;


        // Fetch the staker info
        const stakerInfo = await aptos.getAccountResource({
            accountAddress: alice.accountAddress,
            resourceType: resourcePath
        });

        //   console.log('Staker Information:');
        const stakes = stakerInfo.stakes;
        stakes.forEach((stake: { amount: any; stake_time: number; }, index: any) => {
            // console.log(`\nStake ${index}:`);
            // console.log(`  Amount: ${stake.amount}`);        
            // console.log(`  Stake Time: ${new Date(stake.stake_time * 1000).toISOString()}`);
        });
    } catch (error) {
        console.error('Error fetching staker information:', error);
    }
}

/** 
 * Send investment returns to the user from the reward pool
 * 
 * @param poolAddr - The account of the reward pool from which the return will be sent.
 * @param alice - The address to which return will be sent.
 * @returns The transaction hash for the send return operation.
 */
async function sendReturns(rewardPool: Account, alice: AccountAddressInput, amount: number) {
    const txn = await aptos.transferCoinTransaction({
        sender: rewardPool.accountAddress,
        recipient: alice,
        coinType: `${moduleAddress}::USDTCoin::USDTCoin`,
        amount: amount
    });
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: rewardPool, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    // console.log("transfer returns transaction: ",pendingTxn2.hash);
    return pendingTxn2.hash;
}

/** 
 * Adds initial liquidity to the investment pool by transferring coins to the pool address.
 * 
 * @param alice - The account from which the liquidity will be added.
 * @param poolAddr - The address of the pool to which the liquidity will be added.
 * @returns The transaction hash for the liquidity addition operation.
 */
async function addInitialLiquidity(alice: Account, poolAddr: AccountAddressInput, amount: number) {
    const txn = await aptos.transferCoinTransaction({
        sender: alice.accountAddress,
        recipient: poolAddr,
        coinType: `${moduleAddress}::USDTCoin::USDTCoin`,
        amount: amount
    });
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: alice, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    // console.log("tranfer coin transaction: ",pendingTxn2.hash);
    return pendingTxn2.hash;
}

/** 
 * Send bonus to the user from the reward pool
 * 
 * @param poolAddr - The account of the reward pool from which the rewards will be sent.
 * @param alice - The address to which rewards will be sent.
 * @returns The transaction hash for the send bonus operation.
 */
export async function sendBonus(rewardPool: Account, alice: AccountAddressInput, amount: number) {
    const txn = await aptos.transferCoinTransaction({
        sender: rewardPool.accountAddress,
        recipient: alice,
        coinType: `${moduleAddress}::USDTCoin::USDTCoin`,
        amount: amount
    });
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: rewardPool, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    console.log("send bonus transaction: ", pendingTxn2.hash);
    return pendingTxn2.hash;
}

/** 
 * Adds revenue to the rewards pool by transferring coins to the pool address.
 * 
 * @param alice - The account from which the revenue will be added.
 * @param poolAddr - The address of the pool to which the revenue will be added.
 * @returns The transaction hash for the revenue addition operation.
 */
async function addRevenueToPool(alice: Account, poolAddr: AccountAddressInput, amount: number) {
    const txn = await aptos.transferCoinTransaction({
        sender: alice.accountAddress,
        recipient: poolAddr,
        coinType: `${moduleAddress}::USDTCoin::USDTCoin`,
        amount: amount
    });
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: alice, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    console.log("tranfer revenue transaction: ", pendingTxn2.hash);
    return pendingTxn2.hash;
}


/** 
 * Unstakes a specified amount of tokens from an account.
 * 
 * @param alice - The account that will unstake the tokens.
 * @returns The transaction hash for the unstaking operation.
 */
async function unstakeCoins(alice: Account, amount: string, userIndex: string) {

    const txn = await aptos.transaction.build.simple({
        sender: alice.accountAddress,
        data: {
            function: `${stakeModuleAddress}::USDTStaking::unstake`,
            typeArguments: [
                `${moduleAddress}::USDTCoin::USDTCoin`
            ],
            functionArguments: [
                amount, //amount
                poolAddress,
                userIndex //index
            ],
        },
    });

    // console.log(`Alice unstaking ${amount} tokens`);
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: alice, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    return pendingTxn2.hash;
}

// Function to modify staker data
async function updateLossToUserPool(owner: Account, stakerAddress: AccountAddressInput, stakeIndex: string, lossAmount: string, newRewardAmount: string, newRewardDebt: string) {
    try {

        const txn = await aptos.transaction.build.simple({
            sender: owner.accountAddress,
            data: {
                function: `${stakeModuleAddress}::USDTStaking::modify_staker_data`,
                typeArguments: [
                    `${moduleAddress}::USDTCoin::USDTCoin`
                ],
                functionArguments: [
                    stakerAddress,        // Address of the staker
                    poolAddress,          // Address of the pool
                    stakeIndex,           // Index of the stake entry to modify
                    lossAmount,            // loss amount
                    newRewardAmount,      // New reward amount
                    newRewardDebt         // New reward debt
                ],
            },
        });

        const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: owner, transaction: txn });
        await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
        return pendingTxn2.hash;
    } catch (error) {
        console.error('Error modifying staker data:', error);
    }
}
export async function coinTransaction(scOwner: Account, aliceAddress: AccountAddressInput) {
    const txn = await aptos.transaction.build.simple({
        sender: scOwner.accountAddress,
        data: {
            // All transactions on Aptos are implemented via smart contracts.
            function: "0x1::aptos_account::transfer",
            functionArguments: [aliceAddress, 100000],
        },
    });
    const pendingTxn2 = await aptos.signAndSubmitTransaction({ signer: scOwner, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: pendingTxn2.hash });
    return pendingTxn2.hash;
}

/** 
 * Main function to execute the flow of operations: 
 * - Create accounts
 * - Fund the account
 * - Register, mint, and check balances
 * - Optionally, stake, unstake, and claim rewards
 */
async function main() {
    // Create two accounts, Alice and Bob
    // const alice = Account.generate();
    const rewardPool = Account.generate();

    const privateKey = new Ed25519PrivateKey("0x3d2b2bde977604fd4923fbb26d1ab434f44909751374d76e01598e9ac3e56a80");
    const coinOwner = Account.fromPrivateKey({ privateKey });
    console.log(coinOwner.accountAddress.toString());

    const userPrivateKey = new Ed25519PrivateKey("0x58b04256595a877d3dfed7cec468771a326012ae5e160ee263decd5ff4c23198");
    const newUser = Account.fromPrivateKey({ privateKey: userPrivateKey });
    console.log(newUser.accountAddress.toString());
    const alice = newUser;

    const scOwnerPrivateKey = new Ed25519PrivateKey("0x40c2071e9fbb97dc483cbf75e8f156a1a1e5d175c42401de6f6d08ac5f1d97d4");
    const scOwner = Account.fromPrivateKey({ privateKey: scOwnerPrivateKey });
    console.log(scOwner.accountAddress.toString());

    console.log("\n=== Addresses ===");
    console.log(`Alice: ${alice.accountAddress.toString()}`, alice.privateKey.toString());

    await updateLossToUserPool(scOwner, alice.accountAddress.toString(), "100", "10", "0", "0");

    // Fund alice account
    await aptos.fundAccount({
        accountAddress: alice.accountAddress,
        amount: 100_000_000,
    });

    console.log(`Alice mints herself ${USDT_COINS_TO_MINT} KRZ Coin.`);

    const registerCoinTransactionHash = await registerCoin(alice);
    console.log(`Registered USDTCoin transaction: ${registerCoinTransactionHash}`);

    const mintCoinTransactionHash = await mintCoin(coinOwner, alice.accountAddress, USDT_COINS_TO_MINT);
    console.log(`Minted USDTCoin transaction: ${mintCoinTransactionHash}`);

    console.log(`Alice's updated USDTCoin balance: ${await getBalance(alice.accountAddress)}.`);

    // Test staking tokens
    const stakeTransactionHash = await stakeCoins(alice, USDT_COINS_TO_MINT);
    // console.log(`Stake transaction: ${stakeTransactionHash}`);

    await fetchPoolInfo();
    await userInfo(alice);

    const addLiquidityTransactionHash = await addInitialLiquidity(alice, stakeModuleAddress, 10000000);
    console.log(`addLiquidityTransaction: ${addLiquidityTransactionHash}`);

    const sendReturnsTransactionHash = await sendReturns(rewardPool, alice.accountAddress, 10000000);
    console.log(`send returns transaction: ${sendReturnsTransactionHash}`);

    const sendBonusTransactionHash = await sendBonus(rewardPool, alice.accountAddress, 10000000);
    console.log(`send Bonus transaction: ${sendBonusTransactionHash}`);

    const addRevenueToPoolTransactionHash = await addRevenueToPool(alice, stakeModuleAddress, 10000000);
    console.log(`addRevenueToPoolTransaction: ${addRevenueToPoolTransactionHash}`);

    // Test unstaking tokens
    const unstakeTransactionHash = await unstakeCoins(alice, "100000000", "102");
    // console.log(`unStake transaction: ${unstakeTransactionHash}`);

    console.log('All tests completed successfully');
}

// main();
// fetchPoolInfo();