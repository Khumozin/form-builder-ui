import { Injectable, signal } from '@angular/core';

import { FormField } from '../models/field';
import { FormRow } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: [],
      },
    ]);
  }

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];

        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }

        return { ...row, fields: updatedFields };
      }

      return row;
    });

    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((field) => field.id !== fieldId),
    }));

    this._rows.set(newRows);
  }

  addRow(): void {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();

    this._rows.set([...rows, newRow]);
  }

  deleteRow(rowId: string): void {
    if (this._rows().length === 1) {
      return;
    }

    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== rowId);
    this._rows.set(newRows);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ): void {
    const rows = this._rows();

    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      fieldToMove = undefined;

      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex(
          (field) => field.id === fieldId
        );

        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }

      if (!fieldToMove) return;

      const newRows = [...rows];
      const fieldWithRemovedField = newRows[sourceRowIndex].fields.filter(
        (field) => field.id !== fieldId
      );
      newRows[sourceRowIndex].fields = fieldWithRemovedField;

      const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);
      if (targetRowIndex >= 0) {
        const targetFields = [...newRows[targetRowIndex].fields];
        targetFields.splice(targetIndex, 0, fieldToMove);
        newRows[targetRowIndex].fields = targetFields;
      }
    });
  }
}
