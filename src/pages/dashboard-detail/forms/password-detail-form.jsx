import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  LoadingButton,
  LoadingButtonDestructive,
} from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { TypographyMuted } from "../../../components/ui/typography";
import { Textarea } from "../../../components/ui/textarea";
import { Api } from "../../../Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/ui/use-toast";
import { Label } from "../../../components/ui/label";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const schema = yup.object().shape({
  title: yup.string().required(),
  password: yup.string().min(8).max(16).required(),
  description: yup.string().required(),
});

/**
 * update password form
 */

const UpdatePasswordForm = async ({ id, obj }) => {
  console.log(`id ${id} obj ${JSON.stringify(obj)}`);
  try {
    const data = await Api.patch(`/user/password/${id}`, obj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

/**
 * Delete password form
 */

const DeletePasswordForm = async (id) => {
  try {
    const data = await Api.delete(`/user/password/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

const PasswordDetailForm = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      title: item.title,
      password: item.password,
      description: item.description,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } =
    formState;

  const queryClient = useQueryClient();

  const updateMutation = useMutation(UpdatePasswordForm, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("passwords");
      toast({
        description: "Updated Successfully.",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteMutation = useMutation(DeletePasswordForm, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("passwords");
      toast({
        description: "Deleted Successfully.",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(item._id);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync({ id: item._id, obj: data });
    } catch (error) {
      console.error(error);
    }
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
    <form className="my-4">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
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
          <Label htmlFor="password">Password</Label>
          <div className=" flex gap-1">
            <Input
              id="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              className="w-full"
              {...register("password")}
            />
            {visible ? (
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible);
                }}
              >
                <AiFillEye className=" text-foreground" size={"20"} />
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible);
                }}
              >
                <AiFillEyeInvisible className=" text-foreground" size="20" />
              </Button>
            )}
          </div>
          <TypographyMuted className={"text-destructive"}>
            {errors.password?.message}
          </TypographyMuted>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            type="text"
            placeholder="Description"
            className="w-full"
            {...register("description")}
          />
          <TypographyMuted className={"text-destructive"}>
            {errors.description?.message}
          </TypographyMuted>
        </div>
        <div className="flex justify-end gap-10">
          <div>
            {updateMutation.isLoading && isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button
                onClick={handleSubmit(onSubmit, onError)}
                disabled={!isDirty || !isValid || updateMutation.isLoading}
              >
                update
              </Button>
            )}
          </div>
          <div>
            {deleteMutation.isLoading ? (
              <LoadingButtonDestructive />
            ) : (
              <Button
                variant="destructive"
                onClick={handleDelete}
                // disabled={deleteMutation.isLoading}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PasswordDetailForm;
