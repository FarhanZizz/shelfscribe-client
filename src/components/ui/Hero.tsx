import heroImg from "../../assets/glossary.png";
const Hero = () => {
  return (
    <div className="hero mt-20">
      <div className="hero-content grid md:grid-cols-2 p-0">
        <div className="order-2 md:order-1 w-full">
          <h1 className="text-5xl md:text-6xl font-bold">
            Find the book <br /> you're looking for <br /> easier to read
          </h1>
          <p className="py-6">
            Shelfscribe: Dive into a captivating world of literary treasures.
            Discover your next favorite book with our meticulously curated
            catalog, where stories come alive and imaginations soar.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
        <img src={heroImg} className="max-w-md mx-auto order-1 md:order-2" />
      </div>
    </div>
  );
};

export default Hero;
