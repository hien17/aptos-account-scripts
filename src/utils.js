// Convert Uint8Array to hex using native JavaScript
export const bytesToHex = (bytes) => {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }