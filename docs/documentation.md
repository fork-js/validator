# Documentation

This document explains all the features and functions which <code>@forkjs/validator</code> supports.

There are two core components of <code>@forkjs/validator</code> :

- Creating Schema
- Validating Object

### Creating Schema : 

First you need to import validator using 
<pre><code> let validator = require("@forkjs/validator"); </code></pre>

Schema is a set of rules you can create for each of the key in an Object. Good thing is it supports nested level validation as well.

#### 1) Simple Example
<pre><code> var schema = {name : validator.required()}</code></pre>

This schema defination ensures that name key is there in Object which we are validating. 

#### 2) Chaining of Rules
Schema defination also supports the chaining of methods, for example : 

<pre><code> var schema = {name : validator.string().required()}</code></pre>

This Schema defination ensures that name key exists and always is a string.

#### 3) Nested Validation
You can define the schema for nested level validation using<code>validator.object()</code>, for example : 

<pre><code> var schema = {
    name : validator.required(),
    address : validator.object({
        pincode : validator.number().required() 
    })
}</code></pre>

#### 4) Array of Object Validation
You can restrict a key to be array by calling <code>validator.array()</code> method with passing the Object Schema. for example :
<pre><code> var schema = {
    name : validator.required(),
    address : validator.array({
        pincode : validator.number().required() 
    })
}</code></pre>

This example ensures the <code>address</code> key is an array of objects.

#### 5) Array of Values
You can also verify that an Array has only similar type of Values, for example :
<pre><code> var schema = {
    name : validator.required(),
    address : validator.array({
        pincode : validator.number().required() 
    }),
    phone_numbers : validator.array().number()
}</code></pre>

In this example, the validation rules ensures that <code>phone_numbers</code> is an array of numbers.


### Validating Objects : 

Validating object becomes very easy with <code>@forkjs/validator</code>. All you need to to is call <code>validator.validate()</code> method with the Object and Schema. for example : 
<pre><code> let valRes = validator.validate(Schema, {
    name: "Validator",
    age: "10",
    address: [
        { 
            pincode: "123456", 
            locality: {
                addr1: "lorem ipsum"
            } 
        }
    ],
    phones: [123, "788"]
});
}</code></pre>

If you want to get the results in a callback, you can also pass the callback as the 3rd parameter in the same method.

#### Result Keys
You will always get an object in result with two keys
- <code>status</code> (true | false)
- <code>errors</code> (array)

status value as true means that the validation was successful, Also in that case errors will be an empty array.

#### Error Format
For error in every key you will always get an array of objects, which will have 4 keys : 

- <code>key</code> : Name of the key
- <code>path</code> : exact nested path for that key
- <code>message</code> : error message
- <code>errorCode</code> : Predefined error codes

for example, look at the following error Object :
<pre><code>{
  "status": false,
  "errors": {
    "name": [
      {
        "key": "name",
        "path": "name",
        "message": "name must be of max length 8",
        "errorCode": "ERR_MAX_LENGTH"
      }
    ],
    "age": [
      {
        "path": "age.",
        "message": "age must be a Number",
        "errorCode": "ERR_NUMBER"
      }
    ],
    "address": [
      {
        "key": "address",
        "path": "address",
        "message": "address must be of minimum length 2",
        "errorCode": "ERR_MIN_LENGTH"
      }
    ],
    "phones": [
      {
        "key": "phones",
        "path": "phones",
        "message": "phones must be of maximum length 2",
        "errorCode": "ERR_MAX_LENGTH"
      }
    ]
  }
}</code></pre>