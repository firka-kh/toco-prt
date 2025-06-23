export const formatCurrency = (amount: number, currency: string = 'сомони'): string => {
  return `${amount.toLocaleString()} ${currency}`;
};

export const formatSalaryRange = (min: number, max: number, currency: string = 'сомони'): string => {
  return `от ${formatCurrency(min, currency)} до ${formatCurrency(max, currency)}`;
};

export const formatDateRelative = (date: Date, language: 'taj' | 'rus' = 'rus'): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (language === 'taj') {
    if (diffDays === 0) return 'Имрӯз';
    if (diffDays === 1) return 'Дирӯз';
    return `${diffDays} рӯз пеш`;
  } else {
    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Вчера';
    return `${diffDays} дней назад`;
  }
};

export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPhoneNumber = (phone: string): string => {
  // Format Tajikistan phone numbers
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('992')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
