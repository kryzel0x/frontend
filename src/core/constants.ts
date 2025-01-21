// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export const LocalStorageKeys = {
  keylessAccounts: "@aptos-connect/keyless-accounts",
};

export const aptosClient = new Aptos(
  new AptosConfig({ network: Network.TESTNET })
);

/// FIXME: Put your client id here
export const GOOGLE_CLIENT_ID = "838101731945-1d7oqmchi1jma9ksk8caq5hr4k76kbcf.apps.googleusercontent.com";

export const BONUS_AMOUNT = 10000;

export const KRYZEL_COIN = '0x69d738995c2d7ee9b59c87a6b4ba578ebb6848c9d8de4f47f9ea9512584f4de3::kryzel_coin_v1::Kryzel';

export const errorMessages = {
  "LOOKUP_FAILED": "Function not found on the network in use.",
  "INVALID_SIGNATURE": "The transaction contains a bad signature.",
  "INVALID_AUTH_KEY": "The account authentication key is invalid.",
  "SEQUENCE_NUMBER_TOO_OLD": "The sequence number is too old.",
  "SEQUENCE_NUMBER_TOO_NEW": "The sequence number is too new.",
  "INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE": "The account balance is insufficient to cover the transaction fee.",
  "TRANSACTION_EXPIRED": "The transaction has expired.",
  "SENDING_ACCOUNT_DOES_NOT_EXIST": "The sending account does not exist.",
  "EXCEEDED_MAX_TRANSACTION_SIZE": "The transaction size exceeds the maximum allowed length.",
  "MAX_GAS_UNITS_EXCEEDS_MAX_GAS_UNITS_BOUND": "The maximum gas units specified exceed the VM's limit.",
  "MAX_GAS_UNITS_BELOW_MIN_TRANSACTION_GAS_UNITS": "The maximum gas units specified are below the intrinsic cost of the transaction.",
  "GAS_UNIT_PRICE_BELOW_MIN_BOUND": "The gas unit price is below the minimum set in the VM.",
  "GAS_UNIT_PRICE_ABOVE_MAX_BOUND": "The gas unit price exceeds the maximum allowed by the VM.",
  "SECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH": "Mismatch between the number of secondary signer addresses and secondary public keys.",
  "SIGNERS_CONTAIN_DUPLICATES": "Duplicate signers present, including sender and secondary signers.",
  "SEQUENCE_NONCE_INVALID": "The sequence nonce is invalid (too new, too old, or already used)."
};