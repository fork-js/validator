# API Reference

This is the list of all available methods in <code>@forkjs/validator</code>

### validator.object()

This method is used for nested level keys validation, you can pass an object as parameter.

<pre><code> var schema = {
    name : validator.required(),
    address : validator.object({
        pincode : validator.number().required() 
    })
}</code></pre>

In this example <code>address</code> has the validation on nested key <code>pincode</code>.

### validator.array()

This method is used to validate a key as an array. Also this method can be chained to have validation on each element of array.

<pre><code> var schema = {
    name : validator.required(),
    address : validator.object({
        pincode : validator.number().required() 
    }),
    mobile : validator.array().string()
}</code></pre>

In this example, mobile key must be an array of string values.

<code>validator.array()</code> can also be used to validate the array of Objects. 

<pre><code>var schema = {
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
}</code></pre>

In this example address is an array of minimum length 2. 
### validator.required()

This method is used to make an field required.

### validator.string()

This method is used to enforce an element to be a string.

### validator.number()

This method is used to enforce an element to be a number.

### validator.min()

This method is used to give a minimum length for an string or array.

for example :

<pre><code>var schema = {
    name : validator.string().min(4).required(),
    address : validator.object({
        pincode : validator.number().required() 
    }),
    mobile : validator.array().string()
}</code></pre>

In this example, <code>name</code> must be of minimum length 4.

### validator.max()

This method is used to give a maximum length for an string or array.
