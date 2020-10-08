import {Md5} from "ts-md5/dist/md5";
export class encryption{
    public pwd:string;
    public name:string;
    public email:string;
    constructor(name,email,pwd){
        this.name = name;
        this.email = email;
        this.pwd = Md5.hashStr(this.pwd).toString();
    }  
    
}