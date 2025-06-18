import { defineFunction } from "@aws-amplify/backend";
export const myFirstFunction = defineFunction({
    name: "my-firdefineFunctionst-function",
    // runtime: 'nodejs20.x',
    entry: "./handler.js"
});
