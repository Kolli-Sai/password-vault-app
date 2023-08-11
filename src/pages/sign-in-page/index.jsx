import SignInForm from "./forms/sign-in-form";

const SignInPage = () => {
  return (
    <>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 my-8 py-8">
        <div className=" ">
          <img src="/login2.svg" alt="Login Svg" />
        </div>
        <div className="  self-center ">
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
