import { ZodError } from 'zod';
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';

class ValidationError extends Error {
  statusCode = 400;
  errors: string;

  constructor(error: ZodError) {
    super('Validation Error');
    this.errors = this.stringifyErrors(error);
  }

  stringifyErrors(error: ZodError) {
    const options: ErrorMessageOptions = {
      delimiter: {
        component: ' ',
        error: '\n',
      },
      path: {
        enabled: true,
        transform: ({ value }) => (value ? value : ''),
        type: 'breadcrumbs',
      },
      
      message: {
        enabled: true,
        transform: ({ value }) => (value ? value : ''),
      },
      transform: ({ index, pathComponent, messageComponent }) => {
        const pathMessage = pathComponent
          ? ` at ${pathComponent}`
          : '';
        return `Error ${
          index + 1
        }${pathMessage}: ${messageComponent}`;
      },
    }

    return generateErrorMessage(error.issues, options);
  }
}

export default ValidationError;
