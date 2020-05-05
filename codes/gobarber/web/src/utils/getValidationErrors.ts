import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(erros: ValidationError): Errors {
  const validationErros: Errors = {};

  erros.inner.forEach((error) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
