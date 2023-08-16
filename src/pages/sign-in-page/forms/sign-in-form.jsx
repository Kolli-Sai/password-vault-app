/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, LoadingButton } from "../../../components/ui/button";
import { useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { TypographyMuted } from "../../../components/ui/typography";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SignInUser } from "../../../utils/sign-in-user";
import { useToast } from "../../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../zustand/useAuth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
});
const SignInForm = () => {
  const { user, setUser } = useAuth((state) => state);
  console.log("user", user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } =
    formState;

  const { mutate, isError, error, isLoading, data, isSuccess } = useMutation(
    SignInUser,
    {
      onSuccess: (data) => {
        console.log(`onsuccess`, data);
        if (data.token) {
          // Assuming your server returns a 'success' flag
          toast({
            title: "Signed In",
            description: "You have successfully signed in.",
          });
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          setUser(true);

          console.log("data", data);
        } else {
          // Handle unsuccessful login attempt (maybe display an error toast)
          toast({
            variant: "destructive",
            title: "Error",
            description: data.response.data.error,
          });
        }
      },

      onError: (error) => {
        console.log("error", error);
        toast({
          title: "Error",
          description: error.message,
        });
      },
    }
  );

  console.log("Loggedin data", data);

  const onSubmit = (data) => {
    mutate({ obj: data });
    console.log(data);
  };

  console.log("isSuccess", isSuccess);

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className=" flex  flex-col gap-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            {...register("email")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.email?.message}
          </TypographyMuted>
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            className="w-full"
            {...register("password")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.password?.message}
          </TypographyMuted>
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            className=" cursor-pointer disabled:cursor-not-allowed"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Sign In
          </Button>
        )}
      </div>
      <div className=" mt-4">
        <TypographyMuted>
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </TypographyMuted>
      </div>
    </form>
  );
};

export default SignInForm;
