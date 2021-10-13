import { FormEvent, useState } from "react";
import { ProductPresenterDto } from "../../../adapters/ProductDto";
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
    onSubmit: (product: ProductFormOutput) => Promise<ProductPresenterDto>;
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

    const [error, setError] = useState<string | null>(null);

    const onChange = (productFormInput: ProductFormInput) => {
        setProductInput(productFormInput);
    };

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <form onSubmit={submit} className="userForm">
            <div className="product">
                <div className="productName">
                    <label htmlFor="name" className="label">
                        product name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        value={productInput.name || ""}
                        onChange={(e) =>
                            onChange({ ...productInput, name: e.target.value })
                        }
                    />
                </div>
                <div className="productQty">
                    <label htmlFor="qty-in-stock" className="label">
                        stock
                    </label>
                    <input
                        type="number"
                        name="qty-in-stock"
                        className="input inputStock"
                        value={productInput.qtyInStock || 0}
                        onChange={(e) =>
                            onChange({
                                ...productInput,
                                qtyInStock: parseInt(e.target.value) || 0,
                            })
                        }
                    />
                </div>
            </div>
            <button type="submit">Enregistrer</button>
            {error && <div>{error}</div>}
        </form>
    );
};
