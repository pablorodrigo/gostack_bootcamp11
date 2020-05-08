import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(errors: ValidationError): Errors {
  const validationErros: Errors = {};

  errors.inner.forEach((error) => {
    console.log('getValidationErros');
    console.log(error.message);
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
