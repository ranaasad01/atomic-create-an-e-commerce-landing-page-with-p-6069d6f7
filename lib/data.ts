export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#products" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const APP_NAME = "NovaTech Store";
export const APP_TAGLINE = "Gear Up for What's Next";
export const APP_DESCRIPTION =
  "Your destination for the latest electronics and gadgets. Fast shipping, easy returns, and real human support.";