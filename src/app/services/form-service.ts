import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';

import { FormField } from '../models/field';
import { FormRow } from '../models/form';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _appRef = inject(ApplicationRef);
  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  public readonly selectedField = computed(() => {
    return this._rows()
      .flatMap((row) => row.fields)
      .find((field) => field.id === this._selectedFieldId());
  });

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

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((field) => field.id !== fieldId),
    }));

    startViewTransition(() => {
      this._rows.set(newRows);

      this._appRef.tick();
    });
  }

  addRow(): void {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();

    startViewTransition(() => {
      this._rows.set([...rows, newRow]);
    });
  }

  deleteRow(rowId: string): void {
    if (this._rows().length === 1) {
      return;
    }

    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== rowId);
    startViewTransition(() => {
      this._rows.set(newRows);
      this._appRef.tick();
    });
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ): void {
    startViewTransition(() => {
      const rows = this._rows();

      let fieldToMove: FormField | undefined;
      let sourceRowIndex = -1;
      let sourceFieldIndex = -1;

      rows.forEach((row, rowIndex) => {
        if (row.id === sourceRowId) {
          sourceRowIndex = rowIndex;
          sourceFieldIndex = row.fields.findIndex(
            (field) => field.id === fieldId
          );

          if (sourceFieldIndex >= 0) {
            fieldToMove = row.fields[sourceFieldIndex];
          }
        }
      });

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

      this._rows.set(newRows);
      this._appRef.tick();
    });
  }

  setSelectedField(fieldId: string): void {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.map((field) =>
        field.id === fieldId ? { ...field, ...data } : field
      ),
    }));
    this._rows.set(newRows);
  }

  moveRowUp(rowId: string): void {
    const rows = this._rows();
    const index = rows.findIndex((row) => row.id === rowId);
    if (index > 0) {
      const newRows = [...rows];
      const temp = newRows[index - 1];
      newRows[index - 1] = newRows[index];
      newRows[index] = temp;
      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  moveRowDown(rowId: string): void {
    const rows = this._rows();
    const index = rows.findIndex((row) => row.id === rowId);
    if (index < rows.length - 1) {
      const newRows = [...rows];
      const temp = newRows[index + 1];
      newRows[index + 1] = newRows[index];
      newRows[index] = temp;
      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  saveForm(): void {
    console.log(this._rows());
  }
}
