import { ReactNode } from "react";

let dialogRef: any = null;
interface IInput {
    icon?: (color: string) => ReactNode,
    label?: string,
    value?: string,
    callBack: (v: string) => void
}
export const setDialogRef = (ref: any) => {
    dialogRef = ref;
};
export const AppAlert = {
    alert: (title: string, message?: string, btnText?: string[], input?: IInput) => {
        if (dialogRef) {
            dialogRef.show(title, message, btnText, input);
        } else {
            console.warn('Dialog not initialized yet');
        }
    },
};
