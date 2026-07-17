"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Zap, Shield, Truck, RotateCcw, ArrowRight, Check, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

// ─── Static product data (not translated — names are brand names) ─────────────

const featuredProducts = [
  {
    id: "p1",
    name: "AuraSound Pro X",
    category: "Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 2341,
    badge: "Best Seller",
    image: "https://m.media-amazon.com/images/I/612l-q3vK3L.jpg",
  },
  {
    id: "p2",
    name: "NovaPad Ultra 12",
    category: "Tablets",
    price: 749,
    originalPrice: 899,
    rating: 4.8,
    reviews: 1876,
    badge: "New Arrival",
    image: "https://www.vopmart.com/media/catalog/product/cache/ee14c5ab36c97d39d331f867fa3bee63/n/o/nova_12_ultra-w.jpg",
  },
  {
    id: "p3",
    name: "VoltWatch Series 5",
    category: "Wearables",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 3102,
    badge: "Top Rated",
    image: "https://i.ebayimg.com/images/g/VFgAAOSwuDphZlVi/s-l400.jpg",
  },
  {
    id: "p4",
    name: "LumaLens 4K Cam",
    category: "Cameras",
    price: 549,
    originalPrice: 699,
    rating: 4.8,
    reviews: 987,
    badge: "Editor's Pick",
    image: "https://m.media-amazon.com/images/I/51nEqE+RtbL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "p5",
    name: "CoreBook Air M3",
    category: "Laptops",
    price: 1199,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 4210,
    badge: "Fan Favorite",
    image: "http://us.chuwi.com/cdn/shop/files/1_6286ec1b-a1d0-4857-aa18-bfce51e05a1c.png?v=1766042024",
  },
  {
    id: "p6",
    name: "PulseBar Speaker",
    category: "Audio",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    reviews: 1543,
    badge: "Sale",
    image: "https://crdms.images.consumerreports.org/prod/products/cr/models/395427-sound-bars-bluesound-pulse-soundbar-60595.png",
  },
];

