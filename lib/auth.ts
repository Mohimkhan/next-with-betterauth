import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
        fieldName: "phone",
        input: true,
      },
      role: {
        type: "string",
        required: true,
        fieldName: "role",
        defaultValue: "member",
      },
      address: {
        type: "string",
        required: true,
        input: true,
        fieldName: "address",
      },
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the arra
});
