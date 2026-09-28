
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { categories } from "../constants/categories";

function useProducts(categoryId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidCategory = !categoryId || categories[categoryId];

  useEffect(() => {
    if (!isValidCategory) {
      return;
    }

    let active = true;

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

        if (active) {
          setProducts(productsData);
        }
      } catch (error) {
        if (active) {
          setError(error.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
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
