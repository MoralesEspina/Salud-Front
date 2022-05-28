
import { Img, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { IAuthorization } from "src/app/models/authorization";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";
import { environment } from "src/environments/environment.prod";
import formatDateToLetter from '../formats/formatDateToLetter';
import FormatNumberToRender from '../formats/formatNumbersToRender';


export async function CreatePDFVacationAuthorization(authorization: IAuthorization, body: string, authorizationConfiguration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {
   

    var fontsize = 13
    var fontsizeName = 13
    var name = authorization.person.fullname
    if (authorization.person.work_dependency.name.length >= 40) {
        fontsize = 10
    }
    if (name.length >= 40) {
        fontsizeName = 10
    }

    var fontsize1 = 10
   

    var body = body
    var observation = authorization.observation
    if (observation) {
        observation.toUpperCase()
    } else {
        observation = "No hay observaciones."
    }

    var firstFirma = `${authorization.personnelOfficer} \n${authorization.personnelOfficerPosition} \n${authorization.personnelOfficerArea}`
    var secondFirma = `${authorization.executiveDirector}\n${authorization.executiveDirectorPosition} \n${authorization.executiveDirectorArea}`

    if (!authorizationConfiguration.align) {
        authorizationConfiguration.align = 'left'
    }

    if (!authorizationConfiguration.imageURL) {
        authorizationConfiguration.imageURL = `${environment.URL2}/images/logo-salud-7.jpg`
    }

    if (!authorizationConfiguration.width) {
        authorizationConfiguration.width = '590'
    }

    if (!authorizationConfiguration.height) {
        authorizationConfiguration.height = '800'
    }

    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 13
    })
    

   // pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
    pdf.add(new Txt('Datos generales').alignment('left').relativePosition(0, 5).color('blue').bold().end)


    pdf.add(new Txt('Nombre Completo').alignment('left').relativePosition(0, 30).end)
    pdf.add(new Txt('Dirección particular').alignment('left').relativePosition(238, 30).end)

    pdf.add(new Txt('País').alignment('left').relativePosition(0, 55).end)
    pdf.add(new Txt('Municipio').alignment('left').relativePosition(238, 55).end)

    pdf.add(new Txt('Departamento').alignment('left').relativePosition(0, 80).end)
    pdf.add(new Txt('Aldea o caserío').alignment('left').relativePosition(238, 80).end)

    pdf.add(new Txt('Teléfono residencia').alignment('left').relativePosition(0, 105).end)
    pdf.add(new Txt('Teléfono oficina').alignment('left').relativePosition(238, 105).end)

    pdf.add(new Txt('Teléfono celular').alignment('left').relativePosition(0, 130).end)
    pdf.add(new Txt('Correo electrónico').alignment('left').relativePosition(238, 130).end)

    pdf.add(new Txt('Fecha de nacimiento').alignment('left').relativePosition(0, 155).end)
    pdf.add(new Txt('Edad').alignment('left').relativePosition(238, 155).end)

    pdf.add(new Txt('Lugar nacimiento').alignment('left').relativePosition(0, 180).end)
    pdf.add(new Txt('Estado civil').alignment('left').relativePosition(238, 180).end)

    pdf.add(new Txt('Nacionalidad').alignment('left').relativePosition(0, 205).end)
    pdf.add(new Txt('Etnia').alignment('left').relativePosition(238, 205).end)

//fañta

    pdf.add(new Txt('Datos de identificación').alignment('left').relativePosition(0, 305).color('blue').bold().end)

    pdf.add(new Txt('CUI').alignment('left').relativePosition(0, 330).end)
    pdf.add(new Txt('No. pasaporte').alignment('left').relativePosition(238, 330).end)

    pdf.add(new Txt('No. Afiliación IGSS').alignment('left').relativePosition(0, 355).end)
    pdf.add(new Txt('Licencia').alignment('left').relativePosition(238, 355).end)

    pdf.add(new Txt('NIT').alignment('left').relativePosition(0, 380).end)



    pdf.add(new Txt('Información familiar').alignment('left').relativePosition(0, 405).color('blue').bold().end)

    pdf.add(new Table(
    
          [
          [
            'Nombre',
            'Teléfono',
            'Parentesco',
            'Fecha nacimiento'
          ],
          [
            'EDGAR JAVIER MARROQUIN RUANO',
            '32173222',
            'CONYUGE',
            '20/10/2003',
          ],
          [
            'campo 5',
            'campo 6',
            'campo 7',
            'campo 8',
          ],
          [
            'campo 9',
            'campo 10',
            'campo 11',
            'campo 12',
          ]
        ]

     ).alignment('left').relativePosition(0, 430).end)


     pdf.add(new Txt('Educación').alignment('left').relativePosition(0, 530).color('blue').bold().end)

     pdf.add(new Table(
     
           [
           [
             'Pais',
             'Establecimiento',
             'Periodo del',
             'Periodo al',
             'Diploma',
             'Estado',
             'Grado'
           ],
           [
             'GUATEMALA',
             'ESCUELA OFICIAL RURAL MIXTA ALDEA URLANTA.',
             '1987',
             '1993',
             'no se',
             'FINALIZADO',
             'PRIMARIA',
           ],
           [
             '',
             '',
             '',
             '',
             '',
             '',
             '',
           ],
          
         ]
 
      ).alignment('left').relativePosition(0, 555).end)
 
  


      pdf.add(new Txt('Referencias personales').alignment('left').relativePosition(0, 705).color('blue').bold().end)

      pdf.add(new Table(
      
            [
            [
              'Nombre',
              'Teléfono',
              'Profesión',
              'Empresa',
              'Parentesco'
            ],
            [
              'WALTER DE LEON',
              '4939',
              'SABER',
              'NO SE',
              'PERSONAL'
            ],
            [
                'WALTER DE LEON',
                '4939',
                'SABER',
                'NO SE',
                'PERSONAL'
              ]
            
          ]
  
       ).alignment('left').relativePosition(0, 730).end) 


/*
    pdf.add(new Txt('EXPERIENCIA LABORAL').alignment('left').relativePosition(0, 505).color('blue').bold().end)

       pdf.add(new Table(
       
             [
             [
               'Nombre de la institución o empresa: MINISTERIO DE SALUD PUBLICA Y ASISTENCIA SOCIAL'
             ],
             [
               'Direccion:',
               
             ],
             [
               'Telefono:',
               'Nombre jefe inmediato:',
             ],
             [
               'Motivo del retiro:',
               'Sector:',
             ],
             [
                'Fecha del empleo del:',
                'Salario:',
              ],
              [
                 'Fecha del empleo al:',
               ],
               [
                  'Puesto desempeñado:',
                ]
           ]
   
        ).alignment('left').relativePosition(0, 530).end) */
    




/*
    pdf.add(new Txt('Código del servidor público: ').alignment('left').relativePosition(0, 180).end)
    pdf.add(new Txt(publicserver).bold().decoration('underline').relativePosition(160, 180).end)

    pdf.add(new Txt('Partida presupuestaria individual: ').alignment('left').relativePosition(230, 180).end)
    pdf.add(new Txt(partida).bold().decoration('underline').relativePosition(410, 180).end)

    pdf.add(new Txt('Título del puesto: ').alignment('left').relativePosition(0, 210).end)
    pdf.add(new Txt(puesto).bold().decoration('underline').relativePosition(100, 210).end)

    pdf.add(new Txt('Dependencia donde labora: ').alignment('left').relativePosition(0, 240).end)
    pdf.add(new Txt(workAddress).alignment('justify').bold().fontSize(fontsize).decoration('underline').relativePosition(150, 240).end)

    pdf.add(new Txt('Periodo o año al que corresponde la autorización: ').alignment('left').relativePosition(0, 270).end)
    pdf.add(new Txt(laboralPeriodo).bold().decoration('underline').relativePosition(270, 270).end)

    pdf.add(new Txt(body).alignment('justify').relativePosition(0, 300).end)

    pdf.add(new Txt('Inicio: ').alignment('left').relativePosition(5, 400).end)
    pdf.add(new Txt(`${formatDateToLetter(authorization.startdate).toUpperCase()}`.toUpperCase()).bold().decoration('underline').relativePosition(45, 400).end)

    pdf.add(new Txt('Finalización: ').alignment('left').relativePosition(215, 400).end)
    pdf.add(new Txt(`${formatDateToLetter(authorization.enddate).toUpperCase()}`.toUpperCase()).bold().decoration('underline').relativePosition(290, 400).end)

    pdf.add(new Txt('Reanudación de labores: ').alignment('left').relativePosition(75, 430).end)
    pdf.add(new Txt(`${formatDateToLetter(authorization.resumework).toUpperCase()}`).bold().decoration('underline').relativePosition(220, 430).end)

    pdf.add(new Txt('Días por asueto o feriado: ').alignment('left').relativePosition(25, 460).end)
    pdf.add(new Txt(`${FormatNumberToRender(authorization.holidays, 2, '0')}`).bold().decoration('underline').relativePosition(170, 460).end)

    pdf.add(new Txt('Total días: ').alignment('left').relativePosition(195, 460).end)
    pdf.add(new Txt(`${FormatNumberToRender(authorization.total_days, 2, '0')}`).bold().decoration('underline').relativePosition(260, 460).end)

    pdf.add(new Txt('Días pendientes: ').alignment('left').relativePosition(285, 460).end)
    pdf.add(new Txt(`${FormatNumberToRender(authorization.pendingdays, 2, '0')}`).bold().decoration('underline').relativePosition(380, 460).end)

    pdf.add(new Txt('OBSERVACIÓN: ').bold().alignment('left').relativePosition(0, 490).end)
    pdf.add(new Txt(`${observation || ''}`).alignment('justify').relativePosition(0, 505).end)

    pdf.add(new Txt(firstFirma).alignment('left').relativePosition(0, 550).end)
    pdf.add(new Txt(secondFirma).alignment('right').relativePosition(0, 590).end)

    */


    return pdf;
}


