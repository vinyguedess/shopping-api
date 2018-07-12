import { IService } from "./Interfaces/IService";



export default abstract class BaseService implements IService
{

    abstract do(...params: Array<any>): any;

    private errors: any = {}

    public addError(key: string, message: string): void
    {
        if (!Array.isArray(this.errors[key]))
            this.errors[key] = [];

        this.errors[key].push(message);
    }

    public getErrors(): any
    {
        return this.errors;
    }

    public hasErrors(): boolean
    {
        return Object.keys(this.errors).length ? true : false;
    }

}