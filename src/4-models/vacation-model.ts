import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public image?: UploadedFile;  // Made the image optional

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.checkIn = vacation.checkIn;
        this.checkOut = vacation.checkOut;
        this.price = vacation.price;
        if (vacation.image) { // Handle the optional image in the constructor
            this.image = vacation.image;
        }
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        description: Joi.string().required().min(10).max(2500),
        destination: Joi.string().required().min(2).max(70),
        imageName: Joi.string().optional(),
        checkIn: Joi.string().required().min(2).max(20),
        checkOut: Joi.string().required().min(2).max(20),
        price: Joi.number().required().min(90).max(40000),
        image: Joi.object().optional() 
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message
    }
}

export default VacationModel;
