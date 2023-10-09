import Joi from "joi";

class followerModel {
    public constructor(public userId: number, public vacationId: number) { }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive(),
        vacationId: Joi.number().required().positive()
    });

    public validate(): string {
        const result = followerModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default followerModel;