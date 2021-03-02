// ==UserScript==
// @name         titan-important-loads
// @namespace    http://tampermonkey.net/
// @version      0.5.6
// @updateURL    https://raw.githubusercontent.com/FreedSoul/titan-script/main/scriperino.user.js
// @downloadURL  https://raw.githubusercontent.com/FreedSoul/titan-script/main/scriperino.user.js
// @description  add funcionality to carrier web
// @author       FreedSoul
// @match        https://carrier.realtimefreight.com/CarrierPrivate/AvailableTenders.aspx
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
                      'Center Sands -- Orlando Block',
                      'CORKSCREW MINE -- FT MYERS RMC',
                      'CORKSCREW MINE -- Punta Gorda RMC',
                      'Jacksonville Terminal -- Greenland rd RMC',
                      'Jacksonville Terminal -- Orange Park RMC',
                      'Jacksonville Terminal -- Bunnell RMC',
                      'VULCAN GRANDIN -- Orange Park rmc',
                      'VULCAN GRANDIN -- greenland rd rmc',
                      'VULCAN GRANDIN -- BUNNELL RMC',
                      'Melbourne Terminal -- South Orange RMC',
                      'Melbourne Terminal -- Orlando Block',
                      'Melbourne Terminal -- Daytona rmc',
                      'Melbourne Terminal -- GREEN BAY RMC',
                      'Melbourne Terminal -- ST CLOUD RMC',
                      'Melbourne Terminal -- DELAND RMC',
                      'Melbourne Terminal -- COCOA RMC',
                      'MELBOURNE TERMINAL -- Longwood RMC',
                      'Cocoa Aggregate -- COCOA RMC',
                      'Cocoa Aggregate -- GREEN BAY RMC',
                      'Cocoa Aggregate -- LONGWOOD RMC',
                      'Cocoa Aggregate -- South Orange RMC',
                      'Cocoa Aggregate -- Winter Garden RMC',
                      'EDGEWATER TERMINAL -- DELAND RMC',
                      'Jahna Greenbay -- South Orange RMC',
                      'Jahna Greenbay -- Daytona RMC',
                      'JAHNA GREENBAY -- Melbourne RMC',
                      'JAHNA GREENBAY -- Longwood rmc',
                      'JAHNA GREENBAY -- cocoa rmc',
                      'JAHNA GREENBAY -- winter garden rmc',
                      'JAHNA GREENBAY -- DELAND RMC',
                      'JAHNA GREENBAY -- ST CLOUD RMC',
                      'JAHNA INDEPENDENT -- TAMPA RMC - AGG',
                      'JAHNA INDEPENDENT -- Anderson Rd RM',
                      'JAHNA - CGS -- Orlando Block',
                      'JAHNA - CGS -- BUILDERS SOURCE - HOLLY HILL']

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
  //(PARA BORRAR) MUESTRA POR CONSOLA/highlinting
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
   

  //(function () {
  //var s = document.createElement('style');
  //s.type = "text/css";
  //s.innerHTML = 'styleSheet';
  //(document.head || document.documentElement).appendChild(s);
   // })();
})();
