import {IsEmail, MaxLength} from '@tiger/validator';

/** 名字 */
export class ParamsVO {
    /** email */
    @IsEmail()
    @MaxLength(10)
    email: string;
}
