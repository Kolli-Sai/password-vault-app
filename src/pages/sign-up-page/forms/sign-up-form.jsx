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
import { SignUpUser } from "../../../utils/sign-up-user";
import { ImSpinner2 } from "react-icons/im";
import { useToast } from "../../../components/ui/use-toast.ts";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const SignUpForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } =
    formState;

  const { mutate, isLoading, isSuccess, data, isError, error } =
    useMutation(SignUpUser);

  const onSubmit = async (data) => {
    try {
      await mutate({ obj: data });
    } catch (error) {
      console.log("first error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Account Created",
        description: "We've created your account for you.",
      });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Account Creation Failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

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
            type="text"
            placeholder="Name"
            className="w-full"
            {...register("name")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.name?.message}
          </TypographyMuted>
        </div>
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
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            className="w-full"
            {...register("confirmPassword")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.confirmPassword?.message}
          </TypographyMuted>
        </div>
        {isLoading ? (
          // <Button disabled>
          //   <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
          //   Please Wait
          // </Button>
          <LoadingButton />
        ) : (
          <Button
            // className="cursor-not-allowed"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Sign Up
          </Button>
        )}
      </div>
      <div className=" mt-4">
        <TypographyMuted>
          Already have an account?{" "}
          <Link to="/signin" className="text-primary">
            Sign In
          </Link>
        </TypographyMuted>
      </div>
    </form>
  );
};

export default SignUpForm;
