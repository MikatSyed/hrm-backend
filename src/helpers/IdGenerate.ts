let empCounter = 1000;
let hrCounter = 1000;
let adminCounter = 1000;

export const generateId = (role: string): string => {
  let idPrefix = '';
  let counter = 0;

  switch (role.toLowerCase()) {
    case 'employee':
      idPrefix = 'EMP-';
      counter = empCounter++;
      break;
    case 'hr':
      idPrefix = 'HR-';
      counter = hrCounter++;
      break;
    case 'admin':
      idPrefix = 'ADM-';
      counter = adminCounter++;
      break;
    default:
      throw new Error('Invalid role provided');
  }

  return idPrefix + counter;
};