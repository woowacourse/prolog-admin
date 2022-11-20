type ValidatorReturns = {
  isValidated: boolean;
  message: string;
};

export type ValidatorFunction = (
  value: string,
  optionalValue?: string
) => ValidatorReturns;

type checkFormatFunction = (value: string, optionalValue?: string) => boolean;

const checkNameFormat: checkFormatFunction = (text) => {
  return text.length < 2 || text.length > 10;
};

export const validateName: ValidatorFunction = (text: string) => {
  if (checkNameFormat(text)) {
    return {
      isValidated: false,
      message: '키워드 이름은 2자 이상 10자 미만으로 입력해주세요',
    };
  }
  return { isValidated: true, message: '올바른 입력입니다.' };
};

const checkDescriptionFormat: checkFormatFunction = (text) => {
  return text.length < 2 || text.length > 30;
};

export const validateDescription: ValidatorFunction = (text: string) => {
  if (checkDescriptionFormat(text)) {
    return {
      isValidated: false,
      message: '키워드 설명은 2자 이상 30자 미만으로 입력해주세요',
    };
  }
  return { isValidated: true, message: '올바른 입력입니다.' };
};

const checkImportance = (inputValue: string) => {
  const inputNumber = Number(inputValue);

  return (
    Number.isNaN(inputNumber) === true || inputNumber < 1 || inputNumber > 5
  );
};

export const validateImportance: ValidatorFunction = (inputValue: string) => {
  if (checkImportance(inputValue)) {
    return {
      isValidated: false,
      message:
        '키워드 중요도는 1부터 5사이의 숫자를 입력해주세요. 숫자가 커질수록 중요도가 높습니다.',
    };
  }
  return { isValidated: true, message: '올바른 입력입니다.' };
};
