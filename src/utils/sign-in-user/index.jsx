import { Api } from "../../Api";

export const SignInUser = async ({ obj }) => {
  try {
    const response = await Api.post("/auth/login", obj);
    console.log(`response from utils`, response.data);

    return response.data;
  } catch (error) {
    console.log(`error from utils`, error);
    throw new Error(error.response.data.error || error.message); // Throw a custom error message
  }
};
