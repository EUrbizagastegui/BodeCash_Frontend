import './LabelInput.css'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

const LabelInput = ({ props }) => {
    return (
        <div className="label-input">
            <label htmlFor={props.label}>{props.label}</label>
            {props.type === "password" ? (
                <IconField className="input-icon">
                    <InputIcon className="pi pi-spin pi-spinner"></InputIcon>
                    <InputText id={props.label} value={props.value} onChange={(e) => props.setValue(e.target.value)} placeholder={props.label} />
                </IconField>
            ) : (
                <InputText id={props.label} value={props.value} onChange={(e) => props.setValue(e.target.value)} placeholder={props.label} />
            )}
        </div>
    );
}

export default LabelInput