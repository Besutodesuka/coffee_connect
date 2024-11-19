"use client";

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col min-h-screen">
      <Container>
        <Navbar session={session} />
        
        {/* First section */}
        <div className="flex-grow text-center p-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HomeBG.svg')" }}
        >
          <div className="flex flex-col items-center my-5">
            <p className="text-5xl"><strong>"We connect happiness"</strong></p>
            <br></br>
            <img
              className="my-5 w-57 h-57 object-cover rounded-full"
              src="/Coffee_Connect.svg"
              alt="Profile"
            />
          </div>
        </div>

        {/* Second section */}
        <div className="flex-grow text-center p-5">
          <br></br>
          <h3 className="text-3xl"><strong>What is Coffee Connect?</strong></h3>
          <p className="text-1xl mt-3">
            We connect coffee farmers and entrepreneurs who are passionate about starting coffee bean-related businesses. By offering quality control, free shipping management and cost, a transparent bidding system, direct trading relations, and the distribution of coffee samples. Coffee Connect ensures a fair solution for sourcing and trading high-quality coffee beans between farmers and entrepreneurs.
          </p>
        </div>
        
        <Footer />
      </Container>
    </main>
  );
}