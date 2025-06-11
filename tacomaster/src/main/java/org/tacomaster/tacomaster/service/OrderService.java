package org.tacomaster.tacomaster.service;

import org.springframework.stereotype.Service;
import org.tacomaster.tacomaster.model.Order;
import org.tacomaster.tacomaster.model.OrderItem;
import org.tacomaster.tacomaster.repository.OrderRepository;

import org.tacomaster.tacomaster.dto.OrderWithUserDTO;
import org.tacomaster.tacomaster.model.User;
import org.tacomaster.tacomaster.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order create(Order order) {
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }
        return orderRepository.save(order);
    }

    public List<Order> getAllByUserEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderWithUserDTO> getAllOrdersWithUserNames() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(order -> {
            User user = userRepository.findByEmail(order.getUserEmail())
                    .orElse(null);

            String userName = user != null ? user.getUsername() : "Nieznany użytkownik";

            return new OrderWithUserDTO(
                    order.getId(),
                    order.getStatus(),
                    order.getUserEmail(),
                    userName,
                    order.getTotalPrice(),
                    order.getPickupLocation(),
                    order.getPaymentMethod(),
                    order.getCreatedAt().format(formatter)
            );
        }).collect(Collectors.toList());
    }


    public Order updateOrder(Long id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setStatus(updatedOrder.getStatus());
        return orderRepository.save(existingOrder);
    }



    public List<Order> getAll() {
        return orderRepository.findAll();
    }
}
