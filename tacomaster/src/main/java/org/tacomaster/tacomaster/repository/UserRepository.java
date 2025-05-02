package org.tacomaster.tacomaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tacomaster.tacomaster.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
