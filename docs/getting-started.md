# Installation

You can install <code>@forkjs/validator</code> using following command

<blockquote>npm i @forkjs/validator</blockquote>


# Schema

Schema can be defined as 
<pre v-pre data-lang="Node.JS">
<code class="lang-javascript">var validator = require("@forkjs/validator");
validator.debug = true;

let userSchema = {
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
}</code></pre>

For detailed information about all functions you can look at Functions
# Validation

Validation is the easiest task here. All you need to do is call <code>validator.validate(userSchema,Object)</code> method with your Object. 

<pre v-pre data-lang="Node.JS">
<code class="lang-javascript">let valRes = validator.validate(methods.addressValidate, {
    name: "Tom",
    age: "10",
    address: [
        { 
            pincode: "123456", 
            locality: {
                addr1: "lorem ipsum"
            } 
        }
    ]
});</code></pre>

<code>validate</code> method returns an object with two keys: status (true|false) and errors (object). <code>status</code> with true means the Validation was successful, else errors will have all the errors encountered during Validation. 