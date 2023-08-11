import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { TypographyH3 } from "../ui/typography";

/**
 * icons
 */

import { HiMenuAlt3 } from "react-icons/hi";
import NavbarDropDown from "./components/dropdown";
import { ModeToggle } from "../../theme/mode-toggle";
import { useAuth } from "../../zustand/useAuth";

/**
 * component
 */
const Navbar = () => {
  const { user, logout } = useAuth((state) => state);
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
  };

  return (
    <>
      <nav className=" flex justify-between pt-6 pb-4">
        <Link
          to={"/"}
          className=" text-2xl flex items-center invisible sm:visible"
        >
          <TypographyH3>Password Vault</TypographyH3>
        </Link>

        <div className=" flex gap-6">
          <ModeToggle />

          <div className=" space-x-6 hidden sm:block">
            <Button variant="link">
              <Link to={"/dashboard"}>Dashboard</Link>
            </Button>
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button>
                <Link to={"/signin"}>Login</Link>
              </Button>
            )}
          </div>
          <div className=" sm:hidden">
            <NavbarDropDown
              trigger={
                <Button variant="ghost">
                  <HiMenuAlt3 className="inline-block text-foreground text-2xl " />
                </Button>
              }
            />
          </div>
        </div>
      </nav>

      <Separator className="my-4" />
    </>
  );
};

export default Navbar;
