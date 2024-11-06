import HomeImage from "../assets/hero.png";
import Hero from "../components/home/Hero/Hero";
import Navbar from "../components/Header/Header";

const Home = () => {
    return (
        <div>
            <div className="relative h-[100vh] h-[5000px]">
                <div className="absolute w-full h-full bg-dark-background3 opacity-60"></div>
                <img src={HomeImage} alt="hero picture" className="w-[100vw] h-[100vh] object-cover z-10" />
                <div className="w-full absolute top-0 z-20">
                    <Navbar />
                    <Hero />
                </div>
            </div>
        </div>
    );
};

export default Home;
