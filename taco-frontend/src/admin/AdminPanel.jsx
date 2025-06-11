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
} from "@mui/material";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, [search]);

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
      const res = await axios.get("http://localhost:8080/api/admin/orders", { withCredentials: true });
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
    </Box>
  );
}
