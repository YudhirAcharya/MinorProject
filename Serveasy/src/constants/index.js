//has constant datas like footers and description
// let values = "";
// import { axios } from "axios";
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
    errorMessage: "Write your full name.",
    pattern: /^[a-zA-Z]+ [a-zA-Z]+$/,
  },
  {
    id: 2,
    name: "username",
    title: "User Name",
    type: "text",
    placeholder: "Gregor Gigglesbane",
    errorMessage: "User Name should be 3-16 characters!",
    pattern: /^[A-Za-z0-9]{3,16}$/,
  },
  {
    id: 3,
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "GregorGiggles@gmail.com",
    errorMessage: "Invalid Email",
  },
  {
    id: 4,
    name: "password",
    title: "Password",
    type: "password",
    errorMessage: "Password should be 8-20 characters!",
    pattern: /^[A-Za-z0-9]{8,20}$/,
  },
  {
    id: 5,
    name: "confirmPassword",
    title: "Confirm Password",
    type: "password",
    errorMessage: "Passwords don't match!",
    pattern: /^[A-Za-z0-9]{8,20}$/,
  },
];
export const chefs = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?cs=srgb&dl=pexels-miquel-ferran-gomez-figueroa-3814446.jpg&fm=jpg",
    name: "Miquel Ferran Gomez",
    title: "Sous-Chef",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/6578899/pexels-photo-6578899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Andres Ayrton",
    title: "Pastry Chef",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/8629122/pexels-photo-8629122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Eurico Luiz",
    title: "Head Chef",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/10241463/pexels-photo-10241463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Abdul Ali Khan",
    title: "Executive Chef",
  },
];
export const banner = [
  {
    id: 1,
    title: "GREAT LOCATION",
    desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
  },
  {
    id: 2,
    title: "NATURE FIRST",
    desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
  },
  {
    id: 3,
    title: "HEALTHY FOOD",
    desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
  },
];
export const data = [
  {
    id: 0,
    food_image_url:
      "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg",
    meal_name: "Burger",
    meal_quantity: "8 Products",
    price: 180,
  },
  {
    id: 1,
    food_image_url:
      "https://www.thespruceeats.com/thmb/X_JGM04VusvkuGqTVan4QmBRqjI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-make-homemade-french-fries-2215971-hero-01-02f62a016f3e4aa4b41d0c27539885c3.jpg",
    meal_name: "French Fries",
    meal_quantity: "5 Products",
    price: 80,
  },
  {
    id: 2,
    food_image_url:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
    meal_name: "Pizza",
    meal_quantity: "10 Products",
    price: 650,
  },
];
