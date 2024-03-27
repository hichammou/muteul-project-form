import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Home() {
  return (
    <section className="flex gap-10 flex-col items-center translate-y-28">
      <div className="flex flex-col lg:flex-row">
        <div className="head_text text-center">
          <h1>
            Le choix le plus intelligent
            <p className="orange_gradient">pour une vie sûre.</p>
          </h1>
          <Button size={"lg"} asChild>
            <Link to="/demade-devis">Demander un devis</Link>
          </Button>
        </div>
        <div className="size-92 hidden md:block">
          <img src="image1.png" alt="family image" />
        </div>
      </div>
    </section>
  );
}

export default Home;
