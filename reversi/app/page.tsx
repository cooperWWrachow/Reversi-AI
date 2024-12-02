import React from "react";
import Navbar from "@/components/Navbar";
import Board from "@/components/Board";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar/>
        <Board/>
      </div>
      
    </>
  );
}