const valueIcons = [Truck, Shield, RotateCcw, Zap];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={
              "w-3.5 h-3.5 " +
              (star <= Math.floor(rating)
                ? "fill-[var(--primary)] text-[var(--primary)]"
                : "fill-transparent text-[var(--muted)]")
            }
          />
        ))}
      </div>
      <span className="text-xs text-[var(--muted)]">
        {rating} ({count.toLocaleString("en-US")} {t("products.reviews")})
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const t = useTranslations();
  const [wished, setWished] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_32px_-4px_rgba(233,69,96,0.25)] transition-shadow duration-300"
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--primary)] text-white">
          {product.badge}
        </span>
      </div>

      <div className="absolute top-3 right-12 z-10">
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[var(--surface-alt)] text-[var(--foreground)] border border-[var(--border)]">
          -{discount}%
        </span>
      </div>

      <button
        onClick={() => setWished((w) => !w)}
        aria-label={t("products.wishlist")}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--surface-alt)] border border-[var(--border)] flex items-center justify-center transition-all duration-200 hover:bg-[var(--primary)]"
      >
        <Heart
          className={
            "w-4 h-4 transition-colors duration-200 " +
            (wished
              ? "fill-[var(--primary)] text-[var(--primary)]"
              : "text-[var(--muted)]")
          }
        />
      </button>

      <div className="relative h-52 bg-[var(--surface-alt)] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3
          className="font-semibold text-[var(--foreground)] mb-2 text-balance"
          style={{ fontFamily: "Rubik, sans-serif" }}
        >
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviews} />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "Rubik, sans-serif" }}
            >
              ${product.price}
            </span>
            <span className="text-sm text-[var(--muted)] line-through">
              ${product.originalPrice}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t("products.add_to_cart")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            {t("products.add")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Arrays stored in messages/en.json, read via t.raw() to avoid dynamic keys
  const statsData = t.raw("stats") as Array<{ value: string; label: string }>;
  const categoriesData = t.raw("categories.list") as Array<{
    name: string;
    count: number;
    icon: string;
  }>;
  const valueProps = t.raw("value.props") as Array<{ title: string; desc: string }>;
  const testimonials = t.raw("testimonials.list") as Array<{
    name: string;
    role: string;
    rating: number;
    text: string;
    product: string;
  }>;
  const trustItems = [t("hero.trust_1"), t("hero.trust_2"), t("hero.trust_3")];

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--primary)] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--primary)] opacity-[0.04] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-xs font-medium text-[var(--primary)]">
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--foreground)] leading-[1.05] text-balance mb-6"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                {t("hero.headline_1")}{" "}
                <span className="text-[var(--primary)]">{t("hero.headline_accent")}</span>{" "}
                {t("hero.headline_2")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[var(--muted)] leading-relaxed max-w-lg mb-8 text-pretty"
              >
                {t("hero.subtext")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm shadow-[0_0_24px_rgba(233,69,96,0.35)] hover:shadow-[0_0_36px_rgba(233,69,96,0.5)] transition-all duration-300"
                >
                  {t("hero.cta_primary")}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--surface-alt)] transition-all duration-300"
                >
                  {t("hero.cta_secondary")}
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 mt-10">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                    <Check className="w-4 h-4 text-[var(--primary)]" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero image + floating cards */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_64px_rgba(0,0,0,0.5)] border border-[var(--border)]">
                <img
                  src="https://dgdisplay.com/uploadfiles/pictures/product/20211026092919_2058.jpg"
                  alt={t("hero.image_alt")}
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 32, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute -left-8 top-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-[var(--primary)] text-[var(--primary)]" />
                  </div>
                  <div>
                    <p
                      className="text-lg font-bold text-[var(--foreground)]"
                      style={{ fontFamily: "Rubik, sans-serif" }}
                    >
                      4.9/5
                    </p>
                    <p className="text-xs text-[var(--muted)]">{t("hero.float_rating")}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -32, y: -16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 bottom-16 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {t("hero.float_shipping")}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{t("hero.float_shipping_sub")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-3xl font-black text-[var(--foreground)] mb-1"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <Reveal>
        <section id="categories" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-2">
                  {t("categories.eyebrow")}
                </p>
                <h2
                  className="text-4xl font-black tracking-tight text-[var(--foreground)] text-balance"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  {t("categories.heading")}
                </h2>
              </div>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:gap-2 transition-all duration-200"
              >
                {t("categories.view_all")} <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {categoriesData.map((cat) => (
                <motion.a
                  key={cat.name}
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-alt)] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface-alt)] group-hover:bg-[var(--primary)]/15 flex items-center justify-center text-2xl transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{cat.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {cat.count} {t("categories.items_label")}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <Reveal>
        <section id="products" className="py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-2">
                {t("products.eyebrow")}
              </p>
              <h2
                className="text-4xl font-black tracking-tight text-[var(--foreground)] text-balance mb-4"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                {t("products.heading")}
              </h2>
              <p className="text-[var(--muted)] max-w-xl mx-auto text-pretty">
                {t("products.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--surface-alt)] transition-all duration-300"
              >
                {t("products.load_more")}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.4)] border border-[var(--border)]">
                  <img
                    src="https://picsum.photos/seed/f1263cb5984e/800/600"
                    alt={t("value.image_alt")}
                    className="w-full h-[480px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] rounded-2xl p-5 shadow-[0_8px_32px_rgba(233,69,96,0.4)]">
                  <p
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    250K+
                  </p>
                  <p className="text-white/80 text-sm">{t("value.accent_label")}</p>
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-2"
                >
                  {t("value.eyebrow")}
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl font-black tracking-tight text-[var(--foreground)] text-balance mb-4"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  {t("value.heading")}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-[var(--muted)] mb-10 text-pretty">
                  {t("value.subtext")}
                </motion.p>

                <div className="space-y-6">
                  {valueProps.map((vp, i) => {
                    const Icon = valueIcons[i] ?? Zap;
                    return (
                      <motion.div
                        key={vp.title}
                        variants={fadeInUp}
                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h3
                            className="font-semibold text-[var(--foreground)] mb-1"
                            style={{ fontFamily: "Rubik, sans-serif" }}
                          >
                            {vp.title}
                          </h3>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">{vp.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-2">
                {t("testimonials.eyebrow")}
              </p>
              <h2
                className="text-4xl font-black tracking-tight text-[var(--foreground)] text-balance mb-4"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                {t("testimonials.heading")}
              </h2>
              <p className="text-[var(--muted)] max-w-xl mx-auto text-pretty">
                {t("testimonials.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((review) => (
                <motion.div
                  key={review.name}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-[var(--primary)] text-[var(--primary)]"
                      />
                    ))}
                  </div>
                  <p className="text-[var(--foreground)] text-sm leading-relaxed mb-5 text-pretty">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm border border-[var(--border)]">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{review.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {review.role} · {review.product}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="newsletter" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] p-12 md:p-16 text-center shadow-[0_8px_48px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--primary)] opacity-[0.07] blur-[80px] rounded-full" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 mb-6">
                  <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span className="text-xs font-medium text-[var(--primary)]">
                    {t("newsletter.badge")}
                  </span>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-black tracking-tight text-[var(--foreground)] text-balance mb-4"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  {t("newsletter.heading")}
                </h2>
                <p className="text-[var(--muted)] max-w-lg mx-auto mb-8 text-pretty">
                  {t("newsletter.subtext")}
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    {t("newsletter.success")}
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("newsletter.placeholder")}
                      required
                      className="flex-1 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors duration-200"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:shadow-[0_0_32px_rgba(233,69,96,0.5)] transition-all duration-300 whitespace-nowrap"
                    >
                      {t("newsletter.cta")}
                    </motion.button>
                  </form>
                )}

                <p className="text-xs text-[var(--muted)] mt-4">{t("newsletter.disclaimer")}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
