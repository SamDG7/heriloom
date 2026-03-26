/** Static preview copy for post-burn shipping confirmation (frontend-only). */
export function previewShipmentForUser(displayName: string) {
  const first = displayName.trim().split(/\s+/)[0] ?? "Collector";
  return {
    nameLine: `${first} Rivera`,
    street: "428 Mulberry Street, Apt 12B",
    cityLine: "Brooklyn, NY 11211 · United States",
    etaLabel: "Estimated arrival",
    etaRange: "Thu, Mar 27 – Mon, Mar 31",
    carrier: "Heirloom Express",
    trackingId: "HL-9K4M2-Q8",
  };
}
