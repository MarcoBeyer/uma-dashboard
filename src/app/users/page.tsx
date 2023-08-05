"use client";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { round } from "lodash-es";
import Link from "next/link";
import { UsersTable } from "@/components/tables/usersTable";
import { DetailsList } from "@/components/details/detailsList";
import { DetailsRow } from "@/components/details/detailsRow";

export default function Page() {
  const { loading, error, data } = useQuery(
    gql`
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
    `
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen py-2">
      <h1 className="text-2xl font-bold text-center">Users</h1>
      <p className="m-3">
        <DetailsList>
          <DetailsRow
            title="Cummulative stake"
            value={round(data.globals[0].cumulativeStake, 2)}
          />
          <DetailsRow
            title="Average stake"
            value={round(
              data.globals[0].cumulativeStake / data.users.length,
              2
            )}
          />
          <DetailsRow
            title="Total Users"
            value={data.globals[0].userAddresses.length}
          />
          <DetailsRow
            title="Total Users with Stake"
            value={data.users.length}
          />
        </DetailsList>
      </p>
      <UsersTable data={data} />
    </div>
  );
}
