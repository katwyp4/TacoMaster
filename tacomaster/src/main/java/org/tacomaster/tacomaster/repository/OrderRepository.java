package org.tacomaster.tacomaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tacomaster.tacomaster.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserEmail(String email);

}