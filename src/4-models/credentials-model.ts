import Joi from "joi";

class CredentialsModel {

    // Properties for email and password
    public email: string;
    public password: string;

    // Constructor to initialize properties
    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // Joi schema for validating credentials
    public static validationSchema = Joi.object({
        email: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(4).max(100)
    });

    // Validate the credentials against the schema
    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;
