import * as dayjs from "dayjs";
import { Columns, Img, PdfMakeWrapper, QR, Txt } from "pdfmake-wrapper";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";
import { IPerson } from "src/app/models/person.model";
import { environment } from "src/environments/environment.prod";
import formatDateToLetter2 from "../formats/formatDateToLetter2";
declare const CalculateTimeBetween: any;

export async function Constancy(person: IPerson, configuration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {
  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A4')
  pdf.pageMargins([62.5, 62.5, 62.5, 91])
  pdf.defaultStyle({
    fontSize: 12,
  })
  let from = dayjs(person.admission_date).format('YYYY-MM-DD')
  let now = dayjs().format('YYYY-MM-DD')

  let diference = CalculateTimeBetween(from, now)
  let months = 'mes';
  let years = 'año'
  let days = 'día'

  if (diference[0] != 1) {
    years = 'años'
  }

  if (diference[1] != 1) {
    months = 'meses'
  }

  if (diference[2] != 1) {
    days = 'días'
  }

  if (!configuration.imageURL) {
    configuration.imageURL = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/certify%2Fb7394630-1b37-4fb7-a67b-104109938666.jpg?alt=media&token=13a2b33b-a7ba-4c83-a0be-0e15a3a4988b'
  }

  pdf.background(await new Img(configuration.imageURL).alignment('center').relativePosition(0, 30).build())
  pdf.add({
    lineHeight: 2,
    text: '\n\n\n\n\n'
  })
  pdf.add(
    {
      text: [
        {
          text: 'EL DEPARTAMENTO DE RECURSOS HUMANOS DE LA DIRECCIÓN DE ÁREA DE SALUD DE JALAPA, DEPENDENCIA DEL MINISTERIO DE SALUD PÚBLICA Y ASISTENCIA SOCIAL, por medio de la presente ',
          alignment: 'justify'
        },
        {
          text: 'HACE CONSTAR ',
          bold: true
        },
        {
          text: 'que, según el registro que se lleva en este departamento el (la) servidor público: '
        },
        {
          text: person.fullname,
          bold: true,
        }
      ]


    }
  )
  pdf.add(new Txt('\n\n\nInformación general: \n\n\n').bold().end)
  pdf.add(
    {
      lineHeight: 2,
      text: [
        {
          text: 'Fecha de ingreso a la institución: ',
          bold: true,
        },
        {
          text: formatDateToLetter2(person.admission_date)
        }
      ]
    }
  )
  pdf.add(
    {
      lineHeight: 2,
      text: [
        {
          text: 'Renglón presupuestario: ',
          bold: true,
        },
        {
          text: person.renglon
        }
      ]
    }
  )
  pdf.add(
    {
      lineHeight: 2,
      text: [
        {
          text: 'Puesto oficial: ',
          bold: true,
        },
        {
          text: `${person.job.name || ''}`
        }
      ]
    }
  )
  pdf.add(
    {
      lineHeight: 2,
      text: [
        {
          text: 'Especialidad: ',
          bold: true,
        },
        {
          text: `${person.especiality.name || ''}`
        }
      ]
    }
  )
  pdf.add(
    {
      lineHeight: 2,
      text: [
        {
          text: 'Tiempo de servicio:  ',
          bold: true,
        },
        {
          text: `${diference[0]} ${years}, ${diference[1]} ${months} y ${diference[2]} ${days}.`
        }
      ]
    }
  )

  if (environment.viewSalary == true) {
    pdf.add(
      {
        lineHeight: 2,
        text: [
          {
            text: 'Sueldo:  ',
            bold: true,
          },
          {
            text: `${ person.sueldo || '' }`
                }
            ]
        }
    )
}

pdf.add(`\n\nY a solicitud del (la) interesado (a), se extiende la presente el día ${dayjs().format('DD/MM/YYYY')}.`)
pdf.add(new Columns(['', new Txt(`\n\n\nPuede comprobar la validez de la presente \nconstancia, a través del siguiente código Qr.\n\n`).alignment('center').fontSize(10).end]).columnGap(10).end)
pdf.add(new Columns(['', new QR(`https://das-jalapa.web.app/das-jalapa/constancia/${person.uuid}`).alignment('center').fit(100).end]).columnGap(10).end)

return pdf;
}
