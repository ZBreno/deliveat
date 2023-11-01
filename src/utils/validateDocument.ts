const CPF_BLACKLIST: string[] = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
  ];
  
  const STRICT_STRIP_REGEX: RegExp = /[.-]/g;
  const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;
  
  const strip = (number: string, strict?: boolean): string => {
    const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || '').replace(regex, '');
  };
  
  const verifierCPFDigit = (digits: string): number => {
    const numbers: number[] = digits.split('').map((number) => {
      return parseInt(number, 10);
    });
  
    const modulus: number = numbers.length + 1;
    const multiplied: number[] = numbers.map((number, index) => number * (modulus - index));
    const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11;
  
    return mod < 2 ? 0 : 11 - mod;
  };
  
  export const validateCPF = (number: string, strict?: boolean): boolean => {
    if (!number) {
      return true;
    }
    const stripped: string = strip(number, strict);
  
    // CPF must be defined
    if (!stripped) {
      return false;
    }
  
    // CPF must have 11 chars
    if (stripped.length !== 11) {
      return false;
    }
  
    // CPF can't be blacklisted
    if (CPF_BLACKLIST.includes(stripped)) {
      return false;
    }
  
    let numbers: string = stripped.substr(0, 9);
    numbers += verifierCPFDigit(numbers);
    numbers += verifierCPFDigit(numbers);
  
    return numbers.substr(-2) === stripped.substr(-2);
  };
  
  export const validateNIS = (nis) => {
    if (!nis) {
      return true;
    }
  
    const multiplicadorBase = '3298765432';
    let total = 0;
    let resto = 0;
    let multiplicando = 0;
    let multiplicador = 0;
    let digito = 99;
  
    // Retira a mascara
    const numeroNIS = nis.replace(/[^\d]+/g, '');
  
    if (
      numeroNIS.length !== 11 ||
      numeroNIS === '00000000000' ||
      numeroNIS === '11111111111' ||
      numeroNIS === '22222222222' ||
      numeroNIS === '33333333333' ||
      numeroNIS === '44444444444' ||
      numeroNIS === '55555555555' ||
      numeroNIS === '66666666666' ||
      numeroNIS === '77777777777' ||
      numeroNIS === '88888888888' ||
      numeroNIS === '99999999999'
    ) {
      return false;
    } else {
      for (let i = 0; i < 10; i++) {
        multiplicando = parseInt(numeroNIS.substring(i, i + 1));
        multiplicador = parseInt(multiplicadorBase.substring(i, i + 1));
        total += multiplicando * multiplicador;
      }
  
      resto = 11 - (total % 11);
      resto = resto === 10 || resto === 11 ? 0 : resto;
  
      digito = parseInt('' + numeroNIS.charAt(10));
      return resto === digito;
    }
  };