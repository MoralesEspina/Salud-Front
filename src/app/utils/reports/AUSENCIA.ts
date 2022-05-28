
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
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
    var puesto = authorization.person.job.name
    var partida = authorization.person.partida.split('-')[12]
    var fechainicio= authorization.enddate
    var fechasolicitud= authorization.startdate

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



    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 13
    })



  //pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
    pdf.add(new Txt('FORMULARIO DE AUSENCIA AL SERVICIO').alignment('center').end)
    pdf.add(new Txt('JEFATURA DE PERSONAL').alignment('center').end)
    pdf.add(new Txt('DIRECCIÓN DE ÁREA DE SALUD DE JALAPA').alignment('center').end)


    pdf.add(new Txt('Fecha de solicitud:').alignment('left').relativePosition(0, 30).bold().end)
    pdf.add(new Txt(fechasolicitud).bold().decoration('underline').fontSize(fontsizeName).relativePosition(120, 30).end)
    //pdf.add(new Txt('Día:').alignment('left').relativePosition(110, 30).bold().end)
    //llmar dia
   //() pdf.add(new Txt('Mes:').alignment('left').relativePosition(200, 30).bold().end)
    //llmar mes
   // pdf.add(new Txt('Año:').alignment('left').relativePosition(350, 30).bold().end)
    //llmar año

    pdf.add(new Txt('Nombre del servidor o contratista:').alignment('left').relativePosition(0, 55).bold().end)
    pdf.add(new Txt(name).bold().decoration('underline').fontSize(fontsizeName).relativePosition(200, 55).end)


    pdf.add(new Txt('Puesto que desempeña:').alignment('left').relativePosition(0, 80).bold().end)
    pdf.add(new Txt(puesto).bold().decoration('underline').relativePosition(140, 80).end)

    pdf.add(new Txt('Renglón presupuestario:').alignment('left').relativePosition(0, 105).bold().end)
    pdf.add(new Txt(partida).bold().decoration('underline').relativePosition(150, 105).end)

    pdf.add(new Txt('Fecha de ausencia:').alignment('left').relativePosition(0, 130).bold().end)
    pdf.add(new Txt(fechainicio).bold().decoration('underline').fontSize(fontsizeName).relativePosition(120, 130).end)

    //pdf.add(new Txt('Día:').alignment('left').relativePosition(110, 130).bold().end)
     //llmar dia
    //pdf.add(new Txt('Mes:').alignment('left').relativePosition(200, 130).bold().end)
     //llmar mes
    //pdf.add(new Txt('Año:').alignment('left').relativePosition(350, 130).bold().end)
     //llmar año

    //seleccipnar
    pdf.add(new Txt('INDIQUE LA RAZÓN DE SU AUSENCIA AL SERVICIO:').alignment('left').relativePosition(0, 180).bold().end)
    pdf.add(new Txt('Permiso').alignment('left').relativePosition(0, 205).bold().end)
    pdf.add(new Txt('(conforme lo establecido en la Ley de Servicio Civil y Pacto Colectivo)').alignment('left').relativePosition(50, 205).end)
    pdf.add(new Txt('Reposición de tiempo extra laborado').alignment('left').relativePosition(0, 230).bold().end)
    pdf.add(new Txt('Asueto por cumpleaños').alignment('left').relativePosition(0, 255).bold().end)
    pdf.add(new Txt('No marcaje de huella por cumplimiento de actividades o comisiones').alignment('left').relativePosition(0, 280).bold().end)
    pdf.add(new Txt('Otro: ').alignment('left').relativePosition(0, 305).bold().end)

    pdf.add(new Txt('_____________________________').alignment('left').relativePosition(0, 405).bold().end)
    pdf.add(new Txt('INTERESADO').alignment('left').relativePosition(50, 420).bold().end)

    pdf.add(new Txt('_____________________________').alignment('right').relativePosition(0, 405).bold().end)
    pdf.add(new Txt('JEFE INMEDIATO').alignment('right').relativePosition(-40, 420).bold().end)

    pdf.add(new Txt('_____________________________').alignment('center').relativePosition(0, 490).bold().end)
    pdf.add(new Txt('VO.BO. JEFE DE PERSONAL').alignment('center').relativePosition(0, 505).bold().end)



    pdf.add(new Txt('NOTA:').alignment('left').relativePosition(0, 575).bold().fontSize(8).end)
    pdf.add(new Txt('EL PRESENTE FORMULARIO ES PARA USO EXCLUSIVO DEL PERSONAL DE LA DIRECCIÓN DE ÁREA DE SALUD DE JALAPA EN TODOS SUS DEPARTAMENTOS, UNIDADES Y/O PROGRAMAS Y PARA COORDINADORES DISTRITALES DE SALUD.').alignment('left').relativePosition(0, 585).fontSize(8).end)




//permiso
    pdf.add(new Table(

        [
        [
          '____',
        ]
      ]

   ).alignment('right').relativePosition(425, 205).color('white').end)

   //reposicion
   pdf.add(new Table(

    [
    [
      '____',
    ]
  ]

).alignment('right').relativePosition(425, 230).color('white').end)

//asueto
pdf.add(new Table(

    [
    [
      '____',
    ]
  ]

).alignment('right').relativePosition(425, 255).color('white').end)

//huella
pdf.add(new Table(

    [
    [
      '____',
    ]
  ]

).alignment('right').relativePosition(425, 280).color('white').end)



    return pdf;
}
