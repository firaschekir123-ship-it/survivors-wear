import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: "MEN" | "WOMEN";
  color: string;
  sizes: string[];
  images: string[];
  badge?: string;
  description: string;
};

type CartItem = {
  product: Product;
  size: string;
  qty: number;
};

const IMG = {
  hero:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=88",
  editorial:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=86",
  editorial2:
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=86",
  street:
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=86",
  detail:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=86",
};

const products: Product[] = [
  {
    id: 1,
    name: "ARCHIVE HOODIE",
    price: 89,
    category: "MEN",
    color: "FADED BLACK",
    sizes: ["S", "M", "L", "XL"],
    images: [
      IMG.street,
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=84",
    ],
    badge: "NEW",
    description:
      "Heavyweight cotton jersey with an oversized silhouette and washed finish.",
  },
  {
    id: 2,
    name: "RAW EDGE TEE",
    price: 45,
    category: "MEN",
    color: "BONE",
    sizes: ["S", "M", "L", "XL"],
    images: [
      IMG.detail,
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=84",
    ],
    badge: "CORE",
    description:
      "Structured everyday tee cut from compact cotton with a clean raw-edge detail.",
  },
  {
    id: 3,
    name: "SIGNATURE ZIP",
    price: 112,
    category: "WOMEN",
    color: "CHARCOAL",
    sizes: ["XS", "S", "M", "L"],
    images: [
      IMG.editorial,
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=84",
    ],
    description:
      "A refined zip silhouette balancing street utility and an editorial proportion.",
  },
  {
    id: 4,
    name: "STUDIO CARGO",
    price: 104,
    category: "MEN",
    color: "STONE",
    sizes: ["S", "M", "L", "XL"],
    images: [
      IMG.editorial2,
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=84",
    ],
    badge: "NEW",
    description:
      "Relaxed cargo trousers with generous volume and articulated utility pockets.",
  },
  {
    id: 5,
    name: "SECOND SKIN LONGSLEEVE",
    price: 62,
    category: "WOMEN",
    color: "OFF WHITE",
    sizes: ["XS", "S", "M", "L"],
    images: [
      IMG.hero,
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=84",
    ],
    description:
      "Slim, lightweight layer designed for clean monochrome stacking.",
  },
  {
    id: 6,
    name: "DISTRICT JACKET",
    price: 139,
    category: "MEN",
    color: "BLACK",
    sizes: ["S", "M", "L", "XL"],
    images: [
      IMG.street,
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=84",
    ],
    badge: "LIMITED",
    description:
      "Technical outer layer with a cropped architectural cut.",
  },
  {
    id: 7,
    name: "FRAME DENIM",
    price: 98,
    category: "WOMEN",
    color: "RAW INDIGO",
    sizes: ["26", "28", "30", "32"],
    images: [
      IMG.detail,
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=84",
    ],
    description:
      "Straight-leg denim with a rigid hand and understated hardware.",
  },
  {
    id: 8,
    name: "NOISE SWEATPANT",
    price: 76,
    category: "MEN",
    color: "HEATHER GREY",
    sizes: ["S", "M", "L", "XL"],
    images: [
      IMG.editorial2,
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=84",
    ],
    badge: "CORE",
    description:
      "Dense fleece sweatpant with a wide leg and minimal branding.",
  },
];

function money(value: number) {
  return `${value.toFixed(2)} TND`;
}

/* -------------------------------------------------------
   ROUTING
------------------------------------------------------- */

