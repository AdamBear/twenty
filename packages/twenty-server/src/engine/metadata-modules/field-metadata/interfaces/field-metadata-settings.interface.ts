import { FieldMetadataType, IsExactly } from 'twenty-shared/types';

import { RelationOnDeleteAction } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-on-delete-action.interface';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';

export enum NumberDataType {
  FLOAT = 'float',
  INT = 'int',
  BIGINT = 'bigint',
}

export type FieldMetadataDefaultSettings = {
  isForeignKey?: boolean;
};

export type FieldNumberVariant = 'number' | 'percentage';

export type FieldMetadataNumberSettings = {
  dataType: NumberDataType;
  decimals?: number;
  type?: FieldNumberVariant;
};

export type FieldMetadataTextSettings = {
  displayedMaxRows?: number;
};

export type FieldMetadataDateSettings = {
  displayAsRelativeDate?: boolean;
};

export type FieldMetadataDateTimeSettings = {
  displayAsRelativeDate?: boolean;
};

export type FieldMetadataRelationSettings = {
  relationType: RelationType;
  onDelete?: RelationOnDeleteAction;
  joinColumnName?: string;
};

type FieldMetadataSettingsMapping = {
  [FieldMetadataType.NUMBER]: FieldMetadataNumberSettings;
  [FieldMetadataType.DATE]: FieldMetadataDateSettings;
  [FieldMetadataType.DATE_TIME]: FieldMetadataDateTimeSettings;
  [FieldMetadataType.TEXT]: FieldMetadataTextSettings;
  [FieldMetadataType.RELATION]: FieldMetadataRelationSettings;
};

export type FieldMetadataSettings<
  T extends FieldMetadataType = FieldMetadataType,
> =
  IsExactly<T, FieldMetadataType> extends true
    ? FieldMetadataDefaultSettings
    : T extends keyof FieldMetadataSettingsMapping
      ? FieldMetadataSettingsMapping[T] & FieldMetadataDefaultSettings
      : never;
