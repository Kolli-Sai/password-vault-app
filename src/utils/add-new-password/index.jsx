import { Api } from "../../Api";

export const AddNewPassword = async ({ obj }) => {
  console.log("add new password called", obj);
  const token = localStorage.getItem("token");
  console.log("token", token);

  try {
    const data = await Api.post("/user/password", obj, {
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
