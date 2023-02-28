import { Zap, Image, DollarSign, Clock } from "react-feather";

export const avatarColors = [
  {
    color: "red",
    label: "Red",
  },
  {
    color: "blue",
    label: "Blue",
  },
  {
    color: "green",
    label: "Green",
  },
  {
    color: "yellow",
    label: "Yellow",
  },
  {
    color: "pink",
    label: "Pink",
  },
  {
    color: "cyan",
    label: "Cyan",
  },
  {
    color: "orange",
    label: "Orange",
  },
  {
    color: "purple",
    label: "Purple",
  },
];

export const avatarStyles = [
  {
    image: ".",
    label: "Pixelated",
  },
  {
    image: ".",
    label: "Clay",
  },
  {
    image: ".",
    label: "Flat",
  },
  {
    image: ".",
    label: "Metallic",
  },
  {
    image: ".",
    label: "Polygon",
  },
  {
    image: ".",
    label: "Cartoon",
  },
];

export const avatarShapes = [
  {
    image: ".",
    label: "Rounded",
  },
  {
    image: ".",
    label: "Square",
  },
  {
    image: ".",
    label: "Circular",
  },
];

export const generateFormDefaultState = {
  prompt: "",
  color: "",
  style: "",
  shape: "",
  amount: 1,
};

export const landingPageActionItems = [
  {
    Icon: Zap,
    title: "Quick avatar generation",
    description:
      "Our avatars will be generated in seconds and you will be able to tweak your prompt in order to make them closer to exactly what you were imagining.",
  },
  {
    Icon: Image,
    title: "High quality avatars",
    description:
      "All our avatars are generated on a 1024x1024 format, which is more than suitable for great quality on any service out there.",
  },
  {
    Icon: DollarSign,
    title: "Great pricing",
    description:
      "Our credit top-up options are extremely affordable so that making the perfect avatar is not an expensive task.",
  },
  {
    Icon: Clock,
    title: "Save yourself time",
    description:
      "You will be able to use those googling time searching for an avatar into actually taking with your friends online.",
  },
];

export const userReviews = [
  {
    avatar: "/reviewavatar1.png",
    name: "Levi Fernandez",
    username: "@levi",
    review:
      "This app has been a lifesaver for my Discord server! The AI-powered generator gave me so many options to choose from, and I was able to customize each image to fit my server's aesthetic perfectly. Highly recommend!",
  },
  {
    avatar: "/reviewavatar2.png",
    name: "Violet Frazier",
    username: "@purple",
    review:
      "As someone who's always looking for ways to spruce up my Discord server, I was thrilled to find this app. The AI generator makes it so easy to create eye-catching images that really make my server stand out.",
  },
  {
    avatar: "/reviewavatar3.png",
    name: "Marion Wallace",
    username: "@marionw",
    review:
      "I love the level of customization available in this app. The AI technology makes it easy to create a range of images that fit my server's vibe, and I can easily tweak each one to make it just right.",
  },
  {
    avatar: "/reviewavatar4.png",
    name: "Suzanne Brown",
    username: "@suzzzie",
    review:
      "This app is a game-changer for anyone who wants to create professional-looking images for their Discord server. The AI generator gives me so many different options to choose from, and I can easily create a cohesive look and feel across all my channels.",
  },
  {
    avatar: "/reviewavatar5.png",
    name: "Leonard Tucker",
    username: "@leonardnotcaprio",
    review:
      "As someone who's not particularly artistic, I was thrilled to find an app that made it easy for me to create great images for my Discord server. The AI-powered generator is incredibly intuitive, and I can create a range of images that fit my server's personality perfectly.",
  },
  {
    avatar: "/reviewavatar6.png",
    name: "Meghan Wade",
    username: "@meggs",
    review:
      "I've been using this app to create images for my Discord server for a while now, and I'm constantly impressed by the quality of the results. The AI generator gives me so many different options to choose from, and I can easily create images that are tailored to each channel's topic.",
  },
];
