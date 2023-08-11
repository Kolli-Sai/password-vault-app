/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import {
  TypographyH1,
  TypographyLarge,
  TypographyP,
  TypographyLead,
} from "../../components/ui/typography";

const HomePage = () => {
  return (
    <>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 my-8 py-8">
        <div className=" order-1 md:order-2 self-center">
          <img src="/welcome3.svg" alt="Welcome Svg" />
        </div>
        <div className=" order-2 md:order-1 self-center flex flex-col gap-5 ">
          <TypographyH1>
            Welcome to the{" "}
            <span
              className="bg-clip-text text-transparent  bg-gradient-to-tr
            from-primary to-accent
              "
            >
              Password Vault
            </span>
          </TypographyH1>
          <TypographyLead>
            Tired of remembering multiple passwords? Struggling to keep accounts
            secure? Introducing Password Vault! It's a modern solution to
            simplify your online life. Imagine one strong key for all accounts.
            No more weak passwords or juggling many.
          </TypographyLead>
        </div>
      </div>
    </>
  );
};

export default HomePage;
