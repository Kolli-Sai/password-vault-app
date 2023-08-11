/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import AddPasswordForm from "./forms/add-password";
import { Api } from "../../Api";
import AddNewPasswordSheet from "./components/add-new-password-sheet";
import { Button } from "../../components/ui/button";
import {
  TypographyH1,
  TypographyH3,
  TypographyLead,
} from "../../components/ui/typography";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const getAllPasswords = async () => {
  const token = localStorage.getItem("token");
  try {
    const data = await Api.get("/user/passwords", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(`first error`, error);
    return error;
  }
};

const DashboardPage = () => {
  const { data, isSuccess, isError, error, isLoading } = useQuery(
    ["passwords"],
    getAllPasswords
  );
  console.log("data", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data.length) {
    return (
      <>
        <div className=" flex justify-end mb-6">
          <AddNewPasswordSheet
            trigger={
              <Button>
                Add New Password
                <AiOutlinePlus
                  className=" text-foreground ml-2 font-semibold"
                  size={"20"}
                />
              </Button>
            }
            title={"Add New Password"}
            description={"Add new password to your vault."}
            content={<AddPasswordForm />}
          />
        </div>
        <TypographyH1 className={"mb-4"}>No Passwords Yet!</TypographyH1>
        <TypographyLead>
          Click the Add New Password button to add
        </TypographyLead>
      </>
    );
  }

  return (
    <>
      <div className=" flex justify-end mb-6">
        <AddNewPasswordSheet
          trigger={
            <Button>
              Add New Password
              <AiOutlinePlus
                className=" text-foreground ml-2 font-semibold"
                size={"20"}
              />
            </Button>
          }
          title={"Add New Password"}
          description={"Add new password to your vault."}
          content={<AddPasswordForm />}
        />
      </div>

      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-6">
        {data?.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString();
          const updatedAt = new Date(item.updatedAt).toLocaleString();
          return (
            <Link
              to={`/dashboard/${item._id}`}
              key={item._id}
              className=" px-6 py-4 border-border border-2 bg-card text-card-foreground rounded-lg hover:border-2 hover:border-foreground cursor-pointer"
            >
              <TypographyH3 className={"capitalize line-clamp-1 "}>
                {item.title}
              </TypographyH3>
              <div className="flex justify-between text-accent-foreground">
                <div>Created At: {createdAt.toLocaleString()}</div>
                <div>Updated At: {updatedAt.toLocaleString()}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DashboardPage;
