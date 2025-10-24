export function formatToMoney(
    amount = 0,
    currency = "NGN",
    maximumFractionDigits = 2,
    minimumFractionDigits = 0,
  ): string {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(amount);
  }
  export function formatToPercent(amount = 0, dp = 0): string {
    return new Intl.NumberFormat("en-NG", {
      style: "percent",
      maximumFractionDigits: dp,
    }).format(amount);
  }
  
  export function formatToNumber(amount = 0): string {
    return new Intl.NumberFormat("en-NG").format(amount);
  }
  
  export function formatToDateTime(date: string): string {
    return new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  export function formatToTime(date: string): string {
    return new Date(date).toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  export function formatAmount(amount: number | string): string {
    const num = typeof amount === "number" ? amount : Number(amount);
    
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  export const formatToCedis = (amount: number | string): string => {
    const num = typeof amount === "number" ? amount : Number(amount);
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
