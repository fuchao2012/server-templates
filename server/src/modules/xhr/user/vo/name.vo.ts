import {IsEmail, MinLength} from 'class-validator';
import {Validation, Type} from '@tiger/validator';

export class NameVO {
    @Validation(Type.string().max(10))
    name: string;
}
