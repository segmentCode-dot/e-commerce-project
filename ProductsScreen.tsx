import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import axios from "axios";

export function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/cart", { productId });
      alert("Added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <scrollView style={styles.container}>
      <flexboxLayout style={styles.productList}>
        {products.map((product) => (
          <flexboxLayout key={product._id} style={styles.productCard}>
            <image src={product.image} style={styles.productImage} />
            <label style={styles.productName}>{product.name}</label>
            <label style={styles.productPrice}>${product.price}</label>
            <button
              text="Add to Cart"
              onTap={() => addToCart(product._id)}
              style={styles.addButton}
            />
          </flexboxLayout>
        ))}
      </flexboxLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productList: {
    flexDirection: "column",
    padding: 10,
  },
  productCard: {
    flexDirection: "column",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: 5,
  },
});