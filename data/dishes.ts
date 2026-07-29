export type Dish = {
  slug: string;
  name: string;
  fidel: string;
  description: string;
  fastingFriendly: boolean;
  /** First name of the (illustrative, not-yet-real) cook this dish is
   * attributed to — paired with `story` as "{cookFirstName}'s {name}",
   * revealed on tap. See DishCard. */
  cookFirstName: string;
  /** One-line origin/human detail, shown after the cook attribution —
   * e.g. "her mother's recipe from Gondar". Revealed on tap — see
   * DishCard. */
  story: string;
  alt: string;
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
    cookFirstName: "Selam",
    story: "her mother's recipe from Gondar — the whole egg saved for whoever's earned it.",
    alt: "Doro wat with chicken and a boiled egg in berbere sauce on injera",
    image: "/images/dishes/doro-wat.webp",
  },
  {
    slug: "kitfo",
    name: "Kitfo",
    fidel: "ክትፎ",
    description:
      "Finely minced beef with mitmita and warmed niter kibbeh. Leb leb or fully cooked — your call.",
    fastingFriendly: false,
    cookFirstName: "Bereket",
    story: "the way his grandfather taught him in Hosaena — fresh enough to compliment the cook standing next to you.",
    alt: "Kitfo served on injera with ayib and gomen",
    image: "/images/dishes/kitfo.webp",
  },
  {
    slug: "beyaynetu",
    name: "Beyaynetu",
    fidel: "በያይነቱ",
    description:
      "The colorful fasting platter — a full spread of veggie stews on injera.",
    fastingFriendly: true,
    cookFirstName: "Meron",
    story: "the fasting-Friday platter she's made every week since she was twelve — one scoop of each stew, never skimped.",
    alt: "Beyaynetu vegan stews and vegetables arranged on injera",
    image: "/images/dishes/beyaynetu.webp",
  },
  {
    slug: "awaze-tibs",
    name: "Awaze Tibs",
    fidel: "አዋዜ ጥብስ",
    description:
      "Sizzling sautéed beef with jalapeño, rosemary, and smoky awaze heat.",
    fastingFriendly: false,
    cookFirstName: "Yonas",
    story: "the recipe he perfected running a tibs stall in Addis, before he ever left — you'll hear the awaze hit the pan before you see it.",
    alt: "Awaze tibs with beef, onion, jalapeño, and rosemary beside injera",
    image: "/images/dishes/awaze-tibs.webp",
  },
  {
    slug: "shiro-wat",
    name: "Shiro Wat",
    fidel: "ሽሮ ወጥ",
    description: "Silky spiced chickpea stew — the beloved everyday comfort.",
    fastingFriendly: true,
    cookFirstName: "Frehiwot",
    story: "the first dish she ever cooked on her own, at nine — the one every Ethiopian kid learns to crave before they can pronounce \"chickpea.\"",
    alt: "Smooth Ethiopian shiro wat with folded injera",
    image: "/images/dishes/shiro-wat.webp",
  },
  {
    slug: "gomen",
    name: "Gomen",
    fidel: "ጎመን",
    description: "Collard greens slow-cooked with garlic and ginger.",
    fastingFriendly: true,
    cookFirstName: "Amanuel",
    story: "slow-cooked the way his mother always started the big Sunday spread — patient, first thing on the stove.",
    alt: "Slow-cooked Ethiopian collard greens served on injera",
    image: "/images/dishes/gomen.webp",
  },
];
