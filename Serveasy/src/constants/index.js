//has constant datas like footers and description

export const navLinks = [
  {
    id: "home",
    title: "Home",
    path: "/",
  },
  {
    id: "order",
    title: "Order",
    path: "/order",
  },
  {
    id: "account",
    title: "Account",
    path: "/account",
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
  },
];

export const SignUpinputs = [
  {
    id: 1,
    name: "fullname",
    title: "Full Name",
    type: "text",
    placeholder: "Gregor Clegane",
    errorMessage: "",
    required: true,
    pattern: "^[A-Za-z0-9]{3,16}$",
  },
  {
    id: 2,
    name: "username",
    title: "User Name",
    type: "text",
    placeholder: "Gregor Gigglesbane",
    errorMessage:
      "User Name should be atleast 3-16 characters!",
    required: true,
    pattern: "^[A-Za-z0-9]{3,16}$",
  },
  {
    id: 3,
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "GregorGiggles@gmail.com",
    errorMessage: "Invalid Email",
    required: true,
  },
  {
    id: 4,
    name: "password",
    title: "Password",
    type: "password",
    errorMessage:
      "Password should be atleast 8 characters!",
    required: true,
  },
  {
    id: 5,
    name: "confirmPassword",
    title: "Confirm Password",
    type: "password",
    errorMessage: "Passwords don't match!",
    required: true,
  },
];
