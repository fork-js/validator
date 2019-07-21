let validator = {};
class ForkObject {

    constructor() {

    }
    min(val) {
        this._min = val;
        return this;
    }
    max(val) {
        this._max = val;
        return this;
    }
    limit(val) {
        this._limit = val;
        return this;
    }
    required() {
        this._required = true;
        return this;
    }

    validate(value, path) {


        let _errors = {};
        if (this.isArray && value && _type(value) != "array")
            return { status: false, _errors: [new ForkValidationError(this.key,path,`${this.key} must be an "array"`, "ERR_ARRAY" )] };
        if (this._min && value.length < this._min)
            return { status: false, _errors: [new ForkValidationError(this.key,path, `${this.key} must be of minimum length ${this._min}`,  "ERR_MIN_LENGTH")] };
        if (this._max && value.length > this._max)
            return { status: false, _errors: [new ForkValidationError(this.key,path, `${this.key} must be of maximum length ${this._max}`,  "ERR_MAX_LENGTH")] };
        if (this._required && !value)
            return { status: false, _errors: [new ForkValidationError(this.key,path,`${this.key} is Required`, "ERR_REQUIRED")] };
        if (!value) {

        }
        let _result;
        let showIndex = Array.isArray(value) ? true : false;
        value = Array.isArray(value) ? value : [value];
        for (let i = 0; i < value.length; i++) {
            let valInstance = value[i];
            Object.keys(this.keys).forEach(key => {

                let _path =  path+"."+(showIndex?i+".":"")+key;
                if (_type(this.keys[key]) == "ForkInstance") {
                    
                    _result = this.keys[key].validate(valInstance && valInstance[key] ? valInstance[key] : "", key, _path);
                }
                if (_type(this.keys[key]) == "ForkObject") {
                    this.keys[key].key = key;
                    _result = this.keys[key].validate(valInstance && valInstance[key] ? valInstance[key] : "", _path);
                }
                if (!_result.status) {

                    if (showIndex) {
                        if (!_errors[i])
                            _errors[i] = {};
                        _errors[i][key] = _result._errors;
                    }
                    else
                        _errors[key] = _result._errors;
                }
            });
        }


        let status = Object.keys(_errors).length > 0 ? false : true;
        return { status: status, _errors: _errors };
    }
}
class ForkInstance {

    constructor() {

        this.validations = [];
    }
    string() {
        this.validations.push("string");
        return this;
    }
    number() {
        this.validations.push("number");
        return this;
    }
    email() {
        this.validations.push("email");
        return this;
    }
    getAll() {
        return this.validations;
    }
    validate(value, key, path) {

        let keyValidators = this.getAll();
        let _errors = [];
        if(this.isArray && !Array.isArray(value))
            _errors.push({ key: key,path:path, message: `${key} must be an Array`, errorCode: "ERR_ARRAY" });
        else{
            // if(this.isArray){

                if (this._min && value.length < this._min)
                    return { status: false, _errors: [new ForkValidationError(key,path, `${key} must be of minimum length ${this._min}`,  "ERR_MIN_LENGTH")] };
                if (this._max && value.length > this._max)
                    return { status: false, _errors: [new ForkValidationError(key,path, `${key} must be of maximum length ${this._max}`,  "ERR_MAX_LENGTH")] };
            
            // }
            value = Array.isArray(value)?value:[value];
            for(let i =0;i< value.length; i++){
                let valInstance = value[i];
                let _path =  path+(this.isArray?"."+i:"");

                if (keyValidators.indexOf("required") > -1 && !valInstance) {
                    _errors.push({ key: key,path:_path, message: `${key} is required`, errorCode: "ERR_REQUIRED" });
                }
                else {
                    if (this._in && this._in.indexOf(valInstance) == -1)
                        _errors.push(new ForkValidationError(key,_path, `${key} must be  one of [ ${this._in.join(" , ")} ]`, "ERR_VALUES"));
        
                    if (valInstance && keyValidators.indexOf("string") > -1 && typeof valInstance != "string") {
                        _errors.push(new ForkValidationError(key,_path, `${key} must be a String`, "ERR_STRING" ));
                    }
                    if (valInstance && keyValidators.indexOf("number") > -1 && typeof valInstance != "number") {
                        _errors.push(new ForkValidationError(key,_path, `${key} must be a Number`, "ERR_NUMBER" ));
                    }
                }
            }
            
        }
        
        return (_errors.length == 0) ? { status: true } : { status: false, _errors: _errors };
    }
    min(val) {
        this._min = val;
        return this;
    }
    in(val) {
        this._in = val;
        return this;
    }
    max(val) {
        this._max = val;
        return this;
    }
    limit(val) {
        this._limit = val;
        return this;
    }
    required() {
        this._required = true;
        return this;
    }
}

class ForkValidationError{

    constructor(key, path,message,errorCode){
        this.key = key;
        this.path = path;
        this.message = message;
        this.errorCode = errorCode;
    }

    getErrorCode(){
        return this.errorCode;
    }
    getMessage(){
        return errorCode
    }
}

validator.instance = () => {

    return new ForkInstance();
}
validator.string = () => {

    let _ =  new ForkInstance();
    _.validations.push("string");
    return _;
}
validator.number = () => {

    let _ =  new ForkInstance();
    _.validations.push("number");
    return _;
}
validator.email = () => {

    let _ =  new ForkInstance();
    _.validations.push("email");
    return _;
}
validator.required = () => {

    let _ =  new ForkInstance();
    _.validations.push("r");
    return _;
}
validator.object = (object) => {

    let _ = new ForkObject();
    _.keys = [];
    Object.keys(object).forEach(key => {
        _.keys[key] = object[key];
    });
    return _;
}
validator.array = (object) => {
    if(!object)
        object = new ForkInstance();
    if(_type(object) == "ForkInstance"){

        let _ = object;
        _.isArray = true;
        return _;
    }
    let _ = new ForkObject();
    _.isArray = true;
    _.keys = [];
    
    Object.keys(object).forEach(key => {
        _.keys[key] = object[key];
    });
    return _;
}

validator.validate = function (schema, object, callback) {

    let errors = {};
    Object.keys(schema).forEach(key => {
        if (schema[key]) {
            let type = _type(schema[key])
            let _result;
            switch (type) {

                case "ForkInstance":
                    _result = schema[key].validate(object[key], key, key);
                    if (!_result.status)
                        errors[key] = _result._errors;
                    break;
                case "ForkObject":

                    schema[key].key = key;
                    _result = schema[key].validate(object[key], key);
                    if (!_result.status)
                        errors[key] = _result._errors;
                    break;
            }
        }
    });
    let status = Object.keys(errors).length > 0 ? false : true;
    if (callback) {

        callback({ status: status, errors: errors });
    }
    else
        return { status: status, errors: errors };

}

let _type = function (key) {

    if (Array.isArray(key))
        return "array";
    if (key instanceof ForkInstance)
        return "ForkInstance";
    if (key instanceof ForkObject)
        return "ForkObject";
    else
        return typeof key;
}
module.exports = validator;