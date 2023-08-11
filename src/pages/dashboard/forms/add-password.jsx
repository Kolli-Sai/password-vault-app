/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, LoadingButton } from "../../../components/ui/button";
import { useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { TypographyMuted } from "../../../components/ui/typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../components/ui/use-toast";
import { AddNewPassword } from "../../../utils/add-new-password";
import { Textarea } from "../../../components/ui/textarea";

const schema = yup.object().shape({
  title: yup.string().required(),
  password: yup.string().min(8).max(16).required(),
  description: yup.string().required(),
});
const AddPasswordForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      title: "",
      password: "",
      description: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } =
    formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(AddNewPassword, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("passwords");
      toast({
        description: "Added Successfully.",
      });
    },
  });

  const onSubmit = (data) => {
    mutate({ obj: data });
    console.log(data);
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className=" my-4">
      <div className=" flex  flex-col gap-4">
        <div>
          <Input
            type="text"
            placeholder="title"
            className="w-full"
            {...register("title")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.title?.message}
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
          <Textarea
            type="text"
            placeholder="Description"
            className="w-full"
            {...register("description")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.description?.message}
          </TypographyMuted>
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Add
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddPasswordForm;
