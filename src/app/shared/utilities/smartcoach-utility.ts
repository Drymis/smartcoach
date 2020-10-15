import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SmartcoachUtility {

    constructor() { }

    static isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
    }

    static deepDiffUpdate(obj1, obj2, root = true) {
        if (this.getType(obj1) !== this.getType(obj2)) {
            throw new Error('[deepDiffUpdate()] Types are different');
        }
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw new Error('[deepDiffUpdate()] Invalid argument. Function given, object expected.');
        }

        if (this.isValue(obj2) || this.isDate(obj2)) {
            obj1 = obj2;
        } else {
            const keys = [];
            Object.keys(obj2).forEach(key => {
                if (!keys.includes(key)) keys.push(key);
            });
            Object.keys(obj1).forEach(key => {
                if (!keys.includes(key)) keys.push(key);
            });

            keys.forEach(key => {

                if (!this.variableExists(obj1[key]) || !this.variableExists(obj2[key])) {
                    if (!this.variableExists(obj1[key])) {
                        if (this.isArray(obj2)) {
                            obj1.push(obj2[key]);
                        } else {
                            obj1[key] = obj2[key];
                        }
                    }

                    if (!this.variableExists(obj2[key])) {
                        if (this.isArray(obj1)) {
                            obj1.splice(key, 1);
                        } else {
                            if (this.isObject(obj1)) {
                                delete obj1[key];
                            } else {
                                obj1[key] = null;
                            }
                        }
                    }
                } else {
                    if (this.isValue(obj2[key]) || this.isDate(obj2[key])) {
                        obj1[key] = obj2[key];
                    } else {
                        this.deepDiffUpdate(obj1[key], obj2[key], false);
                    }
                }
            });
        }

        if (root) {
            // console.log("----------")
            // console.log(obj1)
            // console.log(obj2)
        }
    }

    // Converts and object to a form
    static objectToForm(object: any) {

        const newObject = {};

        if ((object instanceof Array) || (object instanceof Object)) {
            for (const key in object) {

                if (object[key] instanceof Array) {
                    newObject[key] = new FormArray([], { updateOn: 'blur' });
                    object[key].forEach(element => {
                        newObject[key].push(
                            this.objectToForm(element)
                        );
                    });

                } else {
                    if (object[key] instanceof Object) {
                        newObject[key] = this.objectToForm(object[key]);
                    } else {
                        newObject[key] = new FormControl(object[key]);
                    }
                }
            }
        } else {
            return new FormControl(object);
        }

        return new FormGroup(newObject, {
            updateOn: 'change'
        });
    }


    static variableExists(variable: any) {
        if (typeof variable === 'undefined' || variable === null || variable === undefined) {
            return false;
        } else {
            return true;
        }
    }

    static isObjectEmpty(object: any) {
        if (Object.keys(object).length === 0 && object.constructor === Object) {
            return true;
        } else {
            return false;
        }
    }

    static isEmailValid(variable: string) {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.{1}[a-z]{2,4}$/;

        if (!emailPattern.test(variable.toLowerCase())) {
            return false;
        } else {
            return true;
        }
    }

    static askForNPerm() {
        Notification.requestPermission((result) => {
            console.log('User choice', result);
            if (result !== 'granted') {
                console.log('No notification permission granted!');
            } else {
                console.log('permissions granted');
                // configurePushSub();// Write your custom function that pushes your message
            }
        });
    }

    static isSafari() {
        return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('CriOS') === -1 &&
            navigator.userAgent.indexOf('FxiOS') === -1;
    }

    static isIOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    }

    static getObjNoRef(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static isPrimitive(obj) {
        return (obj !== Object(obj));
    };

    static isFunction(x) {
        return Object.prototype.toString.call(x) === '[object Function]';
    }

    static isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }

    static isDate(x) {
        return Object.prototype.toString.call(x) === '[object Date]';
    }

    static isObject(x) {
        return Object.prototype.toString.call(x) === '[object Object]';
    }

    static isValue(x) {
        return !this.isObject(x) && !this.isArray(x);
    }

    static getType(obj) {
        if (this.isFunction(obj)) {
            return 'function';
        }
        if (this.isArray(obj)) {
            return 'array';
        }
        if (this.isDate(obj)) {
            return 'date';
        }
        if (this.isObject(obj)) {
            return 'object';
        }
        if (this.isValue(obj)) {
            return 'value';
        }
    }

    static objectToFormData(object: object, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (const property in object) {
            if (!object.hasOwnProperty(property) || !object[property]) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.objectToFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }

    static getFileType(file) {
        return /(?:\.([^.]+))?$/.exec(file.name)[1];
    }
}
