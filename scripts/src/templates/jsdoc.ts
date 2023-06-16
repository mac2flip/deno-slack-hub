import { Schema } from "../../../src/deps.ts";
import {
  FunctionProperty,
  FunctionRecord,
  ObjectFunctionProperty,
} from "../types.ts";
import { isArrayFunctionProperty, isObjectFunctionProperty } from "../utils.ts";

import {
  getConnectorObjectName,
  getFunctionName,
  getParameterType,
  isOfType,
} from "./utils.ts";

function toJSdocName(
  prefix: string,
  name: string,
  required: boolean,
  array = false,
): string {
  const separator = array ? "[]." : ".";
  const baseName = `${prefix}${separator}${name}`;
  if (!required) return `[${baseName}]`;
  return baseName;
}

function oauth2ParamJSDoc(prefix: string): string {
  return toJSdocParam(
    '"DEVELOPER"|"END_USER"',
    toJSdocName(prefix, "credential_source", true),
    `specifies which user’s token should be selected`,
  );
}

function toJSdocParam(
  type: string,
  name: string,
  description = "",
): string {
  return `* @param {${type}} ${name} - ${description}`;
}

function slackTypePropertyToJSDoc(
  property: FunctionProperty,
  prefix: string,
  name: string,
  required = false,
  array = false,
): string[] {
  const typescript: string[] = [];
  switch (property.type) {
    case getParameterType(Schema.slack.types.oauth2):
      typescript.push(
        toJSdocParam(
          Schema.types.object,
          toJSdocName(prefix, name, required, array),
          property.description,
        ),
      );
      typescript.push(
        oauth2ParamJSDoc(toJSdocName(prefix, name, required, array)),
      );
      break;

    default:
      typescript.push(toJSdocParam(
        Schema.types.string,
        toJSdocName(prefix, name, required, array),
        property.description,
      ));
  }
  return typescript;
}

function objectPropertyToJsDoc(
  property: ObjectFunctionProperty,
  prefix: string,
  name: string,
  required = false,
  array = false,
) {
  const typescript: string[] = [];
  typescript.push(
    toJSdocParam(
      Schema.types.object,
      toJSdocName(prefix, name, required, array),
      property.description,
    ),
  );
  Object.entries(property.properties).forEach(([key, prop]) => {
    typescript.push(
      propertyToJSdoc(
        prop,
        toJSdocName(prefix, name, required, array),
        key,
        property.required.includes(key),
      ),
    );
  });
  return typescript;
}

function typedPropertyToJSDoc(
  property: FunctionProperty,
  prefix: string,
  name: string,
  required = false,
  array = false,
): string[] {
  if (isObjectFunctionProperty(property)) {
    return objectPropertyToJsDoc(property, prefix, name, required, array);
  }
  if (isArrayFunctionProperty(property)) {
    console.log(property);
    if (isObjectFunctionProperty(property.items)) {
      return objectPropertyToJsDoc(
        property.items,
        prefix,
        name,
        required,
        true,
      );
    }
    if (isOfType(property.items.type, Schema.slack.types)) {
      return [toJSdocParam(
        `${Schema.types.string}[]`,
        toJSdocName(prefix, name, required, array),
        property.description,
      )];
    }
    if (property.items.type === Schema.types.integer) {
      return [toJSdocParam(
        `${Schema.types.number}[]`,
        toJSdocName(prefix, name, required, array),
        property.description,
      )];
    } else {
      return [toJSdocParam(
        `${property.items.type}[]`,
        toJSdocName(prefix, name, required, array),
        property.description,
      )];
    }
  }
  if (property.type === Schema.types.integer) {
    return [toJSdocParam(
      `${Schema.types.number}`,
      toJSdocName(prefix, name, required, array),
      property.description,
    )];
  }
  return [toJSdocParam(
    `${property.type}`,
    toJSdocName(prefix, name, required, array),
    property.description,
  )];
}

function propertyToJSdoc(
  property: FunctionProperty,
  prefix: string,
  name: string,
  required = false,
  array = false,
): string {
  if (isOfType(property.type, Schema.slack.types)) {
    return slackTypePropertyToJSDoc(property, prefix, name, required, array)
      .join("\n");
  }
  return typedPropertyToJSDoc(property, prefix, name, required, array).join(
    "\n",
  );
}

export function JSdocTemplate(
  functionRecord: FunctionRecord,
): string {
  const typescript: string[] = [];
  typescript.push(
    `* @memberOf Connectors.${
      getConnectorObjectName(functionRecord.namespace)
    }.functions`,
  );
  typescript.push(
    `* @param {object} options - ${
      getFunctionName(functionRecord.callback_id)
    } input options object.`,
  );
  functionRecord.input_parameters.forEach((parameter) => {
    typescript.push(
      propertyToJSdoc(
        parameter,
        "options",
        parameter.name,
        parameter.is_required,
      ),
    );
  });
  return `/**\n${typescript.join("\n")}\n*/`;
}

export default JSdocTemplate;
