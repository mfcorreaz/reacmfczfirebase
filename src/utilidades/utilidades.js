//En este archivo creo métodos y funciones que serán de utilidad a lo largo de toda la página

export function primeraLetraAMayusc(str) {
    if (str != undefined){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}