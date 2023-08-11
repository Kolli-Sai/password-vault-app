import SignUpForm from "./forms/sign-up-form";

const SignUpPage = () => {
  return (
    <>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 my-8">
        <div className=" self-center">
          <img src="/signup.svg" alt="Signup Svg" />
        </div>
        <div className=" self-center">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
