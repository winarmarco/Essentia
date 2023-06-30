import Navbar from "@/components/Navbar/Navbar";
import Main from "@/components/Main";
import "./globals.css";
import Category from "@/components/Category";
import NewArrival from "@/components/NewArrival";
import About from "@/components/About";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Main />
      </div>

      <Category />

      <About />

      <NewArrival />

      <Feature />
      <Footer />
    </div>
  );
};

export default Home;
