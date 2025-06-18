import { defineFunction } from "@aws-amplify/backend";
export const myFirstFunction = defineFunction({
    name: "my-firdefineFunctionst-function",
    runtime: 20,
    entry: './handler.ts'
});
