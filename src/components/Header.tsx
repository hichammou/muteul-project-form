import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
function Header() {
  return (
    <nav className="flex sm:bg-slate-50 sm:bg-opacity-50 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur-xl justify-between sm:mb-8 py-5 items-center">
      <div className="size-20">
        <Link to="/">
          <img
            src="49004013_transparent-1.png"
            className="object-cover"
            alt=""
          />
        </Link>
      </div>
      <ul className="hidden md:flex gap-4">
        <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
          <NavLink to="/demade-devis">Demande De Devis</NavLink>
        </li>
        <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
          <NavLink to="/about-us">À propos de nous</NavLink>
        </li>
        {/* <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
          <NavLink to="/contact-us">Contacter Nous</NavLink>
        </li> */}
      </ul>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            variant={"link"}
            className="mr-4 flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <ul className="flex flex-col md:hidden gap-4 mt-5">
            <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
              <Button className="w-full" variant={"link"}>
                <NavLink to="/demade-devis">Demander de devis</NavLink>
              </Button>
            </li>
            <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
              <Button className="w-full" variant={"link"}>
                <NavLink to="/about-us">À propos de nous</NavLink>
              </Button>
            </li>
            <li className="font-semibold text-sm text-slate-500 hover:text-slate-900">
              <Button className="w-full" variant={"link"}>
                <NavLink to="/contact-us">Contacter Nous</NavLink>
              </Button>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default Header;
