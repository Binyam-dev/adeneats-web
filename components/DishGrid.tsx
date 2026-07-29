import Container from "./Container";
import Reveal from "./Reveal";
import DishCard from "./DishCard";
import { dishes } from "@/data/dishes";

export default function DishGrid() {
  return (
    <div
      id="dishes"
      className="bg-[linear-gradient(180deg,var(--color-teff)_0%,var(--color-teff-panel-2)_50%,var(--color-teff)_100%)] py-24"
    >
      <Container>
        <Reveal>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            A first taste
          </div>
          <h2 className="max-w-[24ch] text-display-lg font-display text-injera">
            Food that arrives with a story.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-injera-dim">
            Slow-cooked, spice-forward, and made in real home kitchens. Move
            through the table—every dish has a person and a memory behind it.
          </p>
        </Reveal>

        <div className="mt-13 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <Reveal
              key={dish.slug}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <DishCard dish={dish} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
