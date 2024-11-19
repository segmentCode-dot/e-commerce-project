import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import axios from "axios";

export function AdminScreen() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:3000/api/products", {
        name,
        price: Number(price),
        description,
        image,
      });
      fetchProducts();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  return (
    <scrollView style={styles.container}>
      <flexboxLayout style={styles.form}>
        <textField
          hint="Product Name"
          text={name}
          onTextChange={(e) => setName(e.value)}
          style={styles.input}
        />
        <textField
          hint="Price"
          text={price}
          keyboardType="number"
          onTextChange={(e) => setPrice(e.value)}
          style={styles.input}
        />
        <textField
          hint="Description"
          text={description}
          onTextChange={(e) => setDescription(e.value)}
          style={styles.input}
        />
        <textField
          hint="Image URL"
          text={image}
          onTextChange={(e) => setImage(e.value)}
          style={styles.input}
        />
        <button text="Add Product" onTap={addProduct} style={styles.button} />
      </flexboxLayout>

      <flexboxLayout style={styles.productList}>
        {products.map((product) => (
          <flexboxLayout key={product._id} style={styles.productCard}>
            <label style={styles.productName}>{product.name}</label>
            <label style={styles.productPrice}>${product.price}</label>
            <button
              text="Delete"
              onTap={() => deleteProduct(product._id)}
              style={styles.deleteButton}
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
  form: {
    padding: 20,
    flexDirection: "column",
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    color: "#fff",
    borderRadius: 5,
  },
  productList: {
    flexDirection: "column",
    padding: 10,
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  productName: {
    flex: 1,
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "#FF3B30",
    color: "#fff",
    borderRadius: 5,
  },
});