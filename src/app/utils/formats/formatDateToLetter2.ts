/**
 * Función para dar formato de fecha objeto a formato fecha word
 * @param DateToTransform Date a transformar
 * @returns string example: 25 de Abril de 2025
 */

 import * as dayjs from "dayjs";

 const months = [
     {
         month: 'enero',
         monthNumber: 1
     },
     {
         month: 'febrero',
         monthNumber: 2
     },
     {
         month: 'marzo',
         monthNumber: 3
     },
     {
         month: 'abril',
         monthNumber: 4
     },
     {
         month: 'mayo',
         monthNumber: 5
     },
     {
         month: 'junio',
         monthNumber: 6
     },
     {
         month: 'julio',
         monthNumber: 7
     },
     {
         month: 'agosto',
         monthNumber: 8
     },
     {
         month: 'septiembre',
         monthNumber: 9
     },
     {
         month: 'octubre',
         monthNumber: 10
     },
     {
         month: 'noviembre',
         monthNumber: 11
     },
     {
         month: 'diciembre',
         monthNumber: 12
     },
 ]
 
 export default function formatDateToLetter2(DateToTransform): string {
     var emitteddate = dayjs(DateToTransform).format('DD-MM-YYYY')
     var emitday = emitteddate.split('-')[0]
     var emitmonth = extractMonth(emitteddate.split('-')[1])
     var emitanio = emitteddate.split('-')[2]
     return `${emitday} de ${emitmonth} de ${emitanio}.`
 }
 
 function extractMonth(monthNumber) {
     return months[monthNumber - 1].month
 }
 