import { ReferenceI } from './../../models/references.model';

import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";
import { CurriculumDataI } from "src/app/models/curriculum.model";

export async function Curriculum(curriculum: CurriculumDataI, fam: ReferenceI, authorizationConfiguration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {

    const pdf = new PdfMakeWrapper()

    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 12
    })


   // pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
    pdf.add(new Txt('Datos generales_____________________________________________').alignment('left').relativePosition(0, 10).color('#2778B4').fontSize(16).bold().end)

    pdf.add(new Txt('Nombre Completo').alignment('left').relativePosition(0, 50).bold().end)
    pdf.add(new Txt(curriculum.fullname).alignment('left').relativePosition(125, 50).end)

    pdf.add(new Txt('Dirección particular').alignment('left').relativePosition(0, 70).bold().end)
    pdf.add(new Txt(curriculum.direction).alignment('left').relativePosition(125, 70).end)

    pdf.add(new Txt('País').alignment('left').relativePosition(0, 90).bold().end)
    pdf.add(new Txt(curriculum.country).alignment('left').relativePosition(125, 90).end)
    pdf.add(new Txt('Municipio').alignment('left').relativePosition(238, 90).bold().end)
    pdf.add(new Txt(curriculum.municipality).alignment('left').relativePosition(360, 90).end)

    pdf.add(new Txt('Departamento').alignment('left').relativePosition(0, 110).bold().end)
    pdf.add(new Txt(curriculum.department).alignment('left').relativePosition(125, 110).end)
    pdf.add(new Txt('Aldea o caserío').alignment('left').relativePosition(238, 110).bold().end)
    pdf.add(new Txt(curriculum.village).alignment('left').relativePosition(360, 110).end)

    pdf.add(new Txt('Teléfono residencia').alignment('left').relativePosition(0, 130).bold().end)
    pdf.add(new Txt(curriculum.homephone).alignment('left').relativePosition(125, 130).end)
    pdf.add(new Txt('Teléfono oficina').alignment('left').relativePosition(238, 130).bold().end)
    pdf.add(new Txt(curriculum.workPhone).alignment('left').relativePosition(360, 130).end)

    pdf.add(new Txt('Teléfono celular').alignment('left').relativePosition(0, 150).bold().end)
    pdf.add(new Txt(curriculum.phone).alignment('left').relativePosition(125, 150).end)
    pdf.add(new Txt('Correo electrónico').alignment('left').relativePosition(238, 150).bold().end)
    pdf.add(new Txt(curriculum.email).alignment('left').relativePosition(360, 150).end)

    pdf.add(new Txt('Fecha de nacimiento').alignment('left').relativePosition(0, 170).bold().end)
    pdf.add(new Txt(curriculum.bornDate).alignment('left').relativePosition(125, 170).end)
    pdf.add(new Txt('Edad').alignment('left').relativePosition(238, 170).bold().end)
    pdf.add(new Txt(curriculum.age).alignment('left').relativePosition(360, 170).end)

    pdf.add(new Txt('Lugar nacimiento').alignment('left').relativePosition(0, 190).bold().end)
    pdf.add(new Txt(curriculum.bornPlace).alignment('left').relativePosition(125, 190).end)
    pdf.add(new Txt('Estado civil').alignment('left').relativePosition(238, 190).bold().end)
    pdf.add(new Txt(curriculum.civilStatus).alignment('left').relativePosition(360, 190).end)

    pdf.add(new Txt('Nacionalidad').alignment('left').relativePosition(0, 210).bold().end)
    pdf.add(new Txt(curriculum.nacionality).alignment('left').relativePosition(125, 210).end)
    pdf.add(new Txt('Etnia').alignment('left').relativePosition(238, 210).bold().end)
    pdf.add(new Txt(curriculum.etnia).alignment('left').relativePosition(360, 210).end)

    pdf.add(new Txt('Datos de identificación_______________________________________').alignment('left').relativePosition(0, 250).fontSize(16).color('#2778B4').bold().end)

    pdf.add(new Txt('CUI').alignment('left').relativePosition(0, 290).bold().end)
    pdf.add(new Txt(curriculum.dpi).alignment('left').relativePosition(125, 290).end)
    pdf.add(new Txt('No. pasaporte').alignment('left').relativePosition(238, 290).bold().end)
    pdf.add(new Txt(curriculum.passport).alignment('left').relativePosition(360, 290).end)

    pdf.add(new Txt('No. Afiliación IGSS').alignment('left').relativePosition(0, 310).bold().end)
    pdf.add(new Txt(curriculum.igss).alignment('left').relativePosition(125, 310).end)
    pdf.add(new Txt('Licencia').alignment('left').relativePosition(238, 310).bold().end)
    pdf.add(new Txt(curriculum.license).alignment('left').relativePosition(360, 310).end)

    pdf.add(new Txt('NIT').alignment('left').relativePosition(0, 330).bold().end)
    pdf.add(new Txt(curriculum.nit).alignment('left').relativePosition(125, 330).end)

    pdf.add(new Txt('Información familiar________________________________________').alignment('left').relativePosition(0, 370).fontSize(16).color('#2778B4').bold().end)

    pdf.add(new Table(
          [
          [
            new Txt('Nombre').bold().color('white').end,
            new Txt('Teléfono').bold().color('white').end,
            new Txt('Parentesco').bold().color('white').end,
            new Txt('Fecha de nacimiento').color('white').bold().end,
          ],
          ['Prueba','Prueba','Prueba','Prueba']
        ]
     ).alignment('center')
     .relativePosition(0, 390)
     .widths(['*', 90, 90, 110])
     .layout({
      vLineColor: () => '#2778B4',
      hLineColor: () => '#2778B4',
      fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#2778B4';
          }
      }
  })
  .end)

     pdf.add(new Txt('Educación__________________________________________________').alignment('left').relativePosition(0, 470).fontSize(16).color('#2778B4').bold().end)

     pdf.add(new Table(
      [
      [
        new Txt('Pais').bold().color('white').end,
        new Txt('Establecimiento').bold().color('white').end,
        new Txt('Periodo del').bold().color('white').end,
        new Txt('Periodo al').bold().color('white').end,
        new Txt('Diploma').bold().color('white').end,
        new Txt('Estado').bold().color('white').end,
        new Txt('Grado').bold().color('white').end,
      ],
      ['1','1','1','1','1','1','1']
    ]
 ).alignment('center')
 .relativePosition(0, 490)
 .widths([45,90,65,65,50,45,45])
 .layout({
  vLineColor: () => '#2778B4',
  hLineColor: () => '#2778B4',
  fillColor: (rowIndex) => {
      if (rowIndex === 0) {
        return '#2778B4';
      }
  }
})
.end)

      pdf.add(new Txt('Referencias Personales_______________________________________').alignment('left').relativePosition(0, 570).fontSize(16).color('#2778B4').bold().end)

      pdf.add(new Table(
        [
        [
          new Txt('Nombre').bold().color('white').end,
          new Txt('Teléfono').bold().color('white').end,
          new Txt('Profesión').bold().color('white').end,
          new Txt('Empresa').bold().color('white').end,
          new Txt('Parentesco').bold().color('white').end,
        ],
        ['1','1','1','1','1']
      ]
   ).alignment('center')
   .relativePosition(0, 590)
   .widths([85,85,85,85,85,])
   .layout({
    vLineColor: () => '#2778B4',
    hLineColor: () => '#2778B4',
    fillColor: (rowIndex) => {
        if (rowIndex === 0) {
          return '#2778B4';

        }
    }
  })
  .end)
    return pdf;
}
