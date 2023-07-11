"use client";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { round } from "lodash-es";
import Link from "next/link";
import { UsersTable } from "@/components/tables/usersTable";

export default function Page() {
  const { loading, error, data } = useQuery(
    gql`
      query {
        globals(first: 1) {
          cumulativeStake
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
    <div className="flex flex-col justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold self-center">Users</h1>
      <p className="m-2">
        {"CummulativeStake: " + data.globals[0].cumulativeStake}
      </p>
      <UsersTable data={data} />
      Total Users: {data.users.length}
    </div>
  );
}
