package org.tacomaster.tacomaster.service;

import org.springframework.stereotype.Service;
import org.tacomaster.tacomaster.model.Order;
import org.tacomaster.tacomaster.model.OrderItem;
import org.tacomaster.tacomaster.repository.OrderRepository;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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


    public List<Order> getAll() {
        return orderRepository.findAll();
    }
}
