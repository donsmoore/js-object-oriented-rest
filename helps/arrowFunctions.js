var elements = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

console.log( elements.map(function(element) { return element.length; }) );
console.log( elements.map((element) => { return element.length; }) );
console.log( elements.map(element => { return element.length; }) );
console.log( elements.map(element => element.length) );
console.log( elements.map(({ length :Z }) => Z) );
console.log( elements.map(({ length }) => length) );

