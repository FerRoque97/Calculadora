'use strict';

import repositorio from '../js/repositorio.js';

import calculadora from '../js/calculadora.js';

class call{

    constructor(){
        this.rep = new repositorio();
        this.call = new calculadora();
        //this.camisa = [];
        this.indEdit = -1;
    }

    leitura() {
        let camisaP = parseInt(document.getElementById("cp").value);
        let camisaM = parseInt(document.getElementById("cm").value);
        let camisaG = parseInt(document.getElementById("cg").value);

        //window.alert("P: "+camisaP+ "M: "+camisaM + "G: "+camisaG);

        let num = {};
        num.nump = camisaP;
        num.numm = camisaM;
        num.numg = camisaG;
        num.total = 0;

        return num;
    }

    // calculo(num){
    //     let p = num.nump;
    //     let m = num.numm;
    //     let g = num.numg;

    //     let total  = {};
         
    //     total.cap = p;
    //     total.cam = m;
    //     total.cag = g;

    //     total.total = parseInt((p*10) +(m*12) + (g*15));

    //     window.alert(total.total);

    //     return total;
    // }

    validate(num){
        let numNull = true;
        let numb = [];
        numb.push(num); 
        for(var i = 0; i< numb.length; i++) {
            if(numb[i].nump <= 0 || numb[i].numm <= 0 || numb[i].numg <= 0) {
                alert("Numeros negativos!");
                numNull = false;
            }else if(Number.isNaN(numb[i].nump)==true ||
                    Number.isNaN(numb[i].numm)==true ||
                    Number.isNaN(numb[i].numg)==true){
                        //Validação com DOIS numeros NaN
                        if(Number.isNaN(numb[i].nump)==true && Number.isNaN(numb[i].numm)==true &&
                        Number.isNaN(numb[i].numg)==true){
                            alert("Digite a quantidade de cada camista!");
                            return numNull = false;

                        }else if(Number.isNaN(numb[i].nump) == true && Number.isNaN(numb[i].numm) == true ){
                            numb[i].nump = 0;
                            numb[i].numm = 0;


                        }else if(Number.isNaN(numb[i].nump && Number.isNaN(numb[i].numg) == true)){
                            numb[i].nump = 0;
                            numb[i].numg = 0;

                        }else if(Number.isNaN(numb[i].numm) == true && Number.isNaN(numb[i].numg) == true){
                            numb[i].numm = 0;
                            numb[i].numg = 0;
                        }else if(Number.isNaN(numb[i].nump) == true){
                            //Validação com UM numero NaN
                            numb[i].nump = 0;

                        }else if(Number.isNaN(numb[i].numm)){
                            numb[i].numm = 0;

                        }else{
                            numb[i].numg = 0;
                        }
                          
            }else{
                return numNull;
            }
        }
        return numNull;
        // return numb;

    }

    salvar(){//Passar para Repository
        //window.alert("entrei salvar");
        let num = this.leitura();
        //window.alert(num[0]);

        if(this.indEdit == -1){
            if(this.validate(num) == true){
                //alert("validate true");
                //let total = this.calculo(num);
                let total = this.call.calculo(num);
                this.rep.salvar(total, false);
                //this.camisa.push(total);//aqui sera usado o repositorio para salvar
                this.addTabela();//ATT LISTA
                this.limparForm();
            }
        }else {
            //let total = this.calculo(num);
            let total = this.call.calculo(num);
            this.rep.salvar(total, true);
            //this.camisa[this.indEdit] = total;
            this.indEdit = -1;
            this.addTabela();//ATT LISTA
            this.limparForm();
        }

    }

    limparForm(){
        let campoP= document.getElementById("cp");
        campoP.value = "";

        let campoM = document.getElementById("cm");
        campoM.value="";

        let campoG = document.getElementById("cg");
        campoG.value="";
    }

    excluir(index){//Passar para Repository
        //alert(index);
        
       if(confirm("Comfirma Exclusão?")){
           this.rep.excluir(index);
            //this.camisa.splice(index, 1);
           this.addTabela();
           this.limparForm();
       }
    }

    editar(index){//Passar para Repository
        this.rep.editar(index);

        this.indEdit = index;

    }

    addTabela(){//Att Lista
        let table  = document.getElementById("tam"); 
        let camisa = this.rep.busca();
    
        const str = 
        `<table>
            <thead>
                <th> P </th>
                <th> M </th>
                <th> G </th>
                <th> Total </th>
                <th> Ação </th>
            </thead>

            <tbody>

                ${ camisa.map(function (tam, index) {
                    return `<tr> 
                        <td> ${tam.cap} </td>
                        <td> ${tam.cam}  </td>
                        <td> ${tam.cag}  </td>
                        <td> ${tam.total}  </td>
                        <td>
                        <button class="but2" onclick = 'cad.excluir(${index})'>Excluir</button>
                        <button class="but2" onclick = 'cad.editar(${index})'>Editar</button>
                        </td>
                    </tr>`

                 }).join('')
                }
            
            </tbody>
        </table>`;
       
       
       
         table.innerHTML= str;
    }

}

//var cad =  new call();

export default call;