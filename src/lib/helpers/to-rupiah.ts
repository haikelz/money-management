/**
 * A helper function to format number value to Rupiah format
 * @param {number} nominal
 * @returns {string} Rupiah format
 */
export function toRupiah(nominal: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(nominal);
}
