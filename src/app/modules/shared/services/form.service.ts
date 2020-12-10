import { Injectable } from '@angular/core';
import { FormGroup, NgForm} from '@angular/forms';
import {clone} from 'ramda';
import {IOrganisation} from '../../../types/User';
import {IProject} from '../../../types/IProject';
import {IFormDataFile} from '../../../types/Entities';
import {StorageService} from './storage.service';

export interface IFormErrors {
  name: 'uncompleted' | 'invalid' | 'required' | 'rejected' | 'equal';
  value?: boolean;
  priority?: number;
  controlName?: string;
  errorName?: string;
}

export interface IFormSubmitEmit {
  data: IProject | IOrganisation | any;
  files?: IFormDataFile[];
  formDataArray?: FormData[];
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private storage: StorageService) { }

  getErrors(form: FormGroup | NgForm): Array<IFormErrors> {
    const errors: Array<IFormErrors> = [];
    Object.keys(form.controls).map((key) => {
      const c = form.controls[key];
      const value = c.value;
      const errs = c.errors;
      if (c.invalid && (
        (errs && errs.required && errs.requiredError && errs.requiredError.empty) ||
        (typeof value === 'string' && value.length === 0)
      ) && typeof value !== 'boolean') {
        errors.push({
          name: 'uncompleted',
          value: true,
          priority: 1
        });
      }
      if (c.invalid && (typeof value === 'string' && value.length)) {
        errors.push({
          name: 'invalid',
          value: true,
          priority: 2,
          controlName: key,
          errorName: Object.keys(errs).find(err => err !== key)
        });
      }
      if (c.hasError('equalValidator')) {
        errors.push({
          name: 'equal',
          value: true,
          priority: 3,
          controlName: key
        });
      }
      if (c.hasError('required')) {
        errors.push({
          name: 'required',
          value: true,
          priority: 4,
          controlName: key
        });
      }
    });
    return errors.sort((a, b) => a.priority - b.priority);
  }

  isUncompleted(form: FormGroup): boolean {
    return Object.keys(form.controls).some((key) => {
      const c = form.controls[key];
      return c.dirty && c.errors && c.errors.required && !c.value;
    });
  }

  markFormGroupTouched(form: FormGroup | NgForm, dirty = true, focus = true, invalidControl?) {
    Object.values(form.controls).forEach((control: FormGroup | any) => {
      control.markAsTouched();

      if (dirty) {
        control.markAsDirty();
      }
      if (focus && control.nativeElement && !control.valid && !invalidControl) {
        control.nativeElement.focus();
        invalidControl = control;
      }
      if (control.controls) {
        this.markFormGroupTouched(control, dirty, focus, invalidControl);
      }
    });
  }

  enableDisableForm(form: FormGroup, enable: boolean) {
    Object.values(form.controls).forEach(control => {
      return enable ? control.enable() : control.disable();
    });
  }

  labelClasses(form: FormGroup, key, additional = {}) {
    return {'f-active': form.value[key].length, ...additional};
  }

  makeFormDataFile(fileData: IFormDataFile): FormData {
    const formData = new FormData();
    // Object.keys(value).map((key) => {
    //   formData.append(key, value[key]);
    // });
    formData.append('file', fileData.file);
    formData.append('ownerId', fileData.ownerId);
    formData.append('type', fileData.type);
    return formData;
  }

  makeAndChangeFilesArr(newFile: IFormDataFile, filesArr: IFormDataFile[] = [], ownerId?: string): IFormDataFile[] {
    const output: IFormDataFile[] = clone(filesArr);
    const existIndex = filesArr.findIndex(f => f.type === newFile.type && f.ownerId === newFile.ownerId);
    if (existIndex >= 0) {
      output[existIndex].file = newFile.file;
      output[existIndex].url = window.URL.createObjectURL(newFile.file);
    } else {
      output.push({
        file: newFile.file,
        type: newFile.type,
        ownerId: newFile.ownerId,
        url: window.URL.createObjectURL(newFile.file)
      });
    }
    return output;
  }

  compareFormDataFilesArr(files: IFormDataFile[]): FormData[] {
    return files.map(f => {
      return this.makeFormDataFile(f);
    });
  }

  saveFormValues(name: string, values: {} = {}) {
    this.storage.setItem(name, JSON.stringify(values));
  }

  getFormValues(name: string) {
    const v = this.storage.getItem(name);
    return v ? JSON.parse(v) : {};
  }

  // getFormFileErrors(files: IFormDataFile[]): IFormErrors[] | null {
  //   if (files) {
  //     const overSized: IFormDataFile[] = files.filter(f => f.file).filter(f => f.file.size > MAX_FILE_SIZE);
  //     if (overSized.length) {
  //       return overSized.map(f => ({name: 'rejected', controlName: f.type}));
  //     }
  //   }
  //   return null;
  // }
}
