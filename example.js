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
    )
}

console.log(methods.addressValidate)

let valRes = validator.validate(methods.addressValidate, {
    name: "Eshant Sahu",
    age: "10",
    address: [
        { 
            pincode: "123456", 
            locality: {
                addr1: "lorem ipsum"
            } 
        }
    ]
});

console.log((valRes));
