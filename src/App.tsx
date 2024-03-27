import { ReactNode, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./components/Home"));
const Form = lazy(() => import("./components/Form"));
const About = lazy(() => import("./components/About"));
// const Contact = lazy(() => import("./components/Contact"))

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="bg-slate-400 bg-opacity-60 h-screen animate-pulse"></div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/demade-devis" element={<Form />} />
            <Route path="/about-us" element={<About />} />
            {/* <Route path="/contact-us" element={<Contact />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
