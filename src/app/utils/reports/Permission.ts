import * as dayjs from "dayjs";
import { Img, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { IPermission } from "src/app/models/permission";
import { IPerson } from "src/app/models/person.model";
import 'dayjs/locale/es'

export async function Permission(person: IPerson, permission: IPermission): Promise<PdfMakeWrapper> {

    const pdf = new PdfMakeWrapper()

    pdf.pageSize('Legal')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 12
    })

   // pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2Flogo-mspas%20(1).png?alt=media&token=5a4e689a-b3d9-402d-b7da-df99d43c642d').alignment('left').width(220).height(55).relativePosition(0, -60).opacity(0.5).build())
   pdf.add(new Txt('MINISTERIO DE SALUD PÚBLICA Y ASISTENCIA SOCIAL').alignment('right').bold().relativePosition(0, -50).fontSize(8).color('#3A66A0').opacity(0.5).end)
   pdf.add(new Txt('DIRECCIÓN DE ÁREA DE SALUD DE JALAPA').alignment('right').bold().relativePosition(0, -40).fontSize(8).color('#3A66A0').opacity(0.5).end)
   pdf.add(new Txt('DEPARTAMENTO DE RECURSOS HUMANOS').alignment('right').bold().relativePosition(0, -30).fontSize(8).color('#3A66A0').opacity(0.5).end)
   pdf.add(new Txt('FORMULARIO DE AUSENCIA AL SERVICIO').alignment('center').bold().fontSize(12).end)
   pdf.add(new Txt('JEFATURA DE PERSONAL').alignment('center').bold().fontSize(12).end)
   pdf.add(new Txt('DIRECCIÓN DE ÁREA DE SALUD DE JALAPA').alignment('center').fontSize(12).bold().end)
   pdf.add(new Txt('Fecha de solicitud: ').relativePosition(0, 25).fontSize(12).bold().end)
   pdf.add(new Txt('Día: ').relativePosition(110, 25).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.submittedAt).format('DD')]]).relativePosition(135, 22).alignment('center').fontSize(12).bold().widths([50]).end)
   pdf.add(new Txt('Mes: ').relativePosition(200, 25).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.submittedAt).locale("es").format('MMMM')]]).relativePosition(230, 22).alignment('center').fontSize(12).bold().widths([130]).end)
   pdf.add(new Txt('Año: ').relativePosition(375, 25).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.submittedAt).format('YYYY')]]).relativePosition(410, 22).alignment('center').fontSize(12).bold().widths([50]).end)

   pdf.add(new Txt('Nombre del servidor o contratista: ').relativePosition(0, 50).fontSize(12).bold().end)
   pdf.add(new Txt(person.fullname).bold().relativePosition(190, 50).end)
   pdf.add(new Txt('_________________________________________________').bold().relativePosition(190, 51).end)

   pdf.add(new Txt('Puesto que desempeña: ').relativePosition(0, 75).fontSize(12).bold().end)
   pdf.add(new Txt(person.job.name).bold().relativePosition(190, 75).end)
   pdf.add(new Txt('_________________________________________________').bold().relativePosition(190, 75).end)

   pdf.add(new Txt('Renglón presupuestario: ').relativePosition(0, 100).fontSize(12).bold().end)
   pdf.add(new Txt(person.renglon).bold().relativePosition(190, 100).end)
   pdf.add(new Txt('_________________________________________________').bold().relativePosition(190, 100).end)

   pdf.add(new Txt('Fecha de ausencia: ').relativePosition(0, 125).fontSize(12).bold().end)
   pdf.add(new Txt('Día: ').relativePosition(110, 125).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.permissionDate).format('DD')]]).relativePosition(135, 122).alignment('center').fontSize(12).bold().widths([50]).end)
   pdf.add(new Txt('Mes: ').relativePosition(200, 125).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.permissionDate).locale("es").format('MMMM')]]).relativePosition(230, 122).alignment('center').fontSize(12).bold().widths([130]).end)
   pdf.add(new Txt('Año: ').relativePosition(375, 125).fontSize(12).bold().end)
   pdf.add(new Table([[dayjs(permission.permissionDate).format('YYYY')]]).relativePosition(410, 122).alignment('center').fontSize(12).bold().widths([50]).end)

   pdf.add(new Txt('INDIQUE LA RAZÓN DE SU AUSENCIA AL SERVICIO: ').relativePosition(0, 175).fontSize(10).bold().end)

   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FCheck.png?alt=media&token=b87a88f7-a937-46af-a7e2-78c9091c55a4').width(10).height(10).relativePosition(0, 202).build())
   pdf.add(new Txt('Permiso ').relativePosition(15, 200).fontSize(12).bold().end)
   pdf.add(new Txt('(conforme lo establecido en la Ley de Servicio Civil y Pacto Colectivo) ').relativePosition(58, 200).fontSize(12).end)
   pdf.add(new Table([[' ']]).relativePosition(455, 197).fontSize(12).bold().widths([20]).end)
   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FCheck.png?alt=media&token=b87a88f7-a937-46af-a7e2-78c9091c55a4').width(10).height(10).relativePosition(0, 227).build())
   pdf.add(new Txt('Reposición de tiempo extra laborado ').relativePosition(15, 225).fontSize(12).bold().end)
   pdf.add(new Table([[' ']]).relativePosition(455, 222).fontSize(12).bold().widths([20]).end)
   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FCheck.png?alt=media&token=b87a88f7-a937-46af-a7e2-78c9091c55a4').width(10).height(10).relativePosition(0, 252).build())
   pdf.add(new Txt('Asueto por cumpleaños ').relativePosition(15, 250).fontSize(12).bold().end)
   pdf.add(new Table([[' ']]).relativePosition(455, 247).fontSize(12).bold().widths([20]).end)
   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FCheck.png?alt=media&token=b87a88f7-a937-46af-a7e2-78c9091c55a4').width(10).height(10).relativePosition(0, 277).build())
   pdf.add(new Txt('No marcaje de huella por cumplimiento de actividades o comisiones ').relativePosition(15, 275).fontSize(12).bold().end)
   pdf.add(new Table([[' ']]).relativePosition(455, 272).fontSize(12).bold().widths([20]).end)
   pdf.add(await new Img('https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/avatars%2FCheck.png?alt=media&token=b87a88f7-a937-46af-a7e2-78c9091c55a4').width(10).height(10).relativePosition(0, 302).build())
   pdf.add(new Txt('Otro: ').bold().relativePosition(15, 300).end)

   switch (permission.motive) {
    case 'Permiso (conforme lo establecido en la Ley de Servicio Civil y Pacto Colectivo)':
      pdf.add(new Txt('X').relativePosition(465, 199).fontSize(14).bold().end)
      break;
      case 'Reposición de tiempo extra laborado':
        pdf.add(new Txt('X').relativePosition(465, 224).fontSize(14).bold().end)
        break;
        case 'Asueto por cumpleaños':
      pdf.add(new Txt('X').relativePosition(465, 249).fontSize(14).bold().end)
      break;
      case 'No marcaje de huella por cumplimiento de actividades o comisiones':
      pdf.add(new Txt('X').relativePosition(465, 274).fontSize(14).bold().end)
      break;
    default:
      pdf.add(new Txt(permission.motive).relativePosition(47, 300).decoration('underline').fontSize(12).bold().end)
      break;
   }

   pdf.add(new Txt('DOCUMENTACIÓN QUE ADJUNTA PARA EVIDENCIAR LA AUSENCIA AL SERVICIO: ').relativePosition(0, 350).fontSize(10).bold().end)
   pdf.add(new Table([[permission.document]]).relativePosition(0, 365).fontSize(12).bold().widths(['*']).heights((rowIndex) => (rowIndex === 0 ? 35 : 0)).end)

   pdf.add(new Txt('SI LA SOLICITUD DE AUSENCIA DEL SERVICIO NO AMERITA SER APROBADA, ESPECIFICAR LOS MOTIVOS: ').relativePosition(0, 435).fontSize(10).bold().end)

   if (permission.status == 'Denegada') {
    if (permission.statusBossOne == 'Denegada') {
      pdf.add(new Txt(' Denegada por: ' + permission.bossOne).relativePosition(4, 465).fontSize(12).bold().end)
      pdf.add(new Txt(' Razón: ' + permission.reason).relativePosition(4, 480).fontSize(12).bold().end)
    }else if (permission.statusBossTwo == 'Denegada') {
      pdf.add(new Txt(' Denegada por: ' + permission.bossTwo).relativePosition(4, 465).fontSize(12).bold().end)
      pdf.add(new Txt(' Razón: ' + permission.reason).relativePosition(4, 480).fontSize(12).bold().end)
    } else {
      pdf.add(new Txt(permission.reason).relativePosition(4, 465).fontSize(12).bold().end)
    }
    }

   pdf.add(new Table([[' ']]).relativePosition(0, 465).fontSize(10).bold().widths(['*']).heights((rowIndex) => (rowIndex === 0 ? 65 : 0)).end)
   pdf.add(new Txt(person.fullname).relativePosition(-157, 560).fontSize(12).bold().alignment('center').end)
   pdf.add(new Txt('_____________________________').relativePosition(-157, 560).fontSize(12).bold().alignment('center').end)
   pdf.add(new Txt('INTERESADO').relativePosition(-157,575 ).fontSize(12).bold().alignment('center').end)

   if (permission.statusBossOne == 'Aceptada') {
    pdf.add(new Txt(permission.bossOne).relativePosition(157, 560).alignment('center').fontSize(12).bold().end)
   }
   pdf.add(new Txt('_____________________________').relativePosition(157, 560).alignment('center').fontSize(12).bold().end)
   pdf.add(new Txt('JEFE INMEDIATO').relativePosition(157,575 ).fontSize(12).alignment('center').bold().end)

   if (permission.statusBossTwo == 'Aceptada') {
    pdf.add(new Txt(permission.bossTwo).relativePosition(0, 600).alignment('center').fontSize(12).bold().end)
   }
   pdf.add(new Txt('_______________________________').relativePosition(0,600).fontSize(12).alignment('center').bold().end)
   pdf.add(new Txt('VO.BO. JEFE DE PERSONAL').relativePosition(0,615 ).alignment('center').fontSize(12).bold().end)
   pdf.add(new Txt('O').relativePosition(0,628 ).alignment('center').fontSize(10).bold().end)
   pdf.add(new Txt('COORDINADOR DE DISTRITO').relativePosition(0,638 ).alignment('center').fontSize(12).bold().end)

   pdf.add(new Txt('NOTA:').relativePosition(0,650).fontSize(8).bold().end)
   pdf.add(new Txt('EL PRESENTE FORMULARIO ES PARA USO EXCLUSIVO DEL PERSONAL DE LA DIRECCIÓN DE ÁREA DE SALUD DE JALAPA EN TODOS SUS DEPARTAMENTOS, UNIDADES Y/O PROGRAMAS Y PARA COORDINADORES DISTRITALES DE SALUD.')
   .relativePosition(0,660).fontSize(8).end)

   pdf.add(new Txt('DEPARTAMENTO DE RECURSOS HUMANOS, DIRECCIÓN DE ÁREA DE SALUD DE JALAPA').relativePosition(0,700).fontSize(9).alignment('center').bold().color('#3A66A0').opacity(0.5).end)
   pdf.add(new Txt('6ª.Calle Tránsito Rojas 6-41 Bo. La Democracia Pte. Las Guzmán, Jalapa, Jalapa').relativePosition(0,710).fontSize(10).alignment('center').bold().color('#3A66A0').opacity(0.5).end)
   pdf.add(new Txt('7922-3889').relativePosition(0,720).fontSize(10).bold().color('#3A66A0').opacity(0.5).alignment('center').end)
    return pdf;
}
