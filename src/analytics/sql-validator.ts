export function validateSQL(sql: string) {

    const forbidden = [
      "DROP",
      "DELETE",
      "UPDATE",
      "INSERT",
      "ALTER",
      "TRUNCATE"
    ];
  
    const upper = sql.toUpperCase();
  
    for (const word of forbidden) {
      if (upper.includes(word)) {
        throw new Error("Unsafe SQL detected");
      }
    }
  
    if (!upper.startsWith("SELECT")) {
      throw new Error("Only SELECT queries allowed");
    }
  
    return true;
  }