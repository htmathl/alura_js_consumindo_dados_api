async function buscaEnd(cep) {
    const mensagemErro = document.getElementById('erro')
    const cidade = document.getElementById('cidade')
    const estado = document.getElementById('estado')
    const logradouro = document.getElementById('endereco')
    mensagemErro.innerHTML = '';
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPCovertida = await consultaCEP.json();
        if(consultaCEPCovertida.erro) {
            throw Error('CEP não existente!');
        }
        cidade.value = consultaCEPCovertida.localidade
        logradouro.value = consultaCEPCovertida.logradouro
        estado.value = consultaCEPCovertida.uf
        return consultaCEPCovertida
    } catch(erro) {
        mensagemErro.innerHTML = `
        <p style="margin: auto">CEP inválido! Tente novamente!</p>
        `
        cidade.value = ''
        estado.value = ''
        logradouro.value = ''
    }
}

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEnd(cep.value))

/* let ceps = ['01001000', '01001001']
// let conjuntoCeps = ceps.map(valores => buscaEnd(valores))
// console.log(conjuntoCeps);
// Promise.all(conjuntoCeps).then(resp => console.log(resp))*/