function usePath() {
  const [path, setPath] = useState(
    window.location.pathname + window.location.search
  );

  useEffect(() => {
    const handlePop = () => {
      setPath(window.location.pathname + window.location.search);
    };

    window.addEventListener("popstate", handlePop);

    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const go = (to: string) => {
    if (to === path) return;

    window.history.pushState({}, "", to);
    setPath(to);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    path,
    go,
  };
}

/* -------------------------------------------------------
   SCROLL REVEALS
------------------------------------------------------- */

function useSmoothReveal() {
  useEffect(() => {
    const elements = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
}

/* -------------------------------------------------------
   CUSTOM CURSOR
------------------------------------------------------- */

function Cursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const over = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest(
        "[data-cursor]"
      );

      setLabel(element?.getAttribute("data-cursor") || "");
      setActive(Boolean(element));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className={`cursor ${active ? "cursor--active" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {label}
    </div>
  );
}

/* -------------------------------------------------------
   STARTUP LOADER
------------------------------------------------------- */

function Loader({ done }: { done: () => void }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const first = setTimeout(() => {
      setOut(true);
    }, 1500);

    const second = setTimeout(() => {
      done();
    }, 2250);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, [done]);

  return (
    <div className={`loader ${out ? "loader--out" : ""}`}>
      <div className="loader-top">
        <span>SURVIVORS WEAR</span>
        <span>2026</span>
      </div>

      <div className="loader-center">
        <img
          className="startup-logo"
          src="/startup-logo.png"
          alt="Survivors Wear"
        />
      </div>

      <div className="loader-bottom">
        <span>EST. 2026</span>
        <span>COLLECTION 01</span>
        <span>LOADING</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   HEADER
------------------------------------------------------- */

function Header({
  go,
  openSearch,
  openBag,
}: {
  go: (path: string) => void;
  openSearch: () => void;
  openBag: () => void;
}) {
  const [menu, setMenu] = useState(false);

  const navigate = (path: string) => {
    setMenu(false);
    go(path);
  };

  return (
    <>
      <header className="header">
        <button
          className="mobile-menu"
          data-cursor="MENU"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
        >
          <i />
          <i />
        </button>

        <button
          className="wordmark"
          data-cursor="HOME"
          onClick={() => go("/")}
        >
          SURVIVORS WEAR
        </button>

        <nav className="desktop-nav">
          {["WOMEN", "MEN", "COLLECTION", "NEW IN", "ABOUT"].map((item) => {
            const path =
              item === "ABOUT"
                ? "/about"
                : item === "NEW IN"
                  ? "/collection?new=1"
                  : item === "COLLECTION"
                    ? "/collection"
                    : `/collection?cat=${item}`;

            return (
              <button
                key={item}
                data-cursor="OPEN"
                onClick={() => navigate(path)}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button data-cursor="SEARCH" onClick={openSearch}>
            SEARCH
          </button>

          <button data-cursor="ACCOUNT" onClick={() => go("/account")}>
            ACCOUNT
          </button>

          <button data-cursor="BAG" onClick={openBag}>
            BAG
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${menu ? "menu-overlay--open" : ""}`}>
        <button
          className="menu-close"
          data-cursor="CLOSE"
          onClick={() => setMenu(false)}
        >
          CLOSE ×
        </button>

        <div className="menu-inner">
          {["NEW IN", "WOMEN", "MEN", "COLLECTION", "ABOUT"].map(
            (item, index) => {
              const path =
                item === "ABOUT"
                  ? "/about"
                  : item === "NEW IN"
                    ? "/collection?new=1"
                    : item === "COLLECTION"
                      ? "/collection"
                      : `/collection?cat=${item}`;

              return (
                <button
                  key={item}
                  style={
                    {
                      "--i": index,
                    } as CSSProperties
                  }
                  onClick={() => navigate(path)}
                >
                  {item}
                  <sup>0{index + 1}</sup>
                </button>
              );
            }
          )}
        </div>

        <div className="menu-footer">
          SURVIVORS WEAR / 2026 / WORLDWIDE
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------
   SEARCH
------------------------------------------------------- */

function SearchOverlay({
  open,
  close,
  go,
}: {
  open: boolean;
  close: () => void;
  go: (path: string) => void;
}) {
  const [query, setQuery] = useState("");

  const matches = products
    .filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div
      className={`search-overlay ${
        open ? "search-overlay--open" : ""
      }`}
    >
      <button
        className="search-close"
        data-cursor="CLOSE"
        onClick={close}
      >
        CLOSE ×
      </button>

      <div className="search-box">
        <span>SEARCH</span>

        <input
          autoFocus={open}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="TYPE TO SEARCH"
        />
      </div>

      <div className="search-results">
        {(query ? matches : products.slice(0, 4)).map((product) => (
          <button
            data-cursor="OPEN"
            key={product.id}
            onClick={() => {
              close();
              go(`/product/${product.id}`);
            }}
          >
            <span>{product.name}</span>
            <span>{money(product.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   BAG
------------------------------------------------------- */

function Bag({
  open,
  close,
  items,
  setItems,
  checkout,
}: {
  open: boolean;
  close: () => void;
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
  checkout: () => void;
}) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const update = (
    id: number,
    size: string,
    delta: number
  ) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === id && item.size === size
            ? {
                ...item,
                qty: Math.max(0, item.qty + delta),
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <aside className={`bag ${open ? "bag--open" : ""}`}>
      <div className="bag-head">
        <span>SHOPPING BAG</span>

        <button onClick={close}>CLOSE ×</button>
      </div>

      <div className="bag-items">
        {!items.length ? (
          <div className="empty">YOUR BAG IS EMPTY</div>
        ) : (
          items.map((item) => (
            <div
              className="bag-item"
              key={`${item.product.id}-${item.size}`}
            >
              <img src={item.product.images[0]} alt="" />

              <div>
                <b>{item.product.name}</b>

                <small>
                  {item.size} / {item.product.color}
                </small>

                <div className="qty">
                  <button
                    onClick={() =>
                      update(
                        item.product.id,
                        item.size,
                        -1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      update(
                        item.product.id,
                        item.size,
                        1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <strong>
                {money(item.product.price * item.qty)}
              </strong>
            </div>
          ))
        )}
      </div>

      <div className="bag-foot">
        <div>
          <span>SUBTOTAL</span>
          <strong>{money(total)}</strong>
        </div>

        <button
          className="solid"
          disabled={!items.length}
          onClick={checkout}
        >
          CHECKOUT
          <span>↗</span>
        </button>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------
   HOME
------------------------------------------------------- */

function Home({
  go,
  openQuick,
}: {
  go: (path: string) => void;
  openQuick: (product: Product) => void;
}) {
  useSmoothReveal();

  return (
    <main>
      <section className="hero">
        <img src={IMG.hero} alt="" />

        <div className="hero-shade" />

        <div className="hero-copy">
          <div className="eyebrow">
            SURVIVORS WEAR / COLLECTION 01
          </div>

          <h1>
            BUILT
            <br />
            <em>TO SURVIVE.</em>
          </h1>

          <button
            className="underlink"
            data-cursor="DISCOVER"
            onClick={() => go("/collection?new=1")}
          >
            DISCOVER COLLECTION <span>↘</span>
          </button>
        </div>

        <div className="hero-meta">
          <span>01 — 08</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="statement" data-reveal>
        <p>
          NOT MADE FOR
          <br />
          <i>EVERYONE.</i>
        </p>

        <span>01 / PHILOSOPHY</span>
      </section>

      <section className="split-editorial" data-reveal>
        <div className="editorial-image">
          <img src={IMG.editorial} alt="" />
          <span>01 — FORM</span>
        </div>

        <div className="editorial-copy">
          <small>THE NEW UNIFORM</small>

          <h2>
            LESS
            <br />
            NOISE.
            <br />
            <i>MORE</i>
            <br />
            ATTITUDE.
          </h2>

          <p>
            Contemporary silhouettes, raw textures and pieces
            designed to outlive the moment.
          </p>

          <button
            className="underlink"
            onClick={() => go("/collection")}
          >
            SHOP THE COLLECTION ↗
          </button>
        </div>
      </section>

      <section className="marquee">
        <div>
          STAY HARD / STAY HUMAN / SURVIVORS WEAR /{" "}
        </div>

        <div>
          STAY HARD / STAY HUMAN / SURVIVORS WEAR /{" "}
        </div>
      </section>

      <section className="collection-feature" data-reveal>
        <div className="section-head">
          <div>
            <small>02 / NEW COLLECTION</small>
            <h2>COLLECTION 01</h2>
          </div>

          <button
            className="underlink"
            onClick={() => go("/collection")}
          >
            VIEW ALL ↗
          </button>
        </div>

        <div className="product-grid feature-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={openQuick}
            />
          ))}
        </div>
      </section>

      <section className="full-image" data-reveal>
        <img src={IMG.street} alt="" />

        <div>
          <small>FIELD NOTES / 2026</small>

          <h2>
            THE CITY
            <br />
            <i>NEVER</i>
            <br />
            STOPS.
          </h2>
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <span>03 / MANIFESTO</span>

        <p>
          WE DESIGN FOR THE ONES WHO KEEP MOVING WHEN THE
          EASY WAY IS TO STOP.
        </p>
      </section>

      <section className="newsletter" data-reveal>
        <div>
          <small>04 / STAY IN THE LOOP</small>

          <h2>
            JOIN THE
            <br />
            <i>SURVIVORS.</i>
          </h2>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you for subscribing.");
          }}
        >
          <input
            type="email"
            required
            placeholder="YOUR EMAIL ADDRESS"
          />

          <button data-cursor="SEND">
            SUBSCRIBE ↗
          </button>
        </form>
      </section>
    </main>
  );
}

/* -------------------------------------------------------
   PRODUCT CARD
------------------------------------------------------- */

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="product-card"
      data-cursor="VIEW"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(product)}
    >
      <div className="product-image">
        <img
          src={product.images[hover ? 1 : 0]}
          alt={product.name}
        />

        {product.badge && (
          <span className="badge">{product.badge}</span>
        )}

        <span className="quick">QUICK VIEW ↗</span>
      </div>

      <div className="product-line">
        <span>{product.name}</span>
        <span>{money(product.price)}</span>
      </div>

      <div className="product-sub">
        <span>{product.color}</span>
        <span>{product.category}</span>
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   COLLECTION
------------------------------------------------------- */

function Collection({
  go,
  openQuick,
}: {
  go: (path: string) => void;
  openQuick: (product: Product) => void;
}) {
  useSmoothReveal();

  const params = new URLSearchParams(window.location.search);

  const category = params.get("cat") as
    | "MEN"
    | "WOMEN"
    | null;

  const newest = params.get("new") === "1";

  const [filter, setFilter] = useState<
    "ALL" | "MEN" | "WOMEN"
  >(category || "ALL");

  const [sort, setSort] = useState("FEATURED");

  const list = useMemo(() => {
    let result = products.filter(
      (product) =>
        filter === "ALL" || product.category === filter
    );

    if (newest) {
      result = result.filter(
        (product) =>
          product.badge === "NEW" ||
          product.badge === "LIMITED"
      );
    }

    if (sort === "PRICE LOW") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "PRICE HIGH") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [filter, sort, newest]);

  return (
    <main className="collection-page">
      <div className="collection-title" data-reveal>
        <small>COLLECTION / 2026</small>

        <h1>{newest ? "NEW IN" : "COLLECTION 01"}</h1>

        <p>
          Utility, restraint and attitude. A wardrobe built
          around permanence.
        </p>
      </div>

      <div className="filters">
        <div>
          {["ALL", "MEN", "WOMEN"].map((item) => (
            <button
              className={filter === item ? "active" : ""}
              key={item}
              onClick={() =>
                setFilter(item as "ALL" | "MEN" | "WOMEN")
              }
            >
              {item}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option>FEATURED</option>
          <option>PRICE LOW</option>
          <option>PRICE HIGH</option>
        </select>
      </div>

      <div className="product-grid collection-grid">
        {list.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={openQuick}
          />
        ))}
      </div>
    </main>
  );
}

/* -------------------------------------------------------
   PRODUCT PAGE
------------------------------------------------------- */

function ProductPage({
  product,
  add,
  go,
}: {
  product: Product;
  add: (product: Product, size: string) => void;
  go: (path: string) => void;
}) {
  const [size, setSize] = useState(product.sizes[1]);
  const [active, setActive] = useState(0);

  return (
    <main className="product-page">
      <div className="gallery">
        {product.images.map((source, index) => (
          <button
            data-cursor="ZOOM"
            key={source}
            onClick={() => setActive(index)}
            className={active === index ? "selected" : ""}
          >
            <img src={source} alt={product.name} />
          </button>
        ))}
      </div>

      <div className="product-info">
        <button
          className="back"
          onClick={() => go("/collection")}
        >
          ← BACK TO COLLECTION
        </button>

        <small>
          {product.category} / COLLECTION 01
        </small>

        <h1>{product.name}</h1>

        <div className="price">
          {money(product.price)}
        </div>

        <p>{product.description}</p>

        <div className="info-rule" />

        <div className="label-row">
          <span>COLOR</span>
          <strong>{product.color}</strong>
        </div>

        <div className="sizes">
          <span>SELECT SIZE</span>

          <div>
            {product.sizes.map((item) => (
              <button
                key={item}
                className={size === item ? "chosen" : ""}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button
          className="solid add"
          onClick={() => add(product, size)}
        >
          ADD TO BAG
          <span>↗</span>
        </button>

        <details>
          <summary>PRODUCT DETAILS</summary>

          <p>
            Designed in a minimal streetwear vocabulary.
            Relaxed proportions, considered construction and
            durable materials.
          </p>
        </details>

        <details>
          <summary>SHIPPING & RETURNS</summary>

          <p>
            Worldwide delivery available. Returns accepted
            according to the store policy.
          </p>
        </details>
      </div>
    </main>
  );
}

/* -------------------------------------------------------
   QUICK VIEW
------------------------------------------------------- */

function QuickView({
  product,
  close,
  add,
}: {
  product: Product | null;
  close: () => void;
  add: (product: Product, size: string) => void;
}) {
  const [size, setSize] = useState(
    product?.sizes[1] || "M"
  );

  if (!product) return null;

  return (
    <div className="quick-overlay" onClick={close}>
      <div
        className="quick-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="quick-close"
          onClick={close}
        >
          CLOSE ×
        </button>

        <img src={product.images[0]} alt={product.name} />

        <div className="quick-info">
          <small>{product.category}</small>

          <h2>{product.name}</h2>

          <strong>{money(product.price)}</strong>

          <p>{product.description}</p>

          <div className="quick-sizes">
            {product.sizes.map((item) => (
              <button
                className={
                  size === item ? "chosen" : ""
                }
                key={item}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="solid"
            onClick={() => {
              add(product, size);
              close();
            }}
          >
            ADD TO BAG ↗
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ABOUT
------------------------------------------------------- */

function About() {
  return (
    <main className="about">
      <div className="about-hero">
        <img src={IMG.editorial2} alt="" />

        <div>
          <small>ABOUT / SURVIVORS WEAR</small>

          <h1>
            WEAR
            <br />
            <i>THE</i>
            <br />
            STORY.
          </h1>
        </div>
      </div>

      <section className="about-copy">
        <span>01 / THE IDEA</span>

        <p>
          SURVIVORS WEAR IS A CONTEMPORARY LABEL BUILT
          AROUND THE IDEA THAT CLOTHES SHOULD CARRY THE
          LIFE YOU LIVE IN THEM.
        </p>

        <p>
          We work in monochrome, honest materials and
          silhouettes that move between the street and the
          studio.
        </p>
      </section>
    </main>
  );
}

/* -------------------------------------------------------
   ACCOUNT
------------------------------------------------------- */

function Account() {
  return (
    <main className="account">
      <small>ACCOUNT</small>

      <h1>
        WELCOME
        <br />
        <i>BACK.</i>
      </h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <input placeholder="EMAIL" />

        <input
          placeholder="PASSWORD"
          type="password"
        />

        <button className="solid">
          SIGN IN ↗
        </button>
      </form>

      <button className="underlink">
        CREATE AN ACCOUNT
      </button>
    </main>
  );
}

/* -------------------------------------------------------
   FOOTER
------------------------------------------------------- */

function Footer({
  go,
}: {
  go: (path: string) => void;
}) {
  return (
    <footer>
      <div className="footer-top">
        <button
          className="footer-brand"
          onClick={() => go("/")}
        >
          SURVIVORS
          <br />
          WEAR
        </button>

        <div>
          <b>SHOP</b>

          <button
            onClick={() =>
              go("/collection?cat=WOMEN")
            }
          >
            WOMEN
          </button>

          <button
            onClick={() =>
              go("/collection?cat=MEN")
            }
          >
            MEN
          </button>

          <button
            onClick={() =>
              go("/collection?new=1")
            }
          >
            NEW IN
          </button>

          <button onClick={() => go("/collection")}>
            COLLECTION
          </button>
        </div>

        <div>
          <b>INFORMATION</b>

          <button onClick={() => go("/about")}>
            ABOUT
          </button>

          <button>CONTACT</button>
          <button>SHIPPING</button>
          <button>RETURNS</button>
        </div>

        <div>
          <b>SOCIAL</b>

          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            INSTAGRAM
          </a>

          <a
            href="#"
            onClick={(event) =>
              event.preventDefault()
            }
          >
            TIKTOK
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SURVIVORS WEAR</span>
        <span>MADE FOR THE MOVING</span>
        <span>WORLDWIDE</span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------
   SCROLL PROGRESS
------------------------------------------------------- */

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        height > 0
          ? (window.scrollY / height) * 100
          : 0;

      if (ref.current) {
        ref.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", update, {
      passive: true,
    });

    update();

    return () =>
      window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
    />
  );
}

/* -------------------------------------------------------
   APP
------------------------------------------------------- */

function App() {
  const { path, go } = usePath();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [bag, setBag] = useState(false);
  const [quick, setQuick] =
    useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("sw-cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "sw-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    document.body.classList.toggle(
      "no-scroll",
      search ||
        bag ||
        Boolean(quick) ||
        loading
    );

    return () =>
      document.body.classList.remove(
        "no-scroll"
      );
  }, [search, bag, quick, loading]);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearch(false);
        setBag(false);
        setQuick(null);
      }
    };

    window.addEventListener(
      "keydown",
      keyboard
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyboard
      );
  }, []);

  const add = (
    product: Product,
    size: string
  ) => {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size
      );

      if (existing) {
        return current.map((item) =>
          item === existing
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          size,
          qty: 1,
        },
      ];
    });
  };

  const cleanPath = path.split("?")[0];

  let page: ReactNode = (
    <Home
      go={go}
      openQuick={setQuick}
    />
  );

  if (cleanPath === "/collection") {
    page = (
      <Collection
        go={go}
        openQuick={setQuick}
      />
    );
  } else if (cleanPath === "/about") {
    page = <About />;
  } else if (cleanPath === "/account") {
    page = <Account />;
  } else if (
    cleanPath.startsWith("/product/")
  ) {
    const id = Number(
      cleanPath.split("/")[2]
    );

    const product =
      products.find(
        (item) => item.id === id
      ) || products[0];

    page = (
      <ProductPage
        product={product}
        add={add}
        go={go}
      />
    );
  }

  return (
    <>
      {loading && (
        <Loader
          done={() => setLoading(false)}
        />
      )}

      <Cursor />

      <Header
        go={go}
        openSearch={() => setSearch(true)}
        openBag={() => setBag(true)}
      />

      <div className="page">
        {page}
      </div>

      <Footer go={go} />

      <SearchOverlay
        open={search}
        close={() => setSearch(false)}
        go={go}
      />

      <Bag
        open={bag}
        close={() => setBag(false)}
        items={cart}
        setItems={setCart}
        checkout={() =>
          alert(
            "Checkout is ready for your payment integration."
          )
        }
      />

      <QuickView
        product={quick}
        close={() => setQuick(null)}
        add={add}
      />

      <ScrollProgress />
    </>
  );
}

createRoot(
  document.getElementById("root")!
).render(<App />);