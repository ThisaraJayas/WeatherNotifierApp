import nodemailer from "nodemailer";
import { generateWeatherDescription } from "../utils/generateWeatherDescription .js";
import User from "../models/UserModel.js";
import { getWeatherData } from "../utils/WeatherUtils.js";

export const sendEmail = async (mailTo, subject, weatherMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADREE,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_ADREE,
    to: mailTo,
    subject: subject,
    text: weatherMessage,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const sendWeatherReport = async () => {
  const users = await User.find();

  for (const user of users) {
    const [city, countryCode] = user.location
      .split(",")
      .map((part) => part.trim());
    const { data } = await getWeatherData(city, countryCode);
    const weatherDescription = await generateWeatherDescription(data);

    const subject = `Weather Update for ${city}`;
    const text = `
            Current Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C
            Weather: ${data.weather[0].description}
            Humidity: ${data.main.humidity}%
            Wind Speed: ${data.wind.speed} m/s

            ${weatherDescription}
        `;

    await sendEmail(user.email, subject, text);
  }
};
