
import React from "react"

import { findOpenGames } from "@/db/queries/games"
import DashboardClient from "./DashboardClient"

export default async function Page() {
  const games = await findOpenGames()
  return <DashboardClient games={games} />
}
