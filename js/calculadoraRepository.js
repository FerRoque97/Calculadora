'use strict';


class repositorio{
    
    
    constructor(){
        this.camisa = [];
        this.id = 0;
    }

    salvar(total, boll){// total: -- Sera passado o calculo jah pronto para ser salvo
        if(boll == false){
            this.camisa.push(total)//salvando no Array do repositorio
        }else{
            this.camisa[this.id] = total;//Editando uma compra
        }
    }

    busca(){ //Retorna o Array de camisas
        return this.camisa;
    }

    excluir(index){//Função para exclusao de compra
        this.camisa.splice(index,1);
    }

    editar(id){//Editando um compra
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