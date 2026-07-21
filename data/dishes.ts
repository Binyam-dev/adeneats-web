export type Dish = {
  slug: string;
  name: string;
  fidel: string;
  description: string;
  fastingFriendly: boolean;
  /** Gradient stops for the placeholder photo panel, shown until `image`
   * exists on disk — see README's shot list. */
  gradient: [string, string];
  /** Path under /public where this dish's photo goes once shot. */
  image: string;
};

export const dishes: Dish[] = [
  {
    slug: "doro-wat",
    name: "Doro Wat",
    fidel: "ዶሮ ወጥ",
    description:
      "Chicken slow-simmered in rich berbere with a whole boiled egg — the national treasure.",
    fastingFriendly: false,
    gradient: ["#7a2412", "#c43b1e"],
    image: "/images/dishes/doro-wat.jpg",
  },
  {
    slug: "kitfo",
    name: "Kitfo",
    fidel: "ክትፎ",
    description:
      "Finely minced beef with mitmita and warmed niter kibbeh. Leb leb or fully cooked — your call.",
    fastingFriendly: false,
    gradient: ["#8a5a16", "#e2a93b"],
    image: "/images/dishes/kitfo.jpg",
  },
  {
    slug: "beyaynetu",
    name: "Beyaynetu",
    fidel: "በያይነቱ",
    description:
      "The colorful fasting platter — a full spread of veggie stews on injera.",
    fastingFriendly: true,
    gradient: ["#0f6b4e", "#1d9e75"],
    image: "/images/dishes/beyaynetu.jpg",
  },
  {
    slug: "awaze-tibs",
    name: "Awaze Tibs",
    fidel: "አዋዜ ጥብስ",
    description:
      "Sizzling sautéed beef with jalapeño, rosemary, and smoky awaze heat.",
    fastingFriendly: false,
    gradient: ["#5c3a20", "#8a5a2e"],
    image: "/images/dishes/awaze-tibs.jpg",
  },
  {
    slug: "shiro-wat",
    name: "Shiro Wat",
    fidel: "ሽሮ ወጥ",
    description: "Silky spiced chickpea stew — the beloved everyday comfort.",
    fastingFriendly: true,
    gradient: ["#6e1f3a", "#a03b2a"],
    image: "/images/dishes/shiro-wat.jpg",
  },
  {
    slug: "gomen",
    name: "Gomen",
    fidel: "ጎመን",
    description: "Collard greens slow-cooked with garlic and ginger.",
    fastingFriendly: true,
    gradient: ["#274d3d", "#4e7a4a"],
    image: "/images/dishes/gomen.jpg",
  },
];
