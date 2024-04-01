export function shortHash(str:string) {
    let hash = 0;
    if (str.length === 0) {
      return hash.toString();
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 32-bit integer
    }
    return "h"+Math.abs(hash).toString(36).substring(0, 6);
  }