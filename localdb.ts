export const products = new Array(20).fill('').map((_, index) => ({
    title: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. №${index}`,
    price: (index+1)*3,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image: "https://besthqwallpapers.com/Uploads/18-2-2019/80892/thumb2-apple-macbook-laptop-on-black-background-modern-technology-laptop-apple.jpg",
    imageArray: "",
    exist: true,
    category: "computers", 
}))