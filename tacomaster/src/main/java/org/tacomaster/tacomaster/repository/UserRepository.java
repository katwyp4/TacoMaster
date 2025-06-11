package org.tacomaster.tacomaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tacomaster.tacomaster.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String username, String email);
    boolean existsByEmail(String email);

}
