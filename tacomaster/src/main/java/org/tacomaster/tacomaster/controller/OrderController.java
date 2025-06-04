package org.tacomaster.tacomaster.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.tacomaster.tacomaster.model.Order;
import org.tacomaster.tacomaster.service.OrderService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setStatus("OCZEKUJĄCE");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderService.create(order);
        return ResponseEntity.ok(savedOrder);
    }



    @GetMapping
    public List<Order> getAll() {
        return orderService.getAll();
    }
}
