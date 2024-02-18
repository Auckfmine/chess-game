"use client"
import StoreProvider from "./StoreProvider";
import GameV2 from "@/pages/game-v2";

export default function Home() {
  return (
    <StoreProvider>
      <GameV2/>
    </StoreProvider>
  );
}
