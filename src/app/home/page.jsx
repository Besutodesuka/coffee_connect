"use client"

//this site will be market place

import Image from "next/image";
import Container from "../components/Container";
import CoffeeCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  // if user does not logged in they cant be in this page
  const { data: session } = useSession();
  if (!session) redirect("/login");

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <CoffeeCard name="test" image={null} grade={3} price={10}/>
        <Footer />
      </Container>
    </main>
  );
}