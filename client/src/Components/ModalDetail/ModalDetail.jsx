import React from "react";

export default function ModalDetail({ onClose, selectedProduct }) {
    return (
        <div>
            <button type="button" onClick={onClose} className="">
                Cancelar
            </button>
            {selectedProduct && (
                <>
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.category}</p>
                    <p>{selectedProduct.price}</p>
                    <p>{selectedProduct.score}</p>
                </>
            )}
        </div>
    );
}