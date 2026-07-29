export const ingredients = [
  {
    name: "Berbere",
    fidel: "በርበሬ",
    note: "Warmth, depth, and a carefully balanced blend of spices.",
    color: "var(--color-berbere)",
    image: "/images/ingredients/berbere.webp",
    alt: "Berbere spice in a dark clay bowl with dried chilies and whole spices",
  },
  {
    name: "Teff",
    fidel: "ጤፍ",
    note: "The tiny grain at the heart of injera’s distinctive flavor.",
    color: "var(--color-gold)",
    image: "/images/ingredients/teff.webp",
    alt: "Tiny ivory and brown teff grains spilling from a woven basket",
  },
  {
    name: "Slow-cooked onions",
    fidel: "ሽንኩርት",
    note: "Cooked patiently until they become the foundation of the stew.",
    color: "#b86c3f",
    image: "/images/ingredients/slow-cooked-onions.webp",
    alt: "Diced onions slowly caramelizing in a dark cooking pot",
  },
  {
    name: "Shiro",
    fidel: "ሽሮ",
    note: "Ground chickpeas transformed into everyday comfort.",
    color: "#d79b45",
    image: "/images/ingredients/shiro.webp",
    alt: "Pale golden shiro powder in a rustic clay bowl with chickpeas",
  },
  {
    name: "Gomen",
    fidel: "ጎመን",
    note: "Collard greens, garlic, ginger, and the patience to let them soften.",
    color: "#61784d",
    image: "/images/ingredients/gomen.webp",
    alt: "Fresh collard greens, ginger, garlic, and cooked Ethiopian gomen",
  },
] as const;

export const kitchenSteps = [
  "Onions soften slowly",
  "Berbere meets the pan",
  "The stew finds its depth",
  "Injera opens the table",
  "Every order is packed with care",
] as const;

export const orderSteps = [
  { label: "Choose a meal", detail: "Doro wat · Almaz’s kitchen" },
  { label: "Meet the cook", detail: "Family recipes · Silver Spring" },
  { label: "Choose the handoff", detail: "Pickup or delivery at launch" },
  { label: "Order confirmed", detail: "The kitchen begins" },
] as const;

export const fulfillmentStatuses = [
  "Order confirmed",
  "Preparing with care",
  "Ready for pickup",
  "On the way",
  "Delivered",
] as const;
