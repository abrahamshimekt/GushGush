"use server"
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);
  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) throw new Error("Ne session");
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};
export const createAdminClient = async () => {
  const admin = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);
  return {
    get account() {
      return new Account(admin);
    },
    get databases() {
      return new Databases(admin);
    },
    get storage() {
      return new Storage(admin);
    },
    get avatars() {
      return new Avatars(admin);
    },
  };
};
