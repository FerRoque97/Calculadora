'use strict';

import repositorio from '../js/calculadoraRepository.js';

import calculadora from '../js/calculadora.js';

class call{

    constructor(){
        this.rep = new repositorio();
        this.call = new calculadora();
        this.indEdit = -1;
    }

    leitura() {
        let camisaP = parseInt(document.getElementById("cp").value);
        let camisaM = parseInt(document.getElementById("cm").value);
        let camisaG = parseInt(document.getElementById("cg").value);


        let num = {};
        num.nump = camisaP;
        num.numm = camisaM;
        num.numg = camisaG;
        num.total = 0;

        return num;
    }

    validate(num){
        let numNull = true;
        let numb = [];
        numb.push(num); 
        for(var i = 0; i< numb.length; i++) {
            if(numb[i].nump <= 0 || numb[i].numm <= 0 || numb[i].numg <= 0) {//Se numeros negativos
                alert("Numeros negativos!");
                numNull = false;
            }else if(Number.isNaN(numb[i].nump)==true ||
                    Number.isNaN(numb[i].numm)==true ||
                    Number.isNaN(numb[i].numg)==true){

                        if(Number.isNaN(numb[i].nump)==true && Number.isNaN(numb[i].numm)==true &&
                        Number.isNaN(numb[i].numg)==true){// Caso o Form ser == 0
                            alert("Digite a quantidade desejada de cada Camisa!");
                            return numNull = false;
                        //Validação com DOIS numeros NaN
                        }else if(Number.isNaN(numb[i].nump) == true && Number.isNaN(numb[i].numm) == true ){
                            numb[i].nump = 0;
                            numb[i].numm = 0;


                        }else if(Number.isNaN(numb[i].nump && Number.isNaN(numb[i].numg) == true)){
                            numb[i].nump = 0;
                            numb[i].numg = 0;

                        }else if(Number.isNaN(numb[i].numm) == true && Number.isNaN(numb[i].numg) == true){
                            numb[i].numm = 0;
                            numb[i].numg = 0;
                        //Validação com UM numero NaN
                        }else if(Number.isNaN(numb[i].nump) == true){
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

    }

    salvar(){//Passar para Repository
        let num = this.leitura();

        if(this.indEdit == -1){
            if(this.validate(num) == true){//validação == True
                let total = this.call.calculo(num);//Chama o método para efetuar o calculo do preço das camisas
                this.rep.salvar(total, false);// Salva no repositorio
                this.addTabela();//ATT LISTA
                this.limparForm();//Limpa o Form
            }
        }else {
            let total = this.call.calculo(num);
            this.rep.salvar(total, true);
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

    excluir(index){//Método excluir compra
        
       if(confirm("Comfirma Exclusão?")){
           this.rep.excluir(index);
           this.addTabela();//Att Lista de compras
           this.limparForm();
       }
    }

    editar(index){//Edita determinada Lista
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

export default call;