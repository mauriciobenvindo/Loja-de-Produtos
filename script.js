class Produtcs{
    constructor (){
        this.id = 1
        this.arrayProdutcs = []
        this.editId = null
    }

    save(){
        let produtcs = this.readData()
        if(this.validateData(produtcs)) {
            if(this.editId == null){
                this.add(produtcs)
            } else {
                this.update(this.editId, produtcs)
            }
        }

        this.listTables()
        this.cancel()
    }

    listTables(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ""

        for (let i = 0; i < this.arrayProdutcs.length; i++){
            let tr = tbody.insertRow()
            let td_id  = tr.insertCell()
            let td_produtcs  = tr.insertCell()
            let td_price  = tr.insertCell()
            let td_action  = tr.insertCell()

            td_id.innerText = this.arrayProdutcs[i].id
            td_produtcs.innerText = this.arrayProdutcs[i].nameProdutcs
            td_price.innerText = this.arrayProdutcs[i].price

            td_id.classList.add('center')

            let img_edit = document.createElement('img')
            img_edit.src = 'assets/edit.png'
            img_edit.setAttribute("onclick","produtcs.edit("+ JSON.stringify(this.arrayProdutcs[i]) +")")
            let img_delete = document.createElement('img')
            img_delete.src = 'assets/delete.png'
            img_delete.setAttribute("onclick","produtcs.delete("+ this.arrayProdutcs[i].id +")")
            td_action.appendChild(img_edit)
            td_action.appendChild(img_delete)

            console.log(this.arrayProdutcs)
        }
    }

    add(produtcs){
        produtcs.price = parseFloat(produtcs.price)
        this.arrayProdutcs.push(produtcs)
        this.id++
    }

    update(id, produtcs){
        for (let i = 0; i < this.arrayProdutcs.length; i++){
            if(this.arrayProdutcs[i].id == id){
                this.arrayProdutcs[i].nameProdutcs = produtcs.nameProdutcs
                this.arrayProdutcs[i].price = produtcs.price
            }
        }
    }

    edit(data){
        this.editId = data.id
        document.getElementById('name').value = data.nameProdutcs
        document.getElementById('price').value = data.price
        document.getElementById('btn').innerText = 'Atualizar'
    }

    readData(){
        let produtcs = {}
        produtcs.id = this.id
        produtcs.nameProdutcs = document.getElementById('name').value
        produtcs.price = document.getElementById('price').value
        return produtcs
    }

    validateData(produtcs){
        let msg = ''
        if(produtcs.nameProdutcs == ''){
            msg += '- Informe o Nome do Produto \n'
        }
        if(produtcs.price == ''){
            msg += '- Informe o Preço do Produto \n'
        }
        if(msg != ''){
            alert(msg)
            return false
        }
        return true
    }

    cancel(){
        produtcs.nameProdutcs = document.getElementById('name').value = ''
        produtcs.price = document.getElementById('price').value = ''
        document.getElementById('btn').innerText = 'Salvar'
        this.editId = null
    }

    delete(id){
        if(confirm('Dejesar deletar o produto do ID '+id)){
            let tbody = document.getElementById('tbody')
            for(let i = 0; i < this.arrayProdutcs.length; i++){
                if(this.arrayProdutcs[i].id == id){
                    this.arrayProdutcs.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
    }
}

var produtcs = new Produtcs()