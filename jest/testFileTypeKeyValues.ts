import { Project, TypeAliasDeclaration, VariableDeclaration } from "ts-morph";
import * as path from "path";

export const getProjectFile = (filePathArray: string[]) => {
  const project = new Project({});
  const filePath = path.join(...filePathArray);
  project.addSourceFilesAtPaths(filePath);
  return project.getSourceFile(filePath);
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
  filePathArray: string[],
  type: string
) => {
  const indexTs = getProjectFile(filePathArray);
  const typeAlias = indexTs.getTypeAliasOrThrow(type);

  return getIdentifierType(typeAlias);
};

export const getVariableTypeStructure = (
  filePathArray: string[],
  type: string
) => {
  const indexTs = getProjectFile(filePathArray);
  const typeAlias = indexTs.getVariableDeclarationOrThrow(type);

  return getIdentifierType(typeAlias);
};
