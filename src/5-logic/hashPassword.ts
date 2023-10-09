import * as crypto from 'crypto';

const salt = "MakeThingsGoRight";
const password = "1234";

const hashedPassword = crypto.createHmac('sha512', salt).update(password).digest('hex');

console.log(hashedPassword);
