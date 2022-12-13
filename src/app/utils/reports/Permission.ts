import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";
import { IPermission } from "src/app/models/permission";
import { IPerson } from "src/app/models/person.model";


export async function Permission(person: IPerson, permission: IPermission,  authorizationConfiguration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {

    const pdf = new PdfMakeWrapper()

    pdf.pageSize('A4')
    pdf.pageMargins([62.5, 95, 62.5, 95])
    pdf.defaultStyle({
        fontSize: 12
    })

   // pdf.background(await new Img(authorizationConfiguration.imageURL).alignment(authorizationConfiguration.align).width(authorizationConfiguration.width).height(authorizationConfiguration.height).build())
   pdf.add(new Txt('FORMULARIO DE AUSENCIA AL SERVICIO').alignment('center').end)
   pdf.add(new Txt('JEFATURA DE PERSONAL').alignment('center').end)
   pdf.add(new Txt('DIRECCIÓN DE ÁREA DE SALUD DE JALAPA').alignment('center').end)

   pdf.add(new Txt(person.fullname).bold().decoration('underline').relativePosition(120, 30).end)
   pdf.add(new Txt(person.job.name).bold().decoration('underline').relativePosition(120, 60).end)
   pdf.add(new Txt(person.renglon).bold().decoration('underline').relativePosition(120, 90).end)
   pdf.add(new Txt(permission.permissionDate).bold().decoration('underline').relativePosition(120, 120).end)
   pdf.add(new Txt(permission.submittedAt).bold().decoration('underline').relativePosition(120, 150).end)
   pdf.add(new Txt(permission.bossOne).bold().decoration('underline').relativePosition(120, 180).end)
   pdf.add(new Txt(permission.bossTwo).bold().decoration('underline').relativePosition(120, 210).end)
   pdf.add(new Txt(permission.uuidPerson).bold().decoration('underline').relativePosition(120, 240).end)

    return pdf;
}
