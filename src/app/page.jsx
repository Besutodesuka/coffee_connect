"use client";

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import NextLogo from '../../public/next.svg'
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="flex-grow text-center p-10">
            <div className="flex justify-center my-10">
              {/* <Image src={NextLogo} width={300} height={100} alt="NextJS Logo" /> */}
            </div>
            <h3 className="text-5xl">Coffee Connnect</h3>
            <p className="text-2xl mt-3">create blood line of coffee beyond connection boundary</p>
          </div>
          <div className="flex-grow text-center p-10">
            <h3 className="text-4xl">What is Coffee Connnect?</h3>
            <p className="text-2xl mt-3">We connect coffee farmers and entrepreneurs who are passionate about starting coffee bean-related businesses. By offering quality control, free shipping management and cost, a transparent bidding system, direct trading relations, and the distribution of coffee samples. Coffee Connect ensures a fair solution for sourcing and trading high-quality coffee beans between farmers and entrepreneurs</p>
          </div>
        <Footer />
      </Container>
    </main>
    
  );
}