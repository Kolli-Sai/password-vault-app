/* eslint-disable no-unused-vars */
import { Api } from "../../Api";

export const SignInUser = async ({ obj }) => {
  try {
    const data = await Api.post("/auth/login", obj);
    console.log(data);

    return data.data;
  } catch (error) {
    return error;
  }
};
