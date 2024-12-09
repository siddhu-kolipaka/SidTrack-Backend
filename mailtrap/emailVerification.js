import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const appName = `${process.env.APPNAME}`;
const HomepageURL = `${process.env.APPHOMEPAGEURL}`;

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: appName,
};

export { mailtrapClient, sender, appName, HomepageURL };
