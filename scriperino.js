// ==UserScript==
// @name         titan-important-loads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://carrier.realtimefreight.com/CarrierPrivate/AvailableTenders.aspx
// @grant        none
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
  const matchTable = ['Shipper -- Consignee',
  'Jacksonville Terminal -- Greenland RMC',
  'Melbourne Terminal -- South Orange RMC',
  'Melbourne Terminal -- Orlando Block',
  'Melbourne Terminal -- Greenbay RMC',
  'Jahna Greenbay -- South Orange RMC',
  'Jahna Greenbay -- Daytona RMC',
  'JAHNA GREENBAY -- Melbourne RMC',
  'JAHNA GREENBAY -- ST CLOUD RMC']
  

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
      result[matches[t]].style.background = 'green';
      result[matches[t]].style.color = 'white';
      //console.log(result[matches[t]].style.background);
    }
  }

  //anadiendo los estilos al sitio
  //(function () {
  //var s = document.createElement('style');
  //s.type = "text/css";
  //s.innerHTML = 'styleSheet';
  //(document.head || document.documentElement).appendChild(s);
   // })();
})();
