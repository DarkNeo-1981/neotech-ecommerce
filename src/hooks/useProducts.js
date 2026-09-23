
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const categories = {
  1: "Notebooks",
  2: "Periféricos",
  3: "Monitores",
  4: "Componentes",
};

function useProducts(categoryId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidCategory = !categoryId || categories[categoryId];

  useEffect(() => {
    if (!isValidCategory) {
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsRef = collection(db, "products");

        const productsQuery = categoryId
          ? query(
              productsRef,
              where("category", "==", categories[categoryId])
            )
          : productsRef;

        const querySnapshot = await getDocs(productsQuery);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        setError(error.message || "No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, isValidCategory]);

  if (!isValidCategory) {
    return {
      products: [],
      loading: false,
      error: null,
    };
  }

  return { products, loading, error };
}

export default useProducts;
