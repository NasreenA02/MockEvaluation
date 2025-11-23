let person = { name: "Venu", age: 25 };
let extra = { city: "Bengaluru" };
let profile=(person,extra)=>({
    ...person,
    ...extra
})
console.log(profile(person,extra));