/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../utils/constants";


/**CREATE URL FOR API CALL WITH PARAMS */
export const formatUrl = (url: any, params: any) => {
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : ``;
  return `${BASE_URL}${url}${params}`;
};

export function hideEmail(email: string) {
  const [localPart, domain] = email.split('@');
  const hiddenPart = localPart.slice(0, 3) + '***'; // Show the first 3 characters and hide the rest
  return `${hiddenPart}@${domain}`;
}


export const getError = (error: any) => {
  let errorMsg =
    error && error?.data?.message
      ? error?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong";

  if (errorMsg.toString().indexOf('"message"') > -1) {
    let match = errorMsg.match(/"message"\s*:\s*"([^"]*)"/);

    if (match && match[1]) {
      let msg = match[1];

      // Remove leading colon and space
      msg = msg.replace(/^:\s*/, "");

      // Remove "execution reverted:" prefix
      msg = msg.replace(/^execution reverted:\s*/, "");

      return msg.trim();
    } else {
      return "Error message not found.";
    }
  } else if (errorMsg.indexOf("execution reverted") > -1) {
    let msg = errorMsg;
    msg = msg =
      msg.indexOf("execution reverted:") > -1
        ? msg.split("execution reverted:")[1].split("{")[0]
        : msg;
    return msg;
  } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
    return errorMsg.split("(")[0];
  } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
    let msg = errorMsg.replace("MetaMask Tx Signature:", "");
    return msg;
  } else {
    let err = errorMsg.split("*")[0].split(":")[1];
    if (err?.trim() === "insufficient funds for gas") {
      return err;
    } else {
      return errorMsg;
    }
  }
};

export const truncateToTwoDecimals = (number : number) => {
  // Convert the number to a string and split at the decimal point
  const [integerPart, decimalPart] = number.toString().split('.');
  
  // If there is no decimal part, just return the integer part
  if (!decimalPart) return integerPart;

  // Take only the first two digits of the decimal part
  const truncatedDecimal = decimalPart.slice(0, 2);

  // Combine the integer part with the truncated decimal part
  return `${integerPart}.${truncatedDecimal}`;
};

export const formatAmount = (
  amount: number,
  // currency: string = "USD",
  locale: string = "en-US"
) => {
  const hasDecimal = amount % 1 !== 0;

  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  }).format(amount);
};
