var validator = require("./index");
validator.debug = true;
var methods = {};

methods.addressValidate = {
    name: validator.string().min(4).max(8),
    age: validator.number().required(),
    address: validator.array(
        {
            pincode: validator.number(),
            locality: validator.object(
                {
                    addr1: validator.required(),
                    addr2: validator.string(),
                })
        }
    ).min(2),
    phones: validator.array().number().max(2)
}

console.log(methods.addressValidate)

let valRes = validator.validate(methods.addressValidate, {
    name: "lorem ipsum",
    age: "10",
    address: [
        { 
            pincode: "123456", 
            locality: {
                addr1: "lorem ipsum"
            } 
        }
    ],
    phones: ["gy", 9090, "788"]
});

console.log(JSON.stringify(valRes));
