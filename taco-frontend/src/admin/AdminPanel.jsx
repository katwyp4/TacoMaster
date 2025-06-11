import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Button
} from "@mui/material";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);
const [newIngredient, setNewIngredient] = useState({ name: "", price: "", category: "" });
const [editingId, setEditingId] = useState(null);
const [editingIngredient, setEditingIngredient] = useState({});



  useEffect(() => {
  fetchUsers();
  fetchOrders();
  fetchIngredients();
}, [search]);

const fetchIngredients = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/ingredients", { withCredentials: true });
    setIngredients(res.data);
  } catch (err) {
    console.error(err);
  }
};

const handleCreateIngredient = async () => {
  try {
    await axios.post("http://localhost:8080/api/ingredients", newIngredient, { withCredentials: true });
    setNewIngredient({ name: "", price: "", category: "" });
    fetchIngredients();
  } catch (err) {
    console.error(err);
  }
};

const handleEditStart = (ingredient) => {
  setEditingId(ingredient.id);
  setEditingIngredient({ ...ingredient });
};

const handleEditChange = (e) => {
  setEditingIngredient({ ...editingIngredient, [e.target.name]: e.target.value });
};

const handleEditSave = async () => {
  try {
    await axios.put(`http://localhost:8080/api/ingredients/${editingId}`, editingIngredient, { withCredentials: true });
    setEditingId(null);
    fetchIngredients();
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteIngredient = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/ingredients/${id}`, { withCredentials: true });
    fetchIngredients();
  } catch (err) {
    console.error(err);
  }
};

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/admin/users?search=${search}`, { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/admin/orders-with-user", { withCredentials: true });
    setOrders(res.data);
  } catch (err) {
    console.error(err);
  }
};


  const updateUser = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${id}`, updatedData, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrder = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/orders/${id}`, updatedData, { withCredentials: true });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Panel Administratora
        </Typography>

      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <TextField
          label="Szukaj użytkownika"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      <Paper sx={{ marginBottom: 6 }}>
        <Typography variant="h6" sx={{ padding: 2 }}>Użytkownicy</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rola</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Select
                      value={u.role}
                      onChange={(e) => updateUser(u.id, { ...u, role: e.target.value })}
                      size="small"
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper>
        <Typography variant="h6" sx={{ padding: 2 }}>Zamówienia</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imie</TableCell> 
                <TableCell>Nazwisko</TableCell>
                <TableCell>Email</TableCell> 
                <TableCell>Status</TableCell>
                <TableCell>Cena całkowita</TableCell>
                <TableCell>Miejsce odbioru</TableCell>
                <TableCell>Metoda płatności</TableCell>
                <TableCell>Data utworzenia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.userName}</TableCell>
                  <TableCell>{o.userName}</TableCell>
                  <TableCell>{o.userEmail}</TableCell>
                  <TableCell>
                    <Select
                      value={o.status}
                      onChange={(e) => updateOrder(o.id, { ...o, status: e.target.value })}
                      size="small"
                    >
                      <MenuItem value="OCZEKUJĄCE">OCZEKUJĄCE</MenuItem>
                      <MenuItem value="W REALIZACJI">W REALIZACJI</MenuItem>
                      <MenuItem value="ZREALIZOWANE">ZREALIZOWANE</MenuItem>
                      <MenuItem value="ANULOWANE">ANULOWANE</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{o.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{o.pickupLocation}</TableCell>
                  <TableCell>{o.paymentMethod}</TableCell>
                  <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ marginTop: 6, padding: 2 }}>
  <Typography variant="h6" sx={{ marginBottom: 2 }}>Składniki Taco</Typography>

  <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
    <TextField
      label="Nazwa"
      name="name"
      value={newIngredient.name}
      onChange={e => setNewIngredient({ ...newIngredient, name: e.target.value })}
    />
    <TextField
      label="Cena"
      name="price"
      type="number"
      value={newIngredient.price}
      onChange={e => setNewIngredient({ ...newIngredient, price: e.target.value })}
      sx={{ width: 100 }}
    />
    <Select
        name="category"
        value={newIngredient.category}
        onChange={e => setNewIngredient({ ...newIngredient, category: e.target.value })}
        displayEmpty
        >
        <MenuItem value="" disabled>Wybierz kategorię</MenuItem>
        <MenuItem value="TORTILLA">TORTILLA</MenuItem>
        <MenuItem value="MIĘSO">MIĘSO</MenuItem>
        <MenuItem value="DODATEK">DODATEK</MenuItem>
    </Select>

    <Button variant="contained" onClick={handleCreateIngredient}>Dodaj</Button>
  </Box>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nazwa</TableCell>
          <TableCell>Cena</TableCell>
          <TableCell>Kategoria</TableCell>
          <TableCell>Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ingredients.map(ing => (
          <TableRow key={ing.id}>
            <TableCell>
              {editingId === ing.id ? (
                <TextField name="name" value={editingIngredient.name} onChange={handleEditChange} />
              ) : (
                ing.name
              )}
            </TableCell>
            <TableCell>
              {editingId === ing.id ? (
                <TextField name="price" type="number" value={editingIngredient.price} onChange={handleEditChange} />
              ) : (
                ing.price
              )}
            </TableCell>
            <TableCell>
              {editingId === ing.id ? (
                <Select
                    name="category"
                    value={editingIngredient.category}
                    onChange={handleEditChange}
                >
                    <MenuItem value="TORTILLA">TORTILLA</MenuItem>
                    <MenuItem value="MIESO">MIĘSO</MenuItem>
                    <MenuItem value="DODATEK">DODATEK</MenuItem>
                </Select>
                ) : (
                ing.category
                )}
            </TableCell>
            <TableCell>
              {editingId === ing.id ? (
                <>
                  <Button onClick={handleEditSave} sx={{ mr: 1 }}>Zapisz</Button>
                  <Button onClick={() => setEditingId(null)}>Anuluj</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleEditStart(ing)} sx={{ mr: 1 }}>Edytuj</Button>
                  <Button onClick={() => handleDeleteIngredient(ing.id)} color="error">Usuń</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>

    </Box>
  );
}
