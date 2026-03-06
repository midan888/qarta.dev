#!/usr/bin/env node

/**
 * Restaurant Email Scraper
 * 
 * Strategy:
 * 1. Use Google Places API to find restaurants in a city
 * 2. Get their website URLs from place details
 * 3. Scrape each website for email addresses
 * 4. Export results to CSV
 * 
 * Setup:
 *   npm install axios cheerio csv-writer
 *   export GOOGLE_PLACES_API_KEY=your_key_here
 *   node restaurant-email-scraper.js --city "Amsterdam" --limit 50
 */

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

// ─── Config ────────────────────────────────────────────────────────────────

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
const PLACES_URL = "https://maps.googleapis.com/maps/api/place";

const DEFAULT_LIMIT = 20;
const REQUEST_DELAY_MS = 500;        // polite delay between requests
const FETCH_TIMEOUT_MS = 8000;       // per-page fetch timeout
const MAX_PAGES_PER_SITE = 3;        // homepage + /contact + /about

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const IGNORE_EMAIL_DOMAINS = ["example.com", "sentry.io", "wixpress.com", "squarespace.com", "wordpress.com"];

// ─── CLI Args ───────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };
  const city   = get("--city")   || get("-c");
  const limit  = parseInt(get("--limit")  || get("-l") || DEFAULT_LIMIT, 10);
  const output = get("--output") || get("-o") || `restaurants_${Date.now()}.csv`;

  if (!city) {
    console.error("Usage: node restaurant-email-scraper.js --city <city> [--limit <n>] [--output <file.csv>]");
    process.exit(1);
  }
  return { city, limit, output };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(icon, msg) {
  console.log(`${icon}  ${msg}`);
}

function extractEmails(html, baseUrl) {
  const raw = html.match(EMAIL_REGEX) || [];
  return [...new Set(raw)].filter((e) => {
    const domain = e.split("@")[1] || "";
    return (
      !IGNORE_EMAIL_DOMAINS.some((d) => domain.includes(d)) &&
      !e.endsWith(".png") &&
      !e.endsWith(".jpg") &&
      !e.includes("..") &&
      e.length < 80
    );
  });
}

function resolveUrl(base, path) {
  try {
    return new URL(path, base).href;
  } catch {
    return null;
  }
}

// ─── Google Places ──────────────────────────────────────────────────────────

async function searchRestaurants(city, limit) {
  if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_PLACES_API_KEY environment variable is not set.");
  }

  log("🔍", `Searching for restaurants in "${city}"…`);
  const results = [];
  let pageToken = null;

  while (results.length < limit) {
    const params = {
      query: `restaurants in ${city}`,
      type: "restaurant",
      key: GOOGLE_API_KEY,
      ...(pageToken ? { pagetoken: pageToken } : {}),
    };

    const res = await axios.get(`${PLACES_URL}/textsearch/json`, { params });
    const data = res.data;

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Places API error: ${data.status} — ${data.error_message || ""}`);
    }

    results.push(...(data.results || []));
    pageToken = data.next_page_token || null;

    if (!pageToken || results.length >= limit) break;
    await sleep(2000); // Google requires a short wait before using next_page_token
  }

  log("✅", `Found ${Math.min(results.length, limit)} places`);
  return results.slice(0, limit);
}

async function getPlaceDetails(placeId) {
  const res = await axios.get(`${PLACES_URL}/details/json`, {
    params: {
      place_id: placeId,
      fields: "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total",
      key: GOOGLE_API_KEY,
    },
  });
  return res.data.result || {};
}

// ─── Web Scraping ────────────────────────────────────────────────────────────

async function fetchPage(url) {
  try {
    const res = await axios.get(url, {
      timeout: FETCH_TIMEOUT_MS,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RestaurantEmailBot/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      maxRedirects: 5,
    });
    return res.data;
  } catch {
    return null;
  }
}

async function scrapeEmailsFromSite(websiteUrl) {
  const emails = new Set();
  const visited = new Set();

  const urlsToVisit = [websiteUrl];

  // Also try common contact pages
  const common = ["/contact", "/contact-us", "/about", "/kontakt", "/kontakty"];
  common.forEach((p) => {
    const u = resolveUrl(websiteUrl, p);
    if (u) urlsToVisit.push(u);
  });

  let pagesVisited = 0;

  for (const url of urlsToVisit) {
    if (pagesVisited >= MAX_PAGES_PER_SITE) break;
    if (visited.has(url)) continue;
    visited.add(url);

    const html = await fetchPage(url);
    if (!html) continue;
    pagesVisited++;

    extractEmails(html, url).forEach((e) => emails.add(e));

    // If no emails yet, look for contact page links on homepage
    if (emails.size === 0 && pagesVisited === 1) {
      const $ = cheerio.load(html);
      $("a[href]").each((_, el) => {
        const href = $(el).attr("href") || "";
        if (/contact|about|kontakt/i.test(href)) {
          const full = resolveUrl(websiteUrl, href);
          if (full && !visited.has(full)) urlsToVisit.push(full);
        }
      });
    }

    await sleep(REQUEST_DELAY_MS);
  }

  return [...emails];
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { city, limit, output } = parseArgs();

  console.log("\n╔══════════════════════════════════════╗");
  console.log(`║  Restaurant Email Scraper             ║`);
  console.log(`║  City: ${city.padEnd(29)}║`);
  console.log(`║  Limit: ${String(limit).padEnd(28)}║`);
  console.log("╚══════════════════════════════════════╝\n");

  // 1. Get restaurants from Google Places
  let places;
  try {
    places = await searchRestaurants(city, limit);
  } catch (err) {
    console.error("❌  Google Places error:", err.message);
    process.exit(1);
  }

  // 2. Enrich with details + scrape emails
  const records = [];

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    process.stdout.write(`\r⏳  Processing ${i + 1}/${places.length}: ${place.name.substring(0, 40).padEnd(40)}`);

    let details = {};
    try {
      details = await getPlaceDetails(place.place_id);
      await sleep(REQUEST_DELAY_MS);
    } catch {
      // skip details on error
    }

    const website = details.website || "";
    let emails = [];

    if (website) {
      try {
        emails = await scrapeEmailsFromSite(website);
      } catch {
        // ignore scrape errors
      }
    }

    records.push({
      name: details.name || place.name || "",
      address: details.formatted_address || place.formatted_address || "",
      phone: details.formatted_phone_number || "",
      website,
      emails: emails.join("; "),
      rating: details.rating || "",
      reviews: details.user_ratings_total || "",
    });
  }

  console.log("\n");

  // 3. Write CSV
  const csvWriter = createObjectCsvWriter({
    path: output,
    header: [
      { id: "name",    title: "Name" },
      { id: "address", title: "Address" },
      { id: "phone",   title: "Phone" },
      { id: "website", title: "Website" },
      { id: "emails",  title: "Emails" },
      { id: "rating",  title: "Rating" },
      { id: "reviews", title: "Reviews Count" },
    ],
  });

  await csvWriter.writeRecords(records);

  const withEmails = records.filter((r) => r.emails).length;
  log("📊", `Total restaurants: ${records.length}`);
  log("📧", `With emails found: ${withEmails}`);
  log("💾", `Saved to: ${output}`);
  console.log("\nDone! ✨\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal error:", err.message);
  process.exit(1);
});