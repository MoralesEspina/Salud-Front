import { Img, PdfMakeWrapper, Txt } from "pdfmake-wrapper";
import { IAuthorization } from "src/app/models/authorization";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";
import { environment } from "src/environments/environment.prod";
import formatDateToLetter from '../formats/formatDateToLetter';
import FormatNumberToRender from '../formats/formatNumbersToRender';

export async function CreatePDFVacationAuthorization(authorization: IAuthorization, body: string, authorizationConfiguration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {
    if (!body) {
        body = `En respuesta a su solicitud de vacaciones, me dirijo a usted para hacer de su conocimiento que de conformidad a lo que establece el artículo 61 numeral 2, del Decreto 1748. “Ley de Servicio Civil”, Artículo 51 del Acuerdo Gubernativo 18-98 “Reglamento de la citada Ley” se le autorizan vacaciones después de un año de servicios continuos de labores, durante las fechas que a continuación se detallan:`
    }

    var fontsize = 13
    var fontsizeName = 13
    var name = authorization.person.fullname
    if (authorization.person.work_dependency.name.length >= 40) {
        fontsize = 10
    }
    if (name.length >= 40) {
        fontsizeName = 10
    }

    var register = authorization.register

    let text1 = 'SECCIÓN DE RECURSOS HUMANOS'
    let text2 = 'DIRECCIÓN DE ÁREA DE SALUD DE JALAPA'
    let text3 = 'MINISTERIO DE SALUD PÚBLICA Y ASISTENCIA SOCIAL'


    var publicserver = authorization.person.cui
    var partida = authorization.person.partida.split('-')[12]
    var puesto = authorization.person.job.name
    var workAddress = authorization.person.work_dependency.name
    var laboralPeriodo = authorization.authorizationyear

    var body = body
    var observation = authorization.observation
    if (observation) {
        observation.toUpperCase()
    } else {
        observation = "No hay observaciones."
    }

    var firstFirma = `${authorization.personnelOfficer} \n${authorization.personnelOfficerPosition} \n${authorization.personnelOfficerArea}`
    var secondFirma = `${authorization.executiveDirector}\n${authorization.executiveDirectorPosition} \n${authorization.executiveDirectorArea}`

    /*if (!authorizationConfiguration.align) {
        authorizationConfiguration.align = 'justify'
    }

    if (!authorizationConfiguration.imageURL) {
        authorizationConfiguration.imageURL = `${environment.URL2}/images/logo-salud-7.jpg`
    }

    if (!authorizationConfiguration.width) {
        authorizationConfiguration.width = '590'
    }

    if (!authorizationConfiguration.height) {
        authorizationConfiguration.height = '800'
    }*/

    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 13
    })

    //pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
    pdf.add(new Txt('Reg: ').alignment('left').relativePosition(0, 5).end)
    pdf.add(new Txt(` ${FormatNumberToRender(register, 4, '0')}-${new Date().getFullYear()}`).bold().decoration('underline').alignment('left').relativePosition(30, 5).end)
    pdf.add(new Txt('AUTORIZACIÓN DE VACACIONES').alignment('center').bold().decoration('underline').relativePosition(0, 30).end)
    pdf.add(new Txt(text1).alignment('center').bold().relativePosition(0, 60).end)
    pdf.add(new Txt(text2).alignment('center').bold().relativePosition(0, 75).end)
    pdf.add(new Txt(text3).alignment('center').bold().relativePosition(0, 90).end)
    pdf.add(new Txt(`Jalapa, ${formatDateToLetter(authorization.submitted_at)}`).alignment('left').relativePosition(0, 120).end)
    pdf.add(new Txt('Nombre completo del solicitante: ').alignment('left').relativePosition(0, 150).end)
    pdf.add(new Txt(name).bold().decoration('underline').fontSize(fontsizeName).relativePosition(190, 150).end)

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

    return pdf;
}
