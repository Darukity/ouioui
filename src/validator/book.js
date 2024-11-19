const { Validator } = require('jsonschema');

module.exports = {
    verifyBook: (book) => {
        let validator = new Validator();
        let bookSchema = {
            type: 'object',
            properties: {
                label: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'Book label is missing or incorrect'
                },
                description: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'Book label is missing or incorrect'
                },
                authorId: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'Book AuthorId is missing or incorrect'
                }
            },
            required: ['label']
        };
        let result = validator.validate(book, bookSchema);

        // if validation failed
        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = '';

            result.errors.forEach((error) => {
                failedInputs += (error.schema.errorMessage || error.message) + ', ';
            });
            return {
                message: failedInputs
            };
        }
    }
};
