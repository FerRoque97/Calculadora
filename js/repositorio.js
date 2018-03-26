'use strict';


class repositorio{
    
    
    constructor(){
        this.camisa = [];
        this.id = 0;
    }

    salvar(total, boll){// total: -- Sera passado o calculo jah pronto para ser salvo
        //alert("tamo no repositorio");
        if(boll == false){
            this.camisa.push(total)//salvando no repositorio
        }else{
            this.camisa[this.id] = total;
        }
    }

    busca(){
        return this.camisa;
    }

    excluir(index){
        this.camisa.splice(index,1);
    }

    editar(id){
        let edit = this.camisa[id];

        this.id = id;

        let camp_P = document.getElementById("cp");
        camp_P.value = edit.cap;
        let camp_M = document.getElementById("cm");
        camp_M.value = edit.cam;
        let camp_G = document.getElementById("cg");
        camp_G.value = edit.cag;
    }

}

export default repositorio;