'use strict';

class calculadora{
    //calculo feito das camisas 
    //Import para calculadoraCamisa
    calculo(num){
        let p = num.nump;
        let m = num.numm;
        let g = num.numg;

        let total  = {};
         
        total.cap = p;
        total.cam = m;
        total.cag = g;

        total.total = parseInt((p*10) +(m*12) + (g*15));

        return total;
    }
}

export default calculadora;