"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = __importDefault(require("../2-utils/dal"));
const error_models_1 = require("../4-models/error-models");
//new follower: 
function addFollower(follower) {
    return __awaiter(this, void 0, void 0, function* () {
        //Validation:
        const error = follower.validate();
        if (error)
            throw new error_models_1.ValidationError(error);
        const sql = `INSERT INTO followers VALUES(?, ?)`;
        yield dal_1.default.execute(sql, [follower.userId, follower.vacationId]);
    });
}
// Delete exist follower:
function deleteFollower(vacationId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Query:
        const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
        // Execute: 
        const info = yield dal_1.default.execute(sql, [vacationId, userId]);
        // If not exist:
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundError(vacationId || userId);
    });
}
exports.default = {
    addFollower,
    deleteFollower
};
//# sourceMappingURL=followers-logic.js.map