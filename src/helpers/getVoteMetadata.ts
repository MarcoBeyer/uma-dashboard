import { formatFixed } from "@ethersproject/bignumber";
import { BigNumberish } from "ethers"

export const getPrecisionForIdentifier = (identifier: string): number => {
  return isNon18Precision(identifier)
    ? IDENTIFIER_NON_18_PRECISION[identifier]
    : 18;
};

// Price identifiers that should resolve prices to non 18 decimal precision. Any identifiers
// not on this list are assumed to resolve to 18 decimals.
export const IDENTIFIER_NON_18_PRECISION = {
  USDBTC: 8,
  "STABLESPREAD/USDC": 6,
  "STABLESPREAD/BTC": 8,
  "ELASTIC_STABLESPREAD/USDC": 6,
  BCHNBTC: 8,
  AMPLUSD: 6,
  "COMPUSDC-APR-FEB28/USDC": 6,
  "COMPUSDC-APR-MAR28/USDC": 6,
  // The following identifiers are used in local test environments only:
  TEST8DECIMALS: 8,
  TEST8DECIMALSANCIL: 8,
  TEST6DECIMALS: 6,
  TEST6DECIMALSANCIL: 6,
  SHERLOCK_CLAIM: 6,
};

type IdentifierNon18Precision = keyof typeof IDENTIFIER_NON_18_PRECISION;

function isNon18Precision(
  identifier: string
): identifier is IdentifierNon18Precision {
  return identifier in IDENTIFIER_NON_18_PRECISION;
}
export const parseTitle = (
    decodedAncillaryData: string,
    titleIdentifier = "title:",
    descriptionIdentifier = "description:"
  ) => {
    const start = decodedAncillaryData.indexOf(titleIdentifier);
    const end =
      decodedAncillaryData.indexOf(descriptionIdentifier) ??
      decodedAncillaryData.length;

    if (start === -1) {
      return decodedAncillaryData;
    }

    const title = decodedAncillaryData
      .substring(start + titleIdentifier.length, end)
      .trim();
    // remove the trailing comma if it exists (from Polymarket)
    return title.endsWith(",") ? title.slice(0, -1) : title;
  };

export const parseDescription = (
    decodedAncillaryData: string,
    descriptionIdentifier = "description:"
  ) => {
    if (!decodedAncillaryData) {
      return undefined;
    }
    const start = decodedAncillaryData.indexOf(descriptionIdentifier);
    const end = decodedAncillaryData.length;

    if (start === -1) {
      return undefined;
    }

    return decodedAncillaryData.substring(
      start + descriptionIdentifier.length,
      end
    );
  };

  export const formatVoteStringWithPrecision = (
    vote: BigNumberish,
    decodedIdentifier: string
  ) => {
    // check the precision to use from our table of precisions
    const identifierPrecision = BigInt(
      getPrecisionForIdentifier(decodedIdentifier)
    );
    const formatted = formatFixed(vote, identifierPrecision).toString();
    // if the formatted number ends with .0, remove the .0
    return formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
  }

  export const formatVoteString = (
    vote: BigNumberish,
    decodedIdentifier: string
  ) => {
    const formatted = formatVoteStringWithPrecision(vote, decodedIdentifier);
    if(decodedIdentifier === "YES_OR_NO_QUERY") {
      if(formatted === "0") {
        return "NO";
      }
      if(formatted === "1") {
        return "YES";
      }
      if(formatted === "-57896044618658097711785492504343953926634992332820282019728.792003956564819968") {
        return "TOO EARLY";
      }
      return formatted;
    }
    return formatted;
  }