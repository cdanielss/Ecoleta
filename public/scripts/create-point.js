function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs() 

function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue  = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text 

    citySelect.innerHTML = `<option value>Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })
    citySelect.disabled = false
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
    
/* Itens de coleta pegando todos os li*/
const itensToCollect = document.querySelectorAll(".items-grid li")
for(const item of itensToCollect) {
    item.addEventListener("click", handleSelectItem)
}

const collectItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectItem(event) {
    /* Adicionar ou remover uma classe */
    const itemLi = event.target 
    itemLi.classList.toggle("selected")

    /* Pegar os somente os id dos selecionads */
    const itemId = event.target.dataset.id

    /* Salvar os items selecionados */
    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId
        return itemFound
    })
    if(alreadySelected >=0 ){
        const filtered = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filtered
    } else {
        selectedItems.push(itemId)
    }
    collectItems.value = selectedItems
}
