/* eslint-disable no-useless-catch */
import { Api } from "../../Api";

export const SignUpUser = async ({ obj }) => {
  console.log(`signup data`, obj);
  try {
    const data = await Api.post("/auth/register", {
      name: obj.name,
      email: obj.email,
      password: obj.password,
    });
    console.log(data.data);

    return data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
