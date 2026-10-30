/**
 * The one USD→PKR rate the site shows. Prices are set in US dollars; the rupee figure is an indicative
 * conversion at this dated rate, never a live feed and never the binding price. A fixed PKR quotation is
 * given in writing. Update the three fields together; every PKR figure on the site follows.
 */
export const PKR_RATE = {
  pkrPerUsd: 276.6,
  /** Rate date as published by the source. */
  asOf: '30 October 2026',
  source: 'ExchangeRate-API (open.er-api.com), updated 30 Oct 2026 00:02 UTC',
};

/** USD amount → "PKR 345,800", rounded to the nearest 100 rupees. */
export function pkr(usd: number): string {
  const v = Math.round((usd * PKR_RATE.pkrPerUsd) / 100) * 100;
  return `PKR ${v.toLocaleString('en-US')}`;
}

export const pkrNote = `Rupee figures are indicative, converted at 1 USD = PKR ${PKR_RATE.pkrPerUsd} (rate of ${PKR_RATE.asOf}). Prices are set in US dollars; a fixed PKR quotation is given in writing.`;
