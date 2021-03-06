import { useEffect, useState } from "react";
import { Button } from "../../../components/atoms/button/Button";
import { NumberField } from "../../../components/molecules/numberField/NumberField";
import { TextField } from "../../../components/molecules/textField/TextField";
import "./ProductForm.css";

export interface ProductFormOutput {
    id?: string;
    name: string;
    qtyInStock: number;
}

interface ProductFormInput {
    id?: string;
    name?: string;
    qtyInStock?: number;
    onSubmit: (product: ProductFormOutput) => void;
}

const productFormInputToProductFormOutput = (
    productFormInput: ProductFormInput
): ProductFormOutput =>
    Object.freeze({
        id: productFormInput.id,
        name: productFormInput.name || "",
        qtyInStock: productFormInput.qtyInStock || 0,
    });

export const ProductForm: React.FC<ProductFormInput> = ({
    id,
    name,
    qtyInStock,
    onSubmit,
}) => {
    const [productInput, setProductInput] = useState<ProductFormInput>({
        id,
        name,
        qtyInStock,
    } as ProductFormInput);

    useEffect(() => {
        setProductInput({ id, name, qtyInStock } as ProductFormInput);
    }, [id, name, qtyInStock]);

    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        try {
            setError(null);
            await onSubmit(productFormInputToProductFormOutput(productInput));
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(e as string);
            }
        }
    };

    return (
        <div className="form">
            {productInput.id && <label>ID : {productInput.id}</label>}
            <div className="product">
                <TextField
                    label="Product name"
                    value={productInput.name}
                    onChange={(newName: string) =>
                        setProductInput({ ...productInput, name: newName })
                    }
                />
                <NumberField
                    label="Quantity in stock"
                    value={productInput.qtyInStock}
                    onChange={(newQty) =>
                        setProductInput({ ...productInput, qtyInStock: newQty })
                    }
                />
            </div>
            <Button onClick={submit}>
                {productInput.id ? "Update" : "Add"}
            </Button>
            {error && <div>{error}</div>}
        </div>
    );
};
