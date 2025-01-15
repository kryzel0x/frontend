type ClassValue = string | number | boolean | undefined | null;
import * as Yup from "yup";

export { Yup };

export function clsx(...args: ClassValue[]): string {
    return args
        .filter(Boolean)
        .map(arg => String(arg))
        .join(' ');
}

export const RESPONSES: Record<string, number> = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOCONTENT: 204,
    BADREQUEST: 400,
    UN_AUTHORIZED: 401,
    INVALID_REQ: 422,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    TIMEOUT: 408,
    TOOMANYREQ: 429,
    INTERNALSERVER: 500,
    BADGATEWAYS: 502,
    SERVICEUNAVILABLE: 503,
    GATEWAYTIMEOUT: 504,
  };

  export type UserDetails = {
    name: string;
    email: string;
    profileImage: string;
    walletAddress: string | null;
    phoneNumber: string | null;
    age: number | null;
    country: string | null;
    sex: string | null;
    telegram: string | null;
    twitter: string | null;
  };
  