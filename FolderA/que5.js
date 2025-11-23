let user = {
  name: "Alice",
  address: {
    city: "Bengaluru",
    pin: 560001,
    geo: { lat: 11.22, lng: 77.33 }
  }
}; //city,lat,lang
let information=user=>({$name,address:{city,pin,geo:{$lat: $lng}}})=>(`${city} ${geo}`);
console.log(information(user));

