export function validate(input){
    if (isNaN(Number(input))) {
      return true;
    }
    if (Number(input) < 0) {
      return true;
    }
    return false;
  };

