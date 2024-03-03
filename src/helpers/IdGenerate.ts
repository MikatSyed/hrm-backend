let empCounter = 100;
let hrCounter = 100;
let adminCounter = 100;

export const generateId = (role: string): string => {
  let idPrefix = '';
  let counter = 0;

  switch (role.toLowerCase()) {
    case 'employee':
      idPrefix = 'emp';
      counter = empCounter++;
      break;
    case 'hr':
      idPrefix = 'h';
      counter = hrCounter++;
      break;
    case 'admin':
      idPrefix = 'a';
      counter = adminCounter++;
      break;
    default:
      throw new Error('Invalid role provided');
  }

  return idPrefix + counter;
};