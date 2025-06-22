"use server";

import { auth } from "@/lib/auth";

type formDataType = {
  email: string;
  password: string;
};

export const signInWithEmailAndPassword = async (formData: formDataType) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: formData.email,
        password: formData.password,
        name: "mohim khan",
        callbackURL: "/",
      },
      asResponse: true,
    });

    console.log("from server ", { response });

    return {
      success: true,
      message: "Successfully register",
      response,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: `An unexpected error: ${e?.message}`,
    };
  }
};
