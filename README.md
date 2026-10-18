# Tap & Brew — Smart Café & Roastery ☕✨

> **“Good Coffee. One Tap Away.”**
> A modern smart café concept where customers use NFC tags placed on their tables to open the digital menu on their smartphones.

---

## 🌟 Overview

**Tap & Brew** is a frontend interactive prototype demonstrating a specialty coffee roastery equipped with smart NFC table ordering. Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Three.js** with **React Three Fiber & Drei**, and **Canvas Confetti**.

### Key Highlights
- **Interactive 3D Café Tabletop**: Real-time 3D hero scene built with Three.js & R3F featuring a wooden café table, ceramic latte cup with handcrafted procedural latte art, rising animated coffee steam, drinking glass with lime, potted succulent, smartphone menu preview, and miniature roastery espresso bar background with warm glowing pendant lighting.
- **NFC Tap Simulation**: Click **"Experience NFC Tap"** or tap the 3D brass disc to trigger glowing wireless energy waves propagating towards the smartphone, golden particle bursts, table connection toast, and smooth scrolling to the menu.
- **URL Table Identification**: Automatically reads seated table parameters (e.g. `?table=04` or `?t=12`), displays the active table badge in the header, hero, cart, and receipt, and lets visitors change tables on the fly without page reloads.
- **Dynamic Digital Menu**: Category filters (All, Hot Coffee, Cold Coffee, Signature Specials, Tea & Drinks, Bakery, Snacks), instant live search, dietary filters (Vegetarian, Vegan), bestseller & chef's special badges, and preparation times.
- **Item Customization**: Modal & bottom-sheet for customizing drink size (Regular / Large), milk choices (Dairy, Barista Oat, Almond), sweetness levels (0% to 150%), temperature (Hot / Iced), add-ons (extra espresso shot, syrups), and special notes with real-time price calculation.
- **Functional Shopping Cart**: Persisted in `localStorage`, quantity increment/decrement, line-item customization breakdown, configurable 5% GST and optional 5% service charge calculations, and mobile floating cart bar.
- **Demo Order Flow**: Review order modal and simulated **"Send Demo Order"** with celebration confetti, unique Order ID (e.g. `TB-4402`), estimated barista preparation time, and transparent demonstration notices.
- **Table Assistance Panel**: One-click Wi-Fi access (SSID `TapAndBrew_Guest`, password `tapandbrew2026` with clipboard copy), simulated water request, server call, bill request, and demo review ratings.
- **Artisanal Storytelling**: "More Than Coffee. A Little Everyday Magic." editorial section and Roastery extraction science showcase.

---

## 🎨 Brand Color Palette

- **Espresso Brown**: `#2C1E18`
- **Deep Charcoal**: `#171310`
- **Warm Cream**: `#FAF5ED`
- **Caramel**: `#C88D56`
- **Brass Gold**: `#D9AD68`
- **Sage Green**: `#8F9E83`
- **Terracotta**: `#B9684A`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository and enter the directory
git clone <repo-url>
cd tap-and-brew

# Install dependencies
npm install
```

### Local Development
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173/?t=04](http://localhost:5173/?t=04) in your browser.

### Production Build
```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 NFC Tag Setup (Physical Deployment)

The prototype is designed to work with standard **NTAG213** or **NTAG215** NFC tags (approx. 138 to 504 bytes capacity):
1. Write the deployed URL with the table parameter to the NFC tag using any standard NFC writing app (such as *NFC Tools*):
   ```
   https://your-domain.com/?t=04
   ```
2. Affix the tag to the designated café table.
3. When customers tap their iPhone or Android phone against the table tag, the browser automatically opens the digital menu pre-configured for that specific table.

---

## 📄 License
This project is an interactive demonstration prototype created for presentation and demonstration purposes.
