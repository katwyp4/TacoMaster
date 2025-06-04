package org.tacomaster.tacomaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tacomaster.tacomaster.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}