export interface SchemaField {
  // name?: string;
  type: SCHEMA_FIELD_TYPE | "Buffer";
  fields: Field[];
  isKey?: boolean;
  //   resolvedKeyValue?: string;
}

export interface AmendedSchemaField extends SchemaField {
  name: string;
  resolvedKeyValue: string;
}

export interface NewPackedFile {
  name: string;
  schemaFields: SchemaField[];
  file_size: number;
  version?: number;
  tableSchema: DBVersion;
}

export interface PackedFile {
  name: string;
  file_size: number;
  start_pos: number;
  // is_compressed: number;
  schemaFields?: SchemaField[];
  entryCount?: number;
  version?: number;
  guid?: string;
  tableSchema?: DBVersion;
  text?: string;
  buffer?: Buffer;
}

export interface PackHeader {
  header: Buffer;
  byteMask: number;
  refFileCount: number;
  pack_file_index_size: number;
  pack_file_count: number;
  header_buffer: Buffer;
}

export interface Pack {
  name: string;
  path: string;
  packedFiles: PackedFile[];
  packHeader: PackHeader;
  lastChangedLocal: number;
  dependencyPacks?: string[];
  readTables: string[] | "all";
}

export interface PackFileCollision {
  firstPackName: string;
  secondPackName: string;
  fileName: string;
  areSameSize?: boolean;
}

export interface PackTableCollision extends PackFileCollision {
  secondFileName: string;
  key: string;
  value: string;
}

// e.g. unit_ability_superseded_abilities_set_elements_tables
export type DBFileName = string;
export type DBFieldName = string;
export type PackName = string;
export type PackedFileSuffix = string;

export interface DBRefOrigin {
  originDBFileName: DBFileName;
  targetDBFileName: DBFileName;
  value: string;
  originFieldName: DBFieldName;
  targetFieldName: DBFieldName;
  originFileSuffix: PackedFileSuffix;
}

// DB Table can have its own ID field (key) and a foreign table field (key with is_reference)
export interface PackTableReferences {
  ownKeys: Record<DBFileName, Record<DBFieldName, string[]>>;
  refs: Record<DBFileName, Record<DBFieldName, string[]>>;
  refOrigins: Record<DBFileName, DBRefOrigin[]>;
}

export interface UniqueIdsCollision {
  tableName: string;
  fieldName: string;
  value: UniqueId;
  valueTwo: UniqueId;
  firstPackName: string;
  secondPackName?: string;
}

export interface UniqueId {
  value: string;
  packFileName: string;
  tableRow: string[];
  packName: string;
}

export interface ScriptListenerCollision {
  packFileName: string;
  value: ScriptListener;
  valueTwo: ScriptListener;
  firstPackName: string;
  secondPackName?: string;
}

export interface FileAnalysisError {
  msg: string;
  lineNum?: number;
  colNum?: number;
  packName: string;
  packFileName: string;
}

export interface FileToFileReference {
  reference: string;
  packName: string;
  packFileName: string;
}

export interface ScriptListener {
  value: string;
  packFileName: string;
  packName: string;
  position: number;
}

export interface PackCollisions {
  packFileCollisions: PackFileCollision[];
  packTableCollisions: PackTableCollision[];
  missingTableReferences: Record<PackName, DBRefOrigin[]>;
  uniqueIdsCollisions: Record<PackName, UniqueIdsCollision[]>;
  scriptListenerCollisions: Record<PackName, ScriptListenerCollision[]>;
  packFileAnalysisErrors: Record<string, Record<DBFileName, FileAnalysisError[]>>;
  missingFileRefs: Record<PackName, Record<DBFileName, FileToFileReference[]>>;
}

export type SCHEMA_FIELD_TYPE =
  | "Boolean"
  | "OptionalStringU8"
  | "StringU8"
  | "F32"
  | "I16"
  | "I32"
  | "I64"
  | "F64"
  | "ColourRGB"
  | "StringU16";

export type FIELD_TYPE =
  | "Int16"
  | "Int8"
  | "UInt8"
  | "String"
  | "Buffer"
  | "F32"
  | "I32"
  | "I16"
  | "I64"
  | "F64";
export type FIELD_VALUE = number | string | Buffer | undefined;

export interface Field {
  type: FIELD_TYPE;
  val: FIELD_VALUE;
}

export interface DBField {
  name: string;
  field_type: SCHEMA_FIELD_TYPE;
  is_key: boolean;
  default_value: string;
  is_filename: boolean;
  filename_relative_path?: any;
  is_reference: string[];
  lookup?: any;
  description: string;
  ca_order: number;
  is_bitwise: number;
  enum_values: Record<string, unknown>;
  is_part_of_colour?: any;
}

export interface DBVersion {
  version: number;
  fields: DBField[];
}
