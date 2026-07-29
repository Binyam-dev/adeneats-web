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
      "Chicken slow-simmered in rich berbere with a whole boiled egg. A national treasure.",
    fastingFriendly: false,
    cookFirstName: "Selam",
    story: "her mother's recipe from Gondar, with the whole egg saved for whoever has earned it.",
    alt: "Doro wat with chicken and a boiled egg in berbere sauce on injera",
    image: "/images/dishes/doro-wat.webp",
  },
  {
    slug: "kitfo",
    name: "Kitfo",
    fidel: "ክትፎ",
    description:
      "Finely minced beef with mitmita and warmed niter kibbeh. Choose leb leb or fully cooked.",
    fastingFriendly: false,
    cookFirstName: "Bereket",
    story: "the way his grandfather taught him in Hosaena, served fresh enough to compliment the cook standing next to you.",
    alt: "Kitfo served on injera with ayib and gomen",
    image: "/images/dishes/kitfo.webp",
  },
  {
    slug: "beyaynetu",
    name: "Beyaynetu",
    fidel: "በያይነቱ",
    description:
      "The colorful fasting platter, with a full spread of vegetable stews on injera.",
    fastingFriendly: true,
    cookFirstName: "Meron",
    story: "the fasting-Friday platter she has made every week since she was twelve, with one generous scoop of each stew.",
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
    story: "the recipe he perfected at a tibs stall in Addis. You will hear the awaze hit the pan before you see it.",
    alt: "Awaze tibs with beef, onion, jalapeño, and rosemary beside injera",
    image: "/images/dishes/awaze-tibs.webp",
  },
  {
    slug: "shiro-wat",
    name: "Shiro Wat",
    fidel: "ሽሮ ወጥ",
    description: "Silky spiced chickpea stew and a beloved everyday comfort.",
    fastingFriendly: true,
    cookFirstName: "Frehiwot",
    story: "the first dish she cooked on her own at nine, and one many Ethiopian children crave before they can pronounce \"chickpea.\"",
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
    story: "slow-cooked the way his mother always started the big Sunday spread: patiently and first on the stove.",
    alt: "Slow-cooked Ethiopian collard greens served on injera",
    image: "/images/dishes/gomen.webp",
  },
];
