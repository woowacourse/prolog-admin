type ValidatorReturns = {
  isValidated: boolean;
  message: string;
};

export type ValidatorFunction = (
  value: string,
  optionalValue?: string
) => ValidatorReturns;

type checkFormatFunction = (value: string, optionalValue?: string) => boolean;

const checkNameFormat: checkFormatFunction = (name) => {
  return name.length < 2 || name.length > 10;
};

export const validateName: ValidatorFunction = (name: string) => {
  if (checkNameFormat(name)) {
    return {
      isValidated: false,
      message: '2글자에서 10글자 사이 입력해야합니다',
    };
  }
  return { isValidated: true, message: '올바른 입력입니다.' };
};
