import { Project, TypeAliasDeclaration, VariableDeclaration } from 'ts-morph';
import * as path from 'path';

export const getProjectFile = (projectPathArray: string[], file: string) => {
  const project = new Project({
    tsConfigFilePath: path.join(...projectPathArray),
    // compilerOptions: { include: [path.join(__dirname, 'index.ts')] },
  });
  return project.getSourceFile(file);
};

const getIdentifierType = (
  identifier: TypeAliasDeclaration | VariableDeclaration
) => {
  const identifierType = identifier.getType();
  const identifierProperties = identifierType.getProperties();

  const actual = {};
  for (const prop of identifierProperties) {
    actual[prop.getFullyQualifiedName()] = prop
      .getTypeAtLocation(identifier)
      .getText();
  }

  return actual;
};

export const getTypeAliasTypeStructure = (
  projectPathArray: string[],
  file: string,
  type: string
) => {
  const indexTs = getProjectFile(projectPathArray, file);
  const typeAlias = indexTs.getTypeAliasOrThrow(type);

  return getIdentifierType(typeAlias);
};

export const getVariableTypeStructure = (
  projectPathArray: string[],
  file: string,
  type: string
) => {
  const indexTs = getProjectFile(projectPathArray, file);
  const typeAlias = indexTs.getVariableDeclarationOrThrow(type);

  return getIdentifierType(typeAlias);
};
