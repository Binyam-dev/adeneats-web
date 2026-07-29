export type MenuItem = {
  id: string;
  cook_listing_id: string;
  name: string;
  description: string | null;
  price_cents: number;
  fasting_friendly: boolean;
  is_available?: boolean;
};

export type CookListing = {
  id: string;
  name: string;
  bio: string | null;
  city: string | null;
  cuisine_specialty: string | null;
  photo_url: string | null;
  is_published?: boolean;
  menu_items: MenuItem[];
};

export type CartLine = {
  item: MenuItem;
  cook: Pick<CookListing, "id" | "name">;
  quantity: number;
};

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
