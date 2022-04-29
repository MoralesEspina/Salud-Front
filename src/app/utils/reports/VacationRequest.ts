import * as dayjs from 'dayjs';
import { Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { AuthorizationConfigurationFile } from 'src/app/models/authorizationConfiguration';
import { RequestVacation } from 'src/app/models/requestVacation.models';
import { environment } from 'src/environments/environment.prod';
import formatDateToLetter from '../formats/formatDateToLetter';

export async function VacationRequestPDF(vacationInfo: RequestVacation, configuration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {
  const pdf = new PdfMakeWrapper();
  pdf.pageSize('A4')
  pdf.pageMargins([62.5, 62.5, 62.5, 91])
  pdf.defaultStyle({
    fontSize: 12,
  })

  if (!configuration.align) {
    configuration.align = 'justify'
}

if (!configuration.imageURL) {
    configuration.imageURL = `${environment.URL2}/images/logo-salud-7.jpg`
}

if (!configuration.width) {
    configuration.width = '590'
}

if (!configuration.height) {
    configuration.height = '800'
}
  var has_vacation_day = vacationInfo.has_vacation_day ? 'SI' : 'NO'
  var has_admission_date = vacationInfo.person.admission_date ? formatDateToLetter(vacationInfo.person.admission_date).toUpperCase() : null

  pdf.background(await new Img(`${configuration.imageURL}`).alignment(configuration.align).width(configuration.width).height(configuration.height).build())
  pdf.add(new Txt('SOLICITUD DE VACACIONES\n\n\n').alignment('center').preserveLeadingSpaces().bold().end)
  pdf.add(TableColumn('Nombre completo del servidor: ', `${vacationInfo.person.fullname}\n`).fontSize(12).end)
  pdf.add('\n')
  pdf.add(TableColumn('Código de empleado:', `${vacationInfo.person.cui}\n`).end)
  pdf.add('\n')
  pdf.add(TableColumn('Fecha de ingreso a la institución:', `${has_admission_date || ''}\n`).end)
  pdf.add('\n')
  pdf.add(TableColumn('Titulo del puesto:', `${vacationInfo.person.job.name || ''}\n`).end)
  pdf.add('\n')
  pdf.add(TableColumn('Especialidad:', `${vacationInfo.person.especiality.name || '---------------'}\n`).end)
  pdf.add('\n')
  pdf.add(
    {
      lineHeight: 2,
      fontSize: 12,
      text: [
        'Partidad presupuestaria completa: ',
        {
          text: `${vacationInfo.person.partida || '---------------'}\n`,
          fontSize: 11,
          bold: true,
          decoration: 'underline'
        }
      ]
    }
  )
  pdf.add(
    {
      lineHeight: 2,
      fontSize: 12,
      text: [
        'Nombre de la dependencia donde está presupuestado: ',
        {
          text: `${vacationInfo.person.work_dependency.name || '---------------'}\n`,
          fontSize: 11,
          bold: true,
          decoration: 'underline'
        }
      ]
    }
  )

  pdf.add(
    {
      lineHeight: 2,
      fontSize: 12,
      text: [
        'En caso de estar reubicado, indicar dependencia: ',
        {
          text: `${vacationInfo.person.reubication.name || ''}\n`,
          fontSize: 11,
          bold: true,
          decoration: 'underline'
        }
      ]
    }
  )

  pdf.add(new Table([[
    new Txt('Último periodo vacacional gozado: ').end,
    new Txt(`${vacationInfo.last_year_vacation}`).bold().decoration('underline').end,
    new Txt(' A partir del ').end,
    new Txt(dayjs(vacationInfo.last_vacation_from).format('DD/MM/YYYY')).bold().decoration('underline').end,
    new Txt(' al ').end,
    new Txt(dayjs(vacationInfo.last_vacation_to).format('DD/MM/YYYY')).bold().decoration('underline').end
  ]]).layout('noBorders').end)
  pdf.add('\n')
  pdf.add(new Table([[
    new Txt('Periodo que solicita: ').end,
    new Txt(`${vacationInfo.vacation_year_request}`).bold().decoration('underline').end,
    new Txt(' A partir del ').end,
    new Txt(dayjs(vacationInfo.vacation_from_date).format('DD/MM/YYYY')).bold().decoration('underline').end,
    new Txt(' al ').end,
    new Txt(dayjs(vacationInfo.vacation_to_date).format('DD/MM/YYYY')).bold().decoration('underline').end
  ]]).layout('noBorders').end)
  pdf.add('\n')
  pdf.add(new Table([[
    new Txt('Indique si anteriormente ya disfrutó del algún día del periodo que solicita: ').end,
    new Txt(has_vacation_day).bold().decoration('underline').end,
  ]]).layout('noBorders').end)
  pdf.add('\n')
  pdf.add(new Table([[
    new Txt('Cuántos días: ').end,
    new Txt(`${vacationInfo.days_quantity || 'X'}`).bold().decoration('underline').end,
  ]]).layout('noBorders').end)
  pdf.add('\n')
  pdf.add(
    {
      lineHeight: 2,
      text: [
        'Total de días a los que tiene derecho según la Ley de Servicio Civil y el Pacto Colectivo de Condiciones de Trabajo del MSPAS: ',
        {
          text: '30',
          bold: true,
          decoration: 'underline'
        }
      ],
    }
  )

  pdf.add(new Txt(`Nombre del servidor que cubrirá de manera interina el puesto del empleado público: `).alignment('center').end)
  pdf.add('\n')
  pdf.add(new Txt(`${vacationInfo.person_server.fullname || '------------------------------'} `).alignment('center').decoration('underline').bold().end)
  pdf.add('\n')

  pdf.add(
    {
      text: [
        {
          text: 'OBSERVACION: ',
          bold: true
        },
        {
          text: `${vacationInfo.observations || 'NO HAY OBSERVACIONES.'}`,
        }
      ],
    }
  )
  pdf.add('\n')
  pdf.add(new Columns(['______________________________', '______________________________']).alignment('center').columnGap(10).bold().end)
  pdf.add(new Columns(['Firma del Servidor', 'Firma del Jefe inmediato']).alignment('center').fontSize(10).columnGap(10).bold().end)
  pdf.add('\n\n')
  pdf.add(new Columns(['______________________________', '______________________________']).alignment('center').columnGap(10).bold().end)
  pdf.add(new Columns(['Firma del Jefe de Personal', 'Vo. Bo. Director de Área']).alignment('center').fontSize(10).columnGap(10).bold().end)
  
  pdf.add({
    text: `Guatemala, ${formatDateToLetter(vacationInfo.submitted_at).toLowerCase()}`,
    absolutePosition: { x: 235, y: 710 },
  })
  return pdf
}


function TableColumn(title: string, data: string): Table {
  return new Table([[title, new Txt(`${data}`).bold().decoration('underline').end]]).layout(
    {
      defaultBorder: false, paddingTop: (i => 0),
      paddingBottom: (i => 0),
      paddingLeft: (i => 0)
    })
}
