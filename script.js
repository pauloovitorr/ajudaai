function formatarMoeda(id){

    let valor = document.getElementById(`${id}`)
    let dado = valor.value

    if(isNaN(dado)){
      valor.value = ''
      return
    }

    else{
      let formatado = new Intl.NumberFormat('pt-BR').format(dado)
      valor.value = formatado
    }
  }

  

  function calcular(renda, extra, comer,hab,utilidade,outro_ncessi,comer_fora,vestuario, entreteni,outro_desej, divida,cartao,outro_div){
    // recebendo valores do parametro

    // parametro de renda
    let valor = document.getElementById(`${renda}`)
    let renda_extra = document.getElementById(`${extra}`)

    // parametro de necessidade
    let alimentacao = document.getElementById(`${comer}`)
    let habitacao = document.getElementById(`${hab}`)
    let utilid = document.getElementById(`${utilidade}`)
    let outro_necess = document.getElementById(`${outro_ncessi}`)

    // pegando retorno da função de soma de gastos
    let somaNecessidade = calcularNeseccidade(alimentacao,habitacao,utilid,outro_necess)

    //parametro de desejos
    let comerFora = document.getElementById(`${comer_fora}`)
    let vestuari = document.getElementById(`${vestuario}`)
    let entretenimento = document.getElementById(`${entreteni}`)
    let outros_desej = document.getElementById(`${outro_desej}`)

    // pegando retorno da função de soma de gastos
    let somaDesejos = `${calcularDesejos(comerFora, vestuari, entretenimento, outros_desej)}`

    //parametro de divida/emergencia
    let dividas = document.getElementById(`${divida}`)
    let cartoes = document.getElementById(`${cartao}`)
    let outroDivida = document.getElementById(`${outro_div}`)

    // pegando retorno da função de soma de dividas
    let somaDividas_Poupar = somaDivida_Poupar(dividas,cartoes, outroDivida)

    let dado = valor.value
    // validando renda
    if(dado != ''){
        renda_extra = renda_extra.value
        
        if(renda_extra != ''){
        
          renda_extra = renda_extra.replace('.','')
          renda_extra = parseFloat(renda_extra)
        }
        else{
          renda_extra = 0
        }

        // pegando dados de renda
        dado = dado.replace('.','')
        let cinquenta = (parseFloat(dado) + renda_extra ) * 0.5
        let trinta = (parseFloat(dado) + renda_extra ) * 0.3
        let vinte = (parseFloat(dado) + renda_extra ) * 0.2
        
       // somando o valor de renda mais os gastos totais

       let renda_tt = parseFloat(dado) + parseFloat(renda_extra)
       let gasto_tt = parseFloat(somaNecessidade) + parseFloat(somaDesejos) + parseFloat(somaDividas_Poupar)

      let span_zero = document.getElementById('zero')
      if(renda_tt >= gasto_tt + 100){
        
        span_zero.style.color = '#4bf542'
        span_zero.innerText = `Você tem uma renda média de R$ ${renda_tt} e gasta em média R$ ${gasto_tt}. Otima oportunidade para
        criar um fundo de garantia.`
      }
      else if(renda_tt >= gasto_tt){
        span_zero.style.color = '#dbd818'
        span_zero.innerText = `Você tem uma renda média de R$ ${renda_tt} e gasta em média R$ ${gasto_tt}. Sua renda está bastante comprometida.`
      }
      else{
        span_zero.style.color = '#f54242'
        span_zero.innerText = `Você tem uma renda média de R$ ${renda_tt} e gasta em média R$ ${gasto_tt}.Você gasta mais do que recebe, corte gastos.`
      }
       
       
       // dados de necessidades
        let span_um = document.getElementById('um')
        if(somaNecessidade <= cinquenta){
          span_um.style.color = '#4bf542'
          span_um.innerText = `De acordo com sua renda, seus gastos com nessecidades não pode ultrapassar R$ ${cinquenta}, atualmente 
          está R$ ${somaNecessidade}, parabéns pelo equilibrio das necessidades.`
        }
        else{
          span_um.style.color = '#f54242'
          span_um.innerText = `De acordo com sua renda, seus gastos com nessecidades não pode ultrapassar R$ ${cinquenta}, atualmente 
          está R$ ${somaNecessidade}, reveja o que realmente é necessidade ou corte gastos não essenciais.`
        }
       
        // dados de desejos
        let span_dois = document.getElementById('dois')
        if(somaDesejos<= trinta){
          span_dois.style.color = '#4bf542'
          span_dois.innerText = `De acordo com sua renda, seus gastos com desejos não pode ultrapassar R$ ${trinta}, atualmente está R$ ${somaDesejos}, parabéns pelo equilibrio nos gastos com desejos`
        }
        else{
          span_dois.style.color = '#f54242'
          span_dois.innerText = `De acordo com sua renda, seus gastos com desejos não pode ultrapassar R$ ${trinta}, atualmente está R$ ${somaDesejos}, reveja cortar gastos que são apenas desejos e não necessidade`
        }
        
        let span_tres = document.getElementById('tres')
        if(somaDividas_Poupar <= vinte){
          span_tres.style.color = '#4bf542'
          span_tres.innerText = `De acordo com sua renda, seus gastos não pode ultrapassar R$ ${vinte}, atualmente està
          R$ ${somaDividas_Poupar}, parabéns pelo controle nos gastos`
        }
        else{
          span_tres.style.color = '#f54242'
          span_tres.innerText = `De acordo com sua renda, seus gastos não pode ultrapassar R$ ${vinte}, atualmente està
          R$ ${somaDividas_Poupar}, procure alinhar suas dividas`
        }
     
    }
    else{
        let span_um = document.getElementById('um')
        span_um.innerText = `Insira um valor de renda válido`

        let span_dois = document.getElementById('dois')
        span_dois.innerText = `Insira um valor de renda válido`

        let span_tres = document.getElementById('tres')
        span_tres.innerText = `Insira um valor de renda válido`
    }
  }

 
 // função para calcular as nessecidades
  function calcularNeseccidade(ali,hab,uti,outro){
    let alimentacao_valor = ali.value
    let hab_valor = hab.value
    let uti_valor = uti.value
    let outro_valor = outro.value

    alimentacao_valor = valida(alimentacao_valor)
    hab_valor = valida(hab_valor)
    uti_valor = valida(uti_valor)
    outro_valor = valida(outro_valor)

    let soma_Necessidade = alimentacao_valor + hab_valor + uti_valor + outro_valor
    return soma_Necessidade
  }

  // Fução soma desejos
  function calcularDesejos(comer,vest,entre,outro){
    let comer_valor = comer.value
    let vest_valor = vest.value
    let entre_valor = entre.value
    let outro_valor = outro.value

    comer_valor = valida(comer_valor)
    vest_valor = valida(vest_valor)
    entre_valor = valida(entre_valor)
    outro_valor = valida(outro_valor)

   let somaDesejo = comer_valor + vest_valor + entre_valor + outro_valor
   return somaDesejo

  }

  //função soma divida
  function somaDivida_Poupar(fundo,cart,outro){
    let fundo_valor = fundo.value
    let cart_valor = cart.value
    let outro_valor = outro.value

    fundo_valor = valida(fundo_valor)
    cart_valor = valida(cart_valor)
    outro_valor = valida(outro_valor)

    let somaDivida = fundo_valor + cart_valor + outro_valor
    return somaDivida

  }

  function valida(x){
    if(x != ''){
       
      x = x.replace('.','')
      x = parseFloat(x)

      return x
     }
     else{
     return x = 0
     }
  }