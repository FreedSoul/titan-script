// ==UserScript==
// @name         titan-important-loads
// @namespace    http://tampermonkey.net/
// @version      0.5.2
// @updateURL    https://raw.githubusercontent.com/FreedSoul/titan-script/main/scriperino.user.js
// @downloadURL  https://raw.githubusercontent.com/FreedSoul/titan-script/main/scriperino.user.js
// @description  add funcionality to carrier web
// @require      https://raw.githubusercontent.com/FreedSoul/titan-script/main/matchTable.js
// @author       FreedSoul
// @match        https://carrier.realtimefreight.com/CarrierPrivate/AvailableTenders.aspx
// @grant        GM_getTab()
// @grant        GM_log()
// @grant        window
// ==/UserScript==

(function() {
    'use strict';
   //tomando los nodos de la tabla y guardandolos en una variable
  let result = document.querySelectorAll('#nl_rtfloadboard tbody tr', rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });
  //lista de loads - high priority
  /*const matchTable = ['Shipper -- Consignee',
  'Jacksonville Terminal -- Greenland RMC',
  'Melbourne Terminal -- South Orange RMC',
  'Melbourne Terminal -- Orlando Block',
  'Melbourne Terminal -- Greenbay RMC',
  'Jahna Greenbay -- South Orange RMC',
  'Jahna Greenbay -- Daytona RMC',
  'JAHNA GREENBAY -- Melbourne RMC',
  'CORKSCREW MINE -- VENICE RMC',
  'JAHNA GREENBAY -- ST CLOUD RMC']*/
  

  //PARSEANDO RESULT IN LIST RESULT PARA DAR UN FORMATO IGUAL A MATCHTABLE
  let listResult = [];
  for(let i=0; i < result.length; i++){
   listResult.push(result[i].childNodes[8].innerText+' -- '+result[i].childNodes[9].innerText);
   //console.log(result[i].childNodes[8].innerText+' -- '+result[i].childNodes[9].innerText);
  }
  //console.log(result)
  //haciendo el matching
  let matches = [];
  for(let i=1; i < listResult.length; i++){
    for(let j=1; j < matchTable.length; j++){
      if(listResult[i].toLowerCase() == matchTable[j].toLowerCase()){
        matches.push(i);
      }
    }
  }
  //(PARA BORRAR) MUESTRA POR CONSOLA LO QUE SE ENVIARA A TOAST/NOTIFICATIONS
  if(matches.length == 0){
      console.log('no se han encontrados cargas de interes disponibles')
  }else{
    console.log('los matches son: '+matches);
    for (let t = 0; t < matches.length; t++) {
      if(result[matches[t]].style.backgroundColor == '#F28C8C' || result[matches[t]].style.backgroundColor == "rgb(242, 140, 140)"){

      }else{
         result[matches[t]].style.background = '#8CF2B4';

      }
      //console.log(result[matches[t]].style.background);
    }
  }
  //anadiendo los estilos al sitio
    for(let k=0;k<result.length;k++){
         if(result[k].childNodes[10].innerText.includes('Aggregate')){
             result[k].childNodes[10].style.backgroundColor = '#8CB4F2'
         }
    }
    let ft = true;
   //recargando pagina segun parametros
   function myFocus(count){
    let tabActive = true;
    if (tabActive == document.hasFocus()){
        //console.log('entro en el primero')
        if(ft == false){
           //console.log('entro en el segundo')
           location.reload()
        }
    }else{
        //agrego false para que cuando este activa pase 2do if
        ft = false;
    }
    setTimeout(myFocus,1000)
   }
   //==========================================
  setTimeout(myFocus,500)

  //(function () {
  //var s = document.createElement('style');
  //s.type = "text/css";
  //s.innerHTML = 'styleSheet';
  //(document.head || document.documentElement).appendChild(s);
   // })();
})();
