/**
 * Utility functions for MIST ↔ OCT conversion
 * OneChain uses 9 decimals: 1 OCT = 1,000,000,000 MIST
 */

export const ONECHAIN_DECIMALS = 9;
export const MIST_PER_OCT = 1_000_000_000; // 10^9

/**
 * Convert OCT to MIST (for sending to blockchain)
 * @param oct Amount in OCT
 * @returns Amount in MIST
 */
export function octToMist(oct: number): number {
  return Math.floor(oct * MIST_PER_OCT);
}

/**
 * Convert MIST to OCT (for displaying to user)
 * @param mist Amount in MIST
 * @returns Amount in OCT
 */
export function mistToOct(mist: number): number {
  return mist / MIST_PER_OCT;
}

/**
 * Format OCT amount for display
 * @param oct Amount in OCT
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted string
 */
export function formatOct(oct: number, decimals: number = 2): string {
  return oct.toFixed(decimals);
}

/**
 * Format MIST amount as OCT for display
 * @param mist Amount in MIST
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted OCT string
 */
export function formatMistAsOct(mist: number, decimals: number = 2): string {
  return formatOct(mistToOct(mist), decimals);
}

/**
 * Validate OCT amount
 * @param oct Amount in OCT
 * @returns true if valid
 */
export function isValidOctAmount(oct: number): boolean {
  return oct > 0 && Number.isFinite(oct);
}

/**
 * Calculate investment amount from shares and price per share
 * @param shares Number of shares
 * @param pricePerShareMist Price per share in MIST
 * @returns Investment amount in OCT
 */
export function calculateInvestmentAmount(shares: number, pricePerShareMist: number): number {
  const pricePerShareOct = mistToOct(pricePerShareMist);
  return shares * pricePerShareOct;
}