import { Project } from 'ts-morph';
import * as path from 'path';

export const getProjectFile = (projectPathArray: string[], file: string) => {
  const project = new Project({
    tsConfigFilePath: path.join(...projectPathArray),
    // compilerOptions: { include: [path.join(__dirname, 'index.ts')] },
  });
  return project.getSourceFile(file);
};

export const testFileTypeKeyValues = (
  projectPathArray: string[],
  file: string,
  type: string
) => {
  const project = new Project({
    tsConfigFilePath: path.join(...projectPathArray),
    // compilerOptions: { include: [path.join(__dirname, 'index.ts')] },
  });
  const indexTs = project.getSourceFile(file);
  const typeAlias = indexTs.getTypeAliasOrThrow(type);
  const typeAliasType = typeAlias.getType();
  const typeAliasProperties = typeAliasType.getProperties();

  const actual = {};
  for (const prop of typeAliasProperties) {
    actual[prop.getFullyQualifiedName()] = prop
      .getTypeAtLocation(typeAlias)
      .getText();
  }

  return actual;
};
