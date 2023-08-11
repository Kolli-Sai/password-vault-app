/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../Api";
import PasswordDetailForm from "./forms/password-detail-form";
import { TypographyH1 } from "../../components/ui/typography";

const getSinglePassword = async (id) => {
  console.log(`get single password ${id}`);
  try {
    const data = await Api.get(`/user/password/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(`data`, data);
    return data.data;
  } catch (error) {
    console.log(`error`, error);
    return error;
  }
};

const DashboardDetailPage = () => {
  const { id } = useParams();
  const { isSuccess, data, isError, error, isLoading } = useQuery(
    ["passwords", id],
    () => getSinglePassword(id)
  );
  console.log(`data`, data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  console.log(`data`, data);
  return (
    <div className=" flex justify-center">
      <div className=" container">
        <TypographyH1>Password Details</TypographyH1>
        <PasswordDetailForm item={data} />
      </div>
    </div>
  );
};

export default DashboardDetailPage;
