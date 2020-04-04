let data = require('./data.js').toLocaleLowerCase();

let lineasConFlexBox = data.split('<').filter((line) => {
    return line.includes('flexbox video');
});

let totalSegundos = 0;
lineasConFlexBox.map((line) => {
   let tiempoStr = line.replace(/[^0-9:]/g, '');
   totalSegundos += calcularSegundos(tiempoStr);
});



console.log('El total de segundos de video de tipo Flexbox es:')
console.log(totalSegundos);



function calcularSegundos(tiempo) {
    let total = 0;
     let split = tiempo.split(':');

     if (split.length > 2) {
        total+= parseInt(split[0]) * 3600;
        total+= parseInt(split[1]) * 60;
        total+= parseInt(split[2]);
     } else {
        total+= parseInt(split[0]) * 60;
        total+= parseInt(split[1]);
     }
     
     return total;
}