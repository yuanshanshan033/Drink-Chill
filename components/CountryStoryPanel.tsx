import type { CountryProfile } from "@/lib/types";

export function CountryStoryPanel({ country }: { country: CountryProfile }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="relative h-56 overflow-hidden">
        <img
          src={country.image}
          alt={`${country.name} 风景`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-semibold opacity-85">{country.localName}</p>
          <h2 className="text-3xl font-black">{country.name}</h2>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-slate-600">{country.summary}</p>
        <div className="mt-5 grid gap-4">
          {country.drinks.map((drink) => (
            <article key={drink.name} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-black text-ink">{drink.name}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                  {drink.category} / {drink.abv}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-sky-700">{drink.flavor}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{drink.story}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {drink.products.map((product) => (
                  <span key={product} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                    {product}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
