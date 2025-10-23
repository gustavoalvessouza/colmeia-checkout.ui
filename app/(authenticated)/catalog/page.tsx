"use client";

import { useAuth } from "@/hooks";
import React from "react";
import ProductList from "./components/product-list";

const Catalog: React.FC = () => {
    const { user } = useAuth();
    return (
        <>
            <ProductList />
        </>
    );
};

export default Catalog;
