
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, } from "firebase/firestore";
import { db } from "../firebase/config";

function useProducts(categoryId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    1: "Notebooks",
    2: "Periféricos",
    3: "Monitores",
    4: "Componentes",
  };

  useEffect(() => {
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

    if (!categoryId || categories[categoryId]) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [categoryId]);

  return { products, loading, error };
}

export default useProducts;
