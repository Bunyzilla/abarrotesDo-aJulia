
//Se formatea la variable de alguna manera para el editor de texto para que recomiende las propiedades
var dataListProducts = [{
    claveId : Number,
    descripcion : String,
    precio : Number,
    clasificacion : String,
    noExistencias : Number,
    minExistencia : Number,
    maxExistencia : Number
}];

//Se carga la Info del archivo
dataListProducts = require('./DataFile.json');

//1) Número de productos con existencia mayor a 20.
function createReport1(dataListProducts){
    let reporte = "";
    let ListaFiltrada = dataListProducts.filter(function(item) {
        return Number(item.noExistencias) > 20;
    });
    reporte = reporte + "1)Número de productos con existencia mayor a 20.\n";
    reporte = reporte + "Id\tPrecio\tClasificacion   Ex\tMin\tMax\tDescripcion\n";
    
    }
    reporte = reporte + "\n\t Total de resultados : "+ListaFiltrada.length;
    return reporte;
}
//"2) Número de productos con existencia menos a 15.\n"
function createReport2(dataListProducts){
    let reporte = "";
    let ListaFiltrada = dataListProducts.filter(function(item) {
        return Number(item.noExistencias) < 15;
    });
    reporte = reporte + "2) Número de productos con existencia menos a 15.\n";
    reporte = reporte + "Id\tPrecio\tClasificacion   Ex\tMin\tMax\tDescripcion\n";
    
    reporte = reporte + "\n\t Total de resultados : "+ListaFiltrada.length;
    return reporte;
}
//"3) Lista de productos con la misma clasificación y precio mayor 15.50\n"
//Funcion para ordenar la lista y juntar los productos por clas
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    //Se sacan los valores a comparar
    const productA = a.clasificacion.toUpperCase();
    const productB = b.clasificacion.toUpperCase();
  
    let comparison = 0;
    if (productA > productB) {
      comparison = 1;
    } else if (productA < productB) {
      comparison = -1;
    }
    return comparison;
  }

function createReport3(dataListProducts){
    let reporte = "";
    //Se ordena la lista por clasi
    let ListaFiltrada = dataListProducts.sort(compare);
    //Se filtra con precio mayor a 15.50
    ListaFiltrada = ListaFiltrada.filter(function(item) {
        return Number(item.precio) > 15.50;
    });

    reporte = reporte + "3) Lista de productos con la misma clasificación y precio mayor 15.50\n";
    reporte = reporte + "Id\tPrecio\tClasificacion   Ex\tMin\tMax\tDescripcion\n";
    for(let index = 0; index < ListaFiltrada.length ;index++){
        reporte = reporte+
            ListaFiltrada[index].claveId +"\t"+
            ListaFiltrada[index].precio+"\t"+
            ListaFiltrada[index].clasificacion+"\t"+
            ListaFiltrada[index].noExistencias+"\t"+
            ListaFiltrada[index].minExistencia+"\t"+
            ListaFiltrada[index].maxExistencia+"\t"+
            ListaFiltrada[index].descripcion+"\n";
    }
    return reporte;
}

//"4) Lista de productos con precio mayor a 20.30 y menor a 45.00\n"
function createReport4(dataListProducts){
    let reporte = "";
    //Se ordena la lista por clasi
    let ListaFiltrada = dataListProducts.filter(function(item) {
        return Number(item.precio) > 20.30 && Number(item.precio) < 45;
    });

    reporte = reporte + "4) Lista de productos con precio mayor a 20.30 y menor a 45.00\n";
    reporte = reporte + "Id\tPrecio\tClasificacion   Ex\tMin\tMax\tDescripcion\n";
    for(let index = 0; index < ListaFiltrada.length ;index++){
        reporte = reporte+
            ListaFiltrada[index].claveId +"\t"+
            ListaFiltrada[index].precio+"\t"+
            ListaFiltrada[index].clasificacion+"\t"+
            ListaFiltrada[index].noExistencias+"\t"+
            ListaFiltrada[index].minExistencia+"\t"+
            ListaFiltrada[index].maxExistencia+"\t"+
            ListaFiltrada[index].descripcion+"\n";
    }
    return reporte;
}

// "5) Número de productos agrupados por su clasificación\n"
function compareClasis(a, b) {
    // Use toUpperCase() to ignore character casing
    //Se sacan los valores a comparar
    const productA = a.clasificacion.toUpperCase();
    const productB = b.clasificacion.toUpperCase();
  
    let comparison = 0;
    if (productA > productB) {
      comparison = 1;
    } else if (productA < productB) {
      comparison = -1;
    }
    return comparison;
}
function createReport5(dataListProducts){
    let reporte = "";
    //Se saca la lista de las clasificaciones
    let ListaOrdenada = dataListProducts.sort(compareClasis);
    let clasificaciones = [{
        clasi : "",
        numProd : 0
    }];
    clasificaciones = [];
    let actual = ListaOrdenada[0].clasificacion;
    let anterior = ListaOrdenada[0].clasificacion;
    let contadorProd = 0;
    console.log(anterior)
    //Se sacan las casificaciones de la lista al mismo tiempo que se van contando los productos de cada una
    for(let i = 0 ; i < (ListaOrdenada.length); i++){
        actual = ListaOrdenada[i].clasificacion;
        if(actual != anterior){
            clasificaciones.push({clasi : anterior, numProd : contadorProd});
            contadorProd=0;
            anterior = actual;
        }else if( (i+1) == (ListaOrdenada.length)){
            contadorProd++;
            clasificaciones.push({clasi : anterior, numProd : contadorProd});
        }
        contadorProd++;
    }
    
    reporte = reporte +  "5) Número de productos agrupados por su clasificación\n";
    reporte = reporte + "NumProd Clasificacion\n";
    for(let index = 0; index < clasificaciones.length ;index++){
        reporte = reporte+
            "  "+clasificaciones[index].numProd +"\t"+
            clasificaciones[index].clasi+"\n";
    }
    return reporte;
}

//Importaciones para poder leer variables desde la consola
var readline = require('readline-sync');
var opc = 1;

while(opc != 0){
    let menu = "1) Número de productos con existencia mayor a 20.\n"+
    "2) Número de productos con existencia menos a 15.\n"+
    "3) Lista de productos con la misma clasificación y precio mayor 15.50\n"+
    "4) Lista de productos con precio mayor a 20.30 y menor a 45.00\n"+
    "5) Número de productos agrupados por su clasificación\n"+
    "0) Salir\nCual Reporte desea Imprimir : ";
    opc = readline.question(menu);
    switch(Number(opc)){
        case 0:
            break;
        case 1:
            console.log(createReport1(dataListProducts));
            break;
        case 2:
            console.log(createReport2(dataListProducts));
            break;
        case 3:
            console.log(createReport3(dataListProducts));
            break;
        case 4:
            console.log(createReport4(dataListProducts));
            break;
        case 5:
            console.log(createReport5(dataListProducts));
            break;
    }
}