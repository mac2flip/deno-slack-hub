import { pascalCase } from "../deps.ts";
import { FunctionProperty, FunctionRecord } from "../types.ts";
import { Schema } from "../../../src/deps.ts";
import { AllowedTypeValue, AllowedTypeValueObject } from "./types.ts";
import { isCustomType } from "../deps.ts";
import { isArrayFunctionProperty } from "../utils.ts";
import { isObjectFunctionProperty } from "../utils.ts";

export function autogeneratedComment(includeDate?: boolean): string {
  const dateString = includeDate ? ` on ${new Date().toDateString()}` : "";
  return `/** This file was autogenerated${dateString}. Follow the steps in src/schema/slack/functions/README.md to rebuild **/`;
}

export function renderFunctionImport(
  callbackId: string,
  dir = "./",
): string {
  return `import ${getFunctionName(callbackId)} from "${dir}${callbackId}.ts";`;
}

export function renderModuleImport(namespace: string): string {
  return `import ${
    getConnectorObjectName(namespace)
  } from "./${namespace}/mod.ts";`;
}

export function getFunctionName(callbackId: string): string {
  return pascalCase(callbackId);
}

export function getConnectorObjectName(namespace: string): string {
  return pascalCase(namespace);
}

export function getConnectorCallbackId(
  functionRecord: FunctionRecord,
): string {
  return `${functionRecord.app_id}#/functions/${functionRecord.callback_id}`;
}

export function getParameterType(type: AllowedTypeValue): string {
  return isCustomType(type) ? type.id : type;
}

const getParameterList = (
  functionRecord: FunctionRecord,
): FunctionProperty[] => [
  ...functionRecord.input_parameters,
  ...functionRecord.output_parameters,
];

const hasTypeObject = (
  types: string[],
  typeObject: AllowedTypeValueObject,
): boolean =>
  types.some((t) =>
    Object.values(typeObject).map((val) => getParameterType(val)).includes(t)
  );

const extractTypes = (properties: FunctionProperty[]): string[] => {
  let types: Set<string> = new Set();
  properties.forEach((property) => {
    types.add(property.type);
    if (isArrayFunctionProperty(property)) {
      types = new Set([
        ...types,
        ...extractTypes([property.items]),
      ]);
    }
    if (isObjectFunctionProperty(property)) {
      types = new Set([
        ...types,
        ...extractTypes(Object.values(property.properties)),
      ]);
    }
  });
  return Array.from(types);
};

export function renderTypeImports(
  functionRecord: FunctionRecord,
  depth = 0,
) {
  const typescript: string[] = [];
  const functionRecordTypes = extractTypes(getParameterList(functionRecord));
  if (
    hasTypeObject(functionRecordTypes, Schema.types) ||
    hasTypeObject(functionRecordTypes, Schema.slack.types)
  ) {
    typescript.push(
      `import { Schema } from "${renderRelativePath(depth)}deps.ts";`,
    );
  }
  return typescript.join("\n");
}

export function renderRelativePath(depth: number): string {
  if (depth === 0) {
    return "./";
  }
  return "../".repeat(depth);
}
