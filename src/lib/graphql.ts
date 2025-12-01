const GRAPH_API_URL = process.env.GRAPH_API_URL!;

async function fetchGraphQL<T>(query: string): Promise<T> {
  const response = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store", // Disable caching for now to ensure fresh data
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
  }

  return data;
}

export async function getUsers() {
  const query = `
    query {
      globals(first: 1) {
        cumulativeStake
        userAddresses
      }
      users(
        first: 1000
        where: { voterStake_gt: 0 }
        orderBy: voterStake
        orderDirection: desc
        skip: 0
      ) {
        address
        voterStake
      }
    }
  `;

  return fetchGraphQL<{
    globals: Array<{ cumulativeStake: number; userAddresses: string[] }>;
    users: Array<{ address: string; voterStake: number }>;
  }>(query);
}

export async function getVotes() {
  const query = `
    query {
      priceRequests(first: 1000, orderBy: time, orderDirection: desc) {
        id
        identifier {
          id
        }
        ancillaryData
        time
        price
        resolutionBlock
        isResolved
        latestRound {
          id
          votersAmount
          cumulativeStakeAtRound
          countWrongVotes
          countCorrectVotes
          countNoVotes
          totalVotesRevealed
        }
      }
    }
  `;

  return fetchGraphQL<{
    priceRequests: Array<{
      id: string;
      identifier: { id: string };
      ancillaryData: string;
      time: number;
      price: string;
      resolutionBlock: number;
      isResolved: boolean;
      latestRound: {
        id: string;
        votersAmount: number;
        cumulativeStakeAtRound: number;
        countWrongVotes: number;
        countCorrectVotes: number;
        countNoVotes: number;
        totalVotesRevealed: number;
      };
    }>;
  }>(query);
}

export async function getVoteDetails(id: string) {
  const query = `
    query {
      globals(first: 1) {
        cumulativeStake
      }
      priceRequest(
        id: "${id}"
      ) {
        id
        ancillaryData
        isResolved
        time
        price
        resolutionBlock
        rounds {
          id
          votersAmount
          cumulativeStakeAtRound
          countWrongVotes
          countCorrectVotes
          countNoVotes
          totalVotesRevealed
        }
      }
    }
  `;

  return fetchGraphQL<{
    globals: Array<{ cumulativeStake: number }>;
    priceRequest: {
      id: string;
      ancillaryData: string;
      isResolved: boolean;
      time: number;
      price: string;
      resolutionBlock: number;
      rounds: Array<{
        id: string;
        votersAmount: number;
        cumulativeStakeAtRound: number;
        countWrongVotes: number;
        countCorrectVotes: number;
        countNoVotes: number;
        totalVotesRevealed: number;
      }>;
    };
  }>(query);
}

export async function getUsersAtBlock(blockNumber: number) {
  const query = `
    query {
      users(first: 1000, where: { voterStake_gt: 0 }, block: { number: ${blockNumber} }) {
        id
      }
    }
  `;

  return fetchGraphQL<{
    users: Array<{ id: string }>;
  }>(query);
}
