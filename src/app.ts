import { parseAllDocuments } from 'yaml'
import { promises as fs } from 'fs'

type CRDSchema = {
  name: string,
  version: string,
  schema: object
}

export async function crdSchemasFromManifest(file: string): Promise<CRDSchema[]> {
  const documents = parseAllDocuments(await fs.readFile(file, 'utf-8'))
  const crdDocuments = documents.filter(
    doc => doc?.get('kind')?.toLowerCase() == 'customresourcedefinition')

  return crdDocuments.flatMap((document) => {
    const spec = document.get('spec').toJSON();
    const name = `${spec.names.kind.toLowerCase()}-${spec.group.split('.')[0]}`
    const versions = spec.versions ?? [{name: spec.version}]
    return versions.map(
      versionData => ({
        name,
        version: versionData.name,
        schema: (versionData.schema ?? spec.validation)?.openAPIV3Schema ?? {},
      })
    )
  })
}

export async function readCrdSchemasFromDirectory(directory: string): Promise<CRDSchema[]> {
  const files = await fs.readdir(directory, 'utf-8');
  return (
    await Promise.all(files.map(filename => crdSchemasFromManifest(`${directory}/${filename}`)))
    ).flat()
}

export async function writeSchemasTo(directory: string, schemas: CRDSchema[]) {
  await fs.mkdir(directory, {recursive: true});
  await Promise.all(
    schemas.map(schema => 
      fs.writeFile(
        `${directory}/${schema.name}-${schema.version}.json`,
        JSON.stringify(
          {
            '$schema': "http://json-schema.org/schema#",
            type: 'object', // default if no type set
            ...schema.schema
          },
          null, 2
        ),
        { flag: 'w' }
      )
    )
  )
}
