package org.tacomaster.tacomaster.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.tacomaster.tacomaster.model.User;
import org.tacomaster.tacomaster.model.Order;
import org.tacomaster.tacomaster.service.UserService;
import org.tacomaster.tacomaster.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final OrderService orderService;

    public AdminController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }
    @GetMapping("/users")
    public List<User> getUsers(@RequestParam(required = false) String search) {
        if (search == null || search.isBlank()) {
            return userService.getAllUsers();
        } else {
            return userService.findUsersByUsernameOrEmail(search);
        }
    }


    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    @PutMapping("/orders/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        return orderService.updateOrder(id, updatedOrder);
    }
}
